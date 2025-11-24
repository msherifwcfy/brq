import fs from "fs";
import path from "path";

const BASE_URL = process.env.BASE_URL;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

if (!BASE_URL) {
  console.error("BASE_URL env var is required");
  process.exit(1);
}
if (!ACCESS_TOKEN) {
  console.error("ACCESS_TOKEN env var is required");
  process.exit(1);
}

async function fetchPermissions() {
  const url = new URL("/permissions", BASE_URL);
  url.searchParams.set("query", JSON.stringify({ query: {} }));
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Failed to fetch permissions: ${res.status} ${res.statusText} ${text}`
    );
  }
  const json = await res.json();
  return Array.isArray(json?.data) ? json.data : [];
}

function buildPermissionKeys(permissions) {
  const grouped = {};
  for (const p of permissions) {
    const resource = String(p.resource || "").trim();
    const action = String(p.action || "").trim();
    const key = String(p.key || "").trim();
    if (!resource || !action || !key) continue;
    const groupName = resource.toUpperCase();
    const actionName = action.toUpperCase();
    if (!grouped[groupName]) grouped[groupName] = {};
    grouped[groupName][actionName] = key;
  }
  return grouped;
}

function updatePermissionKeysInFile(permissionKeysObject) {
  const targetPath = path.resolve(
    process.cwd(),
    "src/shared/config/permissions.ts"
  );
  const original = fs.readFileSync(targetPath, "utf8");
  const objectLiteral = JSON.stringify(permissionKeysObject, null, 2)
    .replace(/"(\w+)":/g, "$1:")
    .replace(/"/g, '"');

  const regex =
    /(export const PERMISSION_KEYS\s*=\s*)([\s\S]*?)(\s*as const;)/m;
  if (!regex.test(original)) {
    throw new Error("PERMISSION_KEYS constant not found in permissions.ts");
  }
  const next = original.replace(regex, `$1${objectLiteral}$3`);
  fs.writeFileSync(targetPath, next, "utf8");
  return targetPath;
}

async function main() {
  const permissions = await fetchPermissions();
  const keys = buildPermissionKeys(permissions);
  const targetPath = updatePermissionKeysInFile(keys);
  console.log(`Updated ${targetPath} with ${permissions.length} permissions.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
