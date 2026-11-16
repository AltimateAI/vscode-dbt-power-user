// Install Power User through Cursor's Extensions view, the way a user clicks Install, and check that
// it activates. Drives the Cursor app with Playwright's Electron support in a fresh, isolated profile.
//
//   node ui-install.mjs --cursor <dir>/cursor.json --work <dir> [--vsix <file>] [--timeout-seconds 600]
// --loop-guard (older Cursor): decide the outcome from what the gallery's Power User depends on. While it
// depends on ms-python.python the extensionquery loop is expected and passes with a warning; once it no
// longer does, a loop fails the job. Harness failures fail either way.
//
// Diagnostics: --probe-search <text> types a marketplace search and reports whether Cursor queried the
// gallery; --extension-id/--display-name install another extension from a recommendation.
//
// Logged out, Cursor's marketplace search returns nothing (and 3.x hides the sidebar), so the gallery
// install starts from a workspace recommendation (.vscode/extensions.json). With --vsix it uses
// "Extensions: Install from VSIX..." through the simple file dialog. Failures are labelled HARNESS
// (Cursor's UI didn't do what this script expects) or INSTALL (Cursor tried to install and it failed).
//
// Known INSTALL failure: before installing, Cursor walks Power User's dependencies to build its
// publisher-trust prompt. Cursor's gallery answers a query for ms-python.vscode-pylance with
// anysphere.cursorpyright (which packs anysphere.python) and one for anysphere.python with
// ms-python.python (which packs Pylance), and older Cursor clients follow that cycle: hundreds of
// gallery queries, and the install never starts.
import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { loopGuardVerdict } from "./loop-guard.mjs";
import {
  annotate,
  cursorGalleryVersions,
  dirSize,
  escapeRegExp,
  log,
  mb,
  newestLogDir,
  parseArgs,
  PU_ID,
  readIfExists,
  readJson,
  resolveForTarget,
  summary,
  vsceTarget,
} from "./lib.mjs";

const require = createRequire(import.meta.url);
const { _electron } = require(process.env.PLAYWRIGHT_CORE || "playwright-core");

const args = parseArgs(process.argv.slice(2));
const cursor = readJson(args.cursor);
const work = path.resolve(args.work);
const vsix = args.vsix ? path.resolve(args.vsix) : undefined;
const timeoutMs = Number(args["timeout-seconds"] || 600) * 1000;
// Another extension can be named for diagnosis; activation is only checked for Power User.
const extensionId = (args["extension-id"] || PU_ID).toLowerCase();
const displayName = args["display-name"] || "Power User for dbt";
const probe = args["probe-search"];
const startTimeoutMs = Number(args["start-timeout-seconds"] || 60) * 1000;
const target = vsceTarget();
const label = `Cursor ${cursor.version} UI, ${target}${vsix ? ", PR VSIX" : ""}${probe ? ", search probe" : ""}`;
const mod = process.platform === "darwin" ? "Meta" : "Control";

const dirs = {
  userData: path.join(work, "user-data"),
  extensions: path.join(work, "extensions"),
  home: path.join(work, "home"),
  workspace: path.join(work, "workspace"),
  shots: path.join(work, "screenshots"),
};
fs.rmSync(work, { recursive: true, force: true });
Object.values(dirs).forEach((d) => fs.mkdirSync(d, { recursive: true }));

// Settings that make the run observable: in-window dialogs (native ones are invisible to Playwright,
// and under xvfb to everyone), a typed-path file dialog, and no updates or telemetry.
fs.mkdirSync(path.join(dirs.userData, "User"), { recursive: true });
fs.writeFileSync(
  path.join(dirs.userData, "User/settings.json"),
  JSON.stringify(
    {
      "window.dialogStyle": "custom",
      "files.simpleDialog.enable": true,
      "update.mode": "none",
      "telemetry.telemetryLevel": "off",
      "extensions.autoUpdate": false,
      "extensions.autoCheckUpdates": false,
      "security.workspace.trust.enabled": false,
      "workbench.startupEditor": "none",
    },
    null,
    2,
  ),
);
// A minimal dbt project so Power User activates, and the recommendation the gallery install starts from.
fs.mkdirSync(path.join(dirs.workspace, ".vscode"), { recursive: true });
fs.mkdirSync(path.join(dirs.workspace, "models"), { recursive: true });
fs.writeFileSync(
  path.join(dirs.workspace, "dbt_project.yml"),
  "name: cursor_install_check\nversion: '1.0.0'\nprofile: cursor_install_check\nmodel-paths: ['models']\n",
);
fs.writeFileSync(
  path.join(dirs.workspace, "models/example.sql"),
  "select 1 as id\n",
);
if (!vsix)
  fs.writeFileSync(
    path.join(dirs.workspace, ".vscode/extensions.json"),
    JSON.stringify({ recommendations: [extensionId] }),
  );

