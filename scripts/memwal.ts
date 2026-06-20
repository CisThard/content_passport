import { spawn } from "node:child_process";
import {
  loadMemWalConfig,
  MemWalSemanticMemoryClient,
  redactMemWalConfig,
} from "../src/memwal.js";

const command = process.argv[2] ?? "help";
const namespace = process.env.MEMWAL_NAMESPACE ?? "content-right-hackathon";

switch (command) {
  case "login":
    await run("npx", [
      "-y",
      "@mysten-incubation/memwal-mcp",
      "login",
      "--namespace",
      namespace,
      "--label",
      "ContentRightHackathon",
    ]);
    break;
  case "health":
    await withClient(async (client, config) => {
      const health = await client.health();
      console.log(JSON.stringify({ config: redactMemWalConfig(config), health }, null, 2));
    });
    break;
  case "delegate":
    await generateDelegate();
    break;
  case "create-account":
    await createAccountFromEnv();
    break;
  case "add-delegate":
    await addDelegateFromEnv();
    break;
  case "remember":
    await withClient(async (client) => {
      const text = process.argv.slice(3).join(" ") || "Content Right Walrus Memory setup verification succeeded.";
      const result = await client.rememberText(text, namespace);
      console.log(JSON.stringify(result, null, 2));
    });
    break;
  case "recall":
    await withClient(async (client) => {
      const query = process.argv.slice(3).join(" ") || "Content Right Walrus Memory setup verification";
      const result = await client.recallText(query, namespace, 5);
      console.log(JSON.stringify(result, null, 2));
    });
    break;
  case "restore":
    await withClient(async (client) => {
      const result = await client.restore(namespace, 50);
      console.log(JSON.stringify(result, null, 2));
    });
    break;
  default:
    console.log(`Usage:
  npm run memwal:login      # browser sign-in, creates ~/.memwal/credentials.json
  npm run memwal:health     # verify relayer + credentials
  npm run memwal:remember -- "text to store"
  npm run memwal:recall -- "query"
  npm run memwal:restore
  npm run memwal -- delegate
  npm run memwal -- create-account
  npm run memwal -- add-delegate

Environment:
  MEMWAL_NAMESPACE=${namespace}
  MEMWAL_PRIVATE_KEY / MEMWAL_ACCOUNT_ID / MEMWAL_SERVER_URL
  or ~/.memwal/credentials.json from memwal-mcp login
  MEMWAL_PACKAGE_ID / MEMWAL_REGISTRY_ID / SUI_PRIVATE_KEY for on-chain account ops
`);
}

async function withClient(
  fn: (client: MemWalSemanticMemoryClient, config: NonNullable<Awaited<ReturnType<typeof loadMemWalConfig>>>) => Promise<void>,
): Promise<void> {
  const config = await loadMemWalConfig();
  if (!config) {
    throw new Error("MemWal credentials not found. Run: npm run memwal:login");
  }
  await fn(new MemWalSemanticMemoryClient(config), config);
}

function run(cmd: string, args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: "inherit", cwd: process.env.HOME });
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${cmd} exited with code ${code}`));
    });
    child.on("error", reject);
  });
}

async function generateDelegate(): Promise<void> {
  const { generateDelegateKey } = await import("@mysten-incubation/memwal/account");
  const delegate = await generateDelegateKey();
  console.log(JSON.stringify({
    privateKey: delegate.privateKey,
    publicKey: Buffer.from(delegate.publicKey).toString("hex"),
    suiAddress: delegate.suiAddress,
    warning: "Store privateKey in ~/.memwal/credentials.json or MEMWAL_PRIVATE_KEY. Never commit it.",
  }, null, 2));
}

async function createAccountFromEnv(): Promise<void> {
  const { createAccount } = await import("@mysten-incubation/memwal/account");
  const packageId = required("MEMWAL_PACKAGE_ID");
  const registryId = required("MEMWAL_REGISTRY_ID");
  const suiPrivateKey = required("SUI_PRIVATE_KEY");
  const result = await createAccount({
    packageId,
    registryId,
    suiPrivateKey,
    suiNetwork: (process.env.SUI_NETWORK as "testnet" | "mainnet" | undefined) ?? "mainnet",
  });
  console.log(JSON.stringify(result, null, 2));
}

async function addDelegateFromEnv(): Promise<void> {
  const { addDelegateKey } = await import("@mysten-incubation/memwal/account");
  const packageId = required("MEMWAL_PACKAGE_ID");
  const accountId = required("MEMWAL_ACCOUNT_ID");
  const publicKey = required("MEMWAL_DELEGATE_PUBLIC_KEY");
  const suiPrivateKey = required("SUI_PRIVATE_KEY");
  const result = await addDelegateKey({
    packageId,
    accountId,
    publicKey,
    label: process.env.MEMWAL_DELEGATE_LABEL ?? "ContentRightHackathon",
    suiPrivateKey,
    suiNetwork: (process.env.SUI_NETWORK as "testnet" | "mainnet" | undefined) ?? "mainnet",
  });
  console.log(JSON.stringify(result, null, 2));
}

function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is required.`);
  return value;
}
