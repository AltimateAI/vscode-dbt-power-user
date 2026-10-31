import { describe, expect, it } from "@jest/globals";
import {
  describeWrittenAt,
  manifestAgeBucket,
  staleGraphBanner,
  StaleGraphInput,
  summarizeDbtError,
} from "../../webview_provider/lineageStaleGraph";

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

// Local time, so the clock in "yesterday at 16:40" holds in any time zone.
const NOW = new Date(2026, 9, 31, 11, 0).getTime();

const MISSING_REF =
  "There is a problem in your dbt project. Compilation failed: Compilation Error in model orders (models/marts/orders.sql)\n  Model 'model.jaffle_shop.orders' (models/marts/orders.sql) depends on a node named 'stg_orderz' which was not found";
const PROFILE =
  "dbt configuration is invalid : Runtime Error\n  Could not find profile named 'jaffle_shop'";

describe("staleGraphBanner", () => {
  const input = (
    graphDrawn: boolean,
    blocking: string | undefined,
    readFromDisk: boolean,
  ): StaleGraphInput => ({
    graphDrawn,
    blocking: blocking === undefined ? undefined : { message: blocking },
    manifest: {
      readFromDisk,
      path: "target/manifest.json",
      writtenAt: NOW - 2 * HOUR,
    },
    canReparse: true,
    now: NOW,
  });

  // graph drawn × blocking diagnostic × manifest read from disk.
  it.each([
    [false, undefined, false, undefined],
    [false, undefined, true, undefined],
    [false, MISSING_REF, false, undefined],
    [false, MISSING_REF, true, undefined],
    [true, undefined, false, undefined],
    [true, undefined, true, undefined],
    [true, MISSING_REF, false, "stale-graph-midsession"],
    [true, MISSING_REF, true, "stale-graph-startup"],
  ])(
    "graph %s, error %#, from disk %s: shows %s",
    (graphDrawn, blocking, readFromDisk, expected) => {
      expect(
        staleGraphBanner(input(graphDrawn, blocking, readFromDisk))?.id,
      ).toBe(expected);
    },
  );

  it("dates a mid-session graph by its last parse and names the failing file", () => {
    expect(staleGraphBanner(input(true, MISSING_REF, false))).toEqual({
      id: "stale-graph-midsession",
      severity: "warning",
      title: "This graph is from the last successful parse, 2 hours ago.",
      detail:
        "Your project has an error in models/marts/orders.sql: Model 'model.jaffle_shop.orders' (models/marts/orders.sql) depends on a node named 'stg_orderz' which was not found",
      dbtMessage:
        "Compilation Error in model orders (models/marts/orders.sql)\n  Model 'model.jaffle_shop.orders' (models/marts/orders.sql) depends on a node named 'stg_orderz' which was not found",
      actions: [
        {
          id: "openFile",
          label: "Open orders.sql",
          args: { path: "models/marts/orders.sql", line: undefined },
        },
        { id: "showProblems", label: "Show all problems" },
        { id: "tryAgain", label: "Try again" },
      ],
    });
  });

  it("names the manifest file at startup and has no file to open for a profile error", () => {
    const banner = staleGraphBanner({
      ...input(true, PROFILE, true),
      manifest: {
        readFromDisk: true,
        path: "target/manifest.json",
        writtenAt: new Date(2026, 9, 30, 16, 40).getTime(),
      },
    });
    expect(banner?.title).toBe(
      "This graph is from target/manifest.json, written yesterday at 16:40.",
    );
    expect(banner?.detail).toBe(
      "dbt can't parse the project right now: Could not find profile named 'jaffle_shop'",
    );
    expect(banner?.actions.map((action) => action.id)).toEqual([
      "showProblems",
      "tryAgain",
    ]);
  });

  it("hides Try again while the re-parse command isn't registered", () => {
    const banner = staleGraphBanner({
      ...input(true, MISSING_REF, false),
      canReparse: false,
    });
    expect(banner?.actions.map((action) => action.id)).toEqual([
      "openFile",
      "showProblems",
    ]);
  });

  it("leaves the age out when the manifest can't be dated", () => {
    const base = input(true, MISSING_REF, false);
    const banner = staleGraphBanner({
      ...base,
      manifest: { readFromDisk: false },
    });
    expect(banner?.title).toBe("This graph is from the last successful parse.");
    const startup = staleGraphBanner({
      ...base,
      manifest: { readFromDisk: true },
    });
    expect(startup?.title).toBe("This graph is from the manifest on disk.");
  });
});

describe("summarizeDbtError", () => {
  it.each([
    [
      MISSING_REF,
      "Model 'model.jaffle_shop.orders' (models/marts/orders.sql) depends on a node named 'stg_orderz' which was not found",
      "models/marts/orders.sql",
      undefined,
    ],
    [
      PROFILE,
      "Could not find profile named 'jaffle_shop'",
      undefined,
      undefined,
    ],
    [
      "There is a problem in your dbt project. Compilation failed: Compilation Error in model customers (models/customers.sql)\n  unexpected '}'\n    line 14\n      {{ ref('orders') }}}",
      "unexpected '}'",
      "models/customers.sql",
      14,
    ],
    [
      "dbt_project.yml is invalid : bad indentation of a mapping entry",
      "bad indentation of a mapping entry",
      undefined,
      undefined,
    ],
    ["Python process closed", "Python process closed", undefined, undefined],
  ])("%#: summary, file and line", (raw, summary, file, line) => {
    expect(summarizeDbtError(raw)).toMatchObject({ summary, file, line });
  });

  it("cuts a long last line; the full text stays in the message", () => {
    const long = "x".repeat(300);
    const result = summarizeDbtError(`Runtime Error\n  ${long}`);
    expect(result.summary).toHaveLength(200);
    expect(result.summary.endsWith("…")).toBe(true);
    expect(result.message).toContain(long);
  });
});

describe("describeWrittenAt", () => {
  it.each([
    [NOW - 10 * 1000, "less than a minute ago"],
    [NOW - MINUTE, "1 minute ago"],
    [NOW - 59 * MINUTE, "59 minutes ago"],
    [NOW - HOUR, "1 hour ago"],
    [NOW - 2 * HOUR, "2 hours ago"],
    [new Date(2026, 9, 31, 0, 5).getTime(), "10 hours ago"],
    [new Date(2026, 9, 30, 16, 40).getTime(), "yesterday at 16:40"],
    [new Date(2026, 9, 30, 9, 5).getTime(), "yesterday at 09:05"],
    [new Date(2026, 9, 29, 23, 59).getTime(), "2 days ago"],
    [new Date(2026, 9, 1, 12, 0).getTime(), "30 days ago"],
  ])("%#: written at %d reads %s", (writtenAt, expected) => {
    expect(describeWrittenAt(writtenAt, NOW)).toBe(expected);
  });
});

describe("manifestAgeBucket", () => {
  it.each([
    [undefined, "unknown"],
    [NOW, "<1h"],
    [NOW - 59 * MINUTE, "<1h"],
    [NOW - HOUR, "1h-1d"],
    [NOW - DAY + 1, "1h-1d"],
    [NOW - DAY, "1d-7d"],
    [NOW - 7 * DAY, "7d-30d"],
    [NOW - 30 * DAY, "30d+"],
  ])("%#: written at %p is %s", (writtenAt, expected) => {
    expect(manifestAgeBucket(writtenAt, NOW)).toBe(expected);
  });
});