const T0 = Date.now();
const elapsed = () => ((Date.now() - T0) / 1000).toFixed(1);
const events = [];
const note = (msg) => {
  events.push(`[${elapsed()}s] ${msg}`);
  log(msg);
};

class StepError extends Error {
  constructor(kind, step, message, loop = false) {
    super(message);
    this.kind = kind;
    this.step = step;
    this.loop = loop;
  }
}
const harness = (step, msg) => new StepError("HARNESS", step, msg);
const installError = (step, msg) => new StepError("INSTALL", step, msg);

// One log file from every window of the session (window1, window2, …), in window order: the
// workbench we drive is not always window1.
function windowLogs(dir, file) {
  if (!dir || !fs.existsSync(dir)) return "";
  return fs
    .readdirSync(dir)
    .filter((name) => /^window\d+$/.test(name))
    .sort((a, b) => Number(a.slice(6)) - Number(b.slice(6)))
    .map((name) => readIfExists(path.join(dir, name, file)))
    .join("\n");
}

function logs() {
  const dir = newestLogDir(dirs.userData);
  return {
    dir,
    shared: readIfExists(dir && path.join(dir, "sharedprocess.log")),
    exthost: windowLogs(dir, "exthost/exthost.log"),
    network: windowLogs(dir, "network.log"),
  };
}

// Resolves to `fallback` if the promise hasn't settled in `ms` (a hung renderer never answers).
function withTimeout(promise, ms, fallback) {
  return Promise.race([
    promise.catch(() => fallback),
    new Promise((r) => setTimeout(() => r(fallback), ms)),
  ]);
}

async function shot(win, name) {
  // Best effort: the window may be gone or hung.
  await withTimeout(
    win.screenshot({
      path: path.join(dirs.shots, `${name}.png`),
      timeout: 15000,
    }),
    20000,
  );
}

async function until(fn, ms, every = 500) {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    const value = await fn();
    if (value) return value;
    await new Promise((r) => setTimeout(r, every));
  }
  return undefined;
}

// Logged out, Cursor opens on sign-in and first-run screens, and 3.x also hides the primary sidebar.
async function openExtensionsView(win) {
  // Older first-run screens: sign in, theme, keymap... each has a Skip or Continue.
  for (let page = 0; page < 6; page++) {
    const next = win.getByText(/^(Skip and continue|Skip|Continue)$/).first();
    if (!(await next.isVisible().catch(() => false))) break;
    // A step that needs a choice (a consent checkbox) keeps its button disabled: leave it to the overlay removal below.
    if (
      !(await next
        .click({ timeout: 3000 })
        .then(() => true)
        .catch(() => false))
    )
      break;
    await win.waitForTimeout(2000);
  }
  // Any remaining full-window first-run overlay (data sharing, login) is removed; VS Code dialogs are kept.
  await win.evaluate(() => {
    for (const el of document.querySelectorAll("body *")) {
      const style = getComputedStyle(el);
      const covers =
        el.offsetWidth >= window.innerWidth * 0.9 &&
        el.offsetHeight >= window.innerHeight * 0.9;
      const overlay =
        ["fixed", "absolute"].includes(style.position) &&
        Number(style.zIndex) >= 1000 &&
        covers;
      if (
        (overlay || el.classList.contains("onboarding-v2-overlay")) &&
        !el.closest(".monaco-dialog-modal-block")
      )
        el.remove();
    }
  });
  await win.addStyleTag({
    content: ".monaco-workbench .part.sidebar{display:block!important}",
  });
  const search = win
    .locator(".extensions-viewlet .suggest-input-container")
    .first();
  for (let attempt = 0; attempt < 2; attempt++) {
    await win.keyboard.press(`${mod}+Shift+X`);
    if (await until(() => search.isVisible(), 5000)) return;
  }
  await runCommand(win, "View: Show Extensions").catch(() => undefined);
  if (await until(() => search.isVisible(), 5000)) return;
  throw harness(
    "open-extensions-view",
    "the Extensions view did not become visible (sidebar or shortcut changed?)",
  );
}

