import { execSync, spawn } from "node:child_process";

const PROJECT_ID = "project-71ed5c01-e218-4969-862";
const PROJECT_NUMBER = "682352132130";
const REGION = "asia-northeast3";
const REPO_NAME = "content-passport-repo";
const POOL_NAME = "github-pool";
const PROVIDER_NAME = "github-provider";
const SA_NAME = "content-passport-runner";
const SA_EMAIL = `${SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com`;
const GITHUB_REPO = "CisThard/content_passport";

function run(cmd: string, silent = false): string {
  try {
    return execSync(cmd, { stdio: silent ? "pipe" : "inherit", encoding: "utf8" });
  } catch (e: any) {
    if (silent) throw e;
    console.error(`[FAIL] Command failed: ${cmd}\nError: ${e.message}`);
    process.exit(1);
  }
}

async function main() {
  console.log("=== 1. Enabling GCP Services ===");
  run(`gcloud services enable \
    artifactregistry.googleapis.com \
    run.googleapis.com \
    secretmanager.googleapis.com \
    aiplatform.googleapis.com \
    iamcredentials.googleapis.com --project=${PROJECT_ID}`);

  console.log("=== 2. Creating Artifact Registry ===");
  try {
    run(`gcloud artifacts repositories describe ${REPO_NAME} --location=${REGION} --project=${PROJECT_ID}`, true);
    console.log(`Artifact Registry Repository ${REPO_NAME} already exists.`);
  } catch {
    run(`gcloud artifacts repositories create ${REPO_NAME} \
      --repository-format=docker \
      --location=${REGION} \
      --description="Content Passport Docker Images" \
      --project=${PROJECT_ID}`);
  }

  console.log("=== 3. Creating Workload Identity Pool ===");
  try {
    run(`gcloud iam workload-identity-pools describe ${POOL_NAME} --location=global --project=${PROJECT_ID}`, true);
    console.log(`Workload Identity Pool ${POOL_NAME} already exists.`);
  } catch {
    run(`gcloud iam workload-identity-pools create ${POOL_NAME} \
      --location=global \
      --display-name="GitHub Actions Pool" \
      --project=${PROJECT_ID}`);
  }

  console.log("=== 4. Creating Workload Identity Provider ===");
  try {
    run(`gcloud iam workload-identity-pools providers describe ${PROVIDER_NAME} --workload-identity-pool=${POOL_NAME} --location=global --project=${PROJECT_ID}`, true);
    console.log(`Workload Identity Provider ${PROVIDER_NAME} already exists.`);
  } catch {
    run(`gcloud iam workload-identity-pools providers create-oidc ${PROVIDER_NAME} \
      --workload-identity-pool=${POOL_NAME} \
      --location=global \
      --issuer-uri="https://token.actions.githubusercontent.com" \
      --attribute-mapping="google.subject=assertion.subject,attribute.actor=assertion.actor,attribute.repository=assertion.repository" \
      --project=${PROJECT_ID}`);
  }

  console.log("=== 5. Creating Service Account ===");
  try {
    run(`gcloud iam service-accounts describe ${SA_EMAIL} --project=${PROJECT_ID}`, true);
    console.log(`Service Account ${SA_EMAIL} already exists.`);
  } catch {
    run(`gcloud iam service-accounts create ${SA_NAME} \
      --display-name="Service Account for Cloud Run & GitHub Deploy" \
      --project=${PROJECT_ID}`);
    console.log("Waiting 10 seconds for service account IAM propagation...");
    await new Promise((resolve) => setTimeout(resolve, 10000));
  }

  console.log("=== 6. Granting IAM Roles to Service Account ===");
  const roles = [
    "roles/artifactregistry.writer",
    "roles/run.developer",
    "roles/iam.serviceAccountUser",
    "roles/secretmanager.secretAccessor",
    "roles/aiplatform.user"
  ];
  for (const role of roles) {
    let retries = 6;
    while (retries > 0) {
      try {
        run(`gcloud projects add-iam-policy-binding ${PROJECT_ID} \
          --member="serviceAccount:${SA_EMAIL}" \
          --role="${role}" --quiet`, true);
        console.log(`Successfully bound role: ${role}`);
        break;
      } catch (e: any) {
        retries--;
        if (retries === 0) {
          console.error(`[FAIL] Failed to bind role ${role} after multiple retries.`);
          process.exit(1);
        }
        console.log(`Role binding failed, retrying in 5 seconds... (${retries} retries left)`);
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    }
  }

  console.log("=== 7. Binding WIF to Service Account ===");
  // Grant permission for Github Repo to impersonate service account
  let wifRetries = 5;
  while (wifRetries > 0) {
    try {
      run(`gcloud iam service-accounts add-iam-policy-binding ${SA_EMAIL} \
        --role="roles/iam.workloadIdentityUser" \
        --member="principalSet://iam.googleapis.com/projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/${POOL_NAME}/attribute.repository/${GITHUB_REPO}" \
        --project=${PROJECT_ID} --quiet`, true);
      console.log("Successfully bound WIF to service account.");
      break;
    } catch (e: any) {
      wifRetries--;
      if (wifRetries === 0) {
        console.error(`[FAIL] Failed to bind WIF to service account after multiple retries.`);
        process.exit(1);
      }
      console.log(`WIF binding failed, retrying in 5 seconds... (${wifRetries} retries left)`);
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }

  console.log("=== 8. Syncing Secrets to Secret Manager ===");
  const secretsToSync = [
    { name: "SUI_PRIVATE_KEY", value: process.env.SUI_PRIVATE_KEY },
    { name: "MEMWAL_PRIVATE_KEY", value: process.env.MEMWAL_PRIVATE_KEY },
    { name: "GOOGLE_GENERATIVE_AI_API_KEY", value: process.env.GOOGLE_GENERATIVE_AI_API_KEY },
    { name: "AUTH_SECRET", value: process.env.AUTH_SECRET },
    { name: "AUTH_GOOGLE_ID", value: process.env.AUTH_GOOGLE_ID },
    { name: "AUTH_GOOGLE_SECRET", value: process.env.AUTH_GOOGLE_SECRET }
  ];

  for (const secret of secretsToSync) {
    if (!secret.value) {
      console.log(`[SKIP] Secret ${secret.name} value is empty in local environment.`);
      continue;
    }
    // Check if secret exists
    let exists = false;
    try {
      run(`gcloud secrets describe ${secret.name} --project=${PROJECT_ID}`, true);
      exists = true;
    } catch {}

    if (!exists) {
      run(`gcloud secrets create ${secret.name} --replication-policy="automatic" --project=${PROJECT_ID}`);
    }

    // Add secret version safely without logging secret value
    const child = spawn("gcloud", [
      "secrets", "versions", "add", secret.name,
      `--data-file=-`,
      `--project=${PROJECT_ID}`
    ], { stdio: ["pipe", "inherit", "inherit"] });
    child.stdin.write(secret.value);
    child.stdin.end();
    
    // Wait for the process to finish
    await new Promise((resolve) => child.on("exit", resolve));
    console.log(`Secret ${secret.name} synchronized successfully.`);
  }

  console.log("=== 9. Setting GitHub Repository Secrets ===");
  const githubSecrets = [
    { name: "GCP_PROJECT_ID", value: PROJECT_ID },
    { name: "GCP_WIF_PROVIDER", value: `projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/${POOL_NAME}/providers/${PROVIDER_NAME}` },
    { name: "GCP_WIF_SERVICE_ACCOUNT", value: SA_EMAIL },
    { name: "GCP_REGION", value: REGION },
    { name: "GCP_VERTEX_AI_ENABLED", value: "true" }
  ];

  for (const sec of githubSecrets) {
    // Set secret in GitHub
    const child = spawn("gh", [
      "secret", "set", sec.name,
      `--repo=${GITHUB_REPO}`
    ], { stdio: ["pipe", "inherit", "inherit"] });
    child.stdin.write(sec.value);
    child.stdin.end();
    await new Promise((resolve) => child.on("exit", resolve));
    console.log(`GitHub Secret ${sec.name} configured successfully.`);
  }

  console.log("\n🚀 All settings are configured successfully!");
  console.log("GitHub Repository Secrets and GCP resources are connected!");
}

main().catch(console.error);
