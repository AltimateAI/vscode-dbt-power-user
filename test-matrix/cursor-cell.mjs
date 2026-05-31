#!/usr/bin/env node
// Driver for one Cursor matrix cell (non-blocking fork lane, Linux only).
//
// Cursor is an Anysphere VSCode fork. @vscode/test-electron CANNOT drive it
// (it downloads/manages Microsoft VSCode), AND Cursor's bundled CLI shim hangs
// on headless `--install-extension` (verified: it wedges the job to timeout).
// So we install WITHOUT the CLI: download each .vsix (deps + baseline from Open
// VSX by id, target from the local build) and UNZIP it straight into a throwaway
// extensions-dir (a .vsix is a zip; installed layout is
// <ext-dir>/<publisher>.<name>-<version>/ holding the `extension/` contents).
// Then LAUNCH the extracted Cursor binary headless against the dbt fixture and
// scan its logs for the activation marker — mirroring the VSCode lane's assert.
//
// Usage:
//   node test-matrix/cursor-cell.mjs --bin <cursor AppRun> --mode fresh|upgrade \
//        --target <vsixPath> [--from <baselineVersion>] --out <result.json>
import { execFileSync, spawn } from "node:child_process";
import {
  closeSync, existsSync, mkdirSync, mkdtempSync, openSync, readdirSync,
  readFileSync, renameSync, rmSync, writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const EXTENSION_ID = "innoverio.vscode-dbt-power-user";
const OPENVSX = "https://open-vsx.org/api";
const VSIX_TARGET_PLATFORM = "linux-x64"; // runner arch — must match native deps
// Dependency extensions resolved from Open VSX by id (all verified present).
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

// Install a .vsix WITHOUT any editor CLI: unzip it and lay the `extension/`
// contents into <extDir>/<publisher>.<name>-<version>/ (VSCode's on-disk format).
function installVsixToDir(vsixPath, extDir) {
  const tmp = mkdtempSync(join(tmpdir(), "vsix-x-"));
  execFileSync("unzip", ["-q", "-o", vsixPath, "-d", tmp], { stdio: "pipe", timeout: 120_000 });
  const pkg = JSON.parse(readFileSync(join(tmp, "extension", "package.json"), "utf8"));
  const folder = `${pkg.publisher}.${pkg.name}-${pkg.version}`;
  const dest = join(extDir, folder);
  rmSync(dest, { recursive: true, force: true });
  renameSync(join(tmp, "extension"), dest);
  rmSync(tmp, { recursive: true, force: true });
  return `${pkg.publisher}.${pkg.name}`;
}

// Download a URL to a file using curl (handles Open VSX redirects + retries).
function curlDownload(url, outFile) {
  execFileSync(
    "curl", ["-fSL", "--retry", "3", "--retry-delay", "5", "-o", outFile, url],
    { stdio: "pipe", timeout: 180_000 },
  );
  return outFile;
}

// Resolve an Open VSX .vsix download URL for an extension id (+ optional version
// + target platform), via the registry metadata `files.download` field.
function openVsxDownloadUrl(extId, version, targetPlatform) {
  const [ns, name] = extId.split(".");
  const seg = [OPENVSX, ns, name];
  if (targetPlatform) seg.push(targetPlatform);
  if (version) seg.push(version);
  const meta = JSON.parse(execFileSync("curl", ["-fsSL", seg.join("/")], { encoding: "utf8", timeout: 60_000 }));
  return meta?.files?.download || null;
}

async function main() {
  const runtime = arg("runtime", "cursor"); // "cursor" | "windsurf" (any VSCode fork)
  const bin = resolve(arg("bin", ""));
  const mode = arg("mode", "fresh");
  const target = resolve(arg("target", ""));
  const fromVersion = arg("from", null);
  const outPath = resolve(arg("out", `/tmp/${runtime}-result.json`));
  const repoRoot = resolve(join(HERE, ".."));
  const fixture = join(repoRoot, "test-fixtures", "dbt-core-sample-duckdb");

  const result = {
    runtime, os: "linux", scenario: mode, from: fromVersion || null,
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

  const extDir = mkdtempSync(join(tmpdir(), `${runtime}-ext-`));
  const uddDir = mkdtempSync(join(tmpdir(), `${runtime}-udd-`));

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

    const hasExt = (id) => {
      try {
        return readdirSync(extDir).some((d) => d.toLowerCase().startsWith(id.toLowerCase()));
      } catch {
        return false;
      }
    };

    // 1. Dependencies: download each from Open VSX (by id) and unzip into the
    //    extensions-dir. No editor CLI involved (Cursor's shim hangs headless).
    const dl = mkdtempSync(join(tmpdir(), `${runtime}-dl-`));
    for (const dep of DEPS) {
      try {
        const url = openVsxDownloadUrl(dep, null, null);
        if (!url) throw new Error("not on Open VSX");
        const f = curlDownload(url, join(dl, `${dep}.vsix`));
        installVsixToDir(f, extDir);
        result.deps_resolved[dep] = hasExt(dep);
      } catch (e) {
        result.deps_resolved[dep] = false;
      }
    }

    // 2. Upgrade scenario: install the baseline (Open VSX, linux-x64) first.
    if (mode === "upgrade") {
      if (!fromVersion) throw new Error("--from <version> required for upgrade mode");
      const url = openVsxDownloadUrl(EXTENSION_ID, fromVersion, VSIX_TARGET_PLATFORM)
        || openVsxDownloadUrl(EXTENSION_ID, fromVersion, null);
      if (!url) throw new Error(`baseline ${fromVersion} not found on Open VSX`);
      const f = curlDownload(url, join(dl, `baseline-${fromVersion}.vsix`));
      installVsixToDir(f, extDir);
      if (!hasExt(EXTENSION_ID)) throw new Error(`baseline ${fromVersion} did not install`);
    }

    // 3. Install the target VSIX from the locally-built file (overwrites baseline).
    installVsixToDir(target, extDir);
    if (!hasExt(EXTENSION_ID)) throw new Error(`target VSIX not present in extensions-dir after install`);
    result.install_ok = true;

    // 4. Launch Cursor headless against the fixture (xvfb provided by the
    //    workflow via xvfb-run). Electron forks a whole process TREE, so launch
    //    it detached in its own process group and later kill the GROUP — killing
    //    only the AppRun wrapper leaves children alive that keep xvfb-run (and
    //    thus the CI job) hanging until the GHA timeout. Capture stdout/stderr to
    //    a file: the extension also console.*'s its logs, so the marker can show
    //    up there even before <udd>/logs/*.log files materialize — and it gives
    //    us something to diagnose with when activation doesn't happen.
    // One launch attempt: spawn the fork detached (own process group), wait up to
    // ACTIVATION_TIMEOUT_MS for the marker, always tear down the whole tree.
    // Electron forks a process TREE, so we kill the GROUP — killing only the
    // wrapper leaves children that keep xvfb-run (and the CI job) alive.
    const attemptLaunch = async (attempt) => {
      const suffix = `${mode}${fromVersion ? "-" + fromVersion : ""}${attempt > 1 ? "-retry" + attempt : ""}`;
      const consoleLog = join(dirname(outPath), `${runtime}-console-${suffix}.log`);
      const logFd = openSync(consoleLog, "w");
      const child = spawn(
        bin,
        ["--no-sandbox", "--disable-gpu", "--disable-workspace-trust",
         "--verbose", "--extensions-dir", extDir, "--user-data-dir", uddDir, fixture],
        { stdio: ["ignore", logFd, logFd], detached: true, env: { ...process.env, ELECTRON_RUN_AS_NODE: "" } },
      );
      child.unref();
      const pgid = child.pid; // detached => child is the process-group leader
      const killTree = () => {
        for (const sig of ["SIGTERM", "SIGKILL"]) {
          try { process.kill(-pgid, sig); } catch { /* group already gone */ }
        }
        try { closeSync(logFd); } catch { /* already closed */ }
      };
      // The marker can appear on the captured console OR in the log files.
      const readAll = () => readAllLogs(uddDir) + "\n" + (existsSync(consoleLog) ? readFileSync(consoleLog, "utf8") : "");
      const deadline = Date.now() + ACTIVATION_TIMEOUT_MS;
      let seen = "";
      let failMarker = false;
      try {
        while (Date.now() < deadline) {
          seen = readAll();
          if (seen.includes(INIT_FAIL)) { failMarker = true; break; }
          if (seen.includes(INIT_OK)) break;
          await sleep(3000);
        }
      } finally {
        killTree();
      }
      return { seen, failMarker };
    };

    // Forks occasionally CRASH on launch (transient DBus/Electron error → a tiny
    // log, no extension host). Retry ONCE in that case only. Do NOT retry when the
    // host loaded but the dbt marker simply wasn't reached — that's a real signal.
    const MAX_LAUNCH_ATTEMPTS = 2;
    let seen = "";
    let failMarker = false;
    for (let attempt = 1; attempt <= MAX_LAUNCH_ATTEMPTS; attempt++) {
      ({ seen, failMarker } = await attemptLaunch(attempt));
      if (seen.includes(INIT_OK) || failMarker) break;
      const extSeen = seen.toLowerCase().includes(EXTENSION_ID.toLowerCase());
      const looksLikeCrash = !extSeen && seen.length < 5000; // tiny log + no ext host
      if (attempt < MAX_LAUNCH_ATTEMPTS && looksLikeCrash) {
        console.log(`[matrix] ${runtime}/${mode} launch attempt ${attempt} crashed (logBytes=${seen.length}); retrying once`);
        rmSync(join(uddDir, "logs"), { recursive: true, force: true }); // clean slate; keep installed extensions
        continue;
      }
      break;
    }

    if (failMarker) throw new Error(`found '${INIT_FAIL}' in ${runtime} logs`);
    if (!seen.includes(INIT_OK)) {
      // Attach a diagnostic so a non-observed marker is actionable, not opaque:
      // did the fork start? did the extension host load + activate our extension?
      const ext = seen.toLowerCase().includes(EXTENSION_ID.toLowerCase());
      const host = /extension host|exthost|starting extension host/i.test(seen);
      const activated = /activat(e|ing|ed).*dbt|dbtPowerUser/i.test(seen);
      const tail = seen.split("\n").filter(Boolean).slice(-12).join(" ⏎ ").slice(0, 350);
      throw new Error(
        `did not observe '${INIT_OK}' within ${ACTIVATION_TIMEOUT_MS / 1000}s ` +
        `[extSeen=${ext} hostSeen=${host} activationSeen=${activated} logBytes=${seen.length}] tail: ${tail}`,
      );
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
    console.log(`[matrix] ${runtime}/linux/${mode} -> ${result.status}: ${result.reason || "ok"}`);
  }

  // Fork lanes are NON-BLOCKING: always exit 0 so the cell never fails the job;
  // pass/fail is conveyed only via RESULT_JSON, which the aggregator renders as ⚠️.
  process.exit(0);
}

main();
