// Shared helpers for the Cursor install checks (.github/workflows/cursor-install.yml).
import fs from "node:fs";
import path from "node:path";

export const CURSOR_GALLERY =
  "https://marketplace.cursorapi.com/_apis/public/gallery";
export const OPEN_VSX = "https://open-vsx.org/api";
export const PU_ID = "innoverio.vscode-dbt-power-user";
export const MCP_ID = "altimateai.vscode-altimate-mcp-server";

export function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith("--")) continue;
    const next = argv[i + 1];
    if (next === undefined || next.startsWith("--")) args[a.slice(2)] = true;
    else args[a.slice(2)] = argv[++i];
  }
  return args;
}

export function log(...parts) {
  console.log(`[${new Date().toISOString()}]`, ...parts);
}

// GitHub annotations and job summary; plain stdout when not on Actions.
export function annotate(level, title, message) {
  const clean = String(message).replace(/\r?\n/g, "%0A");
  console.log(`::${level} title=${title}::${clean}`);
}

export function summary(markdown) {
  const file = process.env.GITHUB_STEP_SUMMARY;
  if (file) fs.appendFileSync(file, markdown + "\n");
  else console.log(markdown);
}

export async function fetchRetry(url, init = {}, tries = 3) {
  let lastError;
  for (let attempt = 1; attempt <= tries; attempt++) {
    try {
      const res = await fetch(url, {
        ...init,
        signal: AbortSignal.timeout(init.timeoutMs ?? 60000),
      });
      if (res.status >= 500 && attempt < tries)
        throw new Error(`HTTP ${res.status} from ${url}`);
      return res;
    } catch (error) {
      lastError = error;
      await new Promise((r) => setTimeout(r, 2000 * attempt));
    }
  }
  throw lastError;
}

// All versions Cursor's gallery lists for an extension: the latest per target plus any universal build.
export async function cursorGalleryVersions(extensionId) {
  const body = {
    filters: [
      {
        criteria: [{ filterType: 7, value: extensionId }],
        pageNumber: 1,
        pageSize: 1,
      },
    ],
    flags: 950,
  };
  const res = await fetchRetry(`${CURSOR_GALLERY}/extensionquery`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json;api-version=3.0-preview.1",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok)
    throw new Error(
      `Cursor gallery query for ${extensionId}: HTTP ${res.status}`,
    );
  const json = await res.json();
  const ext = json.results?.[0]?.extensions?.[0];
  if (!ext) return [];
  return ext.versions.map((v) => ({
    version: v.version,
    target: v.targetPlatform || "universal",
    lastUpdated: v.lastUpdated,
    assetUri: v.assetUri,
    dependencies: (
      v.properties?.find(
        (p) => p.key === "Microsoft.VisualStudio.Code.ExtensionDependencies",
      )?.value || ""
    )
      .split(",")
      .map((d) => d.trim().toLowerCase())
      .filter(Boolean),
  }));
}

// The version Cursor installs for a target: its own build if listed, otherwise the universal one.
export function resolveForTarget(versions, target) {
  const own = versions.filter((v) => v.target === target);
  const pool = own.length
    ? own
    : versions.filter((v) => v.target === "universal");
  return pool.sort((a, b) => compareVersions(b.version, a.version))[0];
}

export function vsixUrl(entry) {
  const target =
    entry.target && entry.target !== "universal"
      ? `&targetPlatform=${entry.target}`
      : "";
  return `${entry.assetUri}/Microsoft.VisualStudio.Services.VSIXPackage?redirect=true${target}`;
}

// Size of a remote file without downloading it: a one-byte range request.
export async function remoteSize(url) {
  const res = await fetchRetry(url, { headers: { Range: "bytes=0-0" } });
  const range = res.headers.get("content-range");
  await res.body?.cancel();
  if (range && range.includes("/")) return Number(range.split("/")[1]);
  const length = res.headers.get("content-length");
  return res.status === 200 && length ? Number(length) : undefined;
}

export function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function compareVersions(a, b) {
  const pa = String(a)
    .split(/[.-]/)
    .map((x) => Number.parseInt(x, 10) || 0);
  const pb = String(b)
    .split(/[.-]/)
    .map((x) => Number.parseInt(x, 10) || 0);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const d = (pa[i] ?? 0) - (pb[i] ?? 0);
    if (d !== 0) return d;
  }
  return 0;
}

export function vsceTarget() {
  const arch = process.arch === "arm64" ? "arm64" : "x64";
  const os = { linux: "linux", darwin: "darwin", win32: "win32" }[
    process.platform
  ];
  return `${os}-${arch}`;
}

export function dirSize(dir) {
  let total = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) total += dirSize(p);
    else if (entry.isFile()) total += fs.statSync(p).size;
  }
  return total;
}

export function mb(bytes) {
  return bytes === undefined ? "?" : `${(bytes / 1e6).toFixed(1)} MB`;
}

// Extensions recorded in <extensions-dir>/extensions.json.
export function installedExtensions(extensionsDir) {
  const file = path.join(extensionsDir, "extensions.json");
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, "utf8")).map((e) => ({
    id: e.identifier.id.toLowerCase(),
    version: e.version,
    target: [undefined, "undefined", "unknown"].includes(
      e.metadata?.targetPlatform,
    )
      ? "universal"
      : e.metadata.targetPlatform,
    dir: path.join(extensionsDir, e.relativeLocation),
  }));
}

export function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

// Latest published GitHub release of this repository (tag name without a leading "v").
export async function latestRelease() {
  const repo =
    process.env.GITHUB_REPOSITORY || "AltimateAI/vscode-dbt-power-user";
  const headers = { Accept: "application/vnd.github+json" };
  if (process.env.GITHUB_TOKEN)
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const res = await fetchRetry(
    `https://api.github.com/repos/${repo}/releases/latest`,
    { headers },
  );
  if (!res.ok) throw new Error(`latest release lookup: HTTP ${res.status}`);
  return (await res.json()).tag_name.replace(/^v/, "");
}

export function newestLogDir(userDataDir) {
  const root = path.join(userDataDir, "logs");
  if (!fs.existsSync(root)) return undefined;
  const dirs = fs.readdirSync(root).sort();
  return dirs.length ? path.join(root, dirs[dirs.length - 1]) : undefined;
}

export function readIfExists(file) {
  return file && fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}
