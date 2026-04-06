import {
  CancellationToken,
  DocumentSymbol,
  DocumentSymbolProvider,
  Position,
  Range,
  SymbolKind,
  TextDocument,
} from "vscode";

interface CteSymbolInfo {
  name: string;
  nameRange: Range;
  fullRange: Range;
  columns: string[];
  columnsLine: number;
}

export class DbtDocumentSymbolProvider implements DocumentSymbolProvider {
  provideDocumentSymbols(
    document: TextDocument,
    _token: CancellationToken,
  ): DocumentSymbol[] {
    if (!document.languageId.includes("sql")) {
      return [];
    }

    const cteSymbols = this.extractCteSymbols(document);
    return cteSymbols.map((cte) => {
      const symbol = new DocumentSymbol(
        cte.name,
        `CTE · ${cte.columns.length} columns`,
        SymbolKind.Struct,
        cte.fullRange,
        cte.nameRange,
      );

      symbol.children = cte.columns.map(
        (col, i) =>
          new DocumentSymbol(
            col,
            "",
            SymbolKind.Field,
            new Range(
              new Position(cte.columnsLine, 0),
              new Position(cte.columnsLine, 0),
            ),
            new Range(
              new Position(cte.columnsLine, 0),
              new Position(cte.columnsLine, 0),
            ),
          ),
      );

      return symbol;
    });
  }

  private extractCteSymbols(document: TextDocument): CteSymbolInfo[] {
    const text = document.getText();
    const results: CteSymbolInfo[] = [];

    // Find WITH clauses
    const withPositions = this.findWithKeywords(text);

    for (const withPos of withPositions) {
      let pos = withPos + 4; // skip 'WITH'
      pos = this.skipWhitespaceAndComments(text, pos);

      while (pos < text.length) {
        const cteResult = this.parseSingleCte(text, pos, document);
        if (!cteResult) {
          break;
        }
        results.push(cteResult.symbol);
        pos = cteResult.nextPos;

        // Skip whitespace/comments, look for comma or end
        pos = this.skipWhitespaceAndComments(text, pos);
        if (pos < text.length && text[pos] === ",") {
          pos++;
          pos = this.skipWhitespaceAndComments(text, pos);
        } else {
          break;
        }
      }
    }

    return results;
  }

  private parseSingleCte(
    text: string,
    pos: number,
    document: TextDocument,
  ): { symbol: CteSymbolInfo; nextPos: number } | undefined {
    // Parse CTE name (identifier)
    const nameMatch = text.substring(pos).match(/^([a-zA-Z_][a-zA-Z0-9_]*)/);
    if (!nameMatch) {
      return undefined;
    }

    const name = nameMatch[1];
    const nameStart = pos;
    const nameEnd = pos + name.length;
    pos = nameEnd;

    // Skip optional column list
    pos = this.skipWhitespaceAndComments(text, pos);
    if (pos < text.length && text[pos] === "(") {
      const closeParen = this.findMatchingParen(text, pos);
      if (closeParen === -1) {
        return undefined;
      }
      pos = closeParen + 1;
    }

    // Expect AS keyword
    pos = this.skipWhitespaceAndComments(text, pos);
    const asMatch = text.substring(pos).match(/^as\b/i);
    if (!asMatch) {
      return undefined;
    }
    pos += asMatch[0].length;

    // Expect opening paren
    pos = this.skipWhitespaceAndComments(text, pos);
    if (pos >= text.length || text[pos] !== "(") {
      return undefined;
    }

    const bodyStart = pos;
    const bodyEnd = this.findMatchingParen(text, pos);
    if (bodyEnd === -1) {
      return undefined;
    }

    const bodyContent = text.substring(bodyStart + 1, bodyEnd);
    const columns = this.extractColumnsFromSelect(bodyContent);

    const nameRange = new Range(
      document.positionAt(nameStart),
      document.positionAt(nameEnd),
    );
    const fullRange = new Range(
      document.positionAt(nameStart),
      document.positionAt(bodyEnd + 1),
    );

    // Find the SELECT line for column symbol placement
    const selectMatch = bodyContent.match(/\bselect\b/i);
    const selectOffset = selectMatch
      ? bodyStart + 1 + selectMatch.index!
      : bodyStart + 1;
    const columnsLine = document.positionAt(selectOffset).line;

    return {
      symbol: {
        name,
        nameRange,
        fullRange,
        columns,
        columnsLine,
      },
      nextPos: bodyEnd + 1,
    };
  }

