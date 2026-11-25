import { cpus } from "os";

/**
 * How many dbt projects start at once: 4, or half the cores on a smaller
 * machine, and at least 1.
 */
export function projectStartLimit(cores = cpus().length): number {
  return Math.max(1, Math.min(4, Math.floor(cores / 2)));
}

/** How long one start may hold its slot before the next one goes ahead. */
const SLOT_TIMEOUT_MS = 60_000;

/**
 * Starts dbt projects a few at a time, for the whole window. Each start spawns
 * its own Python process, imports dbt and parses the project: started all at
 * once, many projects pin the machine and none is ready until all are. A
 * start that runs past its slot's timeout keeps running, and lets the next
 * one start, so a project that hangs never stops the others.
 */
export class ProjectStartQueue {
  private running = 0;
  private readonly waiting: (() => void)[] = [];

  constructor(
    readonly limit = projectStartLimit(),
    private readonly slotTimeoutMs = SLOT_TIMEOUT_MS,
  ) {}

  /** Runs `start` when a slot is free; `first` puts it ahead of those waiting. */
  async run<T>(start: () => Promise<T>, first = false): Promise<T> {
    await this.acquire(first);
    let released = false;
    const release = () => {
      if (!released) {
        released = true;
        this.release();
      }
    };
    const timer = setTimeout(release, this.slotTimeoutMs);
    timer.unref?.();
    try {
      return await start();
    } finally {
      clearTimeout(timer);
      release();
    }
  }

  private acquire(first: boolean): Promise<void> {
    if (this.running < this.limit) {
      this.running++;
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      if (first) {
        this.waiting.unshift(resolve);
      } else {
        this.waiting.push(resolve);
      }
    });
  }

  /** The slot passes to the next start waiting, or frees up. */
  private release(): void {
    const next = this.waiting.shift();
    if (next) {
      next();
    } else {
      this.running--;
    }
  }
}
