import { describe, it, expect } from "vitest";
import sharp from "sharp";
import { forensicAgent, metadataAgent, analyzeImage, analyzeImageWithMemWal } from "../src/agents.js";

async function cleanImage(): Promise<Uint8Array> {
  // Smooth gradient — compresses cleanly (low ELA residual).
  const w = 256, h = 256;
  const raw = Buffer.alloc(w * h * 3);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 3;
      raw[i] = x; raw[i + 1] = y; raw[i + 2] = 128;
    }
  }
  return new Uint8Array(await sharp(raw, { raw: { width: w, height: h, channels: 3 } }).png().toBuffer());
}

async function noisyImage(): Promise<Uint8Array> {
  const w = 256, h = 256;
  const raw = Buffer.alloc(w * h * 3);
  for (let i = 0; i < raw.length; i++) raw[i] = Math.floor(Math.random() * 256);
  return new Uint8Array(await sharp(raw, { raw: { width: w, height: h, channels: 3 } }).png().toBuffer());
}

describe("forensicAgent (ELA)", () => {
  it("returns a bounded integer score with evidence", async () => {
    const r = await forensicAgent(await cleanImage());
    expect(r.agentId).toBe("forensic-agent");
    expect(Number.isInteger(r.score)).toBe(true);
    expect(r.score).toBeGreaterThanOrEqual(0);
    expect(r.score).toBeLessThanOrEqual(100);
    expect(r.evidence?.[0]).toMatch(/ELA/);
  });

  it("scores a clean gradient higher than pure noise", async () => {
    const clean = await forensicAgent(await cleanImage());
    const noisy = await forensicAgent(await noisyImage());
    expect(clean.score).toBeGreaterThan(noisy.score);
  });
});

describe("metadataAgent (EXIF)", () => {
  it("flags missing EXIF without crashing", async () => {
    const r = await metadataAgent(await cleanImage());
    expect(r.agentId).toBe("metadata-agent");
    expect(r.score).toBeGreaterThanOrEqual(0);
    expect(r.score).toBeLessThanOrEqual(100);
  });
});

describe("analyzeImage", () => {
  it("produces all four AASE agent signals", async () => {
    const scores = await analyzeImage(await cleanImage());
    expect(scores.map((s) => s.agentId).sort()).toEqual(
      ["ai-detection-agent", "forensic-agent", "memory-bonus", "metadata-agent"],
    );
  });

  it("writes local and AI clues into the MemWal inspector snapshot", async () => {
    const audit = await analyzeImageWithMemWal(await cleanImage());
    expect(audit.clueIds).toHaveLength(3);
    expect(audit.inspector.clues.map((clue) => clue.agentId)).toContain("ai-detection-agent");
    expect(audit.inspector.reputation["forensic-agent"].clueCount).toBe(1);
  });
});
