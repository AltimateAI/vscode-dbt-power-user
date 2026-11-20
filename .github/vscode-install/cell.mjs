// Install a Power User VSIX into stock VS Code, in fresh isolated folders, and check that it
// activates and parses a dbt project (the check is harness/extension.js).
//
//   node cell.mjs --vsix <file> --version <x.y.z> --mode fresh|upgrade --python <interpreter>
//                 --work <dir> [--vscode stable] [--cache <dir>] [--baseline <x.y.z>]
//
// fresh:   install the VSIX, launch, check.
// upgrade: install the newest stable Marketplace release older than --version (or --baseline),
//          launch and check it, so it activates and writes its state; then install the VSIX over
//          it, relaunch the same profile and check again.
// Extension dependencies come from the Marketplace, as the editor resolves them for users.
// TEST_ELECTRON points at an installed @vscode/test-electron package (download and CLI only).
import { spawn, spawnSync } from "node:child_process";
import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  annotate,
  fetchRetry,
  installedExtensions,
  log,
  MCP_ID,
  parseArgs,
  PU_ID,
  summary,
  vsceTarget,
} from "../cursor-install/lib.mjs";
import {
  MARKETPLACE_QUERY,
  mayClearWork,
  pickBaseline,
  projectFiles,
  shellQuote,
  versionsFromQuery,
  versionsQuery,
  WORK_MARKER,
} from "./lib.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const MODEL = "vsix_check";
const LAUNCH_TIMEOUT_MS = 8 * 60 * 1000;

const args = parseArgs(process.argv.slice(2));
for (const required of ["vsix", "version", "mode", "python", "work"]) {
  if (typeof args[required] !== "string") {
    console.error(`--${required} is required`);
    process.exit(2);
  }
}
if (!["fresh", "upgrade"].includes(args.mode)) {
  console.error(`--mode must be fresh or upgrade, got ${args.mode}`);
  process.exit(2);
}
if (!process.env.TEST_ELECTRON) {
  console.error(
    "TEST_ELECTRON must point at an installed @vscode/test-electron",
  );
  process.exit(2);
}

const require = createRequire(import.meta.url);
const testElectron = require(path.resolve(process.env.TEST_ELECTRON));

const vsix = path.resolve(args.vsix);
const work = path.resolve(args.work);
const python = path.resolve(args.python);
const target = vsceTarget();
const dirs = {
  userData: path.join(work, "user-data"),
  extensions: path.join(work, "extensions"),
  project: path.join(work, "project"),
};
const profileArgs = [
  `--user-data-dir=${dirs.userData}`,
  `--extensions-dir=${dirs.extensions}`,
];
const download = {
  version: args.vscode || "stable",
  cachePath: path.resolve(args.cache || path.join(work, "..", "vscode-test")),
};
// The editor's environment: no ELECTRON_RUN_AS_NODE from the caller, and no y/N prompt from the
// Linux launcher when run under WSL.
const editorEnv = {
  ...process.env,
  ELECTRON_RUN_AS_NODE: undefined,
  DONT_PROMPT_WSL_INSTALL: "1",
};

const cell = {
  target,
  mode: args.mode,
  vsix: path.basename(vsix),
  version: args.version,
  phases: [],
};

function writeProject() {
  const files = projectFiles(MODEL, path.join(work, `${MODEL}.duckdb`));
  for (const [rel, text] of Object.entries(files)) {
    const file = path.join(dirs.project, rel);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, text);
  }
}

function writeSettings() {
  const settings = {
    "dbt.dbtPythonPathOverride": python,
    "python.defaultInterpreterPath": python,
    // The profile must keep the versions this check installed.
    "extensions.autoUpdate": false,
    "extensions.autoCheckUpdates": false,
    "update.mode": "none",
    "telemetry.telemetryLevel": "off",
    "workbench.startupEditor": "none",
  };
  const file = path.join(dirs.userData, "User", "settings.json");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(settings, null, 2));
}

async function editorCli(cliArgs) {
  const all = [...profileArgs, ...cliArgs];
  log("code", cliArgs.join(" "));
  const { stdout, stderr } = await testElectron.runVSCodeCommand(
    process.platform === "win32" ? shellQuote(all) : all,
    { ...download, spawn: { env: editorEnv } },
  );
  const output = `${stdout}${stderr}`.trim();
  if (output) console.log(output);
  return output;
}

