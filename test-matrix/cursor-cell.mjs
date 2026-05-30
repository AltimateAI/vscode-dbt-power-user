#!/usr/bin/env node
// Driver for one Cursor matrix cell (non-blocking fork lane, Linux only).
//
// Cursor is an Anysphere VSCode fork. @vscode/test-electron CANNOT drive it
// (it downloads/manages Microsoft VSCode), so we drive the extracted Cursor
// binary directly: install deps + our VSIX via Cursor's bundled VSCode CLI into
// throwaway dirs, then LAUNCH Cursor headless against the dbt fixture and scan
// its logs for the activation marker — mirroring the in-host assertion the
// VSCode lane makes, but without runTests().
//
// Usage:
//   node test-matrix/cursor-cell.mjs --bin <cursor AppRun> --mode fresh|upgrade \
//        --target <vsixPath> [--from <baselineVersion>] --out <result.json>
import { execFileSync, spawn } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const EXTENSION_ID = "innoverio.vscode-dbt-power-user";
const DEPS = ["samuelcolvin.jinjahtml", "ms-python.python", "altimateai.vscode-altimate-mcp-server"];
const INIT_OK = "Initialized dbt project";
const INIT_FAIL = "Unable to register dbt project";
const ACTIVATION_TIMEOUT_MS = 90_000;   // matches the VSCode lane's in-host wait
// Absolute backstop: the whole cell (download already done by provisioner) must
// finish well under the job timeout even if Cursor wedges. SIGKILLs the node
// process so xvfb-run returns and the job ends with a written RESULT_JSON.
const HARD_DEADLINE_MS = 8 * 60_000;

