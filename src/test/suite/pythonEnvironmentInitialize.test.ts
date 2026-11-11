import { afterEach, describe, expect, it, jest } from "@jest/globals";
import { PythonEnvironment } from "../../dbt_client/pythonEnvironment";

/**
 * Several callers wait for the Python environment at startup: the dbt
 * installation check, and the Get Started wizard when it opens on first run.
 * They must share one activation of the Python extension, and a caller that
 * arrives while it is running must wait for it rather than start another.
 */
describe("PythonEnvironment.initialize", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const details = {
    getPythonPath: () => "/venv/bin/python",
    getEnvVars: () => ({ vars: {}, sources: {} }),
    onDidChangeExecutionDetails: jest.fn(),
  };

  function environmentWithSlowActivation() {
    const env = new PythonEnvironment({
      debug: jest.fn(),
      warn: jest.fn(),
    } as any);
    const activate = jest.fn(
      () =>
        new Promise<typeof details>((resolve) =>
          setTimeout(() => resolve(details), 20),
        ),
    );
    (env as any).activatePythonExtension = activate;
    return { env, activate };
  }

  it("activates the Python extension once for concurrent callers", async () => {
    const { env, activate } = environmentWithSlowActivation();
    await Promise.all([env.initialize(), env.initialize(), env.initialize()]);
    expect(activate).toHaveBeenCalledTimes(1);
    expect(env.pythonPath).toBe("/venv/bin/python");
  });

  it("is a no-op once the environment is ready", async () => {
    const { env, activate } = environmentWithSlowActivation();
    await env.initialize();
    await env.initialize();
    expect(activate).toHaveBeenCalledTimes(1);
  });

  it("lets a later caller retry after a failed activation", async () => {
    const env = new PythonEnvironment({
      debug: jest.fn(),
      warn: jest.fn(),
    } as any);
    const activate = jest
      .fn<() => Promise<typeof details>>()
      .mockRejectedValueOnce(new Error("Python extension failed to activate"))
      .mockResolvedValueOnce(details);
    (env as any).activatePythonExtension = activate;
    await expect(env.initialize()).rejects.toThrow("failed to activate");
    await env.initialize();
    expect(activate).toHaveBeenCalledTimes(2);
    expect(env.pythonPath).toBe("/venv/bin/python");
  });
});
