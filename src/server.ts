import express from "express";
import cors from "cors";
import multer from "multer";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { analyzeImageWithMemWal } from "./agents.js";
import { verifyC2PA } from "./c2pa.js";
import { calculateAASE } from "./aase.js";
import { loadMemWalConfig, MemWalSemanticMemoryClient } from "./memwal.js";
import { getAuthenticityMemoryClient } from "./memory.js";
import { objectiveForensics } from "./forensics.js";
import { HttpWalrusClient, InMemoryWalrusClient, WalrusClient } from "./walrus.js";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { SuiJsonRpcClient } from "@mysten/sui/jsonRpc";
import { getContentRightConfig, buildIssueGenesisPassportTx } from "./sui.js";
import {
  buildZkLoginMemoryReceipt,
  describeZkLoginSaltStrategy,
  getZkLoginSaltForClaims,
} from "./zklogin-salt.js";

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
const AUTH_CONFIG_CACHE_MS = 30_000;
let authConfigCache:
  | {
      expiresAt: number;
      value: {
        googleClientId: string;
        packageId: string;
        epoch: number;
      };
    }
  | undefined;

function getWalrusClient(): WalrusClient | undefined {
  const configuredPublisher = process.env.WALRUS_PUBLISHER || process.env.WALRUS_PUBLISHER_URL;
  const archiveEnabled = process.env.WALRUS_ARCHIVE_ENABLED === "true" || Boolean(configuredPublisher);
  if (!archiveEnabled) return undefined;
  const publisher = configuredPublisher || "https://publisher.walrus-testnet.walrus.space";
  const aggregator = process.env.WALRUS_AGGREGATOR || process.env.WALRUS_AGGREGATOR_URL || "https://aggregator.walrus-testnet.walrus.space";
  return new HttpWalrusClient({ publisher, aggregator, epochs: Number(process.env.WALRUS_EPOCHS || 1) });
}

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
  const memoryClient = getAuthenticityMemoryClient(config);

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

  const payload = {
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

  emit?.("progress", {
    status: "walrus_archive",
    progress: 88,
    logLine: "ArchivistAgent storing media hash and audit report artifacts on Walrus...",
  });

  const walrusArtifacts = await archiveVerificationArtifacts(fileBuffer, payload).catch((error: any) => ({
    status: "unavailable" as const,
    error: error.message || String(error),
  }));

  return {
    ...payload,
    walrusArtifacts,
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

async function archiveVerificationArtifacts(media: Uint8Array, payload: Record<string, unknown>) {
  const walrus = getWalrusClient();
  if (!walrus) return { status: "not_configured" as const };

  const reportBytes = new TextEncoder().encode(JSON.stringify({
    ...payload,
    archivedAt: new Date().toISOString(),
  }));

  const [mediaBlob, reportBlob] = await Promise.all([
    withTimeout(walrus.storeBlob(media), 10_000),
    withTimeout(walrus.storeBlob(reportBytes), 10_000),
  ]);

  const aggregator = process.env.WALRUS_AGGREGATOR || process.env.WALRUS_AGGREGATOR_URL || "https://aggregator.walrus-testnet.walrus.space";
  return {
    status: "stored" as const,
    aggregator,
    artifacts: [
      {
        kind: "media",
        name: "original-media",
        blobId: mediaBlob.blobId,
        digest: mediaBlob.digest,
        size: mediaBlob.size,
        source: mediaBlob.source,
        url: `${aggregator.replace(/\/$/, "")}/v1/blobs/${encodeURIComponent(mediaBlob.blobId)}`,
      },
      {
        kind: "audit-report",
        name: "aase-report.json",
        blobId: reportBlob.blobId,
        digest: reportBlob.digest,
        size: reportBlob.size,
        source: reportBlob.source,
        url: `${aggregator.replace(/\/$/, "")}/v1/blobs/${encodeURIComponent(reportBlob.blobId)}`,
      },
    ],
  };
}

async function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      promise,
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => reject(new Error(`Walrus archive timed out after ${timeoutMs}ms`)), timeoutMs);
      }),
    ]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

