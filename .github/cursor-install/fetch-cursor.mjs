// Download and unpack a Cursor build for this runner's OS, without touching any installed Cursor.
//
//   node fetch-cursor.mjs --version latest --out <dir>
//   node fetch-cursor.mjs --version 2.6.20 --commit <id> --out <dir>   (id from its downloads.cursor.com URL)
//
// Writes <dir>/cursor.json: { version, commit, vscodeVersion, exe, cli, root }.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { fetchRetry, log, parseArgs, readJson } from "./lib.mjs";

const args = parseArgs(process.argv.slice(2));
const out = path.resolve(args.out);
const requested = args.version || "latest";
fs.mkdirSync(out, { recursive: true });

// Cursor's download API names; macOS runners are arm64.
const apiPlatform = {
  linux: "linux-x64",
  darwin: "darwin-arm64",
  win32: "win32-x64-user",
}[process.platform];

async function resolveDownload() {
  if (requested === "latest") {
    const res = await fetchRetry(
      `https://cursor.com/api/download?platform=${apiPlatform}&releaseTrack=latest`,
    );
    const info = await res.json();
    const url = process.platform === "linux" ? info.debUrl : info.downloadUrl;
    if (!url)
      throw new Error(
        `Cursor download API returned no installer for ${apiPlatform}`,
      );
    return { url, version: info.version, commit: info.commitSha };
  }
  if (!args.commit)
    throw new Error("--commit is required with a pinned --version");
  const base = `https://downloads.cursor.com/production/${args.commit}`;
  const url = {
    linux: `${base}/linux/x64/deb/amd64/deb/cursor_${requested}_amd64.deb`,
    darwin: `${base}/darwin/arm64/Cursor-darwin-arm64.dmg`,
    win32: `${base}/win32/x64/user-setup/CursorUserSetup-x64-${requested}.exe`,
  }[process.platform];
  return { url, version: requested, commit: args.commit };
}

async function download(url, file) {
  const res = await fetchRetry(url, { timeoutMs: 600000 });
  if (!res.ok) throw new Error(`download ${url}: HTTP ${res.status}`);
  await pipeline(Readable.fromWeb(res.body), fs.createWriteStream(file));
}

function unpack(file) {
  if (process.platform === "linux") {
    execFileSync("dpkg-deb", ["-x", file, path.join(out, "pkg")]);
    const root = path.join(out, "pkg/usr/share/cursor");
    return {
      root,
      exe: path.join(root, "cursor"),
      cli: path.join(root, "bin/cursor"),
      app: path.join(root, "resources/app"),
    };
  }
  if (process.platform === "darwin") {
    const mount = path.join(out, "mnt");
    fs.mkdirSync(mount, { recursive: true });
    execFileSync("hdiutil", [
      "attach",
      "-nobrowse",
      "-readonly",
      "-mountpoint",
      mount,
      file,
    ]);
    try {
      execFileSync("ditto", [
        path.join(mount, "Cursor.app"),
        path.join(out, "Cursor.app"),
      ]);
    } finally {
      execFileSync("hdiutil", ["detach", mount, "-force"]);
    }
    const root = path.join(out, "Cursor.app");
    return {
      root,
      exe: path.join(root, "Contents/MacOS/Cursor"),
      cli: path.join(root, "Contents/Resources/app/bin/cursor"),
      app: path.join(root, "Contents/Resources/app"),
    };
  }
  // Windows: the per-user installer, silently, into our own folder; never launch Cursor afterwards.
  const root = path.join(out, "Cursor");
  execFileSync(
    file,
    [
      "/VERYSILENT",
      "/SUPPRESSMSGBOXES",
      "/NORESTART",
      "/SP-",
      `/DIR=${root}`,
      "/MERGETASKS=!runcode",
    ],
    {
      stdio: "inherit",
      timeout: 600000,
    },
  );
  return {
    root,
    exe: path.join(root, "Cursor.exe"),
    cli: path.join(root, "resources/app/bin/cursor.cmd"),
    app: path.join(root, "resources/app"),
  };
}

const dl = await resolveDownload();
const installer = path.join(out, path.basename(new URL(dl.url).pathname));
log(
  `Downloading Cursor ${dl.version} (${dl.commit.slice(0, 8)}) from ${dl.url}`,
);
await download(dl.url, installer);
const paths = unpack(installer);
fs.rmSync(installer, { force: true });
const product = readJson(path.join(paths.app, "product.json"));
if (product.version !== dl.version)
  throw new Error(
    `asked for Cursor ${dl.version}, unpacked ${product.version}`,
  );
const result = {
  version: product.version,
  commit: product.commit,
  vscodeVersion: product.vscodeVersion,
  ...paths,
};
fs.writeFileSync(
  path.join(out, "cursor.json"),
  JSON.stringify(result, null, 2),
);
log(
  `Cursor ${result.version} (VS Code ${result.vscodeVersion}) ready at ${result.root}`,
);
