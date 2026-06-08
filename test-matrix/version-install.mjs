#!/usr/bin/env node
// Standalone local tester: install a SPECIFIC dbt Power User extension version on
// a SPECIFIC VS Code version, optionally against a SPECIFIC dbt-core version, in
// full isolation, and verify it all landed.
//
// - VS Code: downloaded as a throwaway build via @vscode/test-electron (cached
//   under .vscode-test/). Your installed editor/extensions/settings are untouched.
// - Extension: installed from the marketplace (or a local .vsix) into a temp
//   --extensions-dir, then read back with --list-extensions --show-versions.
// - dbt-core (optional): a hermetic venv pinned to dbt-core==<ver> + a matching
//   dbt-duckdb adapter; the duckdb fixture is parsed to prove the stack works, and
//   the extension is pointed at that interpreter.
// No Docker required (so it sidesteps the code-server mount setup entirely).
//
// Usage:
//   node test-matrix/version-install.mjs --vscode <x.y.z|stable|insiders> \
//        --extension <x.y.z|latest|/path/to.vsix> [--dbt <x.y.z>] [--from <x.y.z>] [--launch]
//
// Examples:
//   node test-matrix/version-install.mjs --extension 0.61.5 --dbt 1.10.18
//   node test-matrix/version-install.mjs --vscode 1.117.0 --extension 0.61.5 --dbt 1.10.18
//   node test-matrix/version-install.mjs --vscode 1.117.0 --extension 0.61.6 --from 0.61.4   # upgrade
//   node test-matrix/version-install.mjs --extension 0.61.5 --dbt 1.10.18 --launch           # open it to click around
import { execFileSync, spawn } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  downloadAndUnzipVSCode,
  resolveCliArgsFromVSCodeExecutablePath,
} from "@vscode/test-electron";

const HERE = dirname(fileURLToPath(import.meta.url));
const EXT_ID = "innoverio.vscode-dbt-power-user";
// Activation dependencies — only installed when --launch is used (a bare install
// check doesn't need them, and skipping keeps the default path fast + offline-ish).
const DEPS = ["samuelcolvin.jinjahtml", "ms-python.python"];
const isSemver = (v) => typeof v === "string" && /^\d+\.\d+\.\d+$/.test(v);

function arg(name, def = undefined) {
  const i = process.argv.indexOf(`--${name}`);
  if (i === -1) return def;
  const v = process.argv[i + 1];
  return v && !v.startsWith("--") ? v : true;
}

const C = { red: "\x1b[1;31m", grn: "\x1b[1;32m", cyn: "\x1b[1;36m", rst: "\x1b[0m" };
const say = (m) => console.log(`${C.cyn}== ${m}${C.rst}`);
const ok = (m) => console.log(`${C.grn}✓ ${m}${C.rst}`);
const bad = (m) => console.log(`${C.red}✗ ${m}${C.rst}`);
const sh = (cmd, args, opts = {}) =>
  execFileSync(cmd, args, { stdio: "pipe", encoding: "utf8", ...opts });

