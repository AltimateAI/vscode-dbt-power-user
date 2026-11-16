// Install Power User with Cursor's command line into fresh, isolated folders and check the result.
//
//   node cli-install.mjs --cursor <dir>/cursor.json --work <dir> [--vsix <file>] [--max-seconds 60]
//
// Without --vsix it installs innoverio.vscode-dbt-power-user from Cursor's gallery. With --vsix it
// installs that file; its extension dependencies still come from the gallery.
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import {
  annotate,
  compareVersions,
  cursorGalleryVersions,
  dirSize,
  installedExtensions,
  latestRelease,
  log,
  mb,
  parseArgs,
  PU_ID,
  readJson,
  remoteSize,
  resolveForTarget,
  summary,
  vsceTarget,
  vsixUrl,
} from "./lib.mjs";

const args = parseArgs(process.argv.slice(2));
const cursor = readJson(args.cursor);
const work = path.resolve(args.work);
const vsix = args.vsix ? path.resolve(args.vsix) : undefined;
const maxSeconds = Number(args["max-seconds"] || 60);
const hardTimeoutMs = Number(args["timeout-seconds"] || 600) * 1000;
const target = vsceTarget();
const label = `Cursor ${cursor.version} CLI, ${target}${vsix ? ", PR VSIX" : ""}`;

const dirs = {
  userData: path.join(work, "user-data"),
  extensions: path.join(work, "extensions"),
  home: path.join(work, "home"),
};
fs.rmSync(work, { recursive: true, force: true });
Object.values(dirs).forEach((d) => fs.mkdirSync(d, { recursive: true }));

const failures = [];
const warnings = [];
const fail = (msg) => failures.push(msg);
const warn = (msg) => warnings.push(msg);

