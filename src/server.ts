import express from "express";
import cors from "cors";
import multer from "multer";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { analyzeImageWithMemWal } from "./agents.js";
import { verifyC2PA } from "./c2pa.js";
import { calculateAASE } from "./aase.js";
import { loadMemWalConfig, MemWalSemanticMemoryClient } from "./memwal.js";
import { InMemoryAuthenticityMemoryClient, TimedAuthenticityMemoryClient } from "./memory.js";
import { objectiveForensics } from "./forensics.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files from the 'web/dist' directory (Vite output)
const webDistPath = path.join(__dirname, "../web/dist");
app.use(express.static(webDistPath));

// Setup Multer for memory storage file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // limit to 10MB
  },
});

// GET /api/health
app.get("/api/health", async (_req, res) => {
  try {
    const config = await loadMemWalConfig();
    let memwalStatus = "not_configured";
    if (config) {
      const client = new MemWalSemanticMemoryClient(config);
      const health = await client.health();
      memwalStatus = health.status === "ok" ? "connected" : "error";
    }
    res.json({
      status: "ok",
      serverTime: new Date().toISOString(),
      memwal: {
        status: memwalStatus,
        namespace: config?.namespace || "default",
      },
    });
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      message: error.message || String(error),
    });
  }
});

type VerifyEvent = (event: string, data: Record<string, unknown>) => void;

async function verifyUploadedFile(file: Express.Multer.File, emit?: VerifyEvent) {
  const fileBuffer = new Uint8Array(file.buffer);

  emit?.("progress", {
    status: "hashing",
    progress: 12,
    logLine: `Hashing ${file.originalname} and computing DCT/pHash objective signals...`,
  });
  const objective = await objectiveForensics(fileBuffer, file.originalname);

  emit?.("progress", {
    status: "forensic_ela",
    progress: 32,
    logLine: "ForensicAgent running real ELA recompression and pixel residual analysis...",
  });

  const config = await loadMemWalConfig();
  const memoryClient = config
    ? new TimedAuthenticityMemoryClient(new MemWalSemanticMemoryClient(config))
    : new InMemoryAuthenticityMemoryClient();

  console.log(`[Server] Running multi-agent AASE audit on file: ${file.originalname} (${file.size} bytes)...`);

  emit?.("progress", {
    status: "exifr_audit",
    progress: 52,
    logLine: "MetadataAgent and C2PA verifier parsing provenance headers...",
  });

  const [result, provenance] = await Promise.all([
    analyzeImageWithMemWal(fileBuffer, memoryClient),
    verifyC2PA(fileBuffer, file.mimetype).catch(() => ({ status: "unavailable" as const })),
  ]);

  emit?.("progress", {
    status: "k9_sniffer",
    progress: 78,
    logLine: "AASE weighting MemWal clues, AI-sniffer signals, and objective duplicate risk...",
  });

  const assessment = calculateAASE(result.scores, "A");

  return {
    success: true,
    filename: file.originalname,
    size: file.size,
    assessment,
    scores: result.scores,
    provenance,
    clueIds: result.clueIds,
    inspector: result.inspector,
    objective,
  };
}

// POST /api/verify
app.post("/api/verify", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ success: false, error: "No file uploaded under form key 'file'" });
      return;
    }

    res.json(await verifyUploadedFile(req.file));
  } catch (error: any) {
    console.error("[Server] Verification error:", error);
    res.status(500).json({
      success: false,
      error: error.message || String(error),
    });
  }
});

// POST /api/verify/stream
app.post("/api/verify/stream", upload.single("file"), async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders?.();

  const emit: VerifyEvent = (event, data) => {
    res.write(`event: ${event}\n`);
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  try {
    if (!req.file) {
      emit("error", { success: false, error: "No file uploaded under form key 'file'" });
      res.end();
      return;
    }

    emit("progress", {
      status: "received",
      progress: 4,
      logLine: `Received ${req.file.originalname} (${req.file.size} bytes) on live verification worker.`,
    });

    const payload = await verifyUploadedFile(req.file, emit);
    emit("progress", {
      status: "complete",
      progress: 100,
      logLine: `AASE verification completed. Verdict: ${payload.assessment.recreateReady ? "APPROVED" : "REJECTED"}`,
    });
    emit("result", payload);
  } catch (error: any) {
    console.error("[Server] Verification stream error:", error);
    emit("error", {
      success: false,
      error: error.message || String(error),
    });
  } finally {
    res.end();
  }
});

// Fallback all non-API GET requests to index.html for SPA client-side routing
app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api/")) {
    return next();
  }
  res.sendFile(path.join(webDistPath, "index.html"));
});

app.listen(port, () => {
  console.log(`[Server] Content Passport backend running on port ${port}`);
});
