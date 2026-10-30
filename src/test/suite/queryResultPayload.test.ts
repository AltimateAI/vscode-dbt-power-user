import { describe, expect, it } from "@jest/globals";
import {
  buildCappedRows,
  evictToBudget,
  serializedLength,
  totalPayloadChars,
} from "../../webview_provider/queryResultPayload";

describe("buildCappedRows", () => {
  const columns = ["id", "name"];
  const raw = [
    [1, "a"],
    [2, "bb"],
    [3, "ccc"],
  ];

  it("converts column-major rows to objects and reports their serialized size", () => {
    const result = buildCappedRows(columns, raw);

    expect(result.rows).toEqual([
      { id: 1, name: "a" },
      { id: 2, name: "bb" },
      { id: 3, name: "ccc" },
    ]);
    expect(result.droppedRows).toBe(0);
    expect(result.chars).toBe(
      result.rows.reduce((sum, row) => sum + JSON.stringify(row).length, 0),
    );
  });

  it("stops before the row that would cross the cap and counts what it dropped", () => {
    const firstTwo =
      serializedLength({ id: 1, name: "a" }) +
      serializedLength({ id: 2, name: "bb" });

    const result = buildCappedRows(columns, raw, firstTwo);

    expect(result.rows.map((r) => r.id)).toEqual([1, 2]);
    expect(result.droppedRows).toBe(1);
    expect(result.chars).toBe(firstTwo);
  });

  it("always keeps the first row, even when it alone exceeds the cap", () => {
    const result = buildCappedRows(columns, raw, 1);

    expect(result.rows).toEqual([{ id: 1, name: "a" }]);
    expect(result.droppedRows).toBe(2);
  });

  it("handles an empty result", () => {
    expect(buildCappedRows(columns, [])).toEqual({
      rows: [],
      chars: 0,
      droppedRows: 0,
    });
  });
});

describe("totalPayloadChars", () => {
  it("sums the carried sizes and treats entries without one as empty", () => {
    expect(
      totalPayloadChars([{ payloadChars: 10 }, {}, { payloadChars: 5 }]),
    ).toBe(15);
  });
});

describe("evictToBudget", () => {
  it("drops the oldest entries until the total fits, newest first kept", () => {
    const entries = [
      { id: "newest", payloadChars: 5 },
      { id: "mid", payloadChars: 5 },
      { id: "oldest", payloadChars: 5 },
    ];

    const evicted = evictToBudget(entries, 10);

    expect(entries.map((e) => e.id)).toEqual(["newest", "mid"]);
    expect(evicted.map((e) => e.id)).toEqual(["oldest"]);
  });

  it("never drops the newest entry, even when it alone exceeds the budget", () => {
    const entries = [
      { id: "newest", payloadChars: 50 },
      { id: "older", payloadChars: 1 },
    ];

    const evicted = evictToBudget(entries, 10);

    expect(entries.map((e) => e.id)).toEqual(["newest"]);
    expect(evicted.map((e) => e.id)).toEqual(["older"]);
  });

  it("leaves a history within budget untouched", () => {
    const entries = [{ payloadChars: 3 }, { payloadChars: 3 }];

    expect(evictToBudget(entries, 10)).toEqual([]);
    expect(entries).toHaveLength(2);
  });
});
