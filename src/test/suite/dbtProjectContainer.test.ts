import {
  expect,
  describe,
  it,
  beforeEach,
  afterEach,
  jest,
} from "@jest/globals";
import { DBTClient } from "../../dbt_client";
import { DBTTerminal } from "../../dbt_client/terminal";
import { AltimateDatapilot } from "../../dbt_client/datapilot";
import { AltimateRequest } from "../../altimate";
import { DBTProjectContainer } from "../../manifest/dbtProjectContainer";
import { DBTWorkspaceFolder } from "../../manifest/dbtWorkspaceFolder";
import { EventEmitter, Uri, WorkspaceFolder } from "vscode";
import { ManifestCacheChangedEvent } from "../../manifest/event/manifestCacheChangedEvent";
import { ProjectRegisteredUnregisteredEvent } from "../../manifest/dbtProjectContainer";
import { EnvironmentVariables } from "../../domain";

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
});
