import { describe, expect, it } from "@jest/globals";
import {
  projectStartLimit,
  ProjectStartQueue,
} from "../../dbt_client/projectStartQueue";

/** A start that settles when the test says so. */
function deferred() {
  let resolve!: () => void;
  let reject!: (error: Error) => void;
  const promise = new Promise<void>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

const tick = () => new Promise((resolve) => setImmediate(resolve));

describe("projectStartLimit", () => {
  it.each([
    [16, 4],
    [8, 4],
    [6, 3],
    [4, 2],
    [2, 1],
    [1, 1],
    [0, 1],
  ])("%i cores start %i projects at once", (cores, limit) => {
    expect(projectStartLimit(cores)).toBe(limit);
  });
});

describe("ProjectStartQueue", () => {
  it("runs at most `limit` starts at once, in the order asked", async () => {
    const queue = new ProjectStartQueue(2);
    const starts = [deferred(), deferred(), deferred(), deferred()];
    const started: number[] = [];
    const runs = starts.map((start, i) =>
      queue.run(() => {
        started.push(i);
        return start.promise;
      }),
    );

    await tick();
    expect(started).toEqual([0, 1]);

    starts[1].resolve();
    await tick();
    expect(started).toEqual([0, 1, 2]);

    starts[0].resolve();
    await tick();
    expect(started).toEqual([0, 1, 2, 3]);

    starts[2].resolve();
    starts[3].resolve();
    await Promise.all(runs);
  });

  it("starts one asked for first ahead of those waiting", async () => {
    const queue = new ProjectStartQueue(1);
    const running = deferred();
    const started: string[] = [];
    const runs = [
      queue.run(() => running.promise),
      queue.run(async () => {
        started.push("waiting");
      }),
      queue.run(async () => {
        started.push("first");
      }, true),
    ];

    await tick();
    expect(started).toEqual([]);

    running.resolve();
    await Promise.all(runs);
    expect(started).toEqual(["first", "waiting"]);
  });

  it("frees the slot of a start that fails, and passes its error on", async () => {
    const queue = new ProjectStartQueue(1);
    const failing = deferred();
    const failed = queue.run(() => failing.promise);
    let nextStarted = false;
    const next = queue.run(async () => {
      nextStarted = true;
    });

    failing.reject(new Error("no interpreter"));
    await expect(failed).rejects.toThrow("no interpreter");
    await next;
    expect(nextStarted).toBe(true);
  });

  it("lets the next start go once one holds its slot past the timeout", async () => {
    const queue = new ProjectStartQueue(1, 20);
    const hung = deferred();
    const hungRun = queue.run(() => hung.promise);
    let nextStarted = false;
    const next = queue.run(async () => {
      nextStarted = true;
    });

    await tick();
    expect(nextStarted).toBe(false);
    await next;
    expect(nextStarted).toBe(true);

    // The slow start finishing later doesn't free a second slot: the queue is
    // empty and back to one free slot, so two more starts run one at a time.
    hung.resolve();
    await hungRun;
    const later = [deferred(), deferred()];
    const started: number[] = [];
    const laterRuns = later.map((start, i) =>
      queue.run(() => {
        started.push(i);
        return start.promise;
      }),
    );
    await tick();
    expect(started).toEqual([0]);
    later[0].resolve();
    later[1].resolve();
    await Promise.all(laterRuns);
  });
});
