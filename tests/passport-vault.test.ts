import {
  assertSealCanDecrypt,
  buildMemWalInspectorSnapshot,
  decryptProofOfEffort,
  InMemoryAuthenticityMemoryClient,
  InMemoryWalrusClient,
  issueGenesisPassport,
  sha256,
  stampVisa,
  writeAgentClue,
} from "../src/index.js";

const authenticScores = [
  { agentId: "forensic-agent" as const, score: 96, confidence: 0.95 },
  { agentId: "metadata-agent" as const, score: 95, confidence: 0.9 },
  { agentId: "ai-detection-agent" as const, score: 97, confidence: 0.92 },
  { agentId: "memory-bonus" as const, score: 100, confidence: 0.8 },
];

describe("Genesis Passport, Sovereign Vault, and MemWal board", () => {
  it("issues a passport, seals PoE on Walrus, and stamps visas with remaining share", async () => {
    const walrus = new InMemoryWalrusClient();
    const media = Buffer.from("original-media");
    const contentHash = sha256(media);

    const issuance = await issueGenesisPassport({
      media,
      walrus,
      agentScores: authenticScores,
      now: new Date("2026-06-19T00:00:00.000Z"),
      originStamp: {
        creatorAddress: "0xorigin",
        countryCode: "ORIGIN",
        share: 30,
      },
      proofOfEffort: {
        title: "Origin Sketch",
        creatorAddress: "0xorigin",
        mediaHash: contentHash,
        createdAt: "2026-06-19T00:00:00.000Z",
        artifacts: [
          {
            name: "sketch.txt",
            mimeType: "text/plain",
            bytes: Buffer.from("layer sketch"),
          },
        ],
      },
    });

    expect(issuance.passport.grade).toBe("AAA");
    expect(issuance.passport.remainingShare).toBe(70);
    expect(await walrus.readBlob(issuance.passport.evidenceBlobId)).toBeDefined();
    assertSealCanDecrypt(
      issuance.sealedEvidence,
      issuance.sealedEvidence.shares.slice(0, 3),
      new Date("2026-06-19T00:05:00.000Z"),
    );
    const unsealed = decryptProofOfEffort(
      issuance.sealedEvidence,
      issuance.sealedEvidence.shares.slice(1, 4),
      new Date("2026-06-19T00:05:00.000Z"),
    );
    expect(unsealed.title).toBe("Origin Sketch");
    expect(Buffer.from(unsealed.artifacts[0]!.bytes).toString("utf8")).toBe("layer sketch");

    const countryBPassport = stampVisa(
      issuance.passport,
      { creatorAddress: "0xcountry_b", countryCode: "B", share: 20 },
      new Date("2026-06-19T00:10:00.000Z"),
    );

    expect(countryBPassport.visaStamps.map((stamp) => stamp.share)).toEqual([30, 20]);
    expect(countryBPassport.remainingShare).toBe(50);
  });

  it("builds a MemWal inspector snapshot from agent clues", async () => {
    const memory = new InMemoryAuthenticityMemoryClient();
    const forensic = await writeAgentClue(memory, {
      id: "clue-forensic",
      agentId: "forensic-agent",
      severity: "critical",
      message: "ELA AvgDiff 0.72 indicates local retouching.",
      scoreImpact: -35,
      createdAt: "2026-06-19T00:00:00.000Z",
    });
    const metadata = await writeAgentClue(memory, {
      id: "clue-metadata",
      agentId: "metadata-agent",
      severity: "warning",
      message: "EXIF timestamp mismatch exceeds one minute.",
      scoreImpact: -22,
      createdAt: "2026-06-19T00:00:01.000Z",
    });

    const snapshot = await buildMemWalInspectorSnapshot(memory, [metadata.id, forensic.id]);

    expect(snapshot.clues.map((clue) => clue.id)).toEqual(["clue-forensic", "clue-metadata"]);
    expect(snapshot.reputation["forensic-agent"].criticalCount).toBe(1);
    expect(snapshot.reputation["metadata-agent"].totalImpact).toBe(-22);
  });

  it("enforces SEAL threshold and session TTL", async () => {
    const walrus = new InMemoryWalrusClient();
    const issuance = await issueGenesisPassport({
      media: Buffer.from("media"),
      walrus,
      agentScores: authenticScores,
      now: new Date("2026-06-19T00:00:00.000Z"),
      originStamp: { creatorAddress: "0xorigin", countryCode: "ORIGIN", share: 30 },
      proofOfEffort: {
        title: "PoE",
        creatorAddress: "0xorigin",
        mediaHash: sha256("media"),
        createdAt: "2026-06-19T00:00:00.000Z",
        artifacts: [],
      },
    });

    expect(() => assertSealCanDecrypt(issuance.sealedEvidence, issuance.sealedEvidence.shares.slice(0, 2))).toThrow(
      "At least 3 SEAL key shares are required.",
    );
    expect(() =>
      assertSealCanDecrypt(
        issuance.sealedEvidence,
        issuance.sealedEvidence.shares.slice(0, 3),
        new Date("2026-06-19T00:11:00.000Z"),
      ),
    ).toThrow("SEAL session key expired.");
  });
});