function arg(name, def = undefined) {
  const i = process.argv.indexOf(`--${name}`);
  if (i === -1) return def;
  const v = process.argv[i + 1];
  return v && !v.startsWith("--") ? v : true;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Locate the bundled VSCode-style CLI inside the extracted Cursor tree. Cursor
// ships it under resources/app/bin/. Falls back to AppRun if not found.
function resolveCursorCli(bin) {
  const root = dirname(bin); // squashfs-root/
  for (const c of ["resources/app/bin/cursor", "resources/app/bin/code", "bin/cursor", "bin/code"]) {
    const p = join(root, c);
    if (existsSync(p)) return p;
  }
  return bin; // AppRun accepts the same CLI flags as a last resort
}

// Recursively read every *.log under a dir (Cursor writes LogOutputChannels +
// console output under <user-data-dir>/logs/**).
function readAllLogs(uddDir) {
  const out = [];
  const stack = [join(uddDir, "logs")];
  while (stack.length) {
    const dir = stack.pop();
    let entries = [];
    try {
      entries = readdirSync(dir, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const e of entries) {
      const p = join(dir, e.name);
      if (e.isDirectory()) stack.push(p);
      else if (e.name.endsWith(".log")) {
        try {
          out.push(readFileSync(p, "utf8"));
        } catch {
          /* ignore rotating log */
        }
      }
    }
  }
  return out.join("\n");
}

async function main() {
  const bin = resolve(arg("bin", ""));
  const mode = arg("mode", "fresh");
  const target = resolve(arg("target", ""));
  const fromVersion = arg("from", null);
  const outPath = resolve(arg("out", "/tmp/cursor-result.json"));
  const repoRoot = resolve(join(HERE, ".."));
  const fixture = join(repoRoot, "test-fixtures", "dbt-core-sample-duckdb");

  const result = {
    runtime: "cursor", os: "linux", scenario: mode, from: fromVersion || null,
    to: "pr-build", install_ok: false, deps_resolved: {},
    activation_ok: false, dbt_flow_ok: false,
    status: "fail", reason: "", duration_s: 0, log_artifact: outPath,
  };
  const started = Date.now();

  // Absolute backstop so the cell can never hang the CI job: if anything wedges
  // (e.g. a Cursor child tree refusing to die), write a timeout RESULT_JSON and
  // hard-exit so xvfb-run returns. unref() so it never keeps node alive itself.
  const hardTimer = setTimeout(() => {
    if (result.status !== "pass") {
      result.reason = result.reason || `hard timeout after ${HARD_DEADLINE_MS / 1000}s`;
      result.duration_s = Math.round((Date.now() - started) / 1000);
      try { writeFileSync(outPath, JSON.stringify(result, null, 2)); } catch { /* best effort */ }
    }
    console.log(`[matrix] cursor/linux/${mode} -> ${result.status} (hard-exit)`);
    process.exit(0);
  }, HARD_DEADLINE_MS);
  hardTimer.unref();

  const extDir = mkdtempSync(join(tmpdir(), "cursor-ext-"));
  const uddDir = mkdtempSync(join(tmpdir(), "cursor-udd-"));

  // Seed user settings so the extension finds dbt (hermetic venv python) and
  // does NOT emit real telemetry during the test.
  const userDir = join(uddDir, "User");
  mkdirSync(userDir, { recursive: true });
  const pyInterp = process.env.PY_INTERP || "";
  writeFileSync(
    join(userDir, "settings.json"),
    JSON.stringify(
      {
        "dbt.dbtIntegration": "core",
        ...(pyInterp ? { "dbt.dbtPythonPathOverride": pyInterp } : {}),
        "dbt.altimateAiKey": "",
        "telemetry.telemetryLevel": "off",
        "workbench.startupEditor": "none",
      },
      null, 2,
    ),
  );

  try {
    if (!bin || !existsSync(bin)) throw new Error(`cursor binary not found: ${bin}`);
    if (!existsSync(target)) throw new Error(`vsix not found: ${target}`);
    const cli = resolveCursorCli(bin);

    // Cursor's CLI shim can open the GUI and NEVER return — execFileSync would
    // then block the event loop forever (the async hard-timeout can't fire). So
    // every CLI call gets a hard `timeout` + SIGKILL; on timeout it throws and we
    // fall through to the extensions-dir check. ALWAYS verify by inspecting the
    // dir, never trust the exit code.
    const CLI_TIMEOUT_MS = 90_000;
    const cliRun = (extraArgs) =>
      execFileSync(cli, ["--no-sandbox", "--extensions-dir", extDir, "--user-data-dir", uddDir, ...extraArgs],
        {
          stdio: "pipe", encoding: "utf8",
          timeout: CLI_TIMEOUT_MS, killSignal: "SIGKILL",
          env: { ...process.env, ELECTRON_RUN_AS_NODE: "" },
        });

    const installedIds = () => {
      try {
        return readdirSync(extDir).map((d) => d.toLowerCase());
      } catch {
        return [];
      }
    };
    const hasExt = (id) => installedIds().some((d) => d.startsWith(id.toLowerCase()));

    // 1. Dependencies (resolved from Open VSX — ms-python.python likely WON'T be
    //    there; recorded, not fatal, matching the P3 portability finding).
    for (const dep of DEPS) {
      try {
        cliRun(["--install-extension", dep, "--force"]);
      } catch {
        /* fall through to dir check */
      }
      result.deps_resolved[dep] = hasExt(dep);
    }

    // 2. Upgrade scenario: install the baseline from Open VSX first.
    if (mode === "upgrade") {
      if (!fromVersion) throw new Error("--from <version> required for upgrade mode");
      try {
        cliRun(["--install-extension", `${EXTENSION_ID}@${fromVersion}`, "--force"]);
      } catch {
        /* verified below */
      }
      if (!hasExt(EXTENSION_ID)) throw new Error(`baseline ${fromVersion} did not install (Open VSX?)`);
    }

    // 3. Install the target VSIX from the local file.
    try {
      cliRun(["--install-extension", target, "--force"]);
    } catch {
      /* verified below */
    }
    if (!hasExt(EXTENSION_ID)) throw new Error(`target VSIX not present in extensions-dir after install`);
    result.install_ok = true;

    // 4. Launch Cursor headless against the fixture (xvfb provided by the
    //    workflow via xvfb-run). Electron forks a whole process TREE, so launch
    //    it detached in its own process group and later kill the GROUP — killing
    //    only the AppRun wrapper leaves children alive that keep xvfb-run (and
    //    thus the CI job) hanging until the GHA timeout.
    const child = spawn(
      bin,
      ["--no-sandbox", "--disable-gpu", "--disable-workspace-trust",
       "--extensions-dir", extDir, "--user-data-dir", uddDir, fixture],
      { stdio: "ignore", detached: true, env: { ...process.env, ELECTRON_RUN_AS_NODE: "" } },
    );
    child.unref();
    const pgid = child.pid; // detached => child is the process-group leader

    const killCursorTree = () => {
      for (const sig of ["SIGTERM", "SIGKILL"]) {
        try { process.kill(-pgid, sig); } catch { /* group already gone */ }
      }
    };

    const deadline = Date.now() + ACTIVATION_TIMEOUT_MS;
    let seen = "";
    try {
      while (Date.now() < deadline) {
        seen = readAllLogs(uddDir);
        if (seen.includes(INIT_FAIL)) throw new Error(`found '${INIT_FAIL}' in Cursor logs`);
        if (seen.includes(INIT_OK)) break;
        await sleep(3000);
      }
    } finally {
      killCursorTree();
    }

    if (!seen.includes(INIT_OK)) {
      throw new Error(`did not observe '${INIT_OK}' within ${ACTIVATION_TIMEOUT_MS / 1000}s`);
    }
    // Reaching the marker means the extension host loaded our extension and it
    // registered the dbt project against the fixture — activation + dbt flow OK.
    result.activation_ok = true;
    result.dbt_flow_ok = true;
    result.status = "pass";
  } catch (err) {
    result.reason = String(err && err.message ? err.message : err).slice(0, 600);
  } finally {
    clearTimeout(hardTimer);
    result.duration_s = Math.round((Date.now() - started) / 1000);
    writeFileSync(outPath, JSON.stringify(result, null, 2));
    console.log(`[matrix] cursor/linux/${mode} -> ${result.status}: ${result.reason || "ok"}`);
  }

  // Cursor is a NON-BLOCKING lane: always exit 0 so the cell never fails the job;
  // pass/fail is conveyed only via RESULT_JSON, which the aggregator renders as ⚠️.
  process.exit(0);
}

main();
