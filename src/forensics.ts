import crypto from "node:crypto";
import sharp from "sharp";

export interface PerceptualHashResult {
  algorithm: "DCT-pHash-64";
  hash: string;
  nearest?: {
    filename: string;
    hash: string;
    distance: number;
    similarity: number;
    seenAt: string;
  };
  duplicateRisk: "low" | "medium" | "high";
  evidence: string[];
}

export interface FrequencyArtifactResult {
  algorithm: "DCT-frequency-ratio-v1";
  highFrequencyRatio: number;
  gridAnisotropy: number;
  syntheticArtifactScore: number;
  evidence: string[];
}

export interface ObjectiveForensicsResult {
  sha256: string;
  perceptualHash: PerceptualHashResult;
  frequency: FrequencyArtifactResult;
  methodology: string[];
}

interface CorpusEntry {
  filename: string;
  hash: string;
  seenAt: string;
}

const corpus: CorpusEntry[] = [];

export async function objectiveForensics(media: Uint8Array, filename: string): Promise<ObjectiveForensicsResult> {
  const sha256 = crypto.createHash("sha256").update(media).digest("hex");
  const pixels = await loadGrayscale(media, 32);
  const dct = dct2d(pixels, 32);
  const hash = pHashFromDct(dct, 32);
  const nearest = nearestHash(hash);
  const distance = nearest?.distance ?? 64;
  const similarity = nearest ? nearest.similarity : 0;
  const duplicateRisk = distance <= 8 ? "high" : distance <= 16 ? "medium" : "low";
  const frequency = frequencyArtifacts(dct, 32);

  corpus.push({ filename, hash, seenAt: new Date().toISOString() });
  if (corpus.length > 200) corpus.shift();

  return {
    sha256,
    perceptualHash: {
      algorithm: "DCT-pHash-64",
      hash,
      nearest: nearest && {
        filename: nearest.filename,
        hash: nearest.hash,
        distance,
        similarity,
        seenAt: nearest.seenAt,
      },
      duplicateRisk,
      evidence: [
        `DCT pHash Hamming distance ${nearest ? distance : "N/A"} against ${Math.max(corpus.length - 1, 0)} prior issued artifacts`,
        `Duplicate risk ${duplicateRisk}${nearest ? `; nearest=${nearest.filename} similarity=${Math.round(similarity * 100)}%` : ""}`,
      ],
    },
    frequency,
    methodology: [
      "pHash follows the perceptual-hashing family: resize, grayscale, DCT, median-threshold low-frequency coefficients, then compare Hamming distance.",
      "Frequency artifacts use DCT high-frequency energy ratio and grid anisotropy as transparent synthetic/compression indicators.",
      "These signals are objective features, not standalone truth claims; AASE combines them with EXIF, ELA, C2PA, and MemWal evidence.",
    ],
  };
}

async function loadGrayscale(media: Uint8Array, size: number): Promise<number[]> {
  const { data } = await sharp(Buffer.from(media))
    .resize(size, size, { fit: "fill" })
    .grayscale()
    .raw()
    .toBuffer({ resolveWithObject: true });
  return Array.from(data, (value) => value / 255);
}

function pHashFromDct(dct: number[], size: number): string {
  const coeffs: number[] = [];
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      if (x === 0 && y === 0) continue;
      coeffs.push(dct[y * size + x]!);
    }
  }
  const median = [...coeffs].sort((a, b) => a - b)[Math.floor(coeffs.length / 2)] ?? 0;
  const bits = coeffs.map((value) => (value > median ? "1" : "0")).join("").padEnd(64, "0").slice(0, 64);
  let hex = "";
  for (let i = 0; i < bits.length; i += 4) {
    hex += Number.parseInt(bits.slice(i, i + 4), 2).toString(16);
  }
  return hex;
}

function nearestHash(hash: string): (CorpusEntry & { distance: number; similarity: number }) | undefined {
  let best: (CorpusEntry & { distance: number; similarity: number }) | undefined;
  for (const entry of corpus) {
    const distance = hammingHex(hash, entry.hash);
    if (!best || distance < best.distance) {
      best = { ...entry, distance, similarity: 1 - distance / 64 };
    }
  }
  return best;
}

function frequencyArtifacts(dct: number[], size: number): FrequencyArtifactResult {
  let total = 0;
  let high = 0;
  let horizontal = 0;
  let vertical = 0;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (x === 0 && y === 0) continue;
      const energy = Math.abs(dct[y * size + x]!);
      total += energy;
      if (x + y >= size * 0.85) high += energy;
      if (y > size * 0.75 && x < size * 0.25) horizontal += energy;
      if (x > size * 0.75 && y < size * 0.25) vertical += energy;
    }
  }

  const highFrequencyRatio = total > 0 ? high / total : 0;
  const gridAnisotropy = Math.abs(horizontal - vertical) / Math.max(horizontal + vertical, 1e-9);
  const syntheticArtifactScore = clamp(Math.round((highFrequencyRatio * 1.7 + gridAnisotropy * 0.35) * 100), 0, 100);

  return {
    algorithm: "DCT-frequency-ratio-v1",
    highFrequencyRatio: round4(highFrequencyRatio),
    gridAnisotropy: round4(gridAnisotropy),
    syntheticArtifactScore,
    evidence: [
      `High-frequency DCT energy ratio ${round4(highFrequencyRatio)}`,
      `Directional grid anisotropy ${round4(gridAnisotropy)}`,
      `Synthetic artifact score ${syntheticArtifactScore}/100`,
    ],
  };
}

function dct2d(values: number[], size: number): number[] {
  const out = new Array<number>(size * size).fill(0);
  const factor = Math.PI / (2 * size);
  for (let v = 0; v < size; v++) {
    for (let u = 0; u < size; u++) {
      let sum = 0;
      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          sum += values[y * size + x]! * Math.cos((2 * x + 1) * u * factor) * Math.cos((2 * y + 1) * v * factor);
        }
      }
      const cu = u === 0 ? Math.SQRT1_2 : 1;
      const cv = v === 0 ? Math.SQRT1_2 : 1;
      out[v * size + u] = (2 / size) * cu * cv * sum;
    }
  }
  return out;
}

function hammingHex(a: string, b: string): number {
  const length = Math.min(a.length, b.length);
  let distance = Math.abs(a.length - b.length) * 4;
  for (let i = 0; i < length; i++) {
    distance += bitCount(Number.parseInt(a[i]!, 16) ^ Number.parseInt(b[i]!, 16));
  }
  return distance;
}

function bitCount(value: number): number {
  let count = 0;
  while (value) {
    value &= value - 1;
    count++;
  }
  return count;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function round4(value: number): number {
  return Math.round(value * 10_000) / 10_000;
}