  /**
   * Extract column names from the first SELECT clause in a CTE body.
   * Handles aliases (AS col), qualified names (t.col), expressions, and Jinja.
   */
  extractColumnsFromSelect(body: string): string[] {
    // Find the first top-level SELECT
    const selectMatch = body.match(/\bselect\b\s*(distinct\s+|all\s+)?/i);
    if (!selectMatch) {
      return [];
    }

    const afterSelect = selectMatch.index! + selectMatch[0].length;
    const columns: string[] = [];

    // Find extent of SELECT list (up to FROM at top level)
    let pos = afterSelect;
    let depth = 0;
    let selectListEnd = body.length;

    while (pos < body.length) {
      const ch = body[pos];

      // Skip strings
      if (ch === "'") {
        pos = this.skipString(body, pos, "'");
        continue;
      }
      // Skip Jinja
      if (ch === "{" && pos + 1 < body.length) {
        const next = body[pos + 1];
        if (next === "{" || next === "%" || next === "#") {
          pos = this.skipJinja(body, pos);
          continue;
        }
      }

      if (ch === "(") {
        depth++;
      } else if (ch === ")") {
        depth--;
      }

      if (depth === 0) {
        const remaining = body.substring(pos);
        if (/^\bfrom\b/i.test(remaining)) {
          selectListEnd = pos;
          break;
        }
      }

      pos++;
    }

    const selectList = body.substring(afterSelect, selectListEnd);

    // Split by top-level commas
    const items = this.splitByTopLevelCommas(selectList);

    for (const item of items) {
      const trimmed = item.trim();
      if (!trimmed || trimmed === "*") {
        if (trimmed === "*") {
          columns.push("*");
        }
        continue;
      }

      const col = this.extractColumnName(trimmed);
      if (col) {
        columns.push(col);
      }
    }

    return columns;
  }

  private extractColumnName(expr: string): string | undefined {
    // Check for explicit alias: ... AS name (case insensitive, at end)
    const asMatch = expr.match(/\bas\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*$/i);
    if (asMatch) {
      return asMatch[1];
    }

    // Check for quoted alias: ... AS "name"
    const asQuotedMatch = expr.match(/\bas\s+"([^"]+)"\s*$/i);
    if (asQuotedMatch) {
      return asQuotedMatch[1];
    }

    // Simple column reference (possibly qualified): table.column or just column
    const simpleMatch = expr.match(
      /^(?:[a-zA-Z_][a-zA-Z0-9_]*\.)?([a-zA-Z_][a-zA-Z0-9_]*)\s*$/,
    );
    if (simpleMatch) {
      return simpleMatch[1];
    }

