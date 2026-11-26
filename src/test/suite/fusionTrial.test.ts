import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";
import { ChildProcess, SpawnOptions } from "child_process";
import { EventEmitter } from "events";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "fs";
import { homedir, tmpdir } from "os";
import * as path from "path";
import { runFusionTrial, SpawnProcess } from "../../dbt_client/fusionTrial";

/**
 * The trial parse runs dbt Fusion on each project without writing into it:
 * every path Fusion writes to is in a scratch directory that is removed
 * afterwards, missing packages are installed into scratch by `dbt deps` on a
 * copy of the package files, and the outcome and Fusion's first error come
 * from its `--log-format json` output. Fusion itself is faked here.
 */

const BINARY = path.join(tmpdir(), "fusion", "dbt");

/** What a fake Fusion run does. */
interface Script {
  stdout?: string[];
  stderr?: string[];
  exitCode?: number;
  /** Never exits on its own. */
  hang?: boolean;
  /** Exits with its code, but its output never closes (a child holds it). */
  exitOnly?: boolean;
  /** Fails to start. */
  error?: NodeJS.ErrnoException;
}

interface Call {
  command: string;
  args: string[];
  options: SpawnOptions;
  child: FakeChild;
  /** Whether the scratch dirs the args name existed when it started. */
  scratchExisted: boolean;
}

let nextPid = 4242;

class FakeChild extends EventEmitter {
  stdout = new EventEmitter();
  stderr = new EventEmitter();
  pid = nextPid++;
  exitCode: number | null = null;
  signalCode: string | null = null;
  private signaled = false;
  kill = jest.fn((signal?: string) => this.receive(signal ?? "SIGTERM"));
  /** A signal, sent to it or to its process group: like Node, `signalCode` is set when it exits. */
  receive = (signal: string): boolean => {
    if (this.exitCode !== null || this.signaled) {
      return false;
    }
    this.signaled = true;
    setImmediate(() => {
      this.signalCode = signal;
      this.emit("exit", null, signal);
      this.emit("close", null, signal);
    });
    return true;
  };
}

/** Kills of process groups (`process.kill(-pid)`), delivered to the fake child that leads the group. */
let groupKill: jest.SpyInstance;

/** The run was killed with its process tree, as this platform does it. */
function expectKilled(child: FakeChild): void {
  if (process.platform === "win32") {
    expect(child.kill).toHaveBeenCalledWith("SIGKILL");
  } else {
    expect(groupKill).toHaveBeenCalledWith(-child.pid, "SIGKILL");
  }
}

let calls: Call[];

function fakeSpawn(script: (args: string[]) => Script): SpawnProcess {
  return (command: string, args: string[], options: SpawnOptions) => {
    const child = new FakeChild();
    if (command === "taskkill") {
      return child as unknown as ChildProcess;
    }
    calls.push({
      command,
      args,
      options,
      child,
      scratchExisted: scratchPaths(args).every((p) =>
        existsSync(scratchRootOf(p)),
      ),
    });
    const run = script(args);
    setImmediate(() => {
      if (run.error) {
        child.emit("error", run.error);
        return;
      }
      for (const chunk of run.stdout ?? []) {
        child.stdout.emit("data", Buffer.from(chunk));
      }
      for (const chunk of run.stderr ?? []) {
        child.stderr.emit("data", Buffer.from(chunk));
      }
      if (run.hang) {
        return;
      }
      child.exitCode = run.exitCode ?? 0;
      child.emit("exit", child.exitCode, null);
      if (!run.exitOnly) {
        child.emit("close", child.exitCode, null);
      }
    });
    return child as unknown as ChildProcess;
  };
}

/** Resolves once the trial has started its first process (scratch setup can be slow). */
async function firstSpawn(): Promise<void> {
  for (let i = 0; i < 1000 && calls.length === 0; i++) {
    await new Promise((resolve) => setTimeout(resolve, 5));
  }
}

/** A `--log-format json` line as Fusion 2.0.12 writes it. */
function logLine(level: string, msg: string, code = ""): string {
  return (
    JSON.stringify({
      data: {},
      info: { category: "", code, level, msg, name: "Generic" },
    }) + "\n"
  );
}

const PATH_FLAGS = ["--target-path", "--log-path", "--packages-install-path"];

function argValue(args: string[], flag: string): string | undefined {
  const index = args.indexOf(flag);
  return index >= 0 ? args[index + 1] : undefined;
}

