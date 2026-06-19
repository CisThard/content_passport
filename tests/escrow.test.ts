import { assertValidParticipants, calculateRoyaltyPayouts } from "../src/escrow.js";

describe("escrow payout rules", () => {
  it("requires weights to sum to exactly 100", () => {
    expect(() => assertValidParticipants([
      { address: "0xa", weight: 60 },
      { address: "0xb", weight: 30 },
    ])).toThrow("exactly 100");
  });

  it("sends division dust to the final participant", () => {
    const payouts = calculateRoyaltyPayouts(101n, [
      { address: "0xa", weight: 33 },
      { address: "0xb", weight: 33 },
      { address: "0xc", weight: 34 },
    ]);

    expect(payouts.map((p) => p.amountMist)).toEqual([33n, 33n, 35n]);
    expect(payouts.reduce((sum, p) => sum + p.amountMist, 0n)).toBe(101n);
  });
});
