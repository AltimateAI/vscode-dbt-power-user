import { describe, expect, it } from "@jest/globals";
import { isPowerUserRejection } from "../../dbtPowerUserExtension";

const errWithStack = (stack: string): Error => {
  const e = new Error("synthetic");
  e.stack = stack;
  return e;
};

describe("isPowerUserRejection", () => {
  describe("forwards rejections that originate in our extension", () => {
    it("Windows extension dir", () => {
      const stack = [
        "Error: Channel closed",
        "    at target.send (node:internal/child_process:753:16)",
        "    at C:\\Users\\u\\.vscode\\extensions\\innoverio.vscode-dbt-power-user-0.61.3-win32-x64\\dist\\extension.js:130:775419",
      ].join("\n");
      expect(isPowerUserRejection(errWithStack(stack))).toBe(true);
    });

    it("macOS / Linux extension dir", () => {
      const stack = [
        "Error: Python bridge is no longer connected.",
        "    at wrapper [as ex] (/Users/u/.vscode/extensions/innoverio.vscode-dbt-power-user-0.61.3-darwin-arm64/dist/extension.js:130:775520)",
      ].join("\n");
      expect(isPowerUserRejection(errWithStack(stack))).toBe(true);
    });

    it("our extension frame buried below node internals", () => {
      const stack = [
        "TypeError: terminated",
        "    at Fetch.onAborted (node:internal/deps/undici/undici:11322:53)",
        "    at Fetch.emit (node:events:519:28)",
        "    at /Users/u/.vscode/extensions/innoverio.vscode-dbt-power-user-0.61.3-darwin-arm64/dist/extension.js:130:775419",
      ].join("\n");
      expect(isPowerUserRejection(errWithStack(stack))).toBe(true);
    });
  });

  describe("drops rejections from other extensions", () => {
    it("GitLens cancellation", () => {
      const stack = [
        "CancellationError: Operation cancelled",
        "    at PromiseCache.getOrCreate (/Users/u/.vscode/extensions/eamodio.gitlens-17.12.2/dist/gitlens.js:1569:9092)",
        "    at BranchesGitSubProvider.getCurrentBranchReferenceCore (/Users/u/.vscode/extensions/eamodio.gitlens-17.12.2/dist/gitlens.js:2472:704)",
      ].join("\n");
      expect(isPowerUserRejection(errWithStack(stack))).toBe(false);
    });

    it("Ruff LSP client", () => {
      const stack = [
        "Error: Client is not running and can't be stopped. It's current state is: startFailed",
        "    at b.shutdown (/Users/u/.vscode/extensions/charliermarsh.ruff-2026.40.0-darwin-arm64/dist/extension.js:1:158836)",
      ].join("\n");
      expect(isPowerUserRejection(errWithStack(stack))).toBe(false);
    });

    it("SQLFluff parseVersion", () => {
      const stack = [
        "TypeError: Cannot read properties of undefined (reading 'match')",
        "    at Utilities.parseVersion (C:\\Users\\u\\.vscode\\extensions\\dorzey.vscode-sqlfluff-3.7.0\\out\\src\\extension.js:5:664)",
      ].join("\n");
      expect(isPowerUserRejection(errWithStack(stack))).toBe(false);
    });
  });

  describe("drops unattributable rejections", () => {
    it("null reason", () => {
      expect(isPowerUserRejection(null)).toBe(false);
    });

    it("undefined reason", () => {
      expect(isPowerUserRejection(undefined)).toBe(false);
    });

    it("string reason (no stack)", () => {
      expect(isPowerUserRejection("kaboom")).toBe(false);
    });

    it("plain object with no stack", () => {
      expect(isPowerUserRejection({ message: "no stack here" })).toBe(false);
    });

    it("Error with stack but no extension marker (VS Code core RPC)", () => {
      const stack = [
        "TypeError: Converting circular structure to JSON",
        "    at JSON.stringify (<anonymous>)",
        "    at GF (/Applications/Visual Studio Code.app/Contents/Resources/app/out/vs/code.js:407:149036)",
        "    at br.serializeRequestArguments (/Applications/Visual Studio Code.app/Contents/Resources/app/out/vs/code.js:407:158887)",
      ].join("\n");
      expect(isPowerUserRejection(errWithStack(stack))).toBe(false);
    });

    it("Error with non-string stack field", () => {
      const e = new Error("synthetic");
      (e as unknown as { stack: unknown }).stack = { not: "a string" };
      expect(isPowerUserRejection(e)).toBe(false);
    });
  });
});