// Build a hermetic venv pinned to a specific dbt-core version (+ a matching
// dbt-duckdb adapter for the duckdb fixture), prove the fixture parses with it,
// and return the interpreter path so the extension can be pointed at it.
function buildDbtVenv(dbtVersion, fixture) {
  const venv = mkdtempSync(join(tmpdir(), "vi-dbt-"));
  const binDir = join(venv, process.platform === "win32" ? "Scripts" : "bin");
  const py = join(binDir, process.platform === "win32" ? "python.exe" : "python");
  const dbtBin = join(binDir, process.platform === "win32" ? "dbt.exe" : "dbt");
  const [maj, min] = dbtVersion.split(".");
  const adapter = `dbt-duckdb>=${maj}.${min},<${maj}.${Number(min) + 1}`;

  say(`Creating dbt venv pinned to dbt-core==${dbtVersion} (+ ${adapter})`);
  sh("python3", ["-m", "venv", venv]);
  sh(py, ["-m", "pip", "install", "--quiet", "--upgrade", "pip"]);
  sh(py, ["-m", "pip", "install", "--quiet", `dbt-core==${dbtVersion}`, adapter]);

  const verOut = sh(dbtBin, ["--version"]);
  const m = verOut.match(/installed:\s*([0-9]+\.[0-9]+\.[0-9]+)/i);
  const got = m ? m[1] : "unknown";
  if (got !== dbtVersion) {
    throw new Error(`dbt-core version mismatch: requested ${dbtVersion}, venv resolved ${got}`);
  }
  ok(`dbt-core ${got} installed in venv`);

  // Hermetic profiles, then parse the fixture to prove the stack is coherent.
  const profilesDir = mkdtempSync(join(tmpdir(), "vi-prof-"));
  writeFileSync(
    join(profilesDir, "profiles.yml"),
    `dbt_core_sample_duckdb:\n  target: go_sales\n  outputs:\n    go_sales:\n      type: duckdb\n      path: '${join(profilesDir, "go_sales.duckdb")}'\n`,
  );
  const env = { ...process.env, DBT_PROFILES_DIR: profilesDir };
  try {
    sh(dbtBin, ["deps"], { cwd: fixture, env });
  } catch {
    /* deps may need network / be optional for this fixture */
  }
  try {
    sh(dbtBin, ["parse"], { cwd: fixture, env });
    ok(`fixture parses with dbt-core ${got}`);
  } catch (e) {
    const why = String((e && (e.stderr || e.message)) || e).trim().slice(0, 200);
    bad(`fixture parse failed under dbt-core ${got} (extension install still valid): ${why}`);
  }
  return { py, dbtVersion: got, profilesDir };
}

