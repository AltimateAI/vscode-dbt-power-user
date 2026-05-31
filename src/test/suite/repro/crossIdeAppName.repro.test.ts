import {
  afterEach,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";
import * as vscode from "vscode";
import { isCursor } from "../../../mcp/utils";

/**
 * Cross-IDE family reproduction — behaviour keyed on `vscode.env.appName`.
 *
 * App Insights telemetry tags every event with
 *   customDimensions.ide = vscode.env.appName            (src/telemetry/index.ts:12)
 * and the per-IDE error totals (VSCode 16.2M, Cursor 2.16M, Windsurf 104k,
 * Kiro 5.3k, code-server 6k, …) come from that single field. The extension
 * therefore runs inside several VS Code forks, each reporting a different
 * `vscode.env.appName`.
 *
 * The only branch in the extension `src/` tree (outside tests) that *diverges*
 * on that value is `isCursor()`:
 *
 *   // src/mcp/utils.ts:3-4
 *   export const isCursor = (): boolean => {
 *     return env.appName === "Cursor";
 *   };
 *
 * This gate is consumed when wiring the MCP "data lookup" feature, whose
 * user-facing copy is hard-coded to mention "Cursor"
 * (src/mcp/index.ts:72). The gate is an EXACT, case-sensitive string match,
 * so it is `true` only for the literal appName "Cursor" and `false` for every
 * other host — including the other forks the telemetry proves are in the wild
 * (Windsurf, Kiro, code-server, VSCode-Insiders, Antigravity) and including
 * Cursor reported with any non-canonical casing/spacing.
 *
 * IMPORTANT about the test harness: `src/mcp/utils.ts` imports `env` as a
 * *named* import (`import { env } from "vscode"`), but the jest vscode mock
 * (src/test/mock/vscode.ts) does NOT export `env`. So `env` is `undefined`
 * in the test runtime and `env.appName` would throw `TypeError` unless a test
 * supplies `vscode.env`. We mirror the established pattern from
 * telemetryService.test.ts: assign `(vscode as any).env = {...}` before each
 * call. Under ts-jest's CommonJS interop the named import is read at use-site
 * (`vscode_1.env.appName`), so this assignment is visible to the real code.
 *
 * Conclusion: `isCursor` is WORKING AS INTENDED — it is a deliberate,
 * Cursor-only feature gate, not a bug. These tests PIN its exact divergent
 * behaviour across fork appName values so any future broadening (e.g. adding
 * Windsurf/Kiro support, or making it case-insensitive) is a visible,
 * intentional change. is_real_bug = false.
 */
describe("Cross-IDE: isCursor() keyed on vscode.env.appName", () => {
  const setAppName = (appName: string | undefined) => {
    (vscode as { env?: unknown }).env = { appName };
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    delete (vscode as { env?: unknown }).env;
  });

  test("returns true only for the canonical Cursor appName", () => {
    setAppName("Cursor");
    expect(isCursor()).toBe(true);
  });

  test("returns false for stock Visual Studio Code", () => {
    setAppName("Visual Studio Code");
    expect(isCursor()).toBe(false);
  });

  test("returns false for VSCode-Insiders (Visual Studio Code - Insiders)", () => {
    setAppName("Visual Studio Code - Insiders");
    expect(isCursor()).toBe(false);
  });

  test("returns false for the Windsurf fork", () => {
    setAppName("Windsurf");
    expect(isCursor()).toBe(false);
  });

  test("returns false for the Kiro fork", () => {
    setAppName("Kiro");
    expect(isCursor()).toBe(false);
  });

  test("returns false for code-server (browser host)", () => {
    setAppName("code-server");
    expect(isCursor()).toBe(false);
  });

  test("returns false for the Antigravity fork", () => {
    setAppName("Antigravity");
    expect(isCursor()).toBe(false);
  });

  test("is case-sensitive: lowercase 'cursor' is NOT matched (pins current strict behaviour)", () => {
    setAppName("cursor");
    expect(isCursor()).toBe(false);
  });

  test("does NOT substring-match: 'Cursor (Anysphere)' is NOT matched (pins current exact-equality behaviour)", () => {
    setAppName("Cursor (Anysphere)");
    expect(isCursor()).toBe(false);
  });
});
