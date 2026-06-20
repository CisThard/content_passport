import { Transaction } from "@mysten/sui/transactions";
import { RoyaltyParticipant } from "./types.js";
import { assertValidParticipants } from "./escrow.js";

export interface ContentRightConfig {
  packageId: string;
}

export function getContentRightConfig(env: NodeJS.ProcessEnv = process.env): ContentRightConfig {
  const packageId = env.CONTENT_RIGHT_PACKAGE_ID || env.SUI_PACKAGE_ID || "";
  return { packageId };
}

export function buildCreatePolicyTx(params: {
  packageId: string;
  passportId: string;
  participants: RoyaltyParticipant[];
}): Transaction {
  assertValidParticipants(params.participants);
  assertPackage(params.packageId);
  assertObjectId(params.passportId, "passportId");

  const tx = new Transaction();
  tx.moveCall({
    target: `${params.packageId}::co_creation_policy::create_policy`,
    arguments: [
      tx.pure.address(params.passportId),
      tx.pure.vector("address", params.participants.map((p) => p.address.trim())),
      tx.pure.vector("u8", params.participants.map((p) => p.weight)),
    ],
  });
  return tx;
}

export function buildCreateAndFundPolicyTx(params: {
  packageId: string;
  passportId: string;
  participants: RoyaltyParticipant[];
  coinId?: string;
  amountMist?: bigint;
}): Transaction {
  assertValidParticipants(params.participants);
  assertPackage(params.packageId);
  assertObjectId(params.passportId, "passportId");

  if (!params.coinId && (!params.amountMist || params.amountMist <= 0n)) {
    throw new Error("Either coinId or a positive amountMist is required.");
  }

  const tx = new Transaction();
  const payment = params.coinId
    ? tx.object(params.coinId)
    : tx.splitCoins(tx.gas, [tx.pure.u64(params.amountMist!.toString())])[0]!;

  tx.moveCall({
    target: `${params.packageId}::co_creation_policy::create_and_fund_policy`,
    arguments: [
      tx.pure.address(params.passportId),
      tx.pure.vector("address", params.participants.map((p) => p.address.trim())),
      tx.pure.vector("u8", params.participants.map((p) => p.weight)),
      payment,
    ],
  });
  return tx;
}

export function buildCreateStampBookTx(params: {
  packageId: string;
  passportId: string;
  originCreator: string;
  originWeight: number;
}): Transaction {
  assertPackage(params.packageId);
  assertObjectId(params.passportId, "passportId");
  assertAddress(params.originCreator, "originCreator");
  assertWeight(params.originWeight, "originWeight");

  const tx = new Transaction();
  tx.moveCall({
    target: `${params.packageId}::co_creation_policy::create_stamp_book`,
    arguments: [
      tx.pure.address(params.passportId),
      tx.pure.address(params.originCreator),
      tx.pure.u8(params.originWeight),
    ],
  });
  return tx;
}

export function buildStampVisaTx(params: {
  packageId: string;
  policyId: string;
  creator: string;
  weight: number;
}): Transaction {
  assertPackage(params.packageId);
  assertObjectId(params.policyId, "policyId");
  assertAddress(params.creator, "creator");
  assertWeight(params.weight, "weight");

  const tx = new Transaction();
  tx.moveCall({
    target: `${params.packageId}::co_creation_policy::stamp_visa`,
    arguments: [
      tx.object(params.policyId),
      tx.pure.address(params.creator),
      tx.pure.u8(params.weight),
    ],
  });
  return tx;
}

export function buildIssueGenesisPassportTx(params: {
  packageId: string;
  recipient: string;
  contentHash: string;
  grade: string;
  mediaBlobId: string;
  evidenceBlobId: string;
}): Transaction {
  assertPackage(params.packageId);
  assertAddress(params.recipient, "recipient");
  const tx = new Transaction();
  const passport = tx.moveCall({
    target: `${params.packageId}::genesis_passport::issue_passport`,
    arguments: [
      tx.pure.vector("u8", bytes(params.contentHash)),
      tx.pure.vector("u8", bytes(params.grade)),
      tx.pure.vector("u8", bytes(params.mediaBlobId)),
      tx.pure.vector("u8", bytes(params.evidenceBlobId)),
    ],
  });
  tx.transferObjects([passport], tx.pure.address(params.recipient));
  return tx;
}

export function buildCreateSealPolicyTx(params: {
  packageId: string;
  evidenceBlobId: string;
  authorizedCreators: string[];
  threshold: number;
  keyNodes: string[];
}): Transaction {
  assertPackage(params.packageId);
  if (params.authorizedCreators.length === 0) throw new Error("At least one authorized creator is required.");
  if (params.keyNodes.length === 0) throw new Error("At least one SEAL key node is required.");
  assertWeight(params.threshold, "threshold");

  const tx = new Transaction();
  tx.moveCall({
    target: `${params.packageId}::seal_policy::create_policy`,
    arguments: [
      tx.pure.vector("u8", bytes(params.evidenceBlobId)),
      tx.pure.vector("address", params.authorizedCreators),
      tx.pure.u8(params.threshold),
      tx.pure.vector("address", params.keyNodes),
    ],
  });
  return tx;
}

export function buildSealApproveTx(params: {
  packageId: string;
  policyId: string;
  sessionPublicKey: string;
  ttlMs: number;
}): Transaction {
  assertPackage(params.packageId);
  assertObjectId(params.policyId, "policyId");
  if (!Number.isSafeInteger(params.ttlMs) || params.ttlMs <= 0) {
    throw new Error("ttlMs must be a positive safe integer.");
  }

  const tx = new Transaction();
  tx.moveCall({
    target: `${params.packageId}::seal_policy::seal_approve`,
    arguments: [
      tx.object(params.policyId),
      tx.object("0x6"),
      tx.pure.vector("u8", bytes(params.sessionPublicKey)),
      tx.pure.u64(params.ttlMs),
    ],
  });
  return tx;
}

export function buildFundPolicyTx(params: {
  packageId: string;
  policyId: string;
  coinId: string;
}): Transaction {
  assertPackage(params.packageId);
  assertObjectId(params.policyId, "policyId");
  assertObjectId(params.coinId, "coinId");

  const tx = new Transaction();
  tx.moveCall({
    target: `${params.packageId}::co_creation_policy::fund_co_creation`,
    arguments: [tx.object(params.policyId), tx.object(params.coinId)],
  });
  return tx;
}

export function buildDistributeRoyaltiesTx(params: {
  packageId: string;
  policyId: string;
}): Transaction {
  assertPackage(params.packageId);
  assertObjectId(params.policyId, "policyId");

  const tx = new Transaction();
  tx.moveCall({
    target: `${params.packageId}::co_creation_policy::distribute_royalties`,
    arguments: [tx.object(params.policyId), tx.object("0x6")],
  });
  return tx;
}

function assertPackage(packageId: string): void {
  if (!packageId.trim()) throw new Error("Sui package ID is required.");
}

function assertObjectId(value: string, name: string): void {
  if (!value.trim()) throw new Error(`${name} is required.`);
}

function assertAddress(value: string, name: string): void {
  if (!value.trim()) throw new Error(`${name} is required.`);
}

function assertWeight(value: number, name: string): void {
  if (!Number.isInteger(value) || value <= 0 || value > 100) {
    throw new Error(`${name} must be a positive integer up to 100.`);
  }
}

function bytes(value: string): number[] {
  if (!value.trim()) throw new Error("Byte string value is required.");
  return Array.from(Buffer.from(value, "utf8"));
}