// POST /api/vault/upload
app.post("/api/vault/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ success: false, error: "No file uploaded under form key 'file'" });
      return;
    }

    let walrus = getWalrusClient();
    if (!walrus) {
      console.log("[Server] WALRUS_PUBLISHER is not configured. Falling back to InMemoryWalrusClient.");
      if (!app.get("mockWalrus")) {
        app.set("mockWalrus", new InMemoryWalrusClient());
      }
      walrus = app.get("mockWalrus");
    }

    const fileBuffer = new Uint8Array(req.file.buffer);
    const stored = await walrus!.storeBlob(fileBuffer);

    res.json({
      success: true,
      blobId: stored.blobId,
      digest: stored.digest,
      size: stored.size,
      storedAt: stored.storedAt,
      source: stored.source,
    });
  } catch (error: any) {
    console.error("[Server] Vault upload failed:", error);
    res.status(500).json({ success: false, error: error.message || String(error) });
  }
});

// GET /api/vault/download/:blobId
app.get("/api/vault/download/:blobId", async (req, res) => {
  try {
    const { blobId } = req.params;
    let walrus = getWalrusClient();
    if (!walrus) {
      if (!app.get("mockWalrus")) {
        app.set("mockWalrus", new InMemoryWalrusClient());
      }
      walrus = app.get("mockWalrus");
    }

    const data = await walrus!.readBlob(blobId);
    if (!data) {
      res.status(404).json({ success: false, error: "Blob not found" });
      return;
    }

    res.setHeader("Content-Type", "application/octet-stream");
    res.send(Buffer.from(data));
  } catch (error: any) {
    console.error("[Server] Vault download failed:", error);
    res.status(500).json({ success: false, error: error.message || String(error) });
  }
});

// ==========================================
// 🛡️ zkLogin & Sponsored Transactions (Pure Web2.5)
// ==========================================

function getSponsorKeypair(): Ed25519Keypair | undefined {
  const secret = process.env.SUI_SPONSOR_SECRET_KEY || process.env.SPONSOR_SECRET;
  if (!secret) return undefined;
  try {
    return Ed25519Keypair.fromSecretKey(Buffer.from(secret, "hex"));
  } catch (e) {
    console.error("[Server] Invalid Sponsor Secret Key:", e);
    return undefined;
  }
}

function decodeJwtPayload(jwt: string): Record<string, any> {
  const payload = jwt.split(".")[1];
  if (!payload) throw new Error("Invalid JWT: missing payload");
  return JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
}

// GET /api/auth/callback/google
app.get("/api/auth/callback/google", (req, res) => {
  res.sendFile(path.join(webDistPath, "index.html"));
});

// GET /login-callback
app.get("/login-callback", (req, res) => {
  res.sendFile(path.join(webDistPath, "index.html"));
});

// GET /api/auth/config
app.get("/api/auth/config", async (req, res) => {
  if (authConfigCache && authConfigCache.expiresAt > Date.now()) {
    res.json(authConfigCache.value);
    return;
  }

  const rpcUrl = process.env.SUI_RPC_URL || "https://fullnode.testnet.sui.io:443";
  const network = (process.env.SUI_NETWORK || "testnet") as any;
  const suiClient = new SuiJsonRpcClient({ url: rpcUrl, network });
  let epoch = 100;
  try {
    const systemState = await suiClient.getLatestSuiSystemState();
    epoch = Number(systemState.epoch);
  } catch (e) {
    console.warn("[Server] Failed to fetch current epoch from RPC:", e);
  }

  const value = {
    googleClientId: process.env.AUTH_GOOGLE_ID || "",
    packageId: process.env.CONTENT_RIGHT_PACKAGE_ID || process.env.SUI_PACKAGE_ID || "",
    epoch,
    zkLoginSaltStrategy: describeZkLoginSaltStrategy(),
  };
  authConfigCache = { value, expiresAt: Date.now() + AUTH_CONFIG_CACHE_MS };
  res.json(value);
});

