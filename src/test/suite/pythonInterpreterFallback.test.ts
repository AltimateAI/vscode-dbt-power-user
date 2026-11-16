import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import {
  commands,
  EventEmitter,
  extensions,
  Uri,
  window,
  workspace,
} from "vscode";
import { PythonEnvironment } from "../../dbt_client/pythonEnvironment";

// The module object itself, which the extension's calls read: an ES import's
// namespace can't be spied on.
const childProcess = require("child_process") as typeof import("child_process");

/**
 * The Python extension keeps a deleted virtual environment as the selected
 * interpreter, and every start used to spawn it and fail. When the selected
 * interpreter is a file that doesn't exist, the extension now looks for one
 * that can import dbt and uses it for the window: the Python extension's
 * default interpreter, a virtual environment in a dbt project or the
 * workspace, a known environment in the workspace, then `python3` and
 * `python` on the PATH. It says which one it is using, and writes it to the
 * Python extension only when the user clicks "Keep using it".
 */

// Spied, not mocked: the test setup loads the extension, and with it
// `child_process`, before a `jest.mock` here would apply.
let execFileMock: jest.Mock;
const showInformationMessage = window.showInformationMessage as jest.Mock;
const showErrorMessage = window.showErrorMessage as jest.Mock;
const executeCommand = commands.executeCommand as jest.Mock;
// The mock's workspace, whose read-only members the tests set.
const mockWorkspace = workspace as unknown as Record<string, unknown>;

let root: string;
let missing: string;
let terminal: Record<string, jest.Mock>;

/** An interpreter file in the temp workspace, so the probe's result exists. */
function interpreterFile(...segments: string[]): string {
  const file = join(root, ...segments);
  mkdirSync(join(file, ".."), { recursive: true });
  writeFileSync(file, "");
  return file;
}

function venvPython(dir: string): string {
  return process.platform === "win32"
    ? interpreterFile(dir, "Scripts", "python.exe")
    : interpreterFile(dir, "bin", "python");
}

/** What each probed command reports: its `sys.executable` and dbt version,
 * or `"no-dbt"` when it can't import dbt. Anything else fails to spawn. */
function interpreters(
  found: Record<string, { executable: string; dbt: string } | "no-dbt">,
) {
  execFileMock.mockImplementation((...args: unknown[]) => {
    const [command, , , callback] = args as [
      string,
      string[],
      unknown,
      (error: Error | null, stdout: string, stderr: string) => void,
    ];
    const result = found[command];
    if (result === undefined) {
      callback(
        Object.assign(new Error(`spawn ${command} ENOENT`), { code: "ENOENT" }),
        "",
        "",
      );
    } else if (result === "no-dbt") {
      callback(
        new Error("Command failed"),
        "",
        "ModuleNotFoundError: No module named 'dbt'",
      );
    } else {
      callback(null, `${result.executable}\n${result.dbt}\n`, "");
    }
    return {};
  });
}

function probedCommands(): string[] {
  return execFileMock.mock.calls.map((call) => String(call[0]));
}

function setConfig(values: Record<string, unknown>) {
  (workspace.getConfiguration as jest.Mock).mockImplementation(() => ({
    get: jest.fn((key: string, fallback?: unknown) =>
      key in values ? values[key] : fallback,
    ),
    has: jest.fn(),
    update: jest.fn(),
  }));
}

/** An environment whose Python extension selects `selected`; `select` changes
 * the selection and fires the extension's change event. */
function makeEnvironment(selected: string) {
  const env = new PythonEnvironment(terminal as any);
  const changes = new EventEmitter<Uri | undefined>();
  let current = selected;
  (env as any).activatePythonExtension = jest.fn(async () => {
    (env as any)._pythonExtensionAvailable = true;
    return {
      getPythonPath: () => current,
      getEnvVars: () => ({ vars: { PATH: "/usr/bin" }, sources: {} }),
      onDidChangeExecutionDetails: changes.event,
    };
  });
  const select = (path: string) => {
    current = path;
    changes.fire(undefined);
  };
  return { env, select };
}

const flush = () => new Promise((resolve) => setImmediate(resolve));

/** Calls that sent telemetry, as `name: message`. */
function telemetry(): string[] {
  const sent = (mock: jest.Mock) =>
    mock.mock.calls
      .filter((call) => call[2] !== false)
      .map((call) => `${call[0]}: ${call[1]}`);
  return [...sent(terminal.info), ...sent(terminal.warn)];
}