// The shell shim prompts "[y/N]" on WSL unless DONT_PROMPT_WSL_INSTALL is set; stdin is closed so a
// prompt can never wait. HOME is isolated on Linux and macOS so nothing lands in the runner's ~/.cursor.
function runCli() {
  const cliArgs = [
    "--user-data-dir",
    dirs.userData,
    "--extensions-dir",
    dirs.extensions,
    "--log",
    "trace",
    "--install-extension",
    vsix || PU_ID,
  ];
  const env = {
    ...process.env,
    DONT_PROMPT_WSL_INSTALL: "1",
    ELECTRON_RUN_AS_NODE: undefined,
  };
  if (process.platform !== "win32") env.HOME = dirs.home;
  const isCmd = process.platform === "win32";
  const command = isCmd ? `"${cursor.cli}"` : cursor.cli;
  const quoted = isCmd
    ? cliArgs.map((a) => (/[\s"]/.test(a) ? `"${a}"` : a))
    : cliArgs;
  const started = Date.now();
  return new Promise((resolve) => {
    const child = spawn(command, quoted, {
      env,
      stdio: ["ignore", "pipe", "pipe"],
      shell: isCmd,
      detached: !isCmd,
    });
    let output = "";
    child.stdout.on("data", (d) => (output += d));
    child.stderr.on("data", (d) => (output += d));
    const timer = setTimeout(() => {
      output += `\n[harness] killed after ${hardTimeoutMs / 1000}s\n`;
      if (isCmd) spawn("taskkill", ["/pid", String(child.pid), "/t", "/f"]);
      else process.kill(-child.pid, "SIGKILL");
    }, hardTimeoutMs);
    child.on("close", (code, signal) => {
      clearTimeout(timer);
      resolve({ code, signal, seconds: (Date.now() - started) / 1000, output });
    });
  });
}

log(`${label}: installing ${vsix ? path.basename(vsix) : PU_ID}`);
const run = await runCli();
fs.writeFileSync(path.join(work, "cli-output.log"), run.output);
log(`exit ${run.code ?? run.signal} after ${run.seconds.toFixed(1)}s`);

if (run.code !== 0) {
  const tail = run.output.trim().split(/\r?\n/).slice(-15).join("\n");
  fail(
    `CLI exited with ${run.code ?? run.signal} after ${run.seconds.toFixed(1)}s. Last lines:\n${tail}`,
  );
}
if (run.seconds > maxSeconds)
  fail(
    `install took ${run.seconds.toFixed(1)}s, over the ${maxSeconds}s budget`,
  );

const installed = installedExtensions(dirs.extensions);
const byId = new Map(installed.map((e) => [e.id, e]));
const pu = byId.get(PU_ID);

// Expected set: Power User plus the extensionDependencies it declares in its own package.json.
let required = [PU_ID];
if (pu) {
  const manifest = readJson(path.join(pu.dir, "package.json"));
  required = [
    PU_ID,
    ...(manifest.extensionDependencies || []).map((d) => d.toLowerCase()),
  ];
}
const missing = required.filter((id) => !byId.has(id));
if (missing.length) fail(`missing after install: ${missing.join(", ")}`);

// Version: the PR's VSIX in PR mode; otherwise the latest GitHub release, unless Cursor's mirror
// has not picked that release up yet (then the mirror-lag job reports it and this only warns).
let expected;
let galleryPick;
if (vsix) {
  expected = readJson(path.join(process.cwd(), "package.json")).version;
} else {
  const release = await latestRelease();
  galleryPick = resolveForTarget(await cursorGalleryVersions(PU_ID), target);
  if (galleryPick && compareVersions(galleryPick.version, release) < 0) {
    warn(
      `Cursor's gallery offers ${galleryPick.version} for ${target}, behind release ${release}; expecting ${galleryPick.version}`,
    );
    expected = galleryPick.version;
  } else {
    expected = release;
  }
}
if (pu && pu.version !== expected)
  fail(`installed Power User ${pu.version}, expected ${expected}`);

// Bytes: the size of each VSIX Cursor downloaded (from the gallery), plus the unpacked size on disk.
const rows = [];
let downloadTotal = 0;
let diskTotal = 0;
for (const ext of installed) {
  let bytes;
  if (vsix && ext.id === PU_ID) {
    bytes = fs.statSync(vsix).size;
  } else {
    try {
      const entry = (await cursorGalleryVersions(ext.id)).find(
        (v) => v.version === ext.version && v.target === ext.target,
      );
      bytes = entry ? await remoteSize(vsixUrl(entry)) : undefined;
    } catch (error) {
      warn(`could not size ${ext.id}: ${error.message}`);
    }
  }
  const disk = fs.existsSync(ext.dir) ? dirSize(ext.dir) : 0;
  downloadTotal += bytes || 0;
  diskTotal += disk;
  rows.push(
    `| ${ext.id} | ${ext.version} | ${ext.target} | ${mb(bytes)} | ${mb(disk)} |`,
  );
}

for (const w of warnings) annotate("warning", label, w);
for (const f of failures) annotate("error", label, f);

summary(
  [
    `### ${failures.length ? "❌" : "✅"} ${label}`,
    "",
    `Cursor ${cursor.version} (VS Code ${cursor.vscodeVersion}, commit ${cursor.commit.slice(0, 8)}). ` +
      `Install took **${run.seconds.toFixed(1)} s** (budget ${maxSeconds} s), exit ${run.code ?? run.signal}.`,
    `Downloaded **${mb(downloadTotal)}** (${downloadTotal} bytes) of VSIXes; ${mb(diskTotal)} unpacked.`,
    "",
    "| Extension | Version | Target | VSIX | On disk |",
    "|---|---|---|---|---|",
    ...rows,
    "",
    ...failures.map((f) => `- **Failed:** ${f.split("\n")[0]}`),
    ...warnings.map((w) => `- Warning: ${w}`),
    "",
  ].join("\n"),
);

fs.writeFileSync(
  path.join(work, "result.json"),
  JSON.stringify(
    {
      label,
      cursor,
      seconds: run.seconds,
      exit: run.code,
      installed,
      downloadTotal,
      diskTotal,
      failures,
      warnings,
    },
    null,
    2,
  ),
);
process.exit(failures.length ? 1 : 0);
