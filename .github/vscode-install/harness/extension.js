// Development extension loaded next to the installed Power User (cell.mjs launches VS Code with
// --extensionDevelopmentPath, not as a test run: a test run keeps VS Code's state in memory, and
// an upgrade check needs the state the previous release wrote). It checks Power User: the expected
// version, activate() resolving, and the extension parsing the dbt project, which it shows by
// writing target/manifest.json. It writes what it saw to VSIX_CHECK_RESULT and quits VS Code, so
// the state is flushed to disk.
const fs = require("fs");
const path = require("path");
const vscode = require("vscode");

const PU_ID = "innoverio.vscode-dbt-power-user";
const ACTIVATE_TIMEOUT_MS = 120_000;
const PARSE_TIMEOUT_MS = 240_000;
const INIT_LINE = "Initialized dbt project";
const REGISTER_FAILED = "Unable to register dbt project";

const env = {
  version: process.env.VSIX_CHECK_VERSION,
  project: process.env.VSIX_CHECK_PROJECT,
  model: process.env.VSIX_CHECK_MODEL,
  logs: process.env.VSIX_CHECK_LOGS,
  result: process.env.VSIX_CHECK_RESULT,
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function withTimeout(promise, ms, what) {
  let timer;
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      timer = setTimeout(
        () => reject(new Error(`${what} timed out after ${ms / 1000} s`)),
        ms,
      );
    }),
  ]).finally(() => clearTimeout(timer));
}

// Every *.log under this launch's --logsPath: the extension's "Log - dbt" channel among them.
function readLogs(dir) {
  const out = [];
  const stack = [dir];
  while (stack.length) {
    const current = stack.pop();
    let entries = [];
    try {
      entries = fs.readdirSync(current, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const entry of entries) {
      const p = path.join(current, entry.name);
      if (entry.isDirectory()) stack.push(p);
      else if (entry.name.endsWith(".log")) {
        try {
          out.push(fs.readFileSync(p, "utf8"));
        } catch {
          // A log being rotated; the next poll reads it.
        }
      }
    }
  }
  return out.join("\n");
}

function lineWith(text, needle) {
  return text.split(/\r?\n/).find((line) => line.includes(needle));
}

function manifestNodes(file) {
  try {
    return Object.keys(JSON.parse(fs.readFileSync(file, "utf8")).nodes || {});
  } catch {
    return undefined; // not written yet, or being written
  }
}

// The expected version is installed and its activate() resolves. Returns when activation began.
async function checkActivation(result) {
  const ext = vscode.extensions.getExtension(PU_ID);
  if (!ext) throw new Error(`${PU_ID} is not installed in this VS Code`);
  result.version = ext.packageJSON.version;
  if (result.version !== env.version)
    throw new Error(
      `expected ${PU_ID} ${env.version}, found ${result.version}`,
    );

  // activate() starts activation, or waits for the one the workspace already triggered, and
  // rejects with the error the extension's activate() threw.
  const started = Date.now();
  try {
    await withTimeout(ext.activate(), ACTIVATE_TIMEOUT_MS, "activate()");
  } catch (error) {
    throw new Error(
      `activate() failed: ${error && error.stack ? error.stack : error}`,
    );
  }
  if (!ext.isActive)
    throw new Error("activate() resolved but the extension is not active");
  result.activateMs = Date.now() - started;
  return started;
}

// One look at the logs and the manifest: records what is there; throws on a failed registration.
function observeProject(result, started, manifest, modelNode) {
  const logs = readLogs(env.logs);
  const failed = lineWith(logs, REGISTER_FAILED);
  if (failed) throw new Error(`dbt project not registered: ${failed.trim()}`);
  const init = lineWith(logs, INIT_LINE);
  if (init) result.initLine = init.trim();
  if (
    result.manifestMs === undefined &&
    manifestNodes(manifest)?.includes(modelNode)
  )
    result.manifestMs = Date.now() - started;
}

// Power User registers the project (its "Initialized dbt project" line) and parses it (it writes
// target/manifest.json with the project's model).
async function waitForProject(result, started) {
  const manifest = path.join(env.project, "target", "manifest.json");
  const modelNode = `model.${env.model}.${env.model}`;
  const deadline = Date.now() + PARSE_TIMEOUT_MS;
  while (Date.now() < deadline) {
    observeProject(result, started, manifest, modelNode);
    if (result.initLine && result.manifestMs !== undefined) return;
    await sleep(2000);
  }
  const missing = [];
  if (!result.initLine) missing.push(`no "${INIT_LINE}" log line`);
  if (result.manifestMs === undefined)
    missing.push(`no ${modelNode} in ${manifest}`);
  throw new Error(`within ${PARSE_TIMEOUT_MS / 1000} s: ${missing.join("; ")}`);
}

async function check(result) {
  const started = await checkActivation(result);
  await waitForProject(result, started);
}

exports.activate = function activate() {
  if (!env.result) return; // only a launch from cell.mjs runs the check
  const result = { ok: false };
  check(result)
    .then(
      () => {
        result.ok = true;
      },
      (error) => {
        result.error = String(error && error.message ? error.message : error);
      },
    )
    .finally(async () => {
      fs.writeFileSync(env.result, JSON.stringify(result, null, 2));
      await vscode.commands.executeCommand("workbench.action.quit");
    });
};

exports.deactivate = function deactivate() {};
