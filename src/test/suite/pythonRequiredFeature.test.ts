import {
  DBTCoreProjectIntegration,
  DBTFusionCommandProjectIntegration,
} from "@altimateai/dbt-integration";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import { commands, extensions, window } from "vscode";
import { DBTProject } from "../../dbt_client/dbtProject";
import {
  findMissingPython,
  promptForPython,
} from "../../pythonRequiredFeature";

const SUBJECT = "Altimate notebooks need";

describe("findMissingPython", () => {
  afterEach(() => {
    (extensions.getExtension as jest.Mock).mockReset();
  });

  it("is ready with an interpreter, even without the Python extension (override)", () => {
    (extensions.getExtension as jest.Mock).mockReturnValue(undefined);
    expect(
      findMissingPython({ pythonPath: "/venv/bin/python" } as any),
    ).toBeUndefined();
  });

  it("names the missing extension when there is no interpreter and no extension", () => {
    (extensions.getExtension as jest.Mock).mockReturnValue(undefined);
    expect(findMissingPython({ pythonPath: "" } as any)).toBe(
      "noPythonExtension",
    );
  });

  it("names the missing interpreter when the extension has none selected", () => {
    (extensions.getExtension as jest.Mock).mockReturnValue({});
    const throwing = {
      get pythonPath(): string {
        throw new TypeError("execCommand is undefined");
      },
    };
    expect(findMissingPython(throwing as any)).toBe("noPythonInterpreter");
  });
});

describe("promptForPython", () => {
  const showErrorMessage = window.showErrorMessage as jest.Mock<any>;
  const showInformationMessage =
    window.showInformationMessage as jest.Mock<any>;
  const executeCommand = commands.executeCommand as jest.Mock<any>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("installs the Python extension and offers a reload", async () => {
    showErrorMessage.mockResolvedValueOnce("Install Python extension");
    showInformationMessage.mockResolvedValueOnce("Reload window");

    await promptForPython(SUBJECT, "noPythonExtension");

    expect(showErrorMessage).toHaveBeenCalledWith(
      "Altimate notebooks need a Python interpreter. The Python extension, which selects one, is not installed.",
      "Install Python extension",
      "Open setting",
    );
    expect(executeCommand).toHaveBeenCalledWith(
      "workbench.extensions.installExtension",
      "ms-python.python",
    );
    expect(executeCommand).toHaveBeenCalledWith(
      "workbench.action.reloadWindow",
    );
  });

  it("reports a failed install instead of rejecting", async () => {
    showErrorMessage.mockResolvedValueOnce("Install Python extension");
    executeCommand.mockRejectedValueOnce(new Error("offline"));

    await expect(
      promptForPython(SUBJECT, "noPythonExtension"),
    ).resolves.toBeUndefined();

    expect(showErrorMessage).toHaveBeenLastCalledWith(
      "The Python extension could not be installed: offline",
    );
    expect(showInformationMessage).not.toHaveBeenCalled();
  });

  it("opens the override setting", async () => {
    showErrorMessage.mockResolvedValueOnce("Open setting");

    await promptForPython(SUBJECT, "noPythonExtension");

    expect(executeCommand).toHaveBeenCalledWith(
      "workbench.action.openSettings",
      "dbt.dbtPythonPathOverride",
    );
  });

  it.each([
    ["Select Python interpreter", "python.setInterpreter"],
    ["Detect from terminal", "dbtPowerUser.detectPythonFromTerminal"],
  ])("runs %s", async (answer, command) => {
    showErrorMessage.mockResolvedValueOnce(answer);

    await promptForPython(SUBJECT, "noPythonInterpreter");

    expect(showErrorMessage).toHaveBeenCalledWith(
      "Altimate notebooks need a Python interpreter. Select one to continue.",
      "Select Python interpreter",
      "Detect from terminal",
    );
    expect(executeCommand).toHaveBeenCalledWith(command);
  });
});

describe("DBTProject.isFusionIntegration", () => {
  const projectRunBy = (integration: object) => {
    const project = Object.create(DBTProject.prototype);
    project.dbtProjectIntegration = {
      getCurrentProjectIntegration: () => integration,
    };
    return project as DBTProject;
  };

  it("is true when the adapter created the dbt Fusion integration", () => {
    expect(
      projectRunBy(
        Object.create(DBTFusionCommandProjectIntegration.prototype),
      ).isFusionIntegration(),
    ).toBe(true);
  });

  it("is false for dbt Core", () => {
    expect(
      projectRunBy(
        Object.create(DBTCoreProjectIntegration.prototype),
      ).isFusionIntegration(),
    ).toBe(false);
  });
});
