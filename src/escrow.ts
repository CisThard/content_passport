import { RoyaltyParticipant, RoyaltyPayout } from "./types.js";

export function assertValidParticipants(participants: RoyaltyParticipant[]): void {
  if (participants.length === 0) {
    throw new Error("At least one royalty participant is required.");
  }

  const seen = new Set<string>();
  let sum = 0;

  for (const participant of participants) {
    const address = participant.address.trim();
    if (!address) throw new Error("Participant address is required.");
    if (seen.has(address)) throw new Error(`Duplicate participant address: ${address}`);
    if (!Number.isInteger(participant.weight) || participant.weight <= 0) {
      throw new Error(`Invalid weight for ${address}. Weight must be a positive integer.`);
    }
    seen.add(address);
    sum += participant.weight;
  }

  if (sum !== 100) {
    throw new Error(`Royalty weights must sum to exactly 100. Received ${sum}.`);
  }
}

export function calculateRoyaltyPayouts(
  totalAmountMist: bigint,
  participants: RoyaltyParticipant[],
): RoyaltyPayout[] {
  assertValidParticipants(participants);
  if (totalAmountMist <= 0n) throw new Error("Escrow amount must be positive.");

  let remaining = totalAmountMist;
  return participants.map((participant, index) => {
    const isLast = index === participants.length - 1;
    const amount = isLast ? remaining : (totalAmountMist * BigInt(participant.weight)) / 100n;
    remaining -= amount;
    return {
      address: participant.address.trim(),
      amountMist: amount,
      weight: participant.weight,
    };
  });
}
