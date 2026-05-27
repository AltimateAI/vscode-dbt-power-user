import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";
import { window } from "vscode";
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