// The Power User build and the dependency the editor installed, from extensions.json.
function checkInstalled(version) {
  const installed = installedExtensions(dirs.extensions);
  const pu = installed.filter((e) => e.id === PU_ID);
  if (pu.length !== 1 || pu[0].version !== version)
    throw new Error(
      `expected one ${PU_ID} ${version}, extensions.json lists ${
        pu.map((e) => e.version).join(", ") || "none"
      }`,
    );
  if (!installed.some((e) => e.id === MCP_ID))
    throw new Error(`the editor did not install the dependency ${MCP_ID}`);
  return installed.map((e) => `${e.id}@${e.version}`);
}

// Names of the keys Power User keeps in VS Code's global state, read with the check's Python from
// the profile's User/globalStorage/state.vscdb once VS Code has exited. Values are not read.
function globalStateKeys() {
  const db = path.join(dirs.userData, "User", "globalStorage", "state.vscdb");
  if (!fs.existsSync(db)) return undefined;
  const script = [
    "import json, sqlite3, sys",
    "row = sqlite3.connect(sys.argv[1]).execute('select value from ItemTable where key = ?', (sys.argv[2],)).fetchone()",
    "print(json.dumps(sorted(json.loads(row[0]).keys()) if row else []))",
  ].join("\n");
  const out = spawnSync(python, ["-I", "-c", script, db, PU_ID], {
    encoding: "utf8",
  });
  if (out.status !== 0) throw new Error(`reading ${db}: ${out.stderr.trim()}`);
  return JSON.parse(out.stdout);
}

// Launch VS Code on the project with the harness extension (not a test run: a test run keeps
// state in memory). The harness writes its result and quits VS Code.
async function launch(phase, version) {
  fs.rmSync(path.join(dirs.project, "target"), {
    recursive: true,
    force: true,
  });
  const logs = path.join(work, `logs-${phase}`);
  const resultFile = path.join(work, `check-${phase}.json`);
  fs.rmSync(resultFile, { force: true });
  const exe = await testElectron.downloadAndUnzipVSCode(download);
  const launchArgs = [
    dirs.project,
    ...profileArgs,
    `--extensionDevelopmentPath=${path.join(HERE, "harness")}`,
    `--logsPath=${logs}`,
    // Debug level for Power User only: its "Initialized dbt project" line is a debug line.
    `--log=${PU_ID}:debug`,
    "--no-sandbox",
    "--disable-gpu-sandbox",
    "--disable-updates",
    "--skip-welcome",
    "--skip-release-notes",
    "--disable-workspace-trust",
  ];
  const output = fs.openSync(path.join(work, `vscode-${phase}.log`), "w");
  const started = Date.now();
  log(`launch VS Code (${phase}): expect ${PU_ID} ${version}`);
  const exit = await new Promise((resolve) => {
    const child = spawn(exe, launchArgs, {
      env: {
        ...editorEnv,
        VSIX_CHECK_VERSION: version,
        VSIX_CHECK_PROJECT: dirs.project,
        VSIX_CHECK_MODEL: MODEL,
        VSIX_CHECK_LOGS: logs,
        VSIX_CHECK_RESULT: resultFile,
        DBT_PROFILES_DIR: path.join(dirs.project, "profiles"),
      },
      stdio: ["ignore", output, output],
    });
    const timer = setTimeout(() => {
      child.kill("SIGKILL");
      resolve({ timedOut: true });
    }, LAUNCH_TIMEOUT_MS);
    child.on("error", (error) => {
      clearTimeout(timer);
      resolve({ error });
    });
    child.on("exit", (code, signal) => {
      clearTimeout(timer);
      resolve({ code, signal });
    });
  });
  fs.closeSync(output);
  const seen = fs.existsSync(resultFile)
    ? JSON.parse(fs.readFileSync(resultFile, "utf8"))
    : {
        ok: false,
        error: exit.timedOut
          ? `VS Code didn't finish within ${LAUNCH_TIMEOUT_MS / 60000} min`
          : `the harness wrote no result (VS Code exited: ${exit.error || exit.code || exit.signal})`,
      };
  const entry = {
    phase,
    expected: version,
    seconds: Math.round((Date.now() - started) / 1000),
    ...seen,
  };
  cell.phases.push(entry);
  if (!seen.ok) throw new Error(`${phase}: ${seen.error}`);
  // The harness quits VS Code after writing its result. Only a clean exit has flushed the state
  // the next launch reads, so a hang (killed on the timer) or a crash fails the launch too.
  if (exit.code !== 0) {
    const how = exit.timedOut
      ? `killed after ${LAUNCH_TIMEOUT_MS / 60000} min`
      : exit.error || `exit code ${exit.code}, signal ${exit.signal}`;
    throw new Error(
      `${phase}: the check passed but VS Code didn't exit cleanly (${how})`,
    );
  }
  // Read from the profile on disk after VS Code exited: what the next launch starts from.
  entry.globalStateKeys = globalStateKeys();
  log(`${phase}: ok`, JSON.stringify(entry));
}

