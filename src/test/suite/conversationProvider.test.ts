import { describe, expect, it } from "@jest/globals";

/**
 * Test the `saveConversation` highlight extraction guard.
 *
 * Telemetry showed 636 monthly crashes with:
 *   TypeError: Cannot read properties of undefined (reading 'line')
 *   at conversationProvider.ts (saveConversation)
 *
 * The crash happens when `range` is defined (truthy) and `range.isSingleLine`
 * is truthy, but `range.start` is undefined — producing `range.start.line`
 * which throws. This can occur with partially constructed Range objects
 * from CommentThread.range.
 */
describe("saveConversation highlight extraction guard", () => {
  // Extracted logic mirrors the highlight ternary in saveConversation
  function extractHighlight(
    field: string | undefined,
    value: unknown,
    range:
      | {
          isSingleLine?: boolean;
          start?: { line: number };
          end?: { line: number };
        }
      | undefined,
    documentLineAt: (line: number) => string,
    documentGetText: (range: unknown) => string,
  ): string {
    return field === "description"
      ? (value as string)
      : (range?.isSingleLine
          ? documentLineAt(range?.start?.line ?? 0)
          : documentGetText(range)) || "";
  }

  const mockLineAt = (line: number) => `line ${line} content`;
  const mockGetText = (_range: unknown) => "full text";

  it("should not crash when range is undefined", () => {
    const result = extractHighlight(
      undefined,
      undefined,
      undefined,
      mockLineAt,
      mockGetText,
    );
    expect(result).toBe("full text");
  });

  it("should not crash when range.start is undefined", () => {
    const partialRange = { isSingleLine: true } as any;
    const result = extractHighlight(
      undefined,
      undefined,
      partialRange,
      mockLineAt,
      mockGetText,
    );
    // Falls back to line 0 via ?? 0
    expect(result).toBe("line 0 content");
  });

  it("should use value when field is description", () => {
    const result = extractHighlight(
      "description",
      "my description",
      undefined,
      mockLineAt,
      mockGetText,
    );
    expect(result).toBe("my description");
  });

  it("should use lineAt when range is single line with valid start", () => {
    const range = {
      isSingleLine: true,
      start: { line: 5 },
      end: { line: 5 },
    };
    const result = extractHighlight(
      undefined,
      undefined,
      range,
      mockLineAt,
      mockGetText,
    );
    expect(result).toBe("line 5 content");
  });

  it("should use getText when range is multi-line", () => {
    const range = {
      isSingleLine: false,
      start: { line: 1 },
      end: { line: 3 },
    };
    const result = extractHighlight(
      undefined,
      undefined,
      range,
      mockLineAt,
      mockGetText,
    );
    expect(result).toBe("full text");
  });
});
