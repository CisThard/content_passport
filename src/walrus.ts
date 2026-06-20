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
      source: "memory",
    };
  }

  async readBlob(blobId: string): Promise<Uint8Array | undefined> {
    return this.blobs.get(blobId);
  }
}

export class HttpWalrusClient implements WalrusClient {
  private readonly publisher: string;
  private readonly aggregator: string;

  constructor(
    endpointOrOptions: string | { publisher: string; aggregator?: string; epochs?: number; permanent?: boolean },
    private readonly fetchImpl: typeof fetch = fetch,
  ) {
    if (typeof endpointOrOptions === "string") {
      this.publisher = endpointOrOptions;
      this.aggregator = endpointOrOptions;
      this.defaultEpochs = undefined;
      this.defaultPermanent = undefined;
    } else {
      this.publisher = endpointOrOptions.publisher;
      this.aggregator = endpointOrOptions.aggregator ?? endpointOrOptions.publisher;
      this.defaultEpochs = endpointOrOptions.epochs;
      this.defaultPermanent = endpointOrOptions.permanent;
    }
  }

  private readonly defaultEpochs?: number;
  private readonly defaultPermanent?: boolean;

  async storeBlob(data: Uint8Array, options: { now?: Date } = {}): Promise<WalrusStoredBlob> {
    const url = new URL(`${this.publisher.replace(/\/$/, "")}/v1/blobs`);
    if (this.defaultEpochs) url.searchParams.set("epochs", String(this.defaultEpochs));
    if (this.defaultPermanent !== undefined) url.searchParams.set("permanent", String(this.defaultPermanent));
    const response = await this.fetchImpl(url, {
      method: "PUT",
      headers: {
        "content-type": "application/octet-stream",
        "x-content-right-stored-at": (options.now ?? new Date()).toISOString(),
      },
      body: Buffer.from(data),
    });
    if (!response.ok) throw new Error(`Walrus storeBlob failed: ${response.status} ${response.statusText}`);
    const payload = await response.json() as WalrusStoreResponse;
    const parsed = parseWalrusStoreResponse(payload);
    return {
      blobId: parsed.blobId,
      digest: sha256(data),
      size: parsed.size ?? data.byteLength,
      storedAt: payload.storedAt ?? (options.now ?? new Date()).toISOString(),
      objectId: parsed.objectId,
      txDigest: parsed.txDigest,
      certifiedEpoch: parsed.certifiedEpoch,
      endEpoch: parsed.endEpoch,
      source: "walrus-http",
      metadata: { endpoint: this.publisher },
    };
  }

  async readBlob(blobId: string): Promise<Uint8Array | undefined> {
    const response = await this.fetchImpl(`${this.aggregator.replace(/\/$/, "")}/v1/blobs/${encodeURIComponent(blobId)}`);
    if (response.status === 404) return undefined;
    if (!response.ok) throw new Error(`Walrus readBlob failed: ${response.status} ${response.statusText}`);
    return new Uint8Array(await response.arrayBuffer());
  }
}

interface WalrusStoreResponse {
  newlyCreated?: {
    blobObject: {
      id: string;
      blobId: string;
      size?: number;
      certifiedEpoch?: number;
      storage?: { endEpoch?: number };
    };
  };
  alreadyCertified?: {
    blobId: string;
    event?: { txDigest?: string };
    endEpoch?: number;
  };
  storedAt?: string;
}

function parseWalrusStoreResponse(response: WalrusStoreResponse): {
  blobId: string;
  objectId?: string;
  txDigest?: string;
  size?: number;
  certifiedEpoch?: number;
  endEpoch?: number;
} {
  if (response.newlyCreated) {
    const blob = response.newlyCreated.blobObject;
    return {
      blobId: blob.blobId,
      objectId: blob.id,
      size: blob.size,
      certifiedEpoch: blob.certifiedEpoch,
      endEpoch: blob.storage?.endEpoch,
    };
  }
  if (response.alreadyCertified) {
    return {
      blobId: response.alreadyCertified.blobId,
      txDigest: response.alreadyCertified.event?.txDigest,
      endEpoch: response.alreadyCertified.endEpoch,
    };
  }
  throw new Error("Walrus response did not include newlyCreated or alreadyCertified.");
}
