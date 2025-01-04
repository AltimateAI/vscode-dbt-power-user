import * as assert from "assert";
import * as vscode from "vscode";
import * as sinon from "sinon";
import { expect } from "chai";
import { DBTProjectContainer } from "../../manifest/dbtProjectContainer";
import { DBTClient } from "../../dbt_client";
import { DBTWorkspaceFolder } from "../../manifest/dbtWorkspaceFolder";
import { DBTTerminal } from "../../dbt_client/dbtTerminal";
import { AltimateDatapilot } from "../../dbt_client/datapilot";
import { AltimateRequest } from "../../altimate";
import { Container } from "inversify";
import { EventEmitter } from "vscode";

suite("DBTProjectContainer Test Suite", () => {
  let sandbox: sinon.SinonSandbox;
  let container: DBTProjectContainer;
  let dbtClient: sinon.SinonStubbedInstance<DBTClient>;
  let dbtTerminal: sinon.SinonStubbedInstance<DBTTerminal>;
  let altimateDatapilot: sinon.SinonStubbedInstance<AltimateDatapilot>;
  let altimateRequest: sinon.SinonStubbedInstance<AltimateRequest>;
  let mockContext: vscode.ExtensionContext;

  setup(() => {
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
      workspaceState: {
        get: sandbox.stub(),
        update: sandbox.stub().resolves(),
      },
      globalState: {
        get: sandbox.stub(),
        update: sandbox.stub().resolves(),
      },
      extension: {
        id: "innoverio.vscode-dbt-power-user",
      },
    } as any;

    container.setContext(mockContext);
  });

  teardown(() => {
    sandbox.restore();
  });

  test("getAdapters should return unique list of adapters", async () => {
    // Setup
    const mockWorkspaceFolder1 = sandbox.createStubInstance(DBTWorkspaceFolder);
    const mockWorkspaceFolder2 = sandbox.createStubInstance(DBTWorkspaceFolder);

    mockWorkspaceFolder1.getAdapters.returns(["snowflake", "postgres"]);
    mockWorkspaceFolder2.getAdapters.returns(["snowflake"]);

    (container as any).dbtWorkspaceFolders = [
      mockWorkspaceFolder1,
      mockWorkspaceFolder2,
    ];

    // Execute
    const adapters = container.getAdapters();

    // Verify
    expect(adapters).to.have.members(["snowflake", "postgres"]);
    expect(adapters.length).to.equal(2);
  });

  test("extensionId should return correct id", () => {
    expect(container.extensionId).to.equal("innoverio.vscode-dbt-power-user");
  });

  test("setToWorkspaceState should update workspace state", async () => {
    const key = "testKey";
    const value = { data: "testValue" };
    await container.setToWorkspaceState(key, value);
    sinon.assert.calledOnceWithExactly(
      mockContext.workspaceState.update as sinon.SinonStub,
      key,
      value,
    );
  });

  test("getFromWorkspaceState should retrieve from workspace state", () => {
    const key = "testKey";
    const expectedValue = { data: "testValue" };
    (mockContext.workspaceState.get as sinon.SinonStub).returns(expectedValue);
    const result = container.getFromWorkspaceState(key);
    expect(result).to.deep.equal(expectedValue);
    sinon.assert.calledOnceWithExactly(
      mockContext.workspaceState.get as sinon.SinonStub,
      key,
    );
  });

  test("setToGlobalState should update global state", async () => {
    const key = "testKey";
    const value = { data: "testValue" };
    await container.setToGlobalState(key, value);
    sinon.assert.calledOnceWithExactly(
      mockContext.globalState.update as sinon.SinonStub,
      key,
      value,
    );
  });

  test("getFromGlobalState should retrieve from global state", () => {
    const key = "testKey";
    const expectedValue = { data: "testValue" };
    (mockContext.globalState.get as sinon.SinonStub).returns(expectedValue);
    const result = container.getFromGlobalState(key);
    expect(result).to.deep.equal(expectedValue);
    sinon.assert.calledOnceWithExactly(
      mockContext.globalState.get as sinon.SinonStub,
      key,
    );
  });

  test("detectDBT should trigger dbt installation verification", async () => {
    // Setup
    const verificationEmitter = new EventEmitter<void>();
    const verificationEvent = verificationEmitter.event;

    // Create a new DBTClient instance with the event
    const newDbtClient = sandbox.createStubInstance(DBTClient);
    (newDbtClient as any).onDBTInstallationVerification = verificationEvent;

    // Create a new container with this client
    container = new DBTProjectContainer(
      newDbtClient as any,
      () => sandbox.createStubInstance(DBTWorkspaceFolder),
      dbtTerminal as any,
      altimateDatapilot as any,
      altimateRequest as any,
    );

    const verificationSpy = sandbox.spy(verificationEmitter, "fire");
    (newDbtClient.detectDBT as sinon.SinonStub).callsFake(async () => {
      verificationEmitter.fire();
    });

    // Execute
    await container.detectDBT();

    // Verify
    sinon.assert.called(verificationSpy);
  });

  test("initialize should set up workspace folders and trigger events", async () => {
    // Setup
    const mockWorkspaceFolder = {
      uri: vscode.Uri.file("/test/workspace"),
      name: "test-workspace",
      index: 0,
    };

    const mockDbtWorkspaceFolder = {
      initialize: sandbox.stub().resolves(),
    };

    // Create a new container with a factory that returns our mock
    container = new DBTProjectContainer(
      dbtClient as any,
      () => mockDbtWorkspaceFolder as any,
      dbtTerminal as any,
      altimateDatapilot as any,
      altimateRequest as any,
    );

    sandbox
      .stub(vscode.workspace, "workspaceFolders")
      .value([mockWorkspaceFolder]);

    const initEventEmitter = new EventEmitter<void>();
    (container as any)._onDBTProjectsInitializationEvent = initEventEmitter;
    const initEventSpy = sandbox.spy(initEventEmitter, "fire");

    // Mock the registerWorkspaceFolder method
    (container as any).registerWorkspaceFolder = sandbox.stub().resolves();

    // Execute
    await container.initializeDBTProjects();

    // Verify
    expect((container as any).registerWorkspaceFolder.calledOnce).to.be.true;
    expect(initEventSpy.called).to.be.true;
  });

  test("initialize should handle empty workspace gracefully", async () => {
    // Setup
    sandbox.stub(vscode.workspace, "workspaceFolders").value(undefined);

    const initEventEmitter = new EventEmitter<void>();
    (container as any)._onDBTProjectsInitializationEvent = initEventEmitter;
    const initEventSpy = sandbox.spy(initEventEmitter, "fire");

    // Execute
    await container.initializeDBTProjects();

    // Verify
    expect(container.dbtWorkspaceFolders).to.have.lengthOf(0);
    expect(initEventSpy.called).to.be.false;
  });
});
