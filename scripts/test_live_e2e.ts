import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { SuiJsonRpcClient } from "@mysten/sui/jsonRpc";
import { HttpWalrusClient } from "../src/walrus.js";
import { buildIssueGenesisPassportTx } from "../src/sui.js";
import { sha256, assertSealCanDecrypt, decryptProofOfEffort, sealProofOfEffort } from "../src/evidence.js";

const rpcUrl = process.env.SUI_RPC_URL || "https://fullnode.testnet.sui.io:443";
const network = (process.env.SUI_NETWORK || "testnet") as any;
const suiClient = new SuiJsonRpcClient({ url: rpcUrl, network });

async function run() {
  console.log("=== STARTING LIVE E2E INTEGRATION TEST ON SUI TESTNET ===");

  const sponsorSecret = process.env.SUI_SPONSOR_SECRET_KEY;
  const packageId = process.env.CONTENT_RIGHT_PACKAGE_ID;
  const walrusPublisher = process.env.WALRUS_PUBLISHER;
  const walrusAggregator = process.env.WALRUS_AGGREGATOR;

  if (!sponsorSecret || !packageId || !walrusPublisher || !walrusAggregator) {
    console.error("Missing required environment variables in process.env. Please run with --env-file=.env");
    process.exit(1);
  }

  const keypair = Ed25519Keypair.fromSecretKey(Buffer.from(sponsorSecret, "hex"));
  const myAddress = keypair.toSuiAddress();
  console.log("Sponsor Wallet Address:", myAddress);
  console.log("Using Package ID:", packageId);

  // 1. Walrus Live Storage Test
  console.log("\n[1/3] Testing Walrus Live Storage...");
  const walrus = new HttpWalrusClient({ publisher: walrusPublisher, aggregator: walrusAggregator });
  const testData = Buffer.from("Sui Testnet Live E2E Verification Check - " + new Date().toISOString());
  const fileHash = sha256(testData);
  console.log("Uploading test file to Walrus Publisher...");
  const uploadResult = await walrus.storeBlob(new Uint8Array(testData));
  console.log("Upload Success! Blob ID:", uploadResult.blobId);
  console.log("Downloading blob back from Walrus Aggregator...");
  const downloadedData = await walrus.readBlob(uploadResult.blobId);
  
  if (downloadedData && Buffer.from(downloadedData).toString("utf8") === testData.toString("utf8")) {
    console.log("✅ Walrus Live Storage verification succeeded!");
  } else {
    throw new Error("Walrus store/read check failed.");
  }

  // 2. Shamir Key Sharding Test
  console.log("\n[2/3] Testing SEAL Shamir Secret Sharing...");
  const samplePoE = {
    title: "Integration Test Sketch",
    creatorAddress: myAddress,
    mediaHash: fileHash,
    createdAt: new Date().toISOString(),
    artifacts: [{ name: "test.txt", mimeType: "text/plain", bytes: Buffer.from("sketch layers") }]
  };
  const sealed = sealProofOfEffort(samplePoE, { threshold: 3, totalShares: 5 });
  console.log("Encrypted file into 5 shards. Reconstructing with 3 shares...");
  const restored = decryptProofOfEffort(sealed, sealed.shares.slice(0, 3));
  if (restored.title === samplePoE.title) {
    console.log("✅ Shamir (3/5) Secret Sharing validation succeeded!");
  } else {
    throw new Error("Shamir decryption failed.");
  }

  // 3. Sui Testnet Live Transaction Test (Issue Genesis Passport)
  console.log("\n[3/3] Testing Live Transaction - Issue Genesis Passport...");
  const tx = buildIssueGenesisPassportTx({
    packageId,
    recipient: myAddress,
    contentHash: fileHash,
    grade: "AAA",
    mediaBlobId: uploadResult.blobId,
    evidenceBlobId: uploadResult.blobId
  });

  tx.setSender(myAddress);
  tx.setGasBudget(100_000_000); // 0.1 SUI

  console.log("Building transaction block...");
  const txBytes = await tx.build({ client: suiClient as any });
  console.log("Signing transaction block with Sponsor Keypair...");
  const signResult = await keypair.signTransaction(txBytes);

  console.log("Broadcasting transaction to Sui Testnet...");
  const executionResult = await suiClient.executeTransactionBlock({
    transactionBlock: txBytes,
    signature: [signResult.signature],
    options: {
      showEffects: true,
      showObjectChanges: true
    }
  });

  console.log("✅ Transaction executed successfully!");
  console.log("Transaction Digest:", executionResult.digest);
  console.log("SuiVision Link: https://testnet.suivision.xyz/txblock/" + executionResult.digest);

  const createdObjects = executionResult.objectChanges?.filter(o => o.type === "created");
  const passportObj = createdObjects?.find((o: any) => o.objectType && o.objectType.includes("genesis_passport::GenesisPassport"));
  if (passportObj) {
    console.log("Passport Object ID:", (passportObj as any).objectId);
  }

  console.log("\n=== ALL E2E INTEGRATION TESTS COMPLETED SUCCESSFULLY ===");
}

run().catch((error) => {
  console.error("❌ E2E Integration Test Failed:", error);
  process.exit(1);
});