// POST /api/auth/zklogin
app.post("/api/auth/zklogin", async (req, res) => {
  try {
    const { jwt, ephemeralPublicKeyB64, maxEpoch, randomness } = req.body;
    if (!jwt || !ephemeralPublicKeyB64) {
      res.status(400).json({ success: false, error: "Missing jwt or ephemeralPublicKeyB64" });
      return;
    }
    if (!Number.isSafeInteger(Number(maxEpoch)) || Number(maxEpoch) <= 0 || !randomness) {
      res.status(400).json({ success: false, error: "Missing or invalid maxEpoch/randomness" });
      return;
    }

    let decodedJwt: Record<string, any>;
    try {
      decodedJwt = decodeJwtPayload(jwt);
    } catch {
      res.status(400).json({ success: false, error: "Invalid JWT payload" });
      return;
    }
    if (!decodedJwt.sub || !decodedJwt.aud || !decodedJwt.iss) {
      res.status(400).json({ success: false, error: "JWT is missing required zkLogin claims" });
      return;
    }

    let saltResult: ReturnType<typeof getZkLoginSaltForClaims>;
    try {
      saltResult = getZkLoginSaltForClaims(decodedJwt);
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message || String(error) });
      return;
    }

    const proverUrl = process.env.ZKLOGIN_PROVER_URL || "https://prover-dev.zklogin.sui.io/v1";
    const { jwtToAddress, genAddressSeed } = await import("@mysten/sui/zklogin");

    let response: Response;
    try {
      response = await fetch(proverUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(Number(process.env.ZKLOGIN_PROVER_TIMEOUT_MS || 15_000)),
        body: JSON.stringify({
          jwt,
          extendedEphemeralPublicKey: ephemeralPublicKeyB64,
          maxEpoch: Number(maxEpoch),
          jwtRandomness: randomness,
          salt: saltResult.salt,
          keyClaimName: "sub",
        }),
      });
    } catch (error: any) {
      res.status(502).json({
        success: false,
        error: "zkLogin prover is unreachable",
        detail: error.message || String(error),
      });
      return;
    }

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      res.status(502).json({
        success: false,
        error: `zkLogin prover failed: ${response.status} ${response.statusText}`,
        detail: text.slice(0, 500),
      });
      return;
    }

    const proverPayload = await response.json();
    const zkProof = proverPayload.zkProof ?? proverPayload;
    if (!zkProof?.proofPoints || !zkProof?.issBase64Details || !zkProof?.headerBase64) {
      res.status(502).json({
        success: false,
        error: "zkLogin prover response is missing required proof inputs",
      });
      return;
    }
    const zkAddress = jwtToAddress(jwt, saltResult.salt, false);
    const addressSeed = genAddressSeed(saltResult.salt, "sub", decodedJwt.sub, saltResult.audience).toString();

    rememberZkLoginReceipt({
      address: zkAddress,
      claims: {
        iss: decodedJwt.iss,
        aud: saltResult.audience,
        sub: decodedJwt.sub,
      },
      maxEpoch: Number(maxEpoch),
      saltStrategy: saltResult.strategy,
      proverUrl,
    }).catch((error: any) => console.warn("[Server] Failed to persist zkLogin receipt:", error.message || String(error)));

    res.json({
      success: true,
      address: zkAddress,
      proof: zkProof,
      addressSeed,
      issuer: decodedJwt.iss,
      saltStrategy: saltResult.strategy,
    });
  } catch (error: any) {
    console.error("[Server] zkLogin setup failed:", error);
    res.status(500).json({ success: false, error: error.message || String(error) });
  }
});

async function rememberZkLoginReceipt(input: {
  address: string;
  claims: { iss: string; aud: string; sub: string };
  maxEpoch: number;
  saltStrategy: "static-env" | "hkdf-master-seed";
  proverUrl: string;
}) {
  const config = await loadMemWalConfig();
  const memory = getAuthenticityMemoryClient(config);
  const receipt = buildZkLoginMemoryReceipt(input);
  await memory.remember("zklogin-auth-receipts", `${input.address}:${receipt.createdAt}`, receipt);
}

