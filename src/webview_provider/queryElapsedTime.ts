// The time in Query Results' "Preview N rows in T s" header. Shared with the
// webview (`@queryElapsedTime`): the extension measures the query, and the
// webview shows what it measured.

/** Milliseconds as seconds to one decimal, as the header shows them. */
export const toElapsedSeconds = (ms: number): number =>
  Math.round(ms / 100) / 10;

/** The time to show for a result: the duration the extension measured or,
 * without one, the time since the webview showed the loading state. */
export const resultElapsedTime = (
  measured: unknown,
  loadingSince: number,
  now: number,
): number =>
  typeof measured === "number" && Number.isFinite(measured) && measured >= 0
    ? measured
    : toElapsedSeconds(now - loadingSince);
