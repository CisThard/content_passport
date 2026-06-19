import { sha256 } from "./evidence.js";
import { WalrusStoredBlob } from "./types.js";

export interface WalrusClient {
  storeBlob(data: Uint8Array, options?: { now?: Date }): Promise<WalrusStoredBlob>;
  readBlob(blobId: string): Promise<Uint8Array | undefined>;
}

export class InMemoryWalrusClient implements WalrusClient {
  private readonly blobs = new Map<string, Uint8Array>();

  async storeBlob(data: Uint8Array, options: { now?: Date } = {}): Promise<WalrusStoredBlob> {
    const digest = sha256(data);
    const blobId = `walrus://${digest.slice(0, 32)}`;
    this.blobs.set(blobId, data);
    return {
      blobId,
      digest,
      size: data.byteLength,
      storedAt: (options.now ?? new Date()).toISOString(),
    };
  }

  async readBlob(blobId: string): Promise<Uint8Array | undefined> {
    return this.blobs.get(blobId);
  }
}
