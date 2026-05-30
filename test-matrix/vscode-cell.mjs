#!/usr/bin/env node
// Driver for one VSCode/Insiders matrix cell. Downloads a real editor, installs
// the extension (+ dependencies) via the editor CLI, launches it headless against
// the dbt-core-sample-duckdb fixture, and writes a RESULT_JSON.
//
// Usage:
//   node test-matrix/vscode-cell.mjs --mode fresh|upgrade --target <vsixPath|latest> \
//        [--from <baselineVersion>] [--vscode-version stable|insiders|x.y.z] --out <result.json>
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  downloadAndUnzipVSCode,
  resolveCliArgsFromVSCodeExecutablePath,
  runTests,
} from "@vscode/test-electron";

const HERE = dirname(fileURLToPath(import.meta.url));
const EXTENSION_ID = "innoverio.vscode-dbt-power-user";
const DEPS = ["samuelcolvin.jinjahtml", "ms-python.python", "altimateai.vscode-altimate-mcp-server"];

function arg(name, def = undefined) {
  const i = process.argv.indexOf(`--${name}`);
  if (i === -1) return def;
  const v = process.argv[i + 1];
  return v && !v.startsWith("--") ? v : true;
}

function osLabel() {
  if (process.platform === "darwin") return "macos";
  if (process.platform === "win32") return "windows";
  return "linux";
}

async function main() {
  const mode = arg("mode", "fresh");
  const target = arg("target", "latest"); // vsix path or "latest"
  const fromVersion = arg("from", null);
  const vscodeVersion = arg("vscode-version", "stable"); // stable | insiders | x.y.z
  const outPath = resolve(arg("out", "/tmp/result.json"));
  const repoRoot = resolve(join(HERE, ".."));
  const fixture = join(repoRoot, "test-fixtures", "dbt-core-sample-duckdb");
  const runtime = vscodeVersion === "insiders" ? "vscode-insiders" : "vscode";

  const result = {
    runtime, os: osLabel(), scenario: mode, from: fromVersion || null,
    to: target === "latest" ? "latest" : "pr-build", install_ok: false,
    deps_resolved: {}, activation_ok: false, dbt_flow_ok: false,
    status: "fail", reason: "", duration_s: 0, log_artifact: outPath,
  };
  const started = Date.now();

  const extDir = mkdtempSync(join(tmpdir(), "matrix-ext-"));
  const uddDir = mkdtempSync(join(tmpdir(), "matrix-udd-"));

  // Pre-seed user settings so the extension finds dbt (via the hermetic venv's
  // python) and so the test run does NOT emit real telemetry to App Insights.
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
        "redhat.telemetry.enabled": false,
        "workbench.startupEditor": "none",
      },
      null,
      2,
    ),
  );

  try {
    // 1. Download the editor + resolve its CLI.
    const exe = await downloadAndUnzipVSCode(vscodeVersion);
    const [cli, ...baseArgs] = resolveCliArgsFromVSCodeExecutablePath(exe);
    // On Windows the resolved CLI is a `.cmd` (code.cmd); execFileSync cannot run
    // a batch file without a shell, so enable shell there (per @vscode/test-electron).
    const cliRun = (extraArgs) =>
      execFileSync(cli, [...baseArgs, "--extensions-dir", extDir, "--user-data-dir", uddDir, ...extraArgs],
        { stdio: "pipe", encoding: "utf8", shell: process.platform === "win32" });

    // 2. Install dependencies (real VSCode resolves ms-python.python from the MS marketplace).
    for (const dep of DEPS) {
      try {
        cliRun(["--install-extension", dep, "--force"]);
        result.deps_resolved[dep] = true;
      } catch {
        result.deps_resolved[dep] = false;
      }
    }

    // 3. Upgrade scenario: install the baseline first.
    if (mode === "upgrade") {
      if (!fromVersion) throw new Error("--from <version> required for upgrade mode");
      cliRun(["--install-extension", `${EXTENSION_ID}@${fromVersion}`, "--force"]);
    }

    // 4. Install the target (a built .vsix path, or latest from marketplace).
    const targetArg = target === "latest" ? EXTENSION_ID : resolve(target);
    if (target !== "latest" && !existsSync(targetArg)) throw new Error(`vsix not found: ${targetArg}`);
    cliRun(["--install-extension", targetArg, "--force"]);

    // 5. Verify the target is present.
    const listed = cliRun(["--list-extensions", "--show-versions"]);
    if (!listed.toLowerCase().includes(EXTENSION_ID.toLowerCase())) {
      throw new Error(`extension not present after install:\n${listed}`);
    }
    result.install_ok = true;

    // 6. Launch headless against the fixture; the in-host suite asserts activation + dbt init.
    await runTests({
      vscodeExecutablePath: exe,
      extensionDevelopmentPath: join(repoRoot, "test-matrix", "harness-ext"),
      extensionTestsPath: join(repoRoot, "out", "test", "matrix", "index"),
      launchArgs: [
        "--extensions-dir", extDir,
        "--user-data-dir", uddDir,
        "--log", "trace",
        "--disable-workspace-trust",
        fixture,
      ],
      extensionTestsEnv: {
        ...process.env,
        MATRIX_UDD: uddDir,
        DBT_PROFILES_DIR: process.env.DBT_PROFILES_DIR ?? "",
      },
    });

    // runTests resolves only if all in-host tests passed.
    result.activation_ok = true;
    result.dbt_flow_ok = true;
    result.status = "pass";
  } catch (err) {
    result.reason = String(err && err.message ? err.message : err).slice(0, 500);
    // Distinguish install failure from activation/dbt failure for the report.
    if (result.install_ok && !result.activation_ok) {
      result.activation_ok = false;
      result.dbt_flow_ok = false;
    }
  } finally {
    result.duration_s = Math.round((Date.now() - started) / 1000);
    writeFileSync(outPath, JSON.stringify(result, null, 2));
    console.log(`[matrix] ${runtime}/${result.os}/${mode} -> ${result.status}: ${result.reason || "ok"}`);
  }

  process.exit(result.status === "pass" ? 0 : 1);
}

main();