function scratchPaths(args: string[]): string[] {
  return PATH_FLAGS.map((flag) => argValue(args, flag)).filter(
    (value): value is string => value !== undefined,
  );
}

/** The trial's scratch directory a path is in. */
function scratchRootOf(p: string): string {
  let dir = p;
  while (!path.basename(dir).startsWith("pu-fusion-trial-")) {
    const parent = path.dirname(dir);
    if (parent === dir) {
      throw new Error(`${p} is not in a trial scratch directory`);
    }
    dir = parent;
  }
  return dir;
}

function isInside(child: string, parent: string): boolean {
  const relative = path.relative(parent, child);
  return (
    relative === "" ||
    (!relative.startsWith("..") && !path.isAbsolute(relative))
  );
}

let workspace: string;

function makeProject(name: string, files: Record<string, string> = {}) {
  const root = path.join(workspace, name);
  mkdirSync(root, { recursive: true });
  writeFileSync(
    path.join(root, "dbt_project.yml"),
    `name: ${name}\nprofile: ${name}\n`,
  );
  for (const [file, content] of Object.entries(files)) {
    mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
    writeFileSync(path.join(root, file), content);
  }
  return root;
}

const PACKAGES_YML =
  "packages:\n  - package: dbt-labs/dbt_utils\n    version: [1.0.0]\n";

const env = { PATH: "test-path", DBT_PROFILES_DIR: "profiles" };

function trial(
  projectRoots: string[],
  script: (args: string[]) => Script,
  extra: Partial<Parameters<typeof runFusionTrial>[0]> = {},
) {
  return runFusionTrial({
    binary: BINARY,
    projectRoots,
    envFor: () => env,
    spawnProcess: fakeSpawn(script),
    ...extra,
  });
}

/** Every run's paths are in scratch, none under a project, and all are gone. */
function expectScratchOnly(roots: string[]) {
  expect(calls.length).toBeGreaterThan(0);
  for (const call of calls) {
    const paths = scratchPaths(call.args);
    expect(argValue(call.args, "--target-path")).toBeDefined();
    expect(argValue(call.args, "--log-path")).toBeDefined();
    expect(call.args).toContain("--no-send-anonymous-usage-stats");
    for (const p of paths) {
      for (const root of roots) {
        expect(isInside(p, root)).toBe(false);
      }
      expect(isInside(p, tmpdir())).toBe(true);
      expect(existsSync(scratchRootOf(p))).toBe(false);
    }
    expect(call.scratchExisted).toBe(true);
  }
}

beforeEach(() => {
  calls = [];
  workspace = mkdtempSync(path.join(tmpdir(), "fusion-trial-test-"));
  // Never a real process group: a fake child stands for each.
  groupKill = jest
    .spyOn(process, "kill")
    .mockImplementation((pid: number, signal?: string | number) => {
      const call = calls.find((c) => c.child.pid === -pid);
      if (!call) {
        throw Object.assign(new Error("kill ESRCH"), { code: "ESRCH" });
      }
      call.child.receive(String(signal));
      return true;
    });
});

afterEach(() => {
  groupKill.mockRestore();
  rmSync(workspace, { recursive: true, force: true });
});

