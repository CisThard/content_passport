import {
  buildCreateAndFundPolicyTx,
  buildCreateSealPolicyTx,
  buildCreateStampBookTx,
  buildIssueGenesisPassportTx,
  buildSealApproveTx,
  buildStampVisaTx,
} from "../src/index.js";

describe("Sui PTB builders", () => {
  it("builds atomic create-and-fund policy transaction from gas", () => {
    const tx = buildCreateAndFundPolicyTx({
      packageId: "0x2",
      passportId: "0x123",
      amountMist: 1_000_000_000n,
      participants: [
        { address: "0x456", weight: 60 },
        { address: "0x789", weight: 40 },
      ],
    });

    expect(tx).toBeDefined();
  });

  it("requires a funding source for atomic create-and-fund", () => {
    expect(() =>
      buildCreateAndFundPolicyTx({
        packageId: "0x2",
        passportId: "0x123",
        participants: [
          { address: "0x456", weight: 60 },
          { address: "0x789", weight: 40 },
        ],
      }),
    ).toThrow("Either coinId or a positive amountMist is required.");
  });

  it("builds passport, visa stamp, and SEAL policy transactions", () => {
    expect(
      buildIssueGenesisPassportTx({
        packageId: "0x2",
        recipient: "0x456",
        contentHash: "abc",
        grade: "AAA",
        mediaBlobId: "walrus://media",
        evidenceBlobId: "walrus://evidence",
      }),
    ).toBeDefined();
    expect(
      buildCreateStampBookTx({
        packageId: "0x2",
        passportId: "0x123",
        originCreator: "0x456",
        originWeight: 30,
      }),
    ).toBeDefined();
    expect(
      buildStampVisaTx({
        packageId: "0x2",
        policyId: "0x123",
        creator: "0x789",
        weight: 20,
      }),
    ).toBeDefined();
    expect(
      buildCreateSealPolicyTx({
        packageId: "0x2",
        evidenceBlobId: "walrus://evidence",
        authorizedCreators: ["0x456", "0x789"],
        threshold: 3,
        keyNodes: ["0x1", "0x2", "0x3", "0x4", "0x5"],
      }),
    ).toBeDefined();
    expect(
      buildSealApproveTx({
        packageId: "0x2",
        policyId: "0x123",
        sessionPublicKey: "session-key",
        ttlMs: 600_000,
      }),
    ).toBeDefined();
  });
});