beforeEach(() => {
  root = mkdtempSync(join(tmpdir(), "interpreter-fallback-"));
  missing = join(root, "deleted-venv", "bin", "python");
  terminal = {
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    log: jest.fn(),
  };
  execFileMock = jest.spyOn(childProcess, "execFile") as unknown as jest.Mock;
  setConfig({});
  mockWorkspace.workspaceFolders = [
    { uri: Uri.file(root), name: "ws", index: 0 },
  ];
  mockWorkspace.isTrusted = true;
  mockWorkspace.findFiles = jest.fn(async () => []);
  interpreters({});
});

afterEach(() => {
  rmSync(root, { recursive: true, force: true });
  execFileMock.mockRestore();
  jest.clearAllMocks();
});

describe("PythonEnvironment falls back from a missing interpreter", () => {
  it("uses the Python extension's default interpreter and says so", async () => {
    const fallback = interpreterFile("container-python", "bin", "python");
    setConfig({ defaultInterpreterPath: fallback });
    interpreters({ [fallback]: { executable: fallback, dbt: "1.10.4" } });
    const { env } = makeEnvironment(missing);

    await env.initialize();
    await flush();

    expect(env.pythonPath).toBe(fallback);
    expect(showInformationMessage).toHaveBeenCalledTimes(1);
    expect(showInformationMessage).toHaveBeenCalledWith(
      `The selected Python interpreter ${missing} was not found. dbt is using ${fallback} (dbt 1.10.4) in this window.`,
      "Keep using it",
      "Select another",
    );
    expect(showErrorMessage).not.toHaveBeenCalled();
  });

  it("uses a virtual environment in a dbt project", async () => {
    const project = join(root, "transform");
    const projectVenv = venvPython(join("transform", ".venv"));
    mockWorkspace.findFiles = jest.fn(async () => [
      Uri.file(join(project, "dbt_project.yml")),
    ]);
    interpreters({
      [projectVenv]: { executable: projectVenv, dbt: "1.9.0" },
      python3: { executable: projectVenv, dbt: "1.9.0" },
    });
    const { env } = makeEnvironment(missing);

    await env.initialize();

    expect(env.pythonPath).toBe(projectVenv);
  });

  it("prefers the dbt project's virtual environment to the workspace's", async () => {
    const workspaceVenv = venvPython("venv");
    const projectVenv = venvPython(join("transform", ".venv"));
    mockWorkspace.findFiles = jest.fn(async () => [
      Uri.file(join(root, "transform", "dbt_project.yml")),
    ]);
    interpreters({
      [workspaceVenv]: { executable: workspaceVenv, dbt: "1.8.0" },
      [projectVenv]: { executable: projectVenv, dbt: "1.9.0" },
    });
    const { env } = makeEnvironment(missing);

    await env.initialize();

    expect(env.pythonPath).toBe(projectVenv);
  });

  it("does not run interpreters from an untrusted workspace", async () => {
    const workspaceVenv = venvPython(".venv");
    mockWorkspace.isTrusted = false;
    interpreters({
      [workspaceVenv]: { executable: workspaceVenv, dbt: "1.9.0" },
    });
    const { env } = makeEnvironment(missing);

    await env.initialize();

    expect(probedCommands()).not.toContain(workspaceVenv);
    expect(env.pythonPath).toBe(missing);
  });

  it("does not run a default interpreter inside an untrusted workspace", async () => {
    const inside = interpreterFile("tools", "python");
    setConfig({ defaultInterpreterPath: inside });
    mockWorkspace.isTrusted = false;
    interpreters({ [inside]: { executable: inside, dbt: "1.9.0" } });
    const { env } = makeEnvironment(missing);

    await env.initialize();

    expect(probedCommands()).not.toContain(inside);
    expect(env.pythonPath).toBe(missing);
  });

  it("uses a default interpreter outside an untrusted workspace", async () => {
    const elsewhere = mkdtempSync(join(tmpdir(), "user-python-"));
    try {
      const outside = join(elsewhere, "python");
      writeFileSync(outside, "");
      setConfig({ defaultInterpreterPath: outside });
      mockWorkspace.isTrusted = false;
      interpreters({ [outside]: { executable: outside, dbt: "1.9.0" } });
      const { env } = makeEnvironment(missing);

      await env.initialize();

      expect(env.pythonPath).toBe(outside);
    } finally {
      rmSync(elsewhere, { recursive: true, force: true });
    }
  });

  it("uses an environment the Python extension knows in the workspace", async () => {
    const known = interpreterFile("envs", "dbt", "bin", "python");
    const outside = join(tmpdir(), "elsewhere", "bin", "python");
    interpreters({ [known]: { executable: known, dbt: "1.9.0" } });
    const { env } = makeEnvironment(missing);
    env.allPythonPaths = [
      { path: outside, pathType: "venv" },
      { path: known, pathType: "venv" },
    ];

    await env.initialize();

    expect(env.pythonPath).toBe(known);
    expect(probedCommands()).not.toContain(outside);
  });

  it("treats a folder whose name starts with .. as inside the workspace", async () => {
    const known = interpreterFile("..tools", "bin", "python");
    interpreters({ [known]: { executable: known, dbt: "1.9.0" } });
    const { env } = makeEnvironment(missing);
    env.allPythonPaths = [{ path: known, pathType: "venv" }];

    await env.initialize();

    expect(env.pythonPath).toBe(known);
  });

  it("uses python3 on the PATH, by the interpreter it reports", async () => {
    const executable = interpreterFile("usr", "bin", "python3.11");
    interpreters({ python3: { executable, dbt: "1.11.2" } });
    const { env } = makeEnvironment(missing);

    await env.initialize();

    expect(env.pythonPath).toBe(executable);
  });

  it("skips a candidate that can't import dbt", async () => {
    const workspaceVenv = venvPython(".venv");
    const executable = interpreterFile("usr", "bin", "python3");
    interpreters({
      [workspaceVenv]: "no-dbt",
      python3: { executable, dbt: "1.11.2" },
    });
    const { env } = makeEnvironment(missing);

    await env.initialize();

    expect(env.pythonPath).toBe(executable);
  });

  it("keeps the missing interpreter, with no notice, when nothing works", async () => {
    interpreters({ python3: "no-dbt" });
    const { env } = makeEnvironment(missing);

    await env.initialize();
    await flush();

    expect(env.pythonPath).toBe(missing);
    expect(showInformationMessage).not.toHaveBeenCalled();
  });

  it("probes nothing when the selected interpreter exists", async () => {
    const selected = venvPython(".venv");
    const { env } = makeEnvironment(selected);

    await env.initialize();

    expect(execFileMock).not.toHaveBeenCalled();
    expect(env.pythonPath).toBe(selected);
  });

  it("probes nothing when a usable override is set", async () => {
    setConfig({ dbtPythonPathOverride: "python3" });
    const { env } = makeEnvironment(missing);

    await env.initialize();

    expect(execFileMock).not.toHaveBeenCalled();
    expect(env.pythonPath).toBe("python3");
  });

  it.each(["fusion", "cloud"])(
    "probes nothing for the %s integration",
    async (mode) => {
      setConfig({ dbtIntegration: mode });
      const { env } = makeEnvironment(missing);

      await env.initialize();

      expect(execFileMock).not.toHaveBeenCalled();
      expect(env.pythonPath).toBe(missing);
    },
  );

  it("reports the outcome once, without a path", async () => {
    const executable = interpreterFile("usr", "bin", "python3");
    interpreters({ python3: { executable, dbt: "1.11.2" } });
    const { env, select } = makeEnvironment(missing);

    await env.initialize();
    select(join(root, "another-deleted", "bin", "python"));
    await flush();

    expect(telemetry()).toEqual(["pythonInterpreterFallback: found:path"]);
    expect(telemetry().join()).not.toContain(root);
  });
});

