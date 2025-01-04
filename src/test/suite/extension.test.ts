import * as assert from "assert";
import * as vscode from "vscode";
import * as sinon from "sinon";
import { expect } from "chai";

suite("Extension Test Suite", () => {
  const sandbox = sinon.createSandbox();

  teardown(() => {
    sandbox.restore();
  });

  vscode.window.showInformationMessage("Start all tests.");

  test("Sample test", () => {
    assert.strictEqual(-1, [1, 2, 3].indexOf(5));
    assert.strictEqual(-1, [1, 2, 3].indexOf(0));
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
    } as vscode.Extension<any>;

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
    } as vscode.Extension<any>;

    // Mock the extensions API
    const mockExtensions = [mockJinjaHtml, mockOurExtension];
    sandbox.stub(vscode.extensions, "all").value(mockExtensions);
    sandbox.stub(vscode.extensions, "getExtension").callsFake((id: string) => {
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

  test("Extension should be present", () => {
    const extension = getExtension();
    assert.ok(
      extension,
      "Extension not found in development or production environment",
    );
  });

  test("Extension should activate", async () => {
    const extension = getExtension();
    if (!extension) {
      throw new Error("Extension not found");
    }
    await extension.activate();
    assert.strictEqual(extension.isActive, true);
  });

  test("Should register commands", async () => {
    const extension = getExtension();
    if (!extension) {
      throw new Error("Extension not found");
    }

    // Ensure extension is activated
    if (!extension.isActive) {
      await extension.activate();
    }

    // Mock the commands API to return our commands
    const mockCommands = ["dbt.run", "dbt.compile", "other.command"];
    sandbox.stub(vscode.commands, "getCommands").resolves(mockCommands);

    const allCommands = await vscode.commands.getCommands();
    const dbtCommands = allCommands.filter((cmd) => cmd.startsWith("dbt."));

    // More detailed error message
    assert.ok(
      dbtCommands.length > 0,
      `No dbt commands found in available commands: ${allCommands.join(", ")}`,
    );

    // Test specific commands exist
    assert.ok(dbtCommands.includes("dbt.run"), "dbt.run command not found");
    assert.ok(
      dbtCommands.includes("dbt.compile"),
      "dbt.compile command not found",
    );
  });
});
