import { describe, it, expect, vi } from "vitest";
import { FirestoreAuthenticityMemoryClient, getAuthenticityMemoryClient, InMemoryAuthenticityMemoryClient } from "../src/memory.js";

// Mock @google-cloud/firestore
vi.mock("@google-cloud/firestore", () => {
  const mockDoc = {
    set: vi.fn().mockResolvedValue({}),
    get: vi.fn().mockResolvedValue({
      exists: true,
      data: () => ({ value: "stored-value" }),
    }),
  };
  const mockCollection = {
    doc: vi.fn().mockReturnValue(mockDoc),
    where: vi.fn().mockReturnThis(),
    get: vi.fn().mockResolvedValue({
      forEach: (callback: any) => callback({
        data: () => ({ key: "mock-key", value: "stored-value" }),
      }),
    }),
  };
  class Firestore {
    collection() {
      return mockCollection;
    }
  }
  return { Firestore };
});

describe("FirestoreAuthenticityMemoryClient", () => {
  it("can instantiate, remember, recall, and list documents", async () => {
    const client = new FirestoreAuthenticityMemoryClient();
    
    await client.remember("test-namespace", "test-key", "stored-value");
    const val = await client.recall("test-namespace", "test-key");
    expect(val).toBe("stored-value");

    const entries = await client.list("test-namespace");
    expect(entries).toHaveLength(1);
    expect(entries[0]).toEqual({ key: "mock-key", value: "stored-value" });
  });
});

describe("getAuthenticityMemoryClient factory", () => {
  it("returns InMemoryAuthenticityMemoryClient by default", () => {
    process.env.GCP_FIRESTORE_ENABLED = "false";
    const client = getAuthenticityMemoryClient();
    expect(client).toBeInstanceOf(InMemoryAuthenticityMemoryClient);
  });

  it("returns FirestoreAuthenticityMemoryClient when enabled", () => {
    process.env.GCP_FIRESTORE_ENABLED = "true";
    const client = getAuthenticityMemoryClient();
    expect(client).toBeInstanceOf(FirestoreAuthenticityMemoryClient);
  });
});
