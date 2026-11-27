import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "fs";
import { tmpdir } from "os";
import * as path from "path";
import { runFusionTrial } from "../../dbt_client/fusionTrial";

/**
 * The trial's timeout and cancel with real processes, on each OS CI runs:
 * a run that started a process of its own (as `dbt deps` starts git) is
 * killed with that process, and its scratch folder is removed.
 *
 * The stand-in for dbt Fusion is Node running a script named `parse` in the
 * project folder: the trial's first argument is `parse` and it runs in the
 * project, so `node parse …` runs it. It starts a child, writes both process
 * ids and its target path, and never exits.
 */

const STAND_IN = `
const { spawn } = require("child_process");
const { writeFileSync } = require("fs");
const child = spawn(process.execPath, ["-e", "setInterval(() => {}, 1000)"], {
  stdio: "ignore",
});
const args = process.argv.slice(2);
writeFileSync(
  process.env.PU_TRIAL_TEST_STARTED,
  JSON.stringify({
    run: process.pid,
    child: child.pid,
    targetPath: args[args.indexOf("--target-path") + 1],
  }),
);
setInterval(() => {}, 1000);
`;

interface Started {
  run: number;
  child: number;
  targetPath: string;
}

let workspace: string;
let startedFile: string;

function project(): string {
  const root = path.join(workspace, "shop");
  rmSync(root, { recursive: true, force: true });
  mkdirSync(root, { recursive: true });
  writeFileSync(
    path.join(root, "dbt_project.yml"),
    "name: shop\nprofile: shop\n",
  );
  writeFileSync(path.join(root, "parse"), STAND_IN);
  return root;
}

function started(): Started | undefined {
  try {
    return JSON.parse(readFileSync(startedFile, "utf8")) as Started;
  } catch {
    return undefined;
  }
}

function alive(pid: number): boolean {
  try {
    process.kill(pid, 0);
  } catch {
    return false;
  }
  // An exited process nobody has reaped yet still answers signal 0.
  try {
    const stat = readFileSync(`/proc/${pid}/stat`, "utf8");
    return stat.slice(stat.lastIndexOf(")") + 2)[0] !== "Z";
  } catch {
    return true;
  }
}

async function until(condition: () => boolean, ms: number): Promise<boolean> {
  const end = Date.now() + ms;
  while (!condition()) {
    if (Date.now() > end) {
      return false;
    }
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  return true;
}

/** The scratch folder a path is in. */
function scratchOf(p: string): string {
  let dir = p;
  while (!path.basename(dir).startsWith("pu-fusion-trial-")) {
    dir = path.dirname(dir);
  }
  return dir;
}

function trial(root: string, extra: { signal?: AbortSignal } = {}) {
  return runFusionTrial({
    binary: process.execPath,
    projectRoots: [root],
    envFor: () => ({ ...process.env, PU_TRIAL_TEST_STARTED: startedFile }),
    projectTimeoutMs: 4_000,
    ...extra,
  });
}

async function expectAllGone(): Promise<void> {
  const ids = started();
  expect(ids).toBeDefined();
  expect(await until(() => !alive(ids!.run) && !alive(ids!.child), 5_000)).toBe(
    true,
  );
  expect(existsSync(scratchOf(ids!.targetPath))).toBe(false);
}

beforeEach(() => {
  workspace = mkdtempSync(path.join(tmpdir(), "fusion-trial-processes-"));
  startedFile = path.join(workspace, "started.json");
});

afterEach(() => {
  const ids = started();
  for (const pid of ids ? [ids.run, ids.child] : []) {
    try {
      process.kill(pid, "SIGKILL");
    } catch {
      // Gone, as it should be.
    }
  }
  rmSync(workspace, { recursive: true, force: true });
});

describe("runFusionTrial with real processes", () => {
  it("kills a run that passes its time limit with the process it started, and removes its scratch folder", async () => {
    const root = project();
    const result = await trial(root);

    expect(result.outcome).toBe("timeout");
    await expectAllGone();
  }, 30_000);

  it("kills a canceled run with the process it started, and removes its scratch folder", async () => {
    const root = project();
    const controller = new AbortController();
    const done = trial(root, { signal: controller.signal });
    expect(await until(() => started() !== undefined, 8_000)).toBe(true);
    controller.abort();
    const result = await done;

    expect(result.outcome).toBe("canceled");
    await expectAllGone();
  }, 30_000);
});
