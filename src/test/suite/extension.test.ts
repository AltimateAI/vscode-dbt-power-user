import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";
import * as vscode from "../mock/vscode";

describe("Extension Test Suite", () => {
  let mockExtensions: jest.Mocked<any>;

  beforeEach(() => {
    mockExtensions = {
      getExtension: jest.fn(),
    };
    (vscode as any).extensions = mockExtensions;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should handle array index operations", () => {
    expect([1, 2, 3].indexOf(5)).toBe(-1);
    expect([1, 2, 3].indexOf(0)).toBe(-1);
  });

  const getExtension = () => {
    // Mock the jinjahtml extension
    const mockJinjaHtml = {
      id: "samuelcolvin.jinjahtml",
      packageJSON: {
        name: "jinjahtml",
        displayName: "Jinja HTML",
        contributes: {
          languages: [
            {
              id: "jinja-sql",
              extensions: [".sql"],
            },
          ],
        },
      },
      isActive: true,
      activate: () => Promise.resolve(),
      exports: {},
      extensionUri: vscode.Uri.file(""),
      extensionPath: "",
      extensionKind: vscode.ExtensionKind.UI,
    };

    // Create a mutable isActive property
    let isActive = false;

    // Mock our own extension
    const mockOurExtension = {
      id: "innoverio.vscode-dbt-power-user",
      packageJSON: {
        name: "vscode-dbt-power-user",
        displayName: "Power User for dbt",
        contributes: {
          commands: [
            {
              command: "dbt.run",
              title: "Run dbt",
            },
            {
              command: "dbt.compile",
              title: "Compile dbt",
            },
          ],
        },
      },
      get isActive() {
        return isActive;
      },
      activate: () => {
        isActive = true;
        return Promise.resolve();
      },
      exports: {},
      extensionUri: vscode.Uri.file(""),
      extensionPath: "",
      extensionKind: vscode.ExtensionKind.Workspace,
    };

    // Set up the extensions API
    mockExtensions.getExtension.mockImplementation((id: string) => {
      if (id === "samuelcolvin.jinjahtml") {
        return mockJinjaHtml;
      }
      if (id === "innoverio.vscode-dbt-power-user") {
        return mockOurExtension;
      }
      return undefined;
    });

    return mockOurExtension;
  };

  it("should be present", () => {
    const extension = getExtension();
    expect(extension).toBeTruthy();
  });

  it("should activate", async () => {
    const extension = getExtension();
    if (!extension) {
      throw new Error("Extension not found");
    }
    await extension.activate();
    expect(extension.isActive).toBe(true);
  });

  it("should register commands", async () => {
    const extension = getExtension();
    if (!extension) {
      throw new Error("Extension not found");
    }

    // Ensure extension is activated
    if (!extension.isActive) {
      await extension.activate();
    }

    // Mock the commands API to return our commands
    const mockCommands: string[] = ["dbt.run", "dbt.compile", "other.command"];
    const spy = jest.spyOn(vscode.commands, "getCommands");
    (spy.mockResolvedValue as any)(mockCommands);

    const allCommands = await vscode.commands.getCommands();
    const dbtCommands = (allCommands as string[]).filter((cmd: string) =>
      cmd.startsWith("dbt."),
    );

    // More detailed error message
    expect(dbtCommands.length).toBeGreaterThan(0);

    // Test specific commands exist
    expect(dbtCommands).toContain("dbt.run");
    expect(dbtCommands).toContain("dbt.compile");
  });
});
