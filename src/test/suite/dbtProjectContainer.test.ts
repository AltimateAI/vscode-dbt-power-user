import { DBTTerminal, EnvironmentVariables } from "@altimateai/dbt-integration";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import { EventEmitter, window, WorkspaceFolder } from "vscode";
import { AltimateRequest } from "../../altimate";
import { DBTClient } from "../../dbt_client";
import { AltimateDatapilot } from "../../dbt_client/datapilot";
import {
  DBTProjectContainer,
  ProjectRegisteredUnregisteredEvent,
} from "../../dbt_client/dbtProjectContainer";
import { DBTWorkspaceFolder } from "../../dbt_client/dbtWorkspaceFolder";
import { ManifestCacheChangedEvent } from "../../dbt_client/event/manifestCacheChangedEvent";
import { createEntry } from "../fixtures/runHistory";

describe("DBTProjectContainer Tests", () => {
  let container: DBTProjectContainer;
  let mockDbtClient: jest.Mocked<DBTClient>;
  let mockDbtTerminal: jest.Mocked<DBTTerminal>;
  let mockAltimateDatapilot: jest.Mocked<AltimateDatapilot>;
  let mockAltimateRequest: jest.Mocked<AltimateRequest>;
  let mockDbtWorkspaceFolder: jest.Mocked<DBTWorkspaceFolder>;

  const createMockDbtWorkspaceFolder = (
    workspaceFolder: WorkspaceFolder,
    onManifestChanged: EventEmitter<ManifestCacheChangedEvent>,
    onProjectRegisteredUnregistered: EventEmitter<ProjectRegisteredUnregisteredEvent>,
    pythonPath?: string,
    envVars?: EnvironmentVariables,
  ): DBTWorkspaceFolder => {
    return mockDbtWorkspaceFolder;
  };

  beforeEach(() => {
    mockDbtClient = {
      onDBTInstallationVerification: new EventEmitter().event,
      dispose: jest.fn(),
    } as unknown as jest.Mocked<DBTClient>;

    mockDbtTerminal = {
      show: jest.fn(),
      log: jest.fn(),
      trace: jest.fn(),
      debug: jest.fn(),
      info: jest.fn(),
      error: jest.fn(),
      dispose: jest.fn(),
      logNewLine: jest.fn(),
      logLine: jest.fn(),
      logHorizontalRule: jest.fn(),
      logBlock: jest.fn(),
      warn: jest.fn(),
    } as unknown as jest.Mocked<DBTTerminal>;

    mockAltimateDatapilot = {
      checkIfAltimateDatapilotInstalled: jest.fn(),
      installAltimateDatapilot: jest.fn(),
    } as unknown as jest.Mocked<AltimateDatapilot>;

    mockAltimateRequest = {
      dispose: jest.fn(),
      enabled: jest.fn(),
      isAuthenticated: jest.fn(),
      validateCredentials: jest.fn(),
    } as unknown as jest.Mocked<AltimateRequest>;

    mockDbtWorkspaceFolder = {
      dispose: jest.fn(),
    } as unknown as jest.Mocked<DBTWorkspaceFolder>;

    container = new DBTProjectContainer(
      mockDbtClient,
      createMockDbtWorkspaceFolder,
      mockDbtTerminal,
      mockAltimateDatapilot,
      mockAltimateRequest,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with correct dependencies", () => {
    expect(container).toBeDefined();
    expect(container.onDBTInstallationVerification).toBe(
      mockDbtClient.onDBTInstallationVerification,
    );
  });

  it("should dispose client and terminal dependencies", () => {
    container.dispose();

    expect(mockDbtClient.dispose).toHaveBeenCalled();
    expect(mockDbtTerminal.dispose).toHaveBeenCalled();
  });

  describe("rerunFromHistory", () => {
    const mockProject = {
      getProjectName: jest.fn().mockReturnValue("test-project"),
      runModel: jest.fn(),
      buildModel: jest.fn(),
      buildProject: jest.fn(),
      runTest: jest.fn(),
      compileModel: jest.fn(),
    };

    beforeEach(() => {
      jest
        .spyOn(container, "findProjectByName")
        .mockReturnValue(mockProject as any);
    });

    it("should show error when project is not found", () => {
      jest.spyOn(container, "findProjectByName").mockReturnValue(undefined);

      container.rerunFromHistory(
        createEntry({ projectName: "nonexistent", command: "dbt run" }),
      );

      expect(window.showErrorMessage).toHaveBeenCalledWith(
        expect.stringContaining("nonexistent"),
      );
    });

    it("should show warning for project-wide dbt run (empty args)", () => {
      container.rerunFromHistory(createEntry({ command: "dbt run", args: [] }));

      expect(window.showWarningMessage).toHaveBeenCalledWith(
        expect.stringContaining("dbt run"),
      );
      expect(mockProject.runModel).not.toHaveBeenCalled();
    });

    it("should delegate to runModel when args are present", () => {
      container.rerunFromHistory(
        createEntry({ command: "dbt run", args: ["my_model"] }),
      );

      expect(mockProject.runModel).toHaveBeenCalledWith(
        expect.objectContaining({ modelName: "my_model" }),
      );
    });

    it("should show warning for project-wide dbt test (empty args)", () => {
      container.rerunFromHistory(
        createEntry({ command: "dbt test", args: [] }),
      );

      expect(window.showWarningMessage).toHaveBeenCalledWith(
        expect.stringContaining("dbt test"),
      );
      expect(mockProject.runTest).not.toHaveBeenCalled();
    });

    it("should delegate to runTest when args are present", () => {
      container.rerunFromHistory(
        createEntry({ command: "dbt test", args: ["my_test"] }),
      );

      expect(mockProject.runTest).toHaveBeenCalledWith("my_test");
    });

    it("should show warning for project-wide dbt compile (empty args)", () => {
      container.rerunFromHistory(
        createEntry({ command: "dbt compile", args: [] }),
      );

      expect(window.showWarningMessage).toHaveBeenCalledWith(
        expect.stringContaining("dbt compile"),
      );
      expect(mockProject.compileModel).not.toHaveBeenCalled();
    });

    it("should delegate to compileModel when args are present", () => {
      container.rerunFromHistory(
        createEntry({ command: "dbt compile", args: ["+my_model"] }),
      );

      expect(mockProject.compileModel).toHaveBeenCalledWith(
        expect.objectContaining({
          plusOperatorLeft: "+",
          modelName: "my_model",
        }),
      );
    });

    it("should call buildProject for project-wide dbt build (empty args)", () => {
      container.rerunFromHistory(
        createEntry({ command: "dbt build", args: [] }),
      );

      expect(mockProject.buildProject).toHaveBeenCalled();
    });

    it("should delegate to buildModel when build has args", () => {
      container.rerunFromHistory(
        createEntry({ command: "dbt build", args: ["+my_model+"] }),
      );

      expect(mockProject.buildModel).toHaveBeenCalledWith(
        expect.objectContaining({
          plusOperatorLeft: "+",
          modelName: "my_model",
          plusOperatorRight: "+",
        }),
      );
    });

    it("should show warning for unknown command", () => {
      container.rerunFromHistory(
        createEntry({ command: "dbt seed", args: [] }),
      );

      expect(window.showWarningMessage).toHaveBeenCalledWith(
        expect.stringContaining("seed"),
      );
    });
  });
});
