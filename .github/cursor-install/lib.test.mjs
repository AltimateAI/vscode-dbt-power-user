import assert from "node:assert/strict";
import { test } from "node:test";
import {
  activationState,
  annotate,
  escapeData,
  escapeProperty,
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