// Replace the text of the focused input (search box, command palette, simple file dialog) by typing.
async function replaceFocusedText(win, text) {
  await win.keyboard.press(`${mod}+A`);
  await win.keyboard.press("Backspace");
  await win.keyboard.type(text, { delay: 5 });
}

async function runCommand(win, title) {
  const widget = win.locator(".quick-input-widget").first();
  let open = false;
  for (const key of [`${mod}+Shift+P`, "F1"]) {
    await win.keyboard.press(key);
    if ((open = Boolean(await until(() => widget.isVisible(), 5000)))) break;
  }
  if (!open)
    throw harness("command-palette", "the command palette did not open");
  await replaceFocusedText(win, `>${title}`);
  const item = win
    .locator(".quick-input-list .monaco-list-row", { hasText: title })
    .first();
  await item.waitFor({ state: "visible", timeout: 10000 }).catch(() => {
    throw harness("command-palette", `no command named "${title}"`);
  });
  await win.keyboard.press("Enter");
}

async function startGalleryInstall(win) {
  const exactName = new RegExp(`^\\s*${escapeRegExp(displayName)}\\s*$`);
  const row = win
    .locator(".extensions-viewlet .monaco-list-row")
    .filter({ has: win.locator(".name", { hasText: exactName }) })
    .first();
  // The Recommended section sometimes stays empty on a cold start; "@recommended" in the search box
  // (which works logged out) asks again. Retry it once if the row doesn't show.
  let found = false;
  for (let attempt = 0; attempt < 2 && !found; attempt++) {
    await win
      .locator(".extensions-viewlet .suggest-input-container")
      .first()
      .click();
    await replaceFocusedText(win, "@recommended");
    found = Boolean(await until(() => row.isVisible(), 60000, 1000));
  }
  if (!found) {
    const queried = /extensionquery - end POST 200/.test(logs().network);
    throw (queried ? harness : installError)(
      "find-recommendation",
      queried
        ? `the gallery answered but no "${displayName}" row appeared under Recommended`
        : "Cursor's gallery did not answer any extension query",
    );
  }
  note(`row: ${(await row.innerText()).replace(/\s+/g, " ").slice(0, 120)}`);
  await shot(win, "01-recommended-row");
  const button = row
    .locator(
      '.extension-action.prominent.install[aria-label="Install"]:not(.hide):not(.disabled)',
    )
    .first();
  if (!(await until(() => button.isVisible(), 30000)))
    throw harness("click-install", "the row has no enabled Install button");
  await button.click();
}

async function startVsixInstall(win) {
  await runCommand(win, "Extensions: Install from VSIX...");
  // files.simpleDialog.enable turns the file picker into a quick input that accepts a typed path.
  await win.waitForTimeout(1500);
  const title = await win
    .locator(".quick-input-widget .quick-input-title")
    .first()
    .innerText()
    .catch(() => "");
  if (!(await win.locator(".quick-input-widget").first().isVisible())) {
    throw harness("vsix-dialog", "the simple file dialog did not open");
  }
  note(`file dialog: ${title}`);
  await replaceFocusedText(win, vsix);
  await win.waitForTimeout(500);
  await win.keyboard.press("Enter");
}

