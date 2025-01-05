import * as assert from "assert";
import * as sinon from "sinon";
import { DBTCoreDetection } from "../../dbt_client/dbtCoreIntegration";
import {
  CommandProcessExecution,
  CommandProcessExecutionFactory,
} from "../../commandProcessExecution";
import { PythonEnvironment } from "../../manifest/pythonEnvironment";
import { workspace, Uri } from "vscode";

suite("DBTCoreDetection Tests", () => {
  let sandbox: sinon.SinonSandbox;
  let detection: DBTCoreDetection;
  let mockCommandProcessExecutionFactory: sinon.SinonStubbedInstance<CommandProcessExecutionFactory>;
  let mockPythonEnvironment: sinon.SinonStubbedInstance<PythonEnvironment>;
  let mockCommandProcessExecution: sinon.SinonStubbedInstance<CommandProcessExecution>;
  let workspaceFoldersStub: sinon.SinonStub;

  setup(() => {
    sandbox = sinon.createSandbox();

    // Mock workspace folders
    workspaceFoldersStub = sandbox.stub(workspace, "workspaceFolders").value([
      {
        uri: Uri.file("/test/workspace"),
        name: "test",
        index: 0,
      },
    ]);

    mockCommandProcessExecution = {
      complete: sandbox
        .stub()
        .resolves({ stdout: "", stderr: "", fullOutput: "" }),
      completeWithTerminalOutput: sandbox.stub(),
      disposables: [],
      terminal: {} as any,
      command: "",
      spawn: sandbox.stub(),
      kill: sandbox.stub(),
      dispose: sandbox.stub(),
      formatText: sandbox.stub(),
    } as unknown as sinon.SinonStubbedInstance<CommandProcessExecution>;

    mockCommandProcessExecutionFactory = {
      createCommandProcessExecution: sandbox
        .stub()
        .returns(mockCommandProcessExecution),
    } as unknown as sinon.SinonStubbedInstance<CommandProcessExecutionFactory>;

    mockPythonEnvironment = {
      pythonPath: "/path/to/python",
      environmentVariables: { PATH: "/some/path" },
    } as unknown as sinon.SinonStubbedInstance<PythonEnvironment>;

    detection = new DBTCoreDetection(
      mockPythonEnvironment as any,
      mockCommandProcessExecutionFactory as any,
    );
  });

  teardown(() => {
    sandbox.restore();
  });

  test("detectDBT should return true when dbt is installed", async () => {
    const mockResponse = {
      stdout: "",
      stderr: "",
      fullOutput: "",
    };
    mockCommandProcessExecution.complete.resolves(mockResponse);
    mockCommandProcessExecutionFactory.createCommandProcessExecution.returns(
      mockCommandProcessExecution,
    );

    const result = await detection.detectDBT();

    assert.strictEqual(result, true);
    sinon.assert.calledWith(
      mockCommandProcessExecutionFactory.createCommandProcessExecution,
      {
        command: "/path/to/python",
        args: ["-c", "import dbt"],
        cwd: "/test/workspace",
        envVars: { PATH: "/some/path" },
      },
    );
    sinon.assert.calledOnce(mockCommandProcessExecution.complete);
  });

  test("detectDBT should return false when dbt import fails with stderr", async () => {
    mockCommandProcessExecution.complete.resolves({
      stdout: "",
      stderr: "ModuleNotFoundError: No module named 'dbt'",
      fullOutput: "ModuleNotFoundError: No module named 'dbt'",
    });

    const result = await detection.detectDBT();

    assert.strictEqual(result, false);
  });

  test("detectDBT should return false when command execution throws error", async () => {
    mockCommandProcessExecution.complete.rejects(new Error("Command failed"));

    const result = await detection.detectDBT();

    assert.strictEqual(result, false);
  });
});
