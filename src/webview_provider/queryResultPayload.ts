/**
 * Bounds on what the query results panel serializes.
 *
 * The result rows are posted to the webview (VS Code serializes the message)
 * and kept in the panel's history; both paths used to run `JSON.stringify`
 * over the whole result or the whole history in one call, which hit V8's
 * string-length limit on a wide enough result (RangeError: Invalid string
 * length). Rows are now serialized one at a time while they are built, and
 * the serialized length is carried with the result so the history never
 * re-serializes it.
 *
 * Sizes are counted in UTF-16 code units, the unit V8's limit is in.
 */
export const MAX_RESULT_PAYLOAD_CHARS = 32 * 1024 * 1024;
export const MAX_QUERY_HISTORY_CHARS = 3 * 1024 * 1024;

export interface CappedRows<T> {
  rows: T[];
  /** Serialized length of `rows`, summed per row. */
  chars: number;
  /** Rows left out because the cap was reached. */
  droppedRows: number;
}

/**
 * Converts a column-major result into row objects, stopping once the next
 * row would push the serialized total past `maxChars`. The first row is
 * always kept so a single oversized row still renders.
 */
export function buildCappedRows<T extends Record<string, unknown>>(
  columnNames: string[],
  rawRows: unknown[][],
  maxChars: number = MAX_RESULT_PAYLOAD_CHARS,
): CappedRows<T> {
  const rows: T[] = [];
  let chars = 0;
  for (let i = 0; i < rawRows.length; i++) {
    const row: Record<string, unknown> = {};
    const currentRow = rawRows[i];
    for (let j = 0; j < currentRow.length; j++) {
      row[columnNames[j]] = currentRow[j];
    }
    const rowChars = serializedLength(row);
    if (rows.length > 0 && chars + rowChars > maxChars) {
      return { rows, chars, droppedRows: rawRows.length - rows.length };
    }
    rows.push(row as T);
    chars += rowChars;
  }
  return { rows, chars, droppedRows: 0 };
}

export function serializedLength(value: unknown): number {
  const text = JSON.stringify(value);
  return text === undefined ? 0 : text.length;
}

/** Total serialized size carried by a list of history entries. */
export function totalPayloadChars(
  entries: ReadonlyArray<{ payloadChars?: number }>,
): number {
  let total = 0;
  for (const entry of entries) {
    total += entry.payloadChars ?? 0;
  }
  return total;
}