// Answer the publisher-trust dialog; any other dialog is unexpected and stops the run.
async function handleDialog(win) {
  const box = win.locator(".monaco-dialog-box").first();
  if (!(await box.isVisible().catch(() => false))) return false;
  const text = (await box.innerText()).replace(/\s+/g, " ");
  const trust = box
    .locator(".monaco-button", {
      hasText: /Trust Publisher|Trust & Install|Trust/,
    })
    .first();
  if (/trust the publisher/i.test(text) && (await trust.isVisible())) {
    await shot(win, "02-trust-dialog");
    note(`trust dialog: ${text.slice(0, 200)}`);
    await trust.click();
    note("clicked the trust button");
    return true;
  }
  const install = box
    .locator(".monaco-button", { hasText: /^Install$/ })
    .first();
  if (await install.isVisible().catch(() => false)) {
    note(`dialog: ${text.slice(0, 200)}; clicking Install`);
    await install.click();
    return true;
  }
  await shot(win, "02-unexpected-dialog");
  throw harness("dialog", `unexpected dialog: ${text.slice(0, 300)}`);
}

// What the shared process has logged about the install so far.
function installState() {
  const dir = newestLogDir(dirs.userData);
  const lines = readIfExists(dir && path.join(dir, "sharedprocess.log")).split(
    "\n",
  );
  return {
    done: lines.some(
      (l) =>
        /installed successfully/i.test(l) &&
        l.toLowerCase().includes(extensionId),
    ),
    error: lines.find((l) => /\[error\].*(install|download|extract)/i.test(l)),
    started: lines.some((l) => /Installing (the )?extension:/i.test(l)),
  };
}

// Cursor never started installing: a gallery re-query loop is Cursor's problem, anything else the harness's.
function notStartedError(clickedAt) {
  const sent = queries.filter((q) => q.at >= clickedAt).length;
  if (sent > 50) {
    return new StepError(
      "INSTALL",
      "install-start",
      `Cursor sent ${sent} gallery queries after the click without starting the install (the extensionquery loop)`,
      true,
    );
  }
  return harness(
    "install-start",
    `${startTimeoutMs / 1000} s after clicking Install, Cursor had not started installing and no dialog was visible`,
  );
}

async function waitForInstall(win, clickedAt) {
  let started = false;
  while (Date.now() < clickedAt + timeoutMs) {
    await handleDialog(win);
    const state = installState();
    if (state.done) return;
    if (state.error) {
      throw installError(
        "install",
        `Cursor logged an install error: ${state.error.slice(0, 300)}`,
      );
    }
    if (state.started && !started)
      note("Cursor started installing (shared process)");
    started = state.started;
    if (!started && Date.now() - clickedAt > startTimeoutMs)
      throw notStartedError(clickedAt);
    await new Promise((r) => setTimeout(r, 500));
  }
  throw installError(
    "install",
    `install started but did not finish within ${timeoutMs / 1000} s`,
  );
}

async function waitForActivation() {
  const id = escapeRegExp(PU_ID);
  const ok = new RegExp(
    `(activated success|_doActivateExtension)[^\\n]*${id}|${id}[^\\n]*activated`,
    "i",
  );
  const bad = new RegExp(`Activating extension '?${id}'? failed[^\\n]*`, "i");
  const result = await until(
    () => {
      const { exthost } = logs();
      if (bad.test(exthost)) return { failed: exthost.match(bad)[0] };
      return ok.test(exthost) ? { ok: true } : undefined;
    },
    120000,
    1000,
  );
  if (!result)
    throw installError(
      "activate",
      "Power User installed but did not activate within 120 s",
    );
  if (result.failed)
    throw installError("activate", result.failed.slice(0, 300));
  // `_doActivateExtension` is logged when activation starts: give activate() time to fail.
  await new Promise((r) => setTimeout(r, 5000));
  const late = logs().exthost.match(bad);
  if (late) throw installError("activate", late[0].slice(0, 300));
}

async function probeSearch(win, text) {
  const before = queries.length;
  await win
    .locator(".extensions-viewlet .suggest-input-container")
    .first()
    .click();
  await win.keyboard.type(text, { delay: 30 });
  await win.waitForTimeout(8000);
  await shot(win, "01-search");
  const sent = queries.slice(before);
  const rows = await win
    .locator(".extensions-viewlet .monaco-list-row")
    .count();
  const body = await win.locator(".extensions-viewlet").innerText();
  // filterType 10 is the gallery's SearchText criterion.
  return {
    queriesSent: sent.length,
    searchTextQueries: sent.filter((q) => / 10:|^10:/.test(q.criteria || ""))
      .length,
    rows,
    noResults: /No extensions found/i.test(body),
  };
}