describe("runFusionTrial", () => {
  it("reports a clean parse, run in the project with its environment", async () => {
    const root = makeProject("shop");
    const result = await trial([root], () => ({
      stdout: [logLine("info", "Running with dbt=2.0.12", "A001")],
    }));

    expect(result.outcome).toBe("parsed");
    expect(result.failed).toBeUndefined();
    expect(result.projects).toEqual([
      expect.objectContaining({ root, outcome: "parsed", errorCount: 0 }),
    ]);
    expect(calls).toHaveLength(1);
    const [call] = calls;
    expect(call.command).toBe(BINARY);
    expect(call.args.slice(0, 3)).toEqual(["parse", "--project-dir", root]);
    expect(argValue(call.args, "--log-format")).toBe("json");
    expect(call.args).not.toContain("--packages-install-path");
    expect(call.options.cwd).toBe(root);
    expect(call.options.env).toBe(env);
    expect(call.options.windowsHide).toBe(true);
    expectScratchOnly([root]);
  });

  it("reports parse errors: the count, the first error as one line and its code", async () => {
    const root = makeProject("shop");
    const first =
      "[error] [SerializationError (dbt1013)]: YAML error: did not find expected node content\n  --> models/broken.yml:5:1";
    const line = logLine("error", first, "1013");
    const result = await trial([root], () => ({
      // A JSON line split across chunks is still read whole.
      stdout: [
        line.slice(0, 40),
        line.slice(40),
        logLine("error", "[error] [InvalidConfig (dbt1005)]: second", "1005"),
        logLine("info", "Finished 'parse' with 2 errors", "Q039"),
      ],
      exitCode: 1,
    }));

    expect(result.outcome).toBe("parseErrors");
    expect(result.failed).toEqual({
      root,
      outcome: "parseErrors",
      errorCount: 2,
      firstError:
        "[SerializationError (dbt1013)]: YAML error: did not find expected node content (models/broken.yml:5:1)",
      firstErrorCode: "dbt1013",
      durationMs: expect.any(Number),
    });
    expectScratchOnly([root]);
  });

  it("takes the error code from the message when the record has none", async () => {
    const root = makeProject("shop");
    const result = await trial([root], () => ({
      stdout: [logLine("fatal", "error: dbt1048: something failed")],
      exitCode: 1,
    }));

    expect(result.failed?.firstErrorCode).toBe("dbt1048");
    expect(result.failed?.errorCount).toBe(1);
  });

  it("shows the home directory as ~ and cuts a long first error to 300 characters", async () => {
    const root = makeProject("shop");
    const profiles = path.join(homedir(), "proj", "profiles.yml");
    const short = await trial([root], () => ({
      stdout: [
        logLine(
          "error",
          `[error] [InvalidConfig (dbt1005)]: no profiles.yml found (searched: ["${profiles}"])`,
          "1005",
        ),
      ],
      exitCode: 1,
    }));
    expect(short.failed?.firstError).toBe(
      `[InvalidConfig (dbt1005)]: no profiles.yml found (searched: ["~${path.sep}proj${path.sep}profiles.yml"])`,
    );

    const long = await trial([root], () => ({
      stdout: [logLine("error", `[error] ${"x".repeat(400)}`, "1005")],
      exitCode: 1,
    }));
    expect(long.failed?.firstError).toHaveLength(300);
    expect(long.failed?.firstError?.endsWith("…")).toBe(true);
  });

  it("reports a non-zero exit without readable errors with the last stderr line", async () => {
    const root = makeProject("shop");
    const result = await trial([root], () => ({
      stdout: [logLine("info", "Running with dbt=2.0.12", "A001")],
      stderr: ["thread 'main' panicked at src/x.rs:1:1:\n", "boom\n\n"],
      exitCode: 101,
    }));

    expect(result.outcome).toBe("parseErrors");
    expect(result.failed?.errorCount).toBe(0);
    expect(result.failed?.firstError).toBe("boom");
    expect(result.failed?.firstErrorCode).toBeUndefined();
  });

  it("reports a flag this Fusion rejects as unsupportedFlags", async () => {
    const root = makeProject("shop");
    const result = await trial([root], () => ({
      stderr: [
        "error: unexpected argument '--no-send-anonymous-usage-stats' found\n\n\nFor more information, try '--help'.\n",
      ],
      exitCode: 2,
    }));

    expect(result.outcome).toBe("unsupportedFlags");
    expect(result.failed?.firstError).toBe(
      "error: unexpected argument '--no-send-anonymous-usage-stats' found",
    );
  });

  it("kills a run that passes its time limit", async () => {
    const root = makeProject("shop");
    // Long enough for the scratch setup on a slow runner to finish first.
    const result = await trial([root], () => ({ hang: true }), {
      projectTimeoutMs: 500,
    });

    expect(result.outcome).toBe("timeout");
    expectKilled(calls[0].child);
    expectScratchOnly([root]);
  });

  it("starts each run in its own process group on macOS and Linux", async () => {
    const root = makeProject("shop");
    await trial([root], () => ({}));
    expect(calls[0].options.detached).toBe(process.platform !== "win32");
  });

  it("keeps the result of a run that exited at its time limit while its output was closing", async () => {
    const root = makeProject("shop");
    const result = await trial(
      [root],
      () => ({
        stdout: [logLine("info", "Running with dbt=2.0.12", "A001")],
        exitOnly: true,
      }),
      { projectTimeoutMs: 500 },
    );

    expect(result.outcome).toBe("parsed");
    // What it started may still hold its output: killed all the same.
    expectKilled(calls[0].child);
  });

  it("reports a timeout, not a start failure, when the kill itself fails", async () => {
    const root = makeProject("shop");
    const spawnProcess = fakeSpawn(() => ({ hang: true }));
    const unkillable: SpawnProcess = (command, args, options) => {
      const child = spawnProcess(
        command,
        args,
        options,
      ) as unknown as FakeChild;
      const denied = () => {
        child.emit(
          "error",
          Object.assign(new Error("kill EPERM"), { code: "EPERM" }),
        );
        return false;
      };
      child.kill = jest.fn(denied);
      child.receive = denied;
      return child as unknown as ChildProcess;
    };
    const result = await runFusionTrial({
      binary: BINARY,
      projectRoots: [root],
      envFor: () => env,
      spawnProcess: unkillable,
      projectTimeoutMs: 500,
    });

    expect(result.outcome).toBe("timeout");
    expectScratchOnly([root]);
  });

  it("moves on when a killed run doesn't exit", async () => {
    const root = makeProject("shop");
    const spawnProcess = fakeSpawn(() => ({ hang: true }));
    const stubborn: SpawnProcess = (command, args, options) => {
      const child = spawnProcess(
        command,
        args,
        options,
      ) as unknown as FakeChild;
      child.kill = jest.fn(() => true);
      child.receive = () => true;
      return child as unknown as ChildProcess;
    };
    const started = Date.now();
    const result = await runFusionTrial({
      binary: BINARY,
      projectRoots: [root],
      envFor: () => env,
      spawnProcess: stubborn,
      projectTimeoutMs: 20,
    });

    expect(result.outcome).toBe("timeout");
    expect(Date.now() - started).toBeLessThan(5_000);
    expectScratchOnly([root]);
  });

  it("kills the run and reports canceled when the caller aborts", async () => {
    const root = makeProject("shop");
    const controller = new AbortController();
    const done = trial([root], () => ({ hang: true }), {
      signal: controller.signal,
    });
    await firstSpawn();
    controller.abort();
    const result = await done;

    expect(result.outcome).toBe("canceled");
    expectKilled(calls[0].child);
    expectScratchOnly([root]);
  });

  it("starts nothing when already aborted", async () => {
    const root = makeProject("shop");
    const controller = new AbortController();
    controller.abort();
    const result = await trial([root], () => ({}), {
      signal: controller.signal,
    });

    expect(result.outcome).toBe("canceled");
    expect(calls).toHaveLength(0);
  });

  it("reports a binary that can't start as spawnError", async () => {
    const root = makeProject("shop");
    const enoent: NodeJS.ErrnoException = Object.assign(
      new Error(`spawn ${BINARY} ENOENT`),
      { code: "ENOENT" },
    );
    const result = await trial([root], () => ({ error: enoent }));

    expect(result.outcome).toBe("spawnError");
    expect(result.failed?.firstError).toContain("ENOENT");
    expectScratchOnly([root]);
  });

  it("reports a spawn that throws, and an environment that throws, as spawnError", async () => {
    const root = makeProject("shop");
    const throwing = await runFusionTrial({
      binary: BINARY,
      projectRoots: [root],
      envFor: () => env,
      spawnProcess: () => {
        throw new Error("spawn EINVAL");
      },
    });
    expect(throwing.outcome).toBe("spawnError");
    expect(throwing.failed?.firstError).toBe("spawn EINVAL");

    const badEnv = await runFusionTrial({
      binary: BINARY,
      projectRoots: [root],
      envFor: () => {
        throw new Error("no environment");
      },
      spawnProcess: fakeSpawn(() => ({})),
    });
    expect(badEnv.outcome).toBe("spawnError");
    expect(calls).toHaveLength(0);
  });

  it("stops at the first project that doesn't parse", async () => {
    const roots = ["one", "two", "three"].map((name) => makeProject(name));
    const result = await trial(roots, (args) =>
      argValue(args, "--project-dir") === roots[1]
        ? { stdout: [logLine("error", "[error] bad", "1005")], exitCode: 1 }
        : {},
    );

    expect(result.outcome).toBe("parseErrors");
    expect(result.projects.map((p) => p.outcome)).toEqual([
      "parsed",
      "parseErrors",
    ]);
    expect(result.failed?.root).toBe(roots[1]);
    expect(calls.map((call) => call.options.cwd)).toEqual(roots.slice(0, 2));
    expectScratchOnly(roots);
  });

  it("counts the projects not reached in the total time as timed out", async () => {
    const roots = ["one", "two", "three"].map((name) => makeProject(name));
    const result = await trial(roots, () => ({ hang: true }), {
      totalTimeoutMs: 50,
    });

    expect(result.outcome).toBe("timeout");
    expect(result.failed?.root).toBe(roots[0]);
    expect(result.projects.map((p) => [p.root, p.outcome])).toEqual(
      roots.map((root) => [root, "timeout"]),
    );
    expect(calls).toHaveLength(1);
  });

  describe("packages", () => {
    it("installs declared packages into scratch from a copy of the package files", async () => {
      const root = makeProject("shop", { "packages.yml": PACKAGES_YML });
      const copied: string[] = [];
      const result = await trial([root], (args) => {
        if (args[0] === "deps") {
          const depsProject = argValue(args, "--project-dir")!;
          copied.push(
            readFileSync(path.join(depsProject, "packages.yml"), "utf8"),
          );
        }
        return {};
      });

      expect(result.outcome).toBe("parsed");
      expect(calls.map((call) => call.args[0])).toEqual(["deps", "parse"]);
      const [deps, parse] = calls;
      const depsProject = argValue(deps.args, "--project-dir")!;
      expect(isInside(depsProject, root)).toBe(false);
      expect(deps.options.cwd).toBe(depsProject);
      expect(copied).toEqual([PACKAGES_YML]);
      expect(argValue(parse.args, "--packages-install-path")).toBe(
        argValue(deps.args, "--packages-install-path"),
      );
      expect(existsSync(depsProject)).toBe(false);
      expectScratchOnly([root]);
    });

    it("installs into scratch even when the project has packages installed", async () => {
      // dbt_utils declared, only codegen installed: Fusion's parse in place
      // would install dbt_utils into the project and drop codegen.
      const root = makeProject("shop", {
        "packages.yml": PACKAGES_YML,
        [path.join("dbt_packages", "codegen", "dbt_project.yml")]: "name: x\n",
      });
      const result = await trial([root], () => ({}));

      expect(result.outcome).toBe("parsed");
      expect(calls.map((call) => call.args[0])).toEqual(["deps", "parse"]);
      const packagesDir = argValue(calls[1].args, "--packages-install-path")!;
      expect(isInside(packagesDir, root)).toBe(false);
      expectScratchOnly([root]);
    });

    it("installs into scratch packages declared in dependencies.yml", async () => {
      const root = makeProject("shop", { "dependencies.yml": PACKAGES_YML });
      await trial([root], () => ({}));

      expect(calls.map((call) => call.args[0])).toEqual(["deps", "parse"]);
    });

    it("runs no deps when the project declares no packages", async () => {
      const root = makeProject("shop", { "packages.yml": "packages: []\n" });
      await trial([root], () => ({}));

      expect(calls.map((call) => call.args[0])).toEqual(["parse"]);
    });

    it("reports packagesMissing for a local package, with no first error and without running Fusion", async () => {
      const root = makeProject("shop", {
        "packages.yml": "packages:\n  - local: ../shared\n",
      });
      const result = await trial([root], () => ({}));

      expect(result.outcome).toBe("packagesMissing");
      expect(result.failed?.firstError).toBeUndefined();
      expect(calls).toHaveLength(0);
    });

    it("reports a failed deps as packagesMissing with its first error, and doesn't parse", async () => {
      const root = makeProject("shop", { "packages.yml": PACKAGES_YML });
      const result = await trial([root], () => ({
        stdout: [
          logLine(
            "error",
            "[error] [InvalidConfig (dbt1005)]: Package not found in hub registry",
            "1005",
          ),
        ],
        exitCode: 1,
      }));

      expect(result.outcome).toBe("packagesMissing");
      expect(result.failed?.firstError).toBe(
        "[InvalidConfig (dbt1005)]: Package not found in hub registry",
      );
      expect(result.failed?.firstErrorCode).toBe("dbt1005");
      expect(calls.map((call) => call.args[0])).toEqual(["deps"]);
      expectScratchOnly([root]);
    });

    it("reports a deps that times out as timeout", async () => {
      const root = makeProject("shop", { "packages.yml": PACKAGES_YML });
      const result = await trial([root], () => ({ hang: true }), {
        projectTimeoutMs: 50,
      });

      expect(result.outcome).toBe("timeout");
      expect(calls.map((call) => call.args[0])).toEqual(["deps"]);
      expectScratchOnly([root]);
    });
  });
});