    // Jinja expression: {{ something }}
    const jinjaMatch = expr.match(/^\{\{[^}]+\}\}\s*$/);
    if (jinjaMatch) {
      return undefined; // Can't determine column name from Jinja
    }

    return undefined;
  }

  private splitByTopLevelCommas(text: string): string[] {
    const items: string[] = [];
    let depth = 0;
    let current = "";

    for (let i = 0; i < text.length; i++) {
      const ch = text[i];

      if (ch === "'") {
        const end = this.skipString(text, i, "'");
        current += text.substring(i, end);
        i = end - 1;
        continue;
      }

      if (ch === "{" && i + 1 < text.length) {
        const next = text[i + 1];
        if (next === "{" || next === "%" || next === "#") {
          const end = this.skipJinja(text, i);
          current += text.substring(i, end);
          i = end - 1;
          continue;
        }
      }

      if (ch === "(") {
        depth++;
      } else if (ch === ")") {
        depth--;
      }

      if (ch === "," && depth === 0) {
        items.push(current);
        current = "";
      } else {
        current += ch;
      }
    }

    if (current.trim()) {
      items.push(current);
    }

    return items;
  }

  private findWithKeywords(text: string): number[] {
    const positions: number[] = [];
    let pos = 0;
    let inString = false;
    let stringChar = "";

    while (pos < text.length) {
      const ch = text[pos];

      // Skip comments
      if (!inString) {
        if (ch === "-" && pos + 1 < text.length && text[pos + 1] === "-") {
          while (pos < text.length && text[pos] !== "\n") {
            pos++;
          }
          continue;
        }
        if (ch === "/" && pos + 1 < text.length && text[pos + 1] === "*") {
          pos += 2;
          while (
            pos < text.length - 1 &&
            !(text[pos] === "*" && text[pos + 1] === "/")
          ) {
            pos++;
          }
          pos += 2;
          continue;
        }
        if (ch === "{" && pos + 1 < text.length && text[pos + 1] === "#") {
          pos += 2;
          while (
            pos < text.length - 1 &&
            !(text[pos] === "#" && text[pos + 1] === "}")
          ) {
            pos++;
          }
          pos += 2;
          continue;
        }
      }

      // String handling
      if (!inString && (ch === "'" || ch === '"')) {
        inString = true;
        stringChar = ch;
        pos++;
        continue;
      }
      if (inString && ch === stringChar) {
        if (pos + 1 < text.length && text[pos + 1] === stringChar) {
          pos += 2;
          continue;
        }
        inString = false;
        pos++;
        continue;
      }

      if (!inString) {
        const remaining = text.substring(pos);
        if (/^with\b/i.test(remaining)) {
          const charBefore = pos > 0 ? text[pos - 1] : " ";
          if (!/[a-zA-Z0-9_]/.test(charBefore)) {
            positions.push(pos);
          }
          pos += 4;
          continue;
        }
      }

      pos++;
    }

    return positions;
  }

  private skipWhitespaceAndComments(text: string, pos: number): number {
    while (pos < text.length) {
      // Skip whitespace
      if (/\s/.test(text[pos])) {
        pos++;
        continue;
      }
      // Line comment
      if (text[pos] === "-" && pos + 1 < text.length && text[pos + 1] === "-") {
        while (pos < text.length && text[pos] !== "\n") {
          pos++;
        }
        continue;
      }
      // Block comment
      if (text[pos] === "/" && pos + 1 < text.length && text[pos + 1] === "*") {
        pos += 2;
        while (
          pos < text.length - 1 &&
          !(text[pos] === "*" && text[pos + 1] === "/")
        ) {
          pos++;
        }
        pos += 2;
        continue;
      }
      // Jinja comment
      if (text[pos] === "{" && pos + 1 < text.length && text[pos + 1] === "#") {
        pos += 2;
        while (
          pos < text.length - 1 &&
          !(text[pos] === "#" && text[pos + 1] === "}")
        ) {
          pos++;
        }
        pos += 2;
        continue;
      }
      break;
    }
    return pos;
  }

  private findMatchingParen(text: string, openPos: number): number {
    let depth = 1;
    let pos = openPos + 1;
    let inString = false;
    let stringChar = "";

    while (pos < text.length && depth > 0) {
      const ch = text[pos];

      // Skip comments
      if (!inString) {
        if (ch === "-" && pos + 1 < text.length && text[pos + 1] === "-") {
          while (pos < text.length && text[pos] !== "\n") {
            pos++;
          }
          continue;
        }
        if (ch === "/" && pos + 1 < text.length && text[pos + 1] === "*") {
          pos += 2;
          while (
            pos < text.length - 1 &&
            !(text[pos] === "*" && text[pos + 1] === "/")
          ) {
            pos++;
          }
          pos += 2;
          continue;
        }
      }

      if (!inString && (ch === "'" || ch === '"')) {
        inString = true;
        stringChar = ch;
      } else if (inString && ch === stringChar) {
        if (pos + 1 < text.length && text[pos + 1] === stringChar) {
          pos += 2;
          continue;
        }
        inString = false;
      }

      if (!inString) {
        if (ch === "(") {
          depth++;
        } else if (ch === ")") {
          depth--;
        }
      }

      pos++;
    }

    return depth === 0 ? pos - 1 : -1;
  }

  private skipString(text: string, pos: number, quote: string): number {
    pos++; // skip opening quote
    while (pos < text.length) {
      if (text[pos] === quote) {
        if (pos + 1 < text.length && text[pos + 1] === quote) {
          pos += 2;
          continue;
        }
        return pos + 1;
      }
      pos++;
    }
    return pos;
  }

  private skipJinja(text: string, pos: number): number {
    const open = text.substring(pos, pos + 2);
    let close: string;
    if (open === "{{") {
      close = "}}";
    } else if (open === "{%") {
      close = "%}";
    } else if (open === "{#") {
      close = "#}";
    } else {
      return pos + 1;
    }

    pos += 2;
    while (pos < text.length - 1) {
      if (text[pos] === close[0] && text[pos + 1] === close[1]) {
        return pos + 2;
      }
      pos++;
    }
    return text.length;
  }
}
