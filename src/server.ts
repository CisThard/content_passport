import express from "express";
import cors from "cors";
import multer from "multer";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { analyzeImageWithMemWal } from "./agents.js";
import { verifyC2PA } from "./c2pa.js";
import { calculateAASE } from "./aase.js";
import { loadMemWalConfig, MemWalSemanticMemoryClient } from "./memwal.js";
import { InMemoryAuthenticityMemoryClient } from "./memory.js";

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
app.get("/api/health", async (req, res) => {
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

// POST /api/verify
app.post("/api/verify", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ success: false, error: "No file uploaded under form key 'file'" });
      return;
    }

    const fileBuffer = new Uint8Array(req.file.buffer);
    
    // Load config and construct MemWal client
    const config = await loadMemWalConfig();
    const memoryClient = config 
      ? new MemWalSemanticMemoryClient(config) 
      : new InMemoryAuthenticityMemoryClient();

    console.log(`[Server] Running multi-agent AASE audit on file: ${req.file.originalname} (${req.file.size} bytes)...`);
    
    // Run the real AASE analysis + real C2PA provenance verification (in parallel)
    const [result, provenance] = await Promise.all([
      analyzeImageWithMemWal(fileBuffer, memoryClient),
      verifyC2PA(fileBuffer, req.file.mimetype).catch(() => ({ status: "unavailable" as const })),
    ]);
    const assessment = calculateAASE(result.scores, "A");

    res.json({
      success: true,
      filename: req.file.originalname,
      size: req.file.size,
      assessment,
      scores: result.scores,
      provenance,
      clueIds: result.clueIds,
      inspector: result.inspector,
    });
  } catch (error: any) {
    console.error("[Server] Verification error:", error);
    res.status(500).json({
      success: false,
      error: error.message || String(error),
    });
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
