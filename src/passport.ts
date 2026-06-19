import { calculateAASE, gradeMeets } from "./aase.js";
import { sealProofOfEffort } from "./evidence.js";
import { WalrusClient } from "./walrus.js";
import {
  AASEGrade,
  AgentScore,
  GenesisPassport,
  ProofOfEffort,
  SealedProofOfEffort,
  VisaStamp,
  WalrusStoredBlob,
} from "./types.js";

export interface IssueGenesisPassportInput {
  media: Uint8Array;
  proofOfEffort: ProofOfEffort;
  agentScores: AgentScore[];
  walrus: WalrusClient;
  minimumGrade?: AASEGrade;
  originStamp: Omit<VisaStamp, "stampedAt">;
  now?: Date;
}

export interface GenesisPassportIssuance {
  passport: GenesisPassport;
  mediaBlob: WalrusStoredBlob;
  evidenceBlob: WalrusStoredBlob;
  sealedEvidence: SealedProofOfEffort;
}

export async function issueGenesisPassport(
  input: IssueGenesisPassportInput,
): Promise<GenesisPassportIssuance> {
  const minimumGrade = input.minimumGrade ?? "A";
  const assessment = calculateAASE(input.agentScores, minimumGrade);
  if (!assessment.recreateReady || !gradeMeets(assessment.grade, minimumGrade)) {
    throw new Error(`Passport issuance denied: AASE grade ${assessment.grade} is below ${minimumGrade}.`);
  }

  const now = input.now ?? new Date();
  const sealedEvidence = sealProofOfEffort(input.proofOfEffort, { now });
  const [mediaBlob, evidenceBlob] = await Promise.all([
    input.walrus.storeBlob(input.media, { now }),
    input.walrus.storeBlob(sealedEvidence.cipherText, { now }),
  ]);

  const originStamp: VisaStamp = {
    ...input.originStamp,
    stampedAt: now.toISOString(),
  };
  validateStamp(originStamp);

  const passport: GenesisPassport = {
    passportId: `passport:${input.proofOfEffort.mediaHash.slice(0, 24)}`,
    contentHash: input.proofOfEffort.mediaHash,
    grade: assessment.grade,
    score: assessment.score,
    mediaBlobId: mediaBlob.blobId,
    evidenceBlobId: evidenceBlob.blobId,
    evidenceLink: evidenceBlob.blobId,
    visaStamps: [originStamp],
    remainingShare: 100 - originStamp.share,
    issuedAt: now.toISOString(),
  };

  return { passport, mediaBlob, evidenceBlob, sealedEvidence };
}

export function stampVisa(
  passport: GenesisPassport,
  stamp: Omit<VisaStamp, "stampedAt">,
  now: Date = new Date(),
): GenesisPassport {
  const nextStamp: VisaStamp = { ...stamp, stampedAt: now.toISOString() };
  validateStamp(nextStamp);
  if (nextStamp.share > passport.remainingShare) {
    throw new Error(`Visa stamp exceeds remaining share. Remaining: ${passport.remainingShare}.`);
  }

  return {
    ...passport,
    visaStamps: [...passport.visaStamps, nextStamp],
    remainingShare: passport.remainingShare - nextStamp.share,
  };
}

function validateStamp(stamp: VisaStamp): void {
  if (!stamp.creatorAddress.trim()) throw new Error("Visa stamp creator address is required.");
  if (!stamp.countryCode.trim()) throw new Error("Visa stamp country code is required.");
  if (!Number.isInteger(stamp.share) || stamp.share <= 0 || stamp.share > 100) {
    throw new Error("Visa stamp share must be a positive integer up to 100.");
  }
}