async function main() {
  const vscodeVersion = arg("vscode", "stable"); // x.y.z | stable | insiders
  const extension = arg("extension", "latest"); // x.y.z | latest | path to .vsix
  const dbtVersion = arg("dbt", null); // optional: pin dbt-core to this version
  const fromVersion = arg("from", null); // optional: install this first, then upgrade
  const launch = arg("launch", false);
  const fixture = join(resolve(join(HERE, "..")), "test-fixtures", "dbt-core-sample-duckdb");

  if (dbtVersion && !isSemver(dbtVersion)) {
    console.log(`${C.red}FAIL${C.rst}  --dbt must be x.y.z (got '${dbtVersion}')`);
    process.exit(2);
  }

  // Isolated, throwaway dirs — nothing is written to your real VS Code profile.
  const extDir = mkdtempSync(join(tmpdir(), "vi-ext-"));
  const uddDir = mkdtempSync(join(tmpdir(), "vi-udd-"));

  say(`Downloading VS Code '${vscodeVersion}' (throwaway, cached under .vscode-test/)`);
  const exe = await downloadAndUnzipVSCode(vscodeVersion);
  const [cli, ...baseArgs] = resolveCliArgsFromVSCodeExecutablePath(exe);
  // On Windows the resolved CLI is code.cmd — execFileSync needs a shell to run it.
  const run = (extra) =>
    execFileSync(
      cli,
      [...baseArgs, "--extensions-dir", extDir, "--user-data-dir", uddDir, ...extra],
      { stdio: "pipe", encoding: "utf8", shell: process.platform === "win32" },
    );
  ok(`VS Code ready: ${exe}`);

  // Marketplace --install-extension is network-flaky (it can transiently resolve an
  // empty version, especially for older builds). Retry, and verify it actually landed.
  const sleep = (ms) =>
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
  const install = (spec, label) => {
    let last;
    for (let a = 1; a <= 3; a++) {
      try {
        run(["--install-extension", spec, "--force"]);
        const listed = run(["--list-extensions", "--show-versions"]);
        if (listed.toLowerCase().includes(EXT_ID.toLowerCase())) return;
        last = new Error(`installed but ${EXT_ID} not listed`);
      } catch (e) {
        last = e;
      }
      if (a < 3) sleep(4000 * a);
    }
    const why = (last && (last.stderr || last.message)) || "unknown";
    throw new Error(`${label} failed after 3 tries: ${String(why).trim()}`.slice(0, 500));
  };

  let dbt = null;
  try {
    // Pin dbt-core first (so an env problem surfaces before the editor work).
    if (dbtVersion) {
      dbt = buildDbtVenv(dbtVersion, fixture);
      // Seed isolated user settings so a --launch'd editor uses this exact dbt.
      const userDir = join(uddDir, "User");
      mkdirSync(userDir, { recursive: true });
      writeFileSync(
        join(userDir, "settings.json"),
        JSON.stringify(
          {
            "dbt.dbtIntegration": "core",
            "dbt.dbtPythonPathOverride": dbt.py,
            "telemetry.telemetryLevel": "off",
            "redhat.telemetry.enabled": false,
            "workbench.startupEditor": "none",
          },
          null,
          2,
        ),
      );
    }

    if (launch) {
      say("Installing activation dependencies");
      for (const d of DEPS) {
        try {
          run(["--install-extension", d, "--force"]);
          ok(`dep ${d}`);
        } catch {
          bad(`dep ${d} (continuing)`);
        }
      }
    }

    if (fromVersion) {
      say(`Installing baseline dbt Power User ${fromVersion}`);
      install(isSemver(fromVersion) ? `${EXT_ID}@${fromVersion}` : EXT_ID, `baseline ${fromVersion}`);
      ok(`baseline ${fromVersion} installed`);
    }

    say(`Installing target dbt Power User '${extension}'${fromVersion ? " (upgrade)" : ""}`);
    if (extension === "latest") {
      install(EXT_ID, "latest");
    } else if (isSemver(extension)) {
      install(`${EXT_ID}@${extension}`, `version ${extension}`);
    } else {
      const p = resolve(extension);
      if (!existsSync(p)) throw new Error(`vsix not found: ${p}`);
      run(["--install-extension", p, "--force"]);
    }

    // Read back what actually installed.
    const listed = run(["--list-extensions", "--show-versions"]);
    const line = listed
      .split("\n")
      .find((l) => l.toLowerCase().includes(EXT_ID.toLowerCase()));
    if (!line) throw new Error(`extension not present after install:\n${listed}`);
    const installedVersion = (line.split("@")[1] || "").trim();
    ok(`installed: ${line.trim()}`);
    if (isSemver(extension) && installedVersion !== extension) {
      bad(`version mismatch: requested ${extension}, marketplace gave ${installedVersion}`);
    }

    if (launch) {
      say("Launching VS Code so you can click around (close the window to finish)");
      const child = spawn(
        cli,
        [...baseArgs, "--extensions-dir", extDir, "--user-data-dir", uddDir, "--disable-workspace-trust", fixture],
        {
          stdio: "inherit",
          shell: process.platform === "win32",
          env: { ...process.env, ...(dbt ? { DBT_PROFILES_DIR: dbt.profilesDir } : {}) },
        },
      );
      await new Promise((res) => child.on("exit", res));
    }

    console.log(
      `\n${C.grn}PASS${C.rst}  VS Code ${vscodeVersion} + dbt Power User ${installedVersion}` +
        (dbt ? ` + dbt-core ${dbt.dbtVersion}` : "") +
        (fromVersion ? ` (upgraded from ${fromVersion})` : ""),
    );
    console.log(`      isolated extensions-dir: ${extDir}`);
    if (dbt) console.log(`      dbt interpreter:         ${dbt.py}`);
    process.exit(0);
  } catch (e) {
    console.log(`\n${C.red}FAIL${C.rst}  ${String((e && e.message) || e).slice(0, 500)}`);
    process.exit(1);
  }
}

main();