async function marketplaceBaseline() {
  const res = await fetchRetry(MARKETPLACE_QUERY, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json;api-version=3.0-preview.1",
    },
    body: JSON.stringify(versionsQuery(PU_ID)),
  });
  if (!res.ok) throw new Error(`Marketplace version query: HTTP ${res.status}`);
  const baseline = pickBaseline(
    versionsFromQuery(await res.json()),
    target,
    args.version,
  );
  if (!baseline)
    throw new Error(
      `no stable Marketplace release older than ${args.version} for ${target}`,
    );
  return baseline;
}

// Empty --work for this run, deleting it only when mayClearWork allows: --work names a folder to
// delete, and a mistyped one (~, .) must not be wiped. Exits before anything is written.
function resetWork() {
  let entries;
  try {
    entries = fs.readdirSync(work);
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.error(`--work ${work}: ${error.message}`);
      process.exit(2);
    }
  }
  if (!mayClearWork(entries)) {
    console.error(
      `--work ${work} already holds files and wasn't created by this script (no ${WORK_MARKER}). ` +
        "Name a new or empty folder.",
    );
    process.exit(2);
  }
  fs.rmSync(work, { recursive: true, force: true });
  fs.mkdirSync(work, { recursive: true });
  fs.writeFileSync(path.join(work, WORK_MARKER), "");
}

async function main() {
  Object.values(dirs).forEach((d) => fs.mkdirSync(d, { recursive: true }));
  writeProject();
  writeSettings();

  if (args.mode === "upgrade") {
    cell.baseline = args.baseline || (await marketplaceBaseline());
    await editorCli(["--install-extension", `${PU_ID}@${cell.baseline}`]);
    cell.installedBaseline = checkInstalled(cell.baseline);
    await launch("baseline", cell.baseline);
    // The upgrade only tests something if the baseline left state for the new build to read.
    if (!cell.phases[0].globalStateKeys?.length)
      throw new Error(`${cell.baseline} left no global state in the profile`);
  }
  await editorCli(["--install-extension", vsix]);
  cell.installed = checkInstalled(args.version);
  await launch("vsix", args.version);
}

resetWork();
let failure;
try {
  await main();
} catch (error) {
  failure = error;
}
cell.ok = !failure;
if (failure) cell.error = String(failure.message || failure);
fs.writeFileSync(path.join(work, "result.json"), JSON.stringify(cell, null, 2));

const rows = cell.phases
  .map(
    (p) =>
      `| ${p.phase} | ${p.expected} | ${p.ok ? "pass" : "fail"} | ${p.activateMs ?? "-"} | ${
        p.manifestMs ?? "-"
      } | ${p.globalStateKeys ? p.globalStateKeys.length : "-"} | ${p.seconds} |`,
  )
  .join("\n");
summary(
  [
    `### VS Code install: ${target}, ${cell.mode}${cell.baseline ? ` from ${cell.baseline}` : ""}`,
    "",
    `VSIX \`${cell.vsix}\` (${cell.version}): **${cell.ok ? "pass" : "fail"}**`,
    "",
    "| launch | version | result | activate() ms | manifest ms | global state keys | seconds |",
    "|---|---|---|---|---|---|---|",
    rows,
    "",
    failure ? `Failure: ${cell.error}` : "",
  ].join("\n"),
);
if (failure) {
  annotate("error", `VS Code install (${target}, ${cell.mode})`, cell.error);
  process.exit(1);
}