describe("the fallback notice", () => {
  async function noticeAnswered(answer: string | undefined) {
    const executable = interpreterFile("usr", "bin", "python3");
    interpreters({ python3: { executable, dbt: "1.11.2" } });
    const updateActiveEnvironmentPath = jest.fn(async () => undefined);
    (extensions.getExtension as jest.Mock).mockReturnValue({
      isActive: true,
      exports: { environments: { updateActiveEnvironmentPath } },
    });
    showInformationMessage.mockReturnValueOnce(Promise.resolve(answer));
    const { env } = makeEnvironment(missing);
    await env.initialize();
    await flush();
    return { env, executable, updateActiveEnvironmentPath };
  }

  it("writes the fallback to the Python extension on Keep using it", async () => {
    const { executable, updateActiveEnvironmentPath } =
      await noticeAnswered("Keep using it");

    expect(updateActiveEnvironmentPath).toHaveBeenCalledWith(executable);
  });

  it("logs a failed Keep using it instead of rejecting", async () => {
    const unhandled: unknown[] = [];
    const onUnhandled = (reason: unknown) => unhandled.push(reason);
    process.on("unhandledRejection", onUnhandled);
    try {
      const executable = interpreterFile("usr", "bin", "python3");
      interpreters({ python3: { executable, dbt: "1.11.2" } });
      (extensions.getExtension as jest.Mock).mockReturnValue({
        isActive: true,
        exports: {
          environments: {
            updateActiveEnvironmentPath: jest.fn(async () => {
              throw new Error("could not set the interpreter");
            }),
          },
        },
      });
      showInformationMessage.mockReturnValueOnce(
        Promise.resolve("Keep using it"),
      );
      const { env } = makeEnvironment(missing);

      await env.initialize();
      await flush();
      await flush();

      expect(unhandled).toEqual([]);
      expect(
        terminal.debug.mock.calls.some(
          (call) => call[0] === "pythonEnvironment:showFallbackNotice",
        ),
      ).toBe(true);
      expect(env.pythonPath).toBe(executable);
    } finally {
      process.off("unhandledRejection", onUnhandled);
    }
  });

  it("opens the Python extension's picker on Select another", async () => {
    const { updateActiveEnvironmentPath } =
      await noticeAnswered("Select another");

    expect(executeCommand).toHaveBeenCalledWith("python.setInterpreter");
    expect(updateActiveEnvironmentPath).not.toHaveBeenCalled();
  });

  it("writes nothing when dismissed, and keeps the fallback for the window", async () => {
    const { env, executable, updateActiveEnvironmentPath } =
      await noticeAnswered(undefined);

    expect(updateActiveEnvironmentPath).not.toHaveBeenCalled();
    expect(env.pythonPath).toBe(executable);
  });

  it("is shown once per missing interpreter in a window", async () => {
    const executable = interpreterFile("usr", "bin", "python3");
    interpreters({ python3: { executable, dbt: "1.11.2" } });
    const { env, select } = makeEnvironment(missing);

    await env.initialize();
    select(missing);
    await flush();
    await flush();

    expect(showInformationMessage).toHaveBeenCalledTimes(1);
  });
});