// Cursor can open more than one window (macOS opens an Agents window too): use the one with a workbench.
async function findWorkbenchWindow(app, ms) {
  await app.firstWindow({ timeout: ms });
  let reported = 0;
  return until(
    async () => {
      const pages = app.windows();
      if (pages.length !== reported) {
        reported = pages.length;
        note(
          `windows: ${pages.map((p) => p.url().split("/").pop()).join(", ")}`,
        );
      }
      for (const page of pages) {
        if (
          await withTimeout(page.locator(".monaco-workbench").count(), 5000, 0)
        )
          return page;
      }
      return undefined;
    },
    ms,
    1000,
  );
}

// Closing can hang when a window is stuck; kill the process tree after a grace period.
async function closeApp(app) {
  const closed = await Promise.race([
    app.close().then(
      () => true,
      () => false,
    ),
    new Promise((r) => setTimeout(() => r(false), 20000)),
  ]);
  if (!closed) {
    note("Cursor did not close within 20 s; killing it");
    app.process().kill("SIGKILL");
  }
}

// --loop-guard: the verdict comes from loop-guard.mjs; a gallery that can't be read is a harness failure.
async function applyLoopGuard(result) {
  let pick;
  try {
    pick = resolveForTarget(await cursorGalleryVersions(PU_ID), target);
  } catch (error) {
    return {
      ...result,
      ok: false,
      kind: "HARNESS",
      step: "loop-guard",
      message: `loop guard couldn't read the gallery's Power User: ${error.message}`,
    };
  }
  const verdict = loopGuardVerdict(result, pick, target);
  if (verdict.warning) annotate("warning", label, verdict.warning);
  return verdict;
}

// Every gallery query the window sends, with its search criteria, to spot a re-query loop.
const queries = [];
function watchQueries(page) {
  page.on("request", (req) => {
    if (!req.url().includes("/extensionquery")) return;
    let criteria = "";
    try {
      criteria = JSON.parse(req.postData() || "{}")
        .filters?.[0]?.criteria?.map((c) => `${c.filterType}:${c.value}`)
        .join(" ");
    } catch {
      // Unparseable body: record the request without criteria.
    }
    queries.push({ at: Date.now(), criteria });
  });
}

