import assert from "node:assert/strict";
import { test } from "node:test";
import { loopGuardVerdict } from "./loop-guard.mjs";

const loop = {
  ok: false,
  loop: true,
  kind: "INSTALL",
  step: "install-start",
  message:
    "Cursor sent 189 gallery queries after the click without starting the install (the extensionquery loop)",
};
const installed = { ok: true, installSeconds: 10 };
const otherFailure = {
  ok: false,
  loop: false,
  kind: "INSTALL",
  step: "install",
  message: "download failed",
};
const harnessFailure = {
  ok: false,
  loop: false,
  kind: "HARNESS",
  step: "dialog",
  message: "unexpected dialog",
};
const withPython = {
  version: "0.69.0",
  dependencies: ["samuelcolvin.jinjahtml", "ms-python.python"],
};
const withoutPython = {
  version: "0.70.0",
  dependencies: ["altimateai.vscode-altimate-mcp-server"],
};

test("loop while the release depends on ms-python passes with a warning", () => {
  const v = loopGuardVerdict(loop, withPython, "linux-x64");
  assert.equal(v.ok, true);
  assert.equal(v.expectedLoop, true);
  assert.match(v.warning, /still depends on ms-python\.python/);
});

test("loop once the release no longer depends on ms-python fails", () => {
  const v = loopGuardVerdict(loop, withoutPython, "linux-x64");
  assert.equal(v.ok, false);
  assert.equal(v.kind, "INSTALL");
  assert.match(v.message, /no longer depends on ms-python\.python/);
  assert.equal(v.warning, undefined);
});

test("install while a loop was expected passes with a warning", () => {
  const v = loopGuardVerdict(installed, withPython, "linux-x64");
  assert.equal(v.ok, true);
  assert.match(v.warning, /the loop was expected/);
});

test("install without ms-python passes without a warning", () => {
  const v = loopGuardVerdict(installed, withoutPython, "linux-x64");
  assert.deepEqual(v, installed);
});

test("a failure other than the loop fails either way", () => {
  for (const failure of [otherFailure, harnessFailure]) {
    for (const pick of [withPython, withoutPython]) {
      const v = loopGuardVerdict(failure, pick, "linux-x64");
      assert.equal(v.ok, false);
      assert.equal(v.kind, failure.kind);
      assert.equal(v.message, failure.message);
    }
  }
});

test("no Power User for the target in the gallery is a harness failure", () => {
  for (const result of [loop, installed]) {
    const v = loopGuardVerdict(result, undefined, "win32-arm64");
    assert.equal(v.ok, false);
    assert.equal(v.kind, "HARNESS");
    assert.match(v.message, /no Power User for win32-arm64/);
  }
});
