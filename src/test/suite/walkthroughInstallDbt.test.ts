import { afterEach, describe, expect, it } from "@jest/globals";
import { WalkthroughCommands } from "../../commands/walkthroughCommands";

// The helpers under test don't touch constructor dependencies, so we can
// instantiate without the DI container and exercise them directly.
function makeCommands(): any {
  return new (WalkthroughCommands as any)(
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  );
}

describe("WalkthroughCommands.isExternallyManagedError", () => {
  const cmd = makeCommands();

  it("detects the canonical pip error", () => {
    expect(
      cmd.isExternallyManagedError("error: externally-managed-environment"),
    ).toBe(true);
  });

  it("detects the Homebrew message wording", () => {
    const brew =
      "× This environment is externally managed\n" +
      "╰─> To install Python packages system-wide, try brew install xyz";
    expect(cmd.isExternallyManagedError(brew)).toBe(true);
  });

  it("does not match unrelated install failures", () => {
    expect(
      cmd.isExternallyManagedError(
        "Could not find a version that satisfies the requirement dbt-core",
      ),
    ).toBe(false);
    expect(cmd.isExternallyManagedError("Connection timed out")).toBe(false);
  });
});

describe("WalkthroughCommands.resolveVenvPython", () => {
  const cmd = makeCommands();
  const originalPlatform = process.platform;

  afterEach(() => {
    Object.defineProperty(process, "platform", { value: originalPlatform });
  });

  it("resolves a POSIX venv interpreter", () => {
    Object.defineProperty(process, "platform", { value: "linux" });
    expect(cmd.resolveVenvPython("/work/.venv")).toBe("/work/.venv/bin/python");
  });

  it("resolves a Windows venv interpreter", () => {
    Object.defineProperty(process, "platform", { value: "win32" });
    const resolved = cmd.resolveVenvPython("C:/work/.venv");
    expect(resolved).toContain("Scripts");
    expect(resolved).toContain("python.exe");
  });
});
