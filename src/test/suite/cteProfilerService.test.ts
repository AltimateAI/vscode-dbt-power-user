import { DBTTerminal } from "@altimateai/dbt-integration";
import { beforeEach, describe, expect, it } from "@jest/globals";
import { CteProfilerService } from "../../cte_profiler/cteProfilerService";
import { DBTProjectContainer } from "../../dbt_client/dbtProjectContainer";

describe("CteProfilerService.extractRowCount", () => {
  let svc: CteProfilerService;

  beforeEach(() => {
    const dbtTerminal = {
      debug: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      info: jest.fn(),
      log: jest.fn(),
      trace: jest.fn(),
    } as unknown as DBTTerminal;
    const dbtProjectContainer = {} as DBTProjectContainer;
    svc = new CteProfilerService(dbtProjectContainer, dbtTerminal);
  });

  // Use a private-field accessor — extractRowCount is intentionally private,
  // but the entire purpose of this test is to lock in its dialect-agnostic
  // behavior so that the Snowflake / Oracle case-folding regression doesn't
  // come back.
  const extract = (data: Record<string, unknown>[]): number =>
    (
      svc as unknown as { extractRowCount: (d: typeof data) => number }
    ).extractRowCount(data);

  it("returns the count when adapter returns uppercase keys (Snowflake/Oracle)", () => {
    // Snowflake and Oracle fold unquoted identifiers to UPPERCASE, so the
    // adapter zips column_names verbatim and the row arrives as _PROFILE_COUNT.
    // The buggy pre-fix lookup `data[0]["_profile_count"]` returned undefined
    // here and fell through to 0; the fix reads by position so it works.
    expect(extract([{ _PROFILE_COUNT: 99 }])).toBe(99);
  });

  it("returns the count when adapter returns lowercase keys (Postgres/DuckDB)", () => {
    expect(extract([{ _profile_count: 42 }])).toBe(42);
  });

  it("coerces string counts (some adapters return BigInteger as string)", () => {
    expect(extract([{ _PROFILE_COUNT: "1234" }])).toBe(1234);
  });

  it("returns 0 when the query produced no rows", () => {
    expect(extract([])).toBe(0);
  });

  it("returns 0 when the column value is non-numeric", () => {
    expect(extract([{ _PROFILE_COUNT: "not-a-number" }])).toBe(0);
  });
});
