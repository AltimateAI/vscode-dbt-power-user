import { expect, describe, it, beforeEach, afterEach } from "@jest/globals";
import * as sinon from "sinon";
import { MockEventEmitter } from "../setup";
import { DBTProjectContainer } from "../../manifest/dbtProjectContainer";
import { DBTClient } from "../../dbt_client";
import { DBTWorkspaceFolder } from "../../manifest/dbtWorkspaceFolder";
import { DBTTerminal } from "../../dbt_client/dbtTerminal";
import { AltimateDatapilot } from "../../dbt_client/datapilot";
import { AltimateRequest } from "../../altimate";
import { Container } from "inversify";

describe("DBTProjectContainer Test Suite", () => {
  let sandbox: sinon.SinonSandbox;
  let container: DBTProjectContainer;
  let dbtClient: sinon.SinonStubbedInstance<DBTClient>;
  let dbtTerminal: sinon.SinonStubbedInstance<DBTTerminal>;
  let altimateDatapilot: sinon.SinonStubbedInstance<AltimateDatapilot>;
  let altimateRequest: sinon.SinonStubbedInstance<AltimateRequest>;
  let mockContext: any;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    // Create stubs for dependencies
    dbtClient = sandbox.createStubInstance(DBTClient);
    dbtTerminal = sandbox.createStubInstance(DBTTerminal);
    altimateDatapilot = sandbox.createStubInstance(AltimateDatapilot);
    altimateRequest = sandbox.createStubInstance(AltimateRequest);

    // Create a factory function for DBTWorkspaceFolder
    const dbtWorkspaceFolderFactory = () => {
      return sandbox.createStubInstance(DBTWorkspaceFolder);
    };

    // Create the container instance
    container = new DBTProjectContainer(
      dbtClient as any,
      dbtWorkspaceFolderFactory as any,
      dbtTerminal as any,
      altimateDatapilot as any,
      altimateRequest as any,
    );

    // Mock extension context
    mockContext = {
      subscriptions: [],
      extensionPath: "/test/path",
      globalState: {
        get: jest.fn(),
        update: jest.fn(),
      },
      workspaceState: {
        get: jest.fn(),
        update: jest.fn(),
      },
    };
  });

  afterEach(() => {
    sandbox.restore();
    jest.clearAllMocks();
  });

  it("should create a new container instance", () => {
    expect(container).toBeInstanceOf(DBTProjectContainer);
  });

  it("should initialize with the provided dependencies", () => {
    expect(dbtClient).toBeDefined();
    expect(dbtTerminal).toBeDefined();
    expect(altimateDatapilot).toBeDefined();
    expect(altimateRequest).toBeDefined();
  });
});
