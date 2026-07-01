import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";
import { window, workspace } from "vscode";
import { PythonEnvironment } from "../../dbt_client/pythonEnvironment";

/**
 * Regression coverage for the "Detect Python from terminal" command.
 *
 * The detection probe runs a Python one-liner in the integrated terminal via the
 * shell-integration API and extracts sys.executable from the captured output by
 * searching for unique markers. Shell integration echoes the command line into
 * the same stream that is read back, so when the probe embedded the marker
 * tokens literally, the marker search matched the *echo* and returned a fragment
 * of the probe code (e.g. `"); print(sys.executable); print("`), which was then
 * written to dbt.dbtPythonPathOverride and broke every subsequent invocation.
 */
function makeTerminal(output: string) {
  // Emit the captured output in two chunks to exercise stream accumulation.
  async function* read() {
    const mid = Math.floor(output.length / 2);
    yield output.slice(0, mid);
    yield output.slice(mid);
  }
  return {
    name: "test-terminal",
    shellIntegration: {
      executeCommand: jest.fn(() => ({ read })),
    },
  };
}

describe("PythonEnvironment.detectPythonFromShell", () => {
  let env: PythonEnvironment;
  const originalActive = (window as any).activeTerminal;
  const originalTerminals = (window as any).terminals;

  // How the probe command appears once the shell echoes it back: the marker
  // tokens only ever show up here in split form ("__DBT_DETE" + "CT_START__"),
  // never as the contiguous token the parser searches for.
  const echoedCommand =
    `python3 -c 'import sys; __import__("dbt"); ` +
    `print("__DBT_DETE" + "CT_START__"); print(sys.executable); ` +
    `print("__DBT_DET" + "ECT_END__")'`;

  beforeEach(() => {
    env = new PythonEnvironment({ debug: jest.fn() } as any);
  });

  afterEach(() => {
    (window as any).activeTerminal = originalActive;
    (window as any).terminals = originalTerminals;
    jest.clearAllMocks();
  });

  function useTerminal(output: string) {
    const term = makeTerminal(output);
    (window as any).activeTerminal = term;
    (window as any).terminals = [term];
  }

  it("returns the interpreter path when dbt is importable", async () => {
    useTerminal(
      `${echoedCommand}\r\n` +
        `__DBT_DETECT_START__\r\n${process.execPath}\r\n__DBT_DETECT_END__\r\n`,
    );

    expect(await env.detectPythonFromShell()).toBe(process.execPath);
  });

  it("returns undefined (never a probe fragment) when only the command echo is captured", async () => {
    // dbt not importable: stdout prints nothing, only the echo is in the stream.
    useTerminal(`${echoedCommand}\r\n`);

    expect(await env.detectPythonFromShell()).toBeUndefined();
  });

  it("rejects the exact probe-fragment value even if it lands between markers", async () => {
    const fragment = `"); print(sys.executable); print("`;
    useTerminal(
      `__DBT_DETECT_START__\r\n${fragment}\r\n__DBT_DETECT_END__\r\n`,
    );

    expect(await env.detectPythonFromShell()).toBeUndefined();
  });

  it("rejects a value that is not an absolute path", async () => {
    useTerminal(`__DBT_DETECT_START__\r\npython3\r\n__DBT_DETECT_END__\r\n`);

    expect(await env.detectPythonFromShell()).toBeUndefined();
  });

  it("rejects an absolute path that does not exist on disk", async () => {
    useTerminal(
      `__DBT_DETECT_START__\r\n/no/such/python/binary\r\n__DBT_DETECT_END__\r\n`,
    );

    expect(await env.detectPythonFromShell()).toBeUndefined();
  });
});

/**
 * Read-side guard on the `pythonPath` getter. The terminal-probe fix above stops
 * *new* poisoning, but machines that already wrote a garbage
 * dbt.dbtPythonPathOverride (a leaked probe fragment) stay broken on every
 * dbt/pip call until the user clears the setting by hand. The getter therefore
 * ignores an override that is not a usable interpreter and falls back to normal
 * detection, self-healing those configs on next launch.
 */
describe("PythonEnvironment.pythonPath override guard", () => {
  const FALLBACK = "/fallback/python/from/detection";
  const warn = jest.fn();
  const originalGetConfiguration = workspace.getConfiguration;
  let env: PythonEnvironment;

  beforeEach(() => {
    env = new PythonEnvironment({ debug: jest.fn(), warn } as any);
    // Satisfy getEnvironmentVariables() (used while resolving the setting) and
    // provide the value returned when the override is ignored.
    (env as any).executionDetails = {
      getEnvVars: () => ({ vars: {} }),
      getPythonPath: () => FALLBACK,
    };
  });

  afterEach(() => {
    (workspace as any).getConfiguration = originalGetConfiguration;
    jest.clearAllMocks();
  });

  function setOverride(value: string) {
    (workspace as any).getConfiguration = jest.fn(() => ({
      get: jest.fn(() => value),
    }));
  }

  it("keeps a valid absolute interpreter path that exists on disk", () => {
    setOverride(process.execPath);

    expect(env.pythonPath).toBe(process.execPath);
    expect(warn).not.toHaveBeenCalled();
  });

  it("keeps a bare command that resolves via PATH (e.g. python3)", () => {
    setOverride("python3");

    expect(env.pythonPath).toBe("python3");
    expect(warn).not.toHaveBeenCalled();
  });

  it("ignores the leaked probe-fragment value and falls back, with telemetry", () => {
    setOverride(`"); print(sys.executable); print("`);

    expect(env.pythonPath).toBe(FALLBACK);
    // sendTelemetry flag (3rd arg) must be true so recovery is observable.
    expect(warn).toHaveBeenCalledWith(
      "pythonEnvironment:pythonPath",
      expect.stringContaining("Ignoring invalid dbtPythonPathOverride"),
      true,
    );
  });

  it("ignores an absolute override path that does not exist on disk", () => {
    setOverride("/no/such/python/binary");

    expect(env.pythonPath).toBe(FALLBACK);
    expect(warn).toHaveBeenCalled();
  });

  it("falls back without warning when no override is set", () => {
    setOverride("");

    expect(env.pythonPath).toBe(FALLBACK);
    expect(warn).not.toHaveBeenCalled();
  });
});
