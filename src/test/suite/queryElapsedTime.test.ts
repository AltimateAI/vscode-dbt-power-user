import { describe, expect, it } from "@jest/globals";
import {
  resultElapsedTime,
  toElapsedSeconds,
} from "../../webview_provider/queryElapsedTime";

/**
 * Query Results' header shows "Preview N rows in T s". The webview used to take
 * T from a 100 ms timer started by the loading state; a result that arrived
 * right behind the loading state (the first preview in a window, replayed once
 * the webview loaded) beat the first tick, and T was blank. The extension now
 * sends the duration it measured, and the webview shows that.
 */
describe("toElapsedSeconds", () => {
  it("rounds milliseconds to tenths of a second", () => {
    expect(toElapsedSeconds(1234)).toBe(1.2);
    expect(toElapsedSeconds(1250)).toBe(1.3);
    expect(toElapsedSeconds(40)).toBe(0);
  });
});

describe("resultElapsedTime", () => {
  it("shows the duration the extension measured", () => {
    expect(resultElapsedTime(1.2, 5_000, 5_050)).toBe(1.2);
  });

  it("shows a measured duration of 0", () => {
    expect(resultElapsedTime(0, 5_000, 9_000)).toBe(0);
  });

  it("falls back to the time since the loading state without a measured duration", () => {
    expect(resultElapsedTime(undefined, 5_000, 6_340)).toBe(1.3);
  });

  it("ignores a value that isn't a usable duration", () => {
    expect(resultElapsedTime("1.2", 5_000, 5_400)).toBe(0.4);
    expect(resultElapsedTime(Number.NaN, 5_000, 5_400)).toBe(0.4);
    expect(resultElapsedTime(-1, 5_000, 5_400)).toBe(0.4);
  });
});