let app;
let win;
// Last resort: never let a stuck Cursor hold the job until its timeout.
const watchdog = setTimeout(
  () => {
    console.log(
      `::error title=${label}::HARNESS: the run did not finish in time; killing Cursor`,
    );
    app?.process().kill("SIGKILL");
    process.exit(1);
  },
  timeoutMs + 10 * 60000,
);
watchdog.unref();
let outcome = { ok: false };
try {
  const launchArgs = [
    "--user-data-dir",
    dirs.userData,
    "--extensions-dir",
    dirs.extensions,
    "--log",
    "trace",
    "--skip-release-notes",
    "--skip-welcome",
    "--disable-workspace-trust",
  ];
  if (process.platform === "linux")
    launchArgs.unshift(
      "--no-sandbox",
      "--disable-gpu",
      "--password-store=basic",
    );
  // macOS: reading the keychain at startup raises a native prompt that freezes Cursor's main process.
  if (process.platform === "darwin")
    launchArgs.unshift("--use-mock-keychain", "--use-inmemory-secretstorage");
  const env = { ...process.env, DONT_PROMPT_WSL_INSTALL: "1" };
  if (process.platform !== "win32") env.HOME = dirs.home;
  delete env.ELECTRON_RUN_AS_NODE;
  note(`launching ${cursor.exe}`);
  try {
    app = await _electron.launch({
      executablePath: cursor.exe,
      args: [...launchArgs, dirs.workspace],
      env,
      timeout: 180000,
    });
    win = await findWorkbenchWindow(app, 180000);
  } catch (error) {
    throw harness(
      "launch",
      `Cursor did not start: ${error.message.split("\n")[0]}`,
    );
  }
  if (!win) {
    for (const [i, page] of app.windows().entries())
      await shot(page, `00-window-${i}`);
    throw harness(
      "launch",
      `no window with a workbench after 180 s (windows: ${
        app
          .windows()
          .map((p) => p.url())
          .join(", ") || "none"
      })`,
    );
  }
  watchQueries(win);
  note("workbench is up");
  await win.waitForTimeout(8000);
  await handleDialog(win);
  await openExtensionsView(win);
  await shot(win, "00-extensions-view");

  if (probe) {
    const result = await probeSearch(win, probe);
    note(
      `search "${probe}": ${result.queriesSent} gallery queries sent, ${result.rows} rows, noResults=${result.noResults}`,
    );
    outcome = { ok: true, probe: result };
  } else {
    if (vsix) await startVsixInstall(win);
    else await startGalleryInstall(win);
    const clickedAt = Date.now();
    note("install requested");
    await waitForInstall(win, clickedAt);
    const installSeconds = (Date.now() - clickedAt) / 1000;
    note(`installed after ${installSeconds.toFixed(1)} s`);
    await shot(win, "03-installed");
    if (extensionId === PU_ID) {
      await waitForActivation();
      note("Power User activated");
    }
    await win.waitForTimeout(3000);
    await shot(win, "04-activated");
    outcome = { ok: true, installSeconds };
  }
} catch (error) {
  const kind = error.kind || "HARNESS";
  const step = error.step || "unexpected";
  outcome = {
    ok: false,
    kind,
    step,
    message: error.message,
    loop: Boolean(error.loop),
  };
  note(`${kind} failure at ${step}: ${error.message}`);
  if (win) await shot(win, "99-failure");
} finally {
  if (app) await closeApp(app);
}

if (args["loop-guard"] && !vsix && !probe)
  outcome = await applyLoopGuard(outcome);
const { dir: logDir } = logs();
const extensions = fs.existsSync(path.join(dirs.extensions, "extensions.json"))
  ? readJson(path.join(dirs.extensions, "extensions.json")).map(
      (e) => `${e.identifier.id}@${e.version}`,
    )
  : [];
fs.writeFileSync(path.join(work, "events.log"), events.join("\n") + "\n");
fs.writeFileSync(
  path.join(work, "extensionquery.log"),
  queries
    .map((q) => `${((q.at - T0) / 1000).toFixed(1)}s ${q.criteria}`)
    .join("\n") + "\n",
);
fs.writeFileSync(
  path.join(work, "result.json"),
  JSON.stringify(
    {
      label,
      cursor,
      outcome,
      extensions,
      galleryQueries: queries.length,
      logDir,
    },
    null,
    2,
  ),
);

if (!outcome.ok) {
  const who =
    outcome.kind === "HARNESS"
      ? "Harness problem (Cursor's UI changed or a dialog blocked the script)"
      : "Install problem";
  annotate(
    "error",
    label,
    `${who} at step "${outcome.step}": ${outcome.message}`,
  );
}
summary(
  [
    `### ${outcome.ok ? "✅" : "❌"} ${label}`,
    "",
    `Cursor ${cursor.version} (VS Code ${cursor.vscodeVersion}).`,
    outcome.ok && outcome.installSeconds !== undefined
      ? `Install took **${outcome.installSeconds.toFixed(1)} s** from the click; Power User activated.`
      : "",
    outcome.probe ? `Search probe: ${JSON.stringify(outcome.probe)}` : "",
    outcome.expectedLoop
      ? `**Expected loop** (the gallery's Power User still depends on ms-python.python): ${outcome.message}`
      : "",
    outcome.ok
      ? ""
      : `**${outcome.kind} failure** at step \`${outcome.step}\`: ${outcome.message}`,
    `Gallery queries sent by the window: ${queries.length}.`,
    extensions.length ? `Installed: ${extensions.join(", ")}` : "",
    "",
  ]
    .filter((l, i, a) => l !== "" || a[i - 1] !== "")
    .join("\n"),
);
log(`logs: ${logDir ? `${logDir} (${mb(dirSize(logDir))})` : "none"}`);
process.exit(outcome.ok ? 0 : 1);
