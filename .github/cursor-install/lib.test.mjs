import assert from "node:assert/strict";
import { test } from "node:test";
import {
  activationState,
  annotate,
  debuggerSwitchRefusal,
  debuggerSwitchVerdict,
  escapeData,
  escapeProperty,
  isInstallErrorLine,
} from "./lib.mjs";

function captured(fn) {
  const lines = [];
  const original = console.log;
  console.log = (line) => lines.push(line);
  try {
    fn();
  } finally {
    console.log = original;
  }
  return lines;
}

test("message data escapes %, CR and LF", () => {
  assert.equal(escapeData("100% done\r\nnext"), "100%25 done%0D%0Anext");
});

test("title properties also escape : and , and keep the text", () => {
  assert.equal(
    escapeProperty("Cursor 2.6.20 UI, linux-x64: 50%"),
    "Cursor 2.6.20 UI%2C linux-x64%3A 50%25",
  );
});

test("annotate writes one escaped workflow command", () => {
  const lines = captured(() =>
    annotate("warning", "Cursor mirror: a, b", "line 1\nline 2: 5%"),
  );
  assert.deepEqual(lines, [
    "::warning title=Cursor mirror%3A a%2C b::line 1%0Aline 2: 5%25",
  ]);
});

const PU = "innoverio.vscode-dbt-power-user";
const lines = {
  dependency:
    "2026-11-16 09:21:14.500 [info] ExtensionService#_doActivateExtension samuelcolvin.jinjahtml, startup: false, activationEvent: 'workspaceContains:**/dbt_project.yml', root cause: innoverio.vscode-dbt-power-user",
  start:
    "2026-11-16 09:21:15.004 [info] ExtensionService#_doActivateExtension innoverio.vscode-dbt-power-user, startup: false, activationEvent: 'workspaceContains:**/dbt_project.yml'",
  success:
    "2026-11-16 11:57:04.674 [info] Extension activated success: innoverio.vscode-dbt-power-user — 856ms (code loading: 138ms, activate call: 36ms, activate resolved: 682ms)",
  longerId:
    "2026-11-16 11:57:04.674 [info] Extension activated success: innoverio.vscode-dbt-power-user-foo — 12ms (code loading: 1ms, activate call: 1ms, activate resolved: 10ms)",
  failed:
    "2026-11-16 11:57:04.674 [error] Activating extension 'innoverio.vscode-dbt-power-user' failed: boom",
};

test("a dependency's activation line naming Power User as root cause doesn't count", () => {
  assert.equal(activationState(lines.dependency, PU), undefined);
});

test("Power User's activation start line doesn't count", () => {
  assert.equal(activationState(lines.start, PU), undefined);
});

test("Power User's activation success line counts, with its time", () => {
  assert.deepEqual(
    activationState(
      [lines.dependency, lines.start, lines.success].join("\n"),
      PU,
    ),
    { ok: true, ms: 856 },
  );
});

test("a longer extension id's success line doesn't count", () => {
  assert.equal(activationState(lines.longerId, PU), undefined);
});

test("an activation failure is reported", () => {
  assert.match(
    activationState([lines.start, lines.failed].join("\n"), PU).failed,
    /failed: boom/,
  );
});

const installSet = [
  "innoverio.vscode-dbt-power-user",
  "altimateai.vscode-altimate-mcp-server",
];
const err = (id) =>
  `2026-11-16 09:28:49.712 [error] Error while installing the extension ${id}: Download failed`;

test("another extension's install error doesn't count", () => {
  assert.equal(isInstallErrorLine(err("eamodio.gitlens"), installSet), false);
});

test("Power User's install error counts", () => {
  assert.equal(
    isInstallErrorLine(err("innoverio.vscode-dbt-power-user"), installSet),
    true,
  );
});

test("a dependency's install error counts, case-insensitively", () => {
  assert.equal(
    isInstallErrorLine(
      err("AltimateAI.vscode-altimate-mcp-server"),
      installSet,
    ),
    true,
  );
});

test("an id that only starts with an install-set id doesn't count", () => {
  assert.equal(
    isInstallErrorLine(err("innoverio.vscode-dbt-power-user-foo"), installSet),
    false,
  );
});

test("a non-error line naming Power User doesn't count", () => {
  assert.equal(
    isInstallErrorLine(
      "2026-11-16 09:28:49.712 [info] Installing extension: innoverio.vscode-dbt-power-user",
      installSet,
    ),
    false,
  );
});

test("Cursor's refusal of debugger switches is found in its output", () => {
  const line =
    "--remote-debugging-port is not supported in this build. Debugger switches work only in development builds.";
  assert.equal(debuggerSwitchRefusal(`\n${line}\n`), line);
});

test("a build that accepts debugger switches has no refusal", () => {
  // Cursor 3.31.15 on Linux with --remote-debugging-port and no display.
  const output = [
    "[31863:1124/222326.809602:ERROR:ui/ozone/platform/x11/ozone_platform_x11.cc:257] Missing X server or $DISPLAY",
    "[31863:1124/222326.809655:ERROR:ui/aura/env.cc:246] The platform failed to initialize.  Exiting.",
  ].join("\n");
  assert.equal(debuggerSwitchRefusal(output), undefined);
  assert.deepEqual(debuggerSwitchVerdict(output), { accepted: true });
});

test("a refused switch is a refusal, whatever else is printed", () => {
  const line =
    "--inspect is not supported in this build. Debugger switches work only in development builds.";
  assert.deepEqual(debuggerSwitchVerdict(line), { refusal: line });
});

test("output with neither the refusal nor the display error proves nothing", () => {
  const output =
    "cursor: error while loading shared libraries: libnss3.so: cannot open shared object file";
  assert.deepEqual(debuggerSwitchVerdict(output), { unknown: output });
  assert.deepEqual(debuggerSwitchVerdict(""), { unknown: "no output" });
});

test("Chromium's generic platform failure isn't taken as acceptance", () => {
  const output = [
    "No wl_shm object",
    "The platform failed to initialize.  Exiting.",
  ].join("\n");
  assert.deepEqual(debuggerSwitchVerdict(output), {
    unknown: "No wl_shm object",
  });
});
