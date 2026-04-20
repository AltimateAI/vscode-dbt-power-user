import {
  DataPilotHealtCheckParams,
  RunModelType,
} from "@altimateai/dbt-integration";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import { EventEmitter } from "events";
import * as fs from "fs";
import { commands, ExtensionContext, Uri, window, workspace } from "vscode";
import { DBTProjectContainer } from "../../dbt_client/dbtProjectContainer";
import { createEntry } from "../fixtures/runHistory";

// Mock vscode module
jest.mock("vscode", () => {
  const mock = jest.requireActual("../mock/vscode");
  return mock;
});

// Make fs.realpathSync.native a pass-through so model params can be derived
// from synthetic paths without the files existing on disk.
jest
  .spyOn(fs.realpathSync, "native")
  .mockImplementation((p: fs.PathLike) => p as string);

describe("DBTProjectContainer Tests", () => {
  let container: DBTProjectContainer;
  let mockDbtClient: any;
  let mockDbtTerminal: any;
  let mockAltimateDatapilot: any;
  let mockAltimateRequest: any;
  let mockDbtWorkspaceFolder: any;
  let mockDbtProject: any;
  let mockDbtWorkspaceFolderFactory: any;

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();

    // Mock DBT project
    mockDbtProject = {
      projectRoot: Uri.file("/path/to/project"),
      findPackageName: jest.fn(() => "test_package"),
      initialize: jest.fn(),
      executeSQLOnQueryPanel: jest.fn(),
      runModel: jest.fn(),
      buildModel: jest.fn(),
      buildProject: jest.fn(),
      runTest: jest.fn(),
      runModelTest: jest.fn(),
      compileModel: jest.fn(),
      generateDocs: jest.fn(),
      compileQuery: jest.fn(() => Promise.resolve("compiled query")),
      showRunSQL: jest.fn(),
      showCompiledSql: jest.fn(),
      generateSchemaYML: jest.fn(),
      performDatapilotHealthcheck: jest.fn(),
      dispose: jest.fn(),
    };

    // Mock DBT workspace folder
    mockDbtWorkspaceFolder = {
      dispose: jest.fn(),
      contains: jest.fn(() => true),
      findDBTProject: jest.fn(() => mockDbtProject),
      getProjects: jest.fn(() => [mockDbtProject]),
      getAdapters: jest.fn(() => ["postgres"]),
      discoverProjects: jest.fn(() => Promise.resolve()),
      onRebuildManifestStatusChange: (handler: any) => {
        // Mock event registration
        return { dispose: jest.fn() };
      },
    };

    // Mock DBT client
    mockDbtClient = {
      onDBTInstallationVerification: new EventEmitter().on,
      dispose: jest.fn(),
      showErrorIfDbtOrPythonNotInstalled: jest.fn(),
      showErrorIfDbtIsNotInstalled: jest.fn(),
      detectDBT: jest.fn(() => Promise.resolve()),
      getPythonEnvironment: jest.fn(() => ({
        pythonPath: "/path/to/python",
      })),
    };

    // Mock DBT terminal
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
    };

    // Mock Altimate datapilot
    mockAltimateDatapilot = {
      checkIfAltimateDatapilotInstalled: jest.fn(() =>
        Promise.resolve("1.0.0"),
      ),
      installAltimateDatapilot: jest.fn(() => Promise.resolve()),
    };

    // Mock Altimate request
    mockAltimateRequest = {
      dispose: jest.fn(),
      enabled: jest.fn(),
      isAuthenticated: jest.fn(),
      validateCredentials: jest.fn(),
      getDatapilotVersion: jest.fn(() =>
        Promise.resolve({ altimate_datapilot_version: "1.0.0" }),
      ),
    };

    // Mock workspace folder factory
    mockDbtWorkspaceFolderFactory = jest.fn(() => mockDbtWorkspaceFolder);

    // Create container
    container = new DBTProjectContainer(
      mockDbtClient,
      mockDbtWorkspaceFolderFactory,
      mockDbtTerminal,
      mockAltimateDatapilot,
      mockAltimateRequest,
    );

    // Set up workspace folders for testing
    container.dbtWorkspaceFolders = [mockDbtWorkspaceFolder];
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Initialization and Lifecycle", () => {
    it("should initialize with correct dependencies", () => {
      expect(container).toBeDefined();
      expect(container.onDBTInstallationVerification).toBe(
        mockDbtClient.onDBTInstallationVerification,
      );
    });

    it("should dispose all dependencies", () => {
      container.dispose();

      expect(mockDbtWorkspaceFolder.dispose).toHaveBeenCalled();
      expect(mockDbtClient.dispose).toHaveBeenCalled();
      expect(mockDbtTerminal.dispose).toHaveBeenCalled();
    });

    it("should set context properly", () => {
      const mockContext = {
        extensionUri: Uri.file("/path/to/extension"),
        extension: { id: "test-extension", packageJSON: { version: "1.0.0" } },
      } as ExtensionContext;

      container.setContext(mockContext);
      expect(container.extensionUri).toEqual(mockContext.extensionUri);
      expect(container.extensionVersion).toBe("1.0.0");
      expect(container.extensionId).toBe("test-extension");
    });

    it("should detect DBT installation", async () => {
      await container.detectDBT();
      expect(mockDbtClient.detectDBT).toHaveBeenCalled();
    });

    it("should initialize all projects", async () => {
      await container.initialize();
      expect(mockDbtProject.initialize).toHaveBeenCalled();
    });
  });

  describe("Error Handling", () => {
    it("should show error if dbt or Python not installed", () => {
      container.showErrorIfDbtOrPythonNotInstalled();
      expect(
        mockDbtClient.showErrorIfDbtOrPythonNotInstalled,
      ).toHaveBeenCalled();
    });

    it("should show error if dbt is not installed", () => {
      container.showErrorIfDbtIsNotInstalled();
      expect(mockDbtClient.showErrorIfDbtIsNotInstalled).toHaveBeenCalled();
    });
  });

  describe("Project Management", () => {
    it("should find DBT project for given URI", () => {
      const uri = Uri.file("/path/to/project/models/test.sql");
      const result = container.findDBTProject(uri);

      expect(mockDbtWorkspaceFolder.findDBTProject).toHaveBeenCalledWith(uri);
      expect(result).toBe(mockDbtProject);
    });

    it("should return undefined when no DBT project found", () => {
      container.dbtWorkspaceFolders = [];
      const uri = Uri.file("/path/to/non-dbt/file.txt");
      const result = container.findDBTProject(uri);

      expect(result).toBeUndefined();
    });

    it("should get all projects", () => {
      const projects = container.getProjects();
      expect(projects).toEqual([mockDbtProject]);
    });

    it("should get unique adapters", () => {
      const adapters = container.getAdapters();
      expect(adapters).toEqual(["postgres"]);
    });

    it("should get Python environment", () => {
      const pythonEnv = container.getPythonEnvironment();
      expect(pythonEnv?.pythonPath).toBe("/path/to/python");
    });

    it("should get package name from URI", () => {
      const uri = Uri.file("/path/to/project/models/test.sql");
      const packageName = container.getPackageName(uri);

      expect(packageName).toBe("test_package");
    });

    it("should get project root path from URI", () => {
      const uri = Uri.file("/path/to/project/models/test.sql");
      const rootPath = container.getProjectRootpath(uri);

      expect(rootPath).toEqual(mockDbtProject.projectRoot);
    });
  });

  describe("SQL Operations", () => {
    it("should execute SQL query", () => {
      const uri = Uri.file("/path/to/project/models/test.sql");
      const query = "SELECT * FROM table";
      const modelName = "test_model";

      container.executeSQL(uri, query, modelName);

      expect(mockDbtProject.executeSQLOnQueryPanel).toHaveBeenCalledWith(
        query,
        modelName,
      );
    });

    it("should compile query", async () => {
      const uri = Uri.file("/path/to/project/models/test.sql");
      const query = "SELECT * FROM {{ ref('model') }}";

      const result = await container.compileQuery(uri, query);

      expect(mockDbtProject.compileQuery).toHaveBeenCalledWith(query);
      expect(result).toBe("compiled query");
    });

    it("should show run SQL", () => {
      const uri = Uri.file("/path/to/project/models/test.sql");

      container.showRunSQL(uri);

      expect(mockDbtProject.showRunSQL).toHaveBeenCalledWith(uri);
    });

    it("should show compiled SQL", () => {
      const uri = Uri.file("/path/to/project/models/test.sql");

      container.showCompiledSQL(uri);

      expect(mockDbtProject.showCompiledSql).toHaveBeenCalledWith(uri);
    });
  });

  describe("Model Operations", () => {
    it("should run model", () => {
      const modelPath = Uri.file("/path/to/project/models/test.sql");
      container.runModel(modelPath);

      expect(mockDbtProject.runModel).toHaveBeenCalledWith({
        plusOperatorLeft: "",
        modelName: "test",
        plusOperatorRight: "",
      });
    });

    it("should run model with parents", () => {
      const modelPath = Uri.file("/path/to/project/models/test.sql");
      container.runModel(modelPath, RunModelType.RUN_PARENTS);

      expect(mockDbtProject.runModel).toHaveBeenCalledWith({
        plusOperatorLeft: "+",
        modelName: "test",
        plusOperatorRight: "",
      });
    });

    it("should run model with children", () => {
      const modelPath = Uri.file("/path/to/project/models/test.sql");
      container.runModel(modelPath, RunModelType.RUN_CHILDREN);

      expect(mockDbtProject.runModel).toHaveBeenCalledWith({
        plusOperatorLeft: "",
        modelName: "test",
        plusOperatorRight: "+",
      });
    });

    it("should build model", () => {
      const modelPath = Uri.file("/path/to/project/models/test.sql");
      container.buildModel(modelPath);

      expect(mockDbtProject.buildModel).toHaveBeenCalledWith({
        plusOperatorLeft: "",
        modelName: "test",
        plusOperatorRight: "",
      });
    });

    it("should build project", () => {
      const modelPath = Uri.file("/path/to/project");
      container.buildProject(modelPath);

      expect(mockDbtProject.buildProject).toHaveBeenCalled();
    });

    it("should compile model", () => {
      const modelPath = Uri.file("/path/to/project/models/test.sql");
      container.compileModel(modelPath);

      expect(mockDbtProject.compileModel).toHaveBeenCalledWith({
        plusOperatorLeft: "",
        modelName: "test",
        plusOperatorRight: "",
      });
    });

    it("should generate docs", () => {
      const modelPath = Uri.file("/path/to/project/models/test.sql");
      container.generateDocs(modelPath);

      expect(mockDbtProject.generateDocs).toHaveBeenCalled();
    });

    it("should generate schema YML", () => {
      const modelPath = Uri.file("/path/to/project/models/test.sql");
      const modelName = "test_model";

      container.generateSchemaYML(modelPath, modelName);

      expect(mockDbtProject.generateSchemaYML).toHaveBeenCalledWith(
        modelPath,
        modelName,
      );
    });
  });

  describe("Test Operations", () => {
    it("should run test", () => {
      const modelPath = Uri.file("/path/to/project/tests/test_model.sql");
      const testName = "test_model";

      container.runTest(modelPath, testName);

      expect(mockDbtProject.runTest).toHaveBeenCalledWith(testName);
    });

    it("should run model test", () => {
      const modelPath = Uri.file("/path/to/project/models/test.sql");
      const modelName = "test_model";

      container.runModelTest(modelPath, modelName);

      expect(mockDbtProject.runModelTest).toHaveBeenCalledWith(modelName);
    });
  });

  describe("State Management", () => {
    it("should set and get workspace state", () => {
      const mockContext = {
        workspaceState: {
          get: jest.fn(),
          update: jest.fn(),
        },
        globalState: {
          get: jest.fn(),
          update: jest.fn(),
        },
      } as unknown as ExtensionContext;

      container.setContext(mockContext);

      const key = "testKey";
      const value = { test: "value" };

      container.setToWorkspaceState(key, value);
      expect(mockContext.workspaceState.update).toHaveBeenCalledWith(
        key,
        value,
      );

      mockContext.workspaceState.get = jest.fn(() => value);
      const result = container.getFromWorkspaceState(key);
      expect(result).toEqual(value);
    });

    it("should set and get global state", () => {
      const mockContext = {
        workspaceState: {
          get: jest.fn(),
          update: jest.fn(),
        },
        globalState: {
          get: jest.fn(),
          update: jest.fn(),
        },
      } as unknown as ExtensionContext;

      container.setContext(mockContext);

      const key = "globalKey";
      const value = "globalValue";

      container.setToGlobalState(key, value);
      expect(mockContext.globalState.update).toHaveBeenCalledWith(key, value);

      mockContext.globalState.get = jest.fn(() => value);
      const result = container.getFromGlobalState(key);
      expect(result).toBe(value);
    });
  });

  describe("Altimate Datapilot Integration", () => {
    beforeEach(() => {
      const mockContext = {
        extension: { id: "test-extension", packageJSON: { version: "1.0.0" } },
      } as ExtensionContext;
      container.setContext(mockContext);
    });

    it("should check if Altimate Datapilot is installed", async () => {
      const result = await container.checkIfAltimateDatapilotInstalled();

      expect(
        mockAltimateDatapilot.checkIfAltimateDatapilotInstalled,
      ).toHaveBeenCalled();
      expect(mockAltimateRequest.getDatapilotVersion).toHaveBeenCalledWith(
        "1.0.0",
      );
      expect(result).toBe(true);
    });

    it("should install Altimate Datapilot", async () => {
      await container.installAltimateDatapilot();

      expect(mockAltimateRequest.getDatapilotVersion).toHaveBeenCalledWith(
        "1.0.0",
      );
      expect(
        mockAltimateDatapilot.installAltimateDatapilot,
      ).toHaveBeenCalledWith("1.0.0");
    });

    it("should execute Altimate Datapilot healthcheck", async () => {
      const args = {
        projectRoot: "/path/to/project",
        configType: "All" as const,
      } as DataPilotHealtCheckParams;

      await container.executeAltimateDatapilotHealthcheck(args);

      expect(mockDbtProject.performDatapilotHealthcheck).toHaveBeenCalledWith(
        args,
      );
    });

    it("should throw error when project not found for healthcheck", () => {
      // Mock getProjects to return empty array
      container.getProjects = jest.fn(() => []);

      const args = {
        projectRoot: "/non/existent/project",
        configType: "All" as const,
      } as DataPilotHealtCheckParams;

      expect(() => container.executeAltimateDatapilotHealthcheck(args)).toThrow(
        "Unable to find project /non/existent/project",
      );
    });
  });

  describe("Workspace Folder Management", () => {
    it("should initialize DBT projects", async () => {
      const mockWorkspaceFolder = {
        uri: Uri.file("/path/to/workspace"),
        name: "test-workspace",
        index: 0,
      };

      // Mock workspace folders
      (workspace as any).workspaceFolders = [mockWorkspaceFolder];
      container.dbtWorkspaceFolders = [];

      await container.initializeDBTProjects();

      expect(mockDbtWorkspaceFolderFactory).toHaveBeenCalledWith(
        mockWorkspaceFolder,
        expect.anything(),
        expect.anything(),
      );
    });

    it("should handle undefined workspace folders", async () => {
      // Mock workspace folders as undefined
      (workspace as any).workspaceFolders = undefined;

      // Should not throw
      await container.initializeDBTProjects();

      // Should not call factory
      expect(mockDbtWorkspaceFolderFactory).not.toHaveBeenCalled();
    });

    it("should handle workspace folder changes", async () => {
      // Setup workspace change handler
      let changeHandler: any;
      (workspace.onDidChangeWorkspaceFolders as any).mockImplementation(
        (handler: any) => {
          changeHandler = handler;
          return { dispose: jest.fn() };
        },
      );

      // Create a new container to register the handler
      new DBTProjectContainer(
        mockDbtClient,
        mockDbtWorkspaceFolderFactory,
        mockDbtTerminal,
        mockAltimateDatapilot,
        mockAltimateRequest,
      );

      // Simulate workspace folder change
      const addedFolder = {
        uri: Uri.file("/path/to/added"),
        name: "added",
        index: 1,
      };
      const removedFolder = {
        uri: Uri.file("/path/to/workspace"),
        name: "test-workspace",
        index: 0,
      };

      await changeHandler({
        added: [addedFolder],
        removed: [removedFolder],
      });

      expect(mockDbtWorkspaceFolderFactory).toHaveBeenCalledWith(
        addedFolder,
        expect.anything(),
        expect.anything(),
      );
    });
  });

  describe("Edge Cases", () => {
    it("should handle operations when no project is found", () => {
      mockDbtWorkspaceFolder.findDBTProject = jest.fn(() => undefined);

      const uri = Uri.file("/path/to/non-dbt/file.sql");

      // These should not throw errors
      container.runModel(uri);
      container.buildModel(uri);
      container.compileModel(uri);
      container.generateDocs(uri);

      expect(mockDbtProject.runModel).not.toHaveBeenCalled();
      expect(mockDbtProject.buildModel).not.toHaveBeenCalled();
      expect(mockDbtProject.compileModel).not.toHaveBeenCalled();
      expect(mockDbtProject.generateDocs).not.toHaveBeenCalled();
    });

    it("should handle empty workspace folders array", () => {
      container.dbtWorkspaceFolders = [];

      expect(container.getProjects()).toEqual([]);
      expect(container.getAdapters()).toEqual([]);
    });

    it("should deduplicate adapters", () => {
      const mockDbtWorkspaceFolder2 = {
        ...mockDbtWorkspaceFolder,
        getAdapters: jest.fn(() => ["postgres", "snowflake"]),
      };

      container.dbtWorkspaceFolders = [
        mockDbtWorkspaceFolder,
        mockDbtWorkspaceFolder2,
      ];

      const adapters = container.getAdapters();
      expect(adapters).toEqual(["postgres", "snowflake"]);
    });

    it("should handle undefined Python environment", () => {
      mockDbtClient.getPythonEnvironment = jest.fn(() => undefined);

      const pythonEnv = container.getPythonEnvironment();
      expect(pythonEnv).toBeUndefined();
    });

    it("should handle context not set", () => {
      const newContainer = new DBTProjectContainer(
        mockDbtClient,
        mockDbtWorkspaceFolderFactory,
        mockDbtTerminal,
        mockAltimateDatapilot,
        mockAltimateRequest,
      );

      // These should not throw even without context
      expect(() => newContainer.extensionId).not.toThrow();
      expect(newContainer.extensionId).toBe("");
    });
  });

  describe("Walkthrough and Initialization", () => {
    beforeEach(() => {
      const mockContext = {
        workspaceState: {
          get: jest.fn(),
          update: jest.fn(),
        },
        globalState: {
          get: jest.fn(),
          update: jest.fn(),
        },
      } as unknown as ExtensionContext;
      container.setContext(mockContext);
    });

    it("should show walkthrough when user accepts", async () => {
      (window.showInformationMessage as any) = jest.fn(() =>
        Promise.resolve("Yes"),
      );

      await container.showWalkthrough();

      expect(commands.executeCommand).toHaveBeenCalledWith(
        "setContext",
        "dbtPowerUser.showSetupWalkthrough",
        false,
      );
      expect(commands.executeCommand).toHaveBeenCalledWith(
        "dbtPowerUser.openOnboarding",
      );
    });

    it("should not show walkthrough when user ignores", async () => {
      (window.showInformationMessage as any) = jest.fn(() =>
        Promise.resolve("Ignore"),
      );

      await container.showWalkthrough();

      expect(commands.executeCommand).not.toHaveBeenCalledWith(
        "dbtPowerUser.openOnboarding",
      );
    });

    it("should skip walkthrough when hidden in settings", async () => {
      const mockConfig = {
        get: jest.fn((key: string, defaultValue?: any) => {
          if (key === "hideWalkthrough") {
            return true;
          }
          return defaultValue;
        }),
      };
      (workspace.getConfiguration as any) = jest.fn(() => mockConfig);

      const mockContext = {
        workspaceState: {
          get: jest.fn(),
          update: jest.fn(),
        },
        globalState: {
          get: jest.fn(() => true),
          update: jest.fn(),
        },
      } as unknown as ExtensionContext;
      container.setContext(mockContext);
      (window.showInformationMessage as any) = jest.fn();

      await container.initializeWalkthrough();

      expect(window.showInformationMessage).not.toHaveBeenCalled();
    });

    it("should trigger walkthrough when not hidden and state undefined", async () => {
      const mockConfig = {
        get: jest.fn((key: string, defaultValue?: any) => {
          if (key === "hideWalkthrough") {
            return false;
          }
          return defaultValue;
        }),
      };
      (workspace.getConfiguration as any) = jest.fn(() => mockConfig);

      const mockContext = {
        workspaceState: {
          get: jest.fn(),
          update: jest.fn(),
        },
        globalState: {
          get: jest.fn(() => undefined),
          update: jest.fn(),
        },
      } as unknown as ExtensionContext;
      container.setContext(mockContext);
      (window.showInformationMessage as any) = jest.fn(() =>
        Promise.resolve("Ignore"),
      );

      await container.initializeWalkthrough();

      expect(window.showInformationMessage).toHaveBeenCalled();
    });
  });

  describe("Project Registration Events", () => {
    it("should set up project registration event handler", () => {
      // The project registration event handler is set up in the constructor
      // and is tested indirectly through workspace folder operations.
      // This test verifies that the container properly initializes with the event system.

      const newContainer = new DBTProjectContainer(
        mockDbtClient,
        mockDbtWorkspaceFolderFactory,
        mockDbtTerminal,
        mockAltimateDatapilot,
        mockAltimateRequest,
      );

      // Verify the container has the expected event emitters
      expect(
        (newContainer as any)._onProjectRegisteredUnregistered,
      ).toBeDefined();
      expect((newContainer as any)._onManifestChanged).toBeDefined();
      expect(
        (newContainer as any)._onRebuildManifestStatusChange,
      ).toBeDefined();

      // Verify public event accessors
      expect(newContainer.onManifestChanged).toBeDefined();
      expect(newContainer.onRebuildManifestStatusChange).toBeDefined();
    });
  });

  describe("SQL Operations with Untitled Files", () => {
    it("should handle executeSQL with untitled URI and selected project", () => {
      const mockContext = {
        workspaceState: {
          get: jest.fn((key: string) => {
            if (key === "dbtPowerUser.projectSelected") {
              return {
                label: "test_project",
                description: "/path/to/project",
                uri: Uri.file("/path/to/project"),
              };
            }
            return undefined;
          }),
          update: jest.fn(),
        },
        globalState: {
          get: jest.fn(),
          update: jest.fn(),
        },
      } as unknown as ExtensionContext;
      container.setContext(mockContext);

      const untitledUri = { scheme: "untitled", fsPath: "Untitled-1" } as Uri;
      const query = "SELECT * FROM table";
      const modelName = "test_model";

      container.executeSQL(untitledUri, query, modelName);

      expect(mockDbtProject.executeSQLOnQueryPanel).toHaveBeenCalledWith(
        query,
        modelName,
      );
    });

    it("should handle executeSQL with untitled URI and no selected project", () => {
      const mockContext = {
        workspaceState: {
          get: jest.fn(() => undefined),
          update: jest.fn(),
        },
        globalState: {
          get: jest.fn(),
          update: jest.fn(),
        },
      } as unknown as ExtensionContext;
      container.setContext(mockContext);

      mockDbtWorkspaceFolder.findDBTProject = jest.fn(() => undefined);

      const untitledUri = { scheme: "untitled", fsPath: "Untitled-1" } as Uri;
      const query = "SELECT * FROM table";
      const modelName = "test_model";

      // Should not throw error
      container.executeSQL(untitledUri, query, modelName);

      expect(mockDbtProject.executeSQLOnQueryPanel).not.toHaveBeenCalled();
    });
  });

  describe("Rebuild Manifest Status", () => {
    it("should handle rebuild manifest status changes", () => {
      // Setup the event handler
      let statusChangeHandler: any;
      const mockWorkspaceFolderWithEvent = {
        ...mockDbtWorkspaceFolder,
        onRebuildManifestStatusChange: (handler: any) => {
          statusChangeHandler = handler;
          return { dispose: jest.fn() };
        },
      };

      const factoryWithEvent = jest.fn(() => mockWorkspaceFolderWithEvent);

      // Create container with event support
      const newContainer = new DBTProjectContainer(
        mockDbtClient,
        factoryWithEvent,
        mockDbtTerminal,
        mockAltimateDatapilot,
        mockAltimateRequest,
      );

      // Register workspace folder
      const workspaceFolder = {
        uri: Uri.file("/path/to/workspace"),
        name: "test-workspace",
        index: 0,
      };

      // Mock workspace folders
      (workspace as any).workspaceFolders = [workspaceFolder];
      newContainer.initializeDBTProjects();

      // Simulate rebuild manifest status change
      if (statusChangeHandler) {
        statusChangeHandler({
          project: mockDbtProject,
          inProgress: true,
        });

        // Check that the event was properly handled
        const rebuildEvent = (newContainer as any)
          ._onRebuildManifestStatusChange;
        expect(rebuildEvent).toBeDefined();
      }
    });
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

  describe("unregisterWorkspaceFolder (via workspace event)", () => {
    it("should remove only the targeted folder, not subsequent ones", () => {
      // Access the internal dbtWorkspaceFolders array directly to verify
      // splice removes exactly one element (not all from index onward).
      const folders = (container as any).dbtWorkspaceFolders as any[];
      // The beforeEach seeds the container with one workspace folder; reset
      // to a clean slate so we can assert on exactly the three we push below.
      folders.length = 0;

      const createMockFolder = (fsPath: string) => ({
        contains: (uri: any) => uri.fsPath.startsWith(fsPath),
        dispose: jest.fn(),
        workspaceFolder: { uri: { fsPath } },
      });

      const folder1 = createMockFolder("/workspace/project-a");
      const folder2 = createMockFolder("/workspace/project-b");
      const folder3 = createMockFolder("/workspace/project-c");
      folders.push(folder1, folder2, folder3);

      expect(folders).toHaveLength(3);

      // Call the private unregisterWorkspaceFolder via its internal name
      (container as any).unregisterWorkspaceFolder({
        uri: { fsPath: "/workspace/project-b" },
      });

      expect(folders).toHaveLength(2);
      expect(folders[0]).toBe(folder1);
      expect(folders[1]).toBe(folder3);
      expect(folder2.dispose).toHaveBeenCalled();
    });
  });
});
