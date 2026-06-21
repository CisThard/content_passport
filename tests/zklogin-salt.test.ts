import { describe, expect, it } from "vitest";
import {
  buildZkLoginMemoryReceipt,
  describeZkLoginSaltStrategy,
  getZkLoginSaltForClaims,
  selectZkLoginAudience,
} from "../src/zklogin-salt.js";

describe("zkLogin salt service", () => {
  const claims = {
    iss: "https://accounts.google.com",
    aud: "client-id.apps.googleusercontent.com",
    sub: "google-subject-123",
  };

  it("derives a stable per-user 16-byte salt from a private master seed", () => {
    const env = { ZKLOGIN_SALT_MASTER_SEED: "test-master-seed" } as NodeJS.ProcessEnv;
    const first = getZkLoginSaltForClaims(claims, env);
    const second = getZkLoginSaltForClaims(claims, env);

    expect(first).toEqual(second);
    expect(first.strategy).toBe("hkdf-master-seed");
    expect(BigInt(first.salt)).toBeGreaterThanOrEqual(0n);
    expect(BigInt(first.salt)).toBeLessThan(2n ** 128n);
  });

  it("changes salt when the subject changes", () => {
    const env = { ZKLOGIN_SALT_MASTER_SEED: "test-master-seed" } as NodeJS.ProcessEnv;
    const first = getZkLoginSaltForClaims(claims, env);
    const second = getZkLoginSaltForClaims({ ...claims, sub: "other-user" }, env);

    expect(second.salt).not.toBe(first.salt);
  });

  it("supports legacy static salts but rejects values outside zkLogin bounds", () => {
    expect(getZkLoginSaltForClaims(claims, { ZKLOGIN_USER_SALT: "123" } as NodeJS.ProcessEnv)).toMatchObject({
      salt: "123",
      strategy: "static-env",
    });
    expect(() => getZkLoginSaltForClaims(claims, { ZKLOGIN_USER_SALT: (2n ** 128n).toString() } as NodeJS.ProcessEnv))
      .toThrow("smaller than 2^128");
  });

  it("selects the configured audience when aud is an array", () => {
    expect(selectZkLoginAudience(["other", "client"], "client")).toBe("client");
  });

  it("describes salt strategy without exposing secrets", () => {
    expect(describeZkLoginSaltStrategy({ ZKLOGIN_SALT_MASTER_SEED: "secret" } as NodeJS.ProcessEnv)).toBe("hkdf-master-seed");
    expect(describeZkLoginSaltStrategy({ ZKLOGIN_USER_SALT: "123" } as NodeJS.ProcessEnv)).toBe("static-env");
    expect(describeZkLoginSaltStrategy({} as NodeJS.ProcessEnv)).toBe("not-configured");
  });

  it("builds a privacy-safe MemWal auth receipt", () => {
    const receipt = buildZkLoginMemoryReceipt({
      address: "0x123",
      claims,
      maxEpoch: 42,
      saltStrategy: "hkdf-master-seed",
      proverUrl: "https://prover-dev.zklogin.sui.io/v1",
      now: new Date("2026-01-01T00:00:00.000Z"),
    });

    expect(receipt).toMatchObject({
      type: "zklogin-auth-receipt",
      address: "0x123",
      issuer: "https://accounts.google.com",
      maxEpoch: 42,
      saltStrategy: "hkdf-master-seed",
      proverHost: "prover-dev.zklogin.sui.io",
      createdAt: "2026-01-01T00:00:00.000Z",
    });
    expect(JSON.stringify(receipt)).not.toContain(claims.sub);
    expect(JSON.stringify(receipt)).not.toContain(claims.aud);
  });
});