// POST /api/gas/build-mint
app.post("/api/gas/build-mint", async (req, res) => {
  try {
    const { sender, recipient, contentHash, grade, mediaBlobId, evidenceBlobId } = req.body;
    if (!sender || !recipient || !contentHash || !grade || !mediaBlobId || !evidenceBlobId) {
      res.status(400).json({ success: false, error: "Missing required fields in request body" });
      return;
    }

    const sponsorKeypair = getSponsorKeypair();
    const config = getContentRightConfig();
    const packageId = config.packageId;

    if (!packageId) {
      res.status(500).json({ success: false, error: "CONTENT_RIGHT_PACKAGE_ID is not configured on the server" });
      return;
    }

    const tx = buildIssueGenesisPassportTx({
      packageId,
      recipient,
      contentHash,
      grade,
      mediaBlobId,
      evidenceBlobId,
    });

    tx.setSender(sender);

    if (!sponsorKeypair) {
      console.log("[Server] SUI_SPONSOR_SECRET_KEY not set. Operating in MOCK SPONSOR MODE.");
      res.json({
        success: true,
        mockMode: true,
        txBytesB64: Buffer.from("MOCK_TX_BYTES_DUMMY").toString("base64"),
      });
      return;
    }

    const sponsorAddress = sponsorKeypair.toSuiAddress();
    tx.setGasOwner(sponsorAddress);

    const rpcUrl = process.env.SUI_RPC_URL || "https://fullnode.testnet.sui.io:443";
    const network = (process.env.SUI_NETWORK || "testnet") as any;
    const suiClient = new SuiJsonRpcClient({ url: rpcUrl, network });

    // Build the transaction
    const txBytes = await tx.build({ client: suiClient as any });

    res.json({
      success: true,
      mockMode: false,
      txBytesB64: Buffer.from(txBytes).toString("base64"),
    });
  } catch (error: any) {
    console.error("[Server] Build mint transaction failed:", error);
    res.status(500).json({ success: false, error: error.message || String(error) });
  }
});

// POST /api/gas/sponsor
app.post("/api/gas/sponsor", async (req, res) => {
  try {
    const { txBytesB64, userSignature } = req.body;
    if (!txBytesB64) {
      res.status(400).json({ success: false, error: "Missing txBytesB64" });
      return;
    }

    const txBytes = Buffer.from(txBytesB64, "base64");
    const sponsorKeypair = getSponsorKeypair();

    if (!sponsorKeypair) {
      console.log("[Server] SUI_SPONSOR_SECRET_KEY not set. Operating in MOCK SPONSOR MODE.");
      res.json({
        success: true,
        mockMode: true,
        digest: "E2E_MOCK_SPONSOR_TX_DIGEST_" + Math.random().toString(36).substring(7).toUpperCase(),
        message: "Simulated Sponsor Sign & Broadcast SUCCESS."
      });
      return;
    }

    const rpcUrl = process.env.SUI_RPC_URL || "https://fullnode.testnet.sui.io:443";
    const network = (process.env.SUI_NETWORK || "testnet") as any;
    const suiClient = new SuiJsonRpcClient({ url: rpcUrl, network });

    const sponsorSignResult = await sponsorKeypair.signTransaction(txBytes);
    const combinedSignatures = [userSignature];
    if (sponsorSignResult.signature) {
      combinedSignatures.push(sponsorSignResult.signature);
    }

    console.log("[Server] Broadcasting sponsored transaction...");
    const executionResult = await suiClient.executeTransactionBlock({
      transactionBlock: txBytes,
      signature: combinedSignatures,
      options: {
        showRawEffects: true,
        showObjectChanges: true,
      }
    });

    res.json({
      success: true,
      mockMode: false,
      digest: executionResult.digest,
      effects: executionResult.effects,
      objectChanges: executionResult.objectChanges,
    });
  } catch (error: any) {
    console.error("[Server] Sponsor execute failed:", error);
    res.status(500).json({ success: false, error: error.message || String(error) });
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
