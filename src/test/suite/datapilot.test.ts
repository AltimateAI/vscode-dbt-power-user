import {
  CommandProcessExecutionFactory,
  DBTConfiguration,
  DBTTerminal,
} from "@altimateai/dbt-integration";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { AltimateDatapilot } from "../../dbt_client/datapilot";
import { PythonEnvironment } from "../../dbt_client/pythonEnvironment";

describe("AltimateDatapilot", () => {
  let createCommandProcessExecution: jest.Mock<any>;
  let datapilot: AltimateDatapilot;

  const result = (stdout: string, stderr = "") => ({
    stdout,
    stderr,
    fullOutput: stdout + stderr,
  });

  // The first execution probes dbt-core, the second runs pip install
  const mockExecutions = (dbtCoreProbe: ReturnType<typeof result>) => {
    const pipInstall = jest.fn(() =>
      Promise.resolve(result("Successfully installed")),
    );
    createCommandProcessExecution
      .mockReturnValueOnce({ complete: () => Promise.resolve(dbtCoreProbe) })
      .mockReturnValueOnce({ completeWithTerminalOutput: pipInstall });
    return pipInstall;
  };

  const pipArgs = () =>
    (createCommandProcessExecution.mock.calls[1][0] as { args: string[] }).args;

  beforeEach(() => {
    createCommandProcessExecution = jest.fn();
    datapilot = new AltimateDatapilot(
      {
        pythonPath: "/usr/bin/python3",
        getEnvironmentVariables: () => ({}),
      } as unknown as PythonEnvironment,
      {
        createCommandProcessExecution,
      } as unknown as CommandProcessExecutionFactory,
      {} as DBTTerminal,
      {
        getWorkingDirectory: () => undefined,
      } as unknown as DBTConfiguration,
    );
  });

  it("should pin the installed dbt-core so pip repairs its downgraded deps", async () => {
    const pipInstall = mockExecutions(result("1.12.5\n"));

    await datapilot.installAltimateDatapilot("0.3.8");

    expect(pipInstall).toHaveBeenCalled();
    expect(pipArgs()).toEqual([
      "-m",
      "pip",
      "install",
      "altimate-datapilot-cli==0.3.8",
      "dbt-core==1.12.5",
    ]);
  });

  it("should not install dbt-core when it is not already installed", async () => {
    mockExecutions(
      result("", "importlib.metadata.PackageNotFoundError: dbt-core"),
    );

    await datapilot.installAltimateDatapilot("0.3.8");

    expect(pipArgs()).toEqual([
      "-m",
      "pip",
      "install",
      "altimate-datapilot-cli==0.3.8",
    ]);
  });

  it("should ignore non-version output from the dbt-core probe", async () => {
    mockExecutions(result("DeprecationWarning: something\n"));

    await datapilot.installAltimateDatapilot("0.3.8");

    expect(pipArgs()).not.toContainEqual(expect.stringMatching(/^dbt-core==/));
  });
});