describe("a change of interpreter", () => {
  it("drops the fallback once the selected interpreter exists", async () => {
    const executable = interpreterFile("usr", "bin", "python3");
    interpreters({ python3: { executable, dbt: "1.11.2" } });
    const { env, select } = makeEnvironment(missing);
    await env.initialize();
    const chosen = venvPython(".venv");
    const seen: string[] = [];
    env.onPythonEnvironmentChanged(() => seen.push(env.pythonPath));

    select(chosen);
    await flush();
    await flush();

    expect(seen).toEqual([chosen]);
  });

  it("is announced only after a fallback for the new interpreter is found", async () => {
    const { env, select } = makeEnvironment(venvPython(".venv"));
    await env.initialize();
    const executable = interpreterFile("usr", "bin", "python3");
    interpreters({ python3: { executable, dbt: "1.11.2" } });
    const seen: string[] = [];
    env.onPythonEnvironmentChanged(() => seen.push(env.pythonPath));

    select(missing);
    await flush();
    await flush();

    expect(seen).toEqual([executable]);
  });

  it("announces only the latest of changes that arrive while probing", async () => {
    const { env, select } = makeEnvironment(venvPython(".venv"));
    await env.initialize();
    const executable = interpreterFile("usr", "bin", "python3");
    // Probes answer only when released, so a second change lands mid-probe.
    const held: (() => void)[] = [];
    execFileMock.mockImplementation((...args: unknown[]) => {
      const [command, , , callback] = args as [
        string,
        string[],
        unknown,
        (error: Error | null, stdout: string, stderr: string) => void,
      ];
      held.push(() =>
        command === "python3"
          ? callback(null, `${executable}\n1.11.2\n`, "")
          : callback(new Error(`spawn ${command} ENOENT`), "", ""),
      );
      return {};
    });
    const seen: string[] = [];
    env.onPythonEnvironmentChanged(() => seen.push(env.pythonPath));
    const another = join(root, "another-deleted", "bin", "python");

    select(missing);
    await flush();
    select(another);
    await flush();
    while (held.length > 0) {
      held.shift()!();
      await flush();
    }
    await flush();

    expect(seen).toEqual([executable]);
    expect(showInformationMessage).toHaveBeenCalledTimes(1);
    expect(String(showInformationMessage.mock.calls[0][0])).toContain(another);
  });
});

describe("an invalid dbtPythonPathOverride", () => {
  it("is reported once, however often the interpreter is read", async () => {
    const selected = venvPython(".venv");
    setConfig({ dbtPythonPathOverride: join(root, "gone", "python") });
    const { env } = makeEnvironment(selected);
    await env.initialize();

    for (let i = 0; i < 5; i++) {
      expect(env.pythonPath).toBe(selected);
    }

    expect(
      terminal.warn.mock.calls.filter(
        (call) => call[0] === "pythonEnvironment:pythonPath",
      ),
    ).toHaveLength(1);
  });
});
