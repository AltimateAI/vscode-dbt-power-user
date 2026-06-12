import { describe, expect, it } from "@jest/globals";
import * as fs from "fs";
import * as path from "path";

/**
 * Tests for the TextMate grammar files.
 *
 * These tests validate the grammar JSON structure, regex patterns,
 * and scope naming conventions. Full tokenization testing requires
 * vscode-tmgrammar-test or a VS Code integration test host.
 */
/**
 * TextMate grammars use Oniguruma regex which supports inline flags like (?i).
 * JavaScript RegExp does not. This helper strips (?i) and returns a JS RegExp
 * with the "i" flag applied externally.
 */
function toJsRegex(pattern: string, extraFlags = ""): RegExp {
  let flags = extraFlags;
  const cleaned = pattern.replace(/\(\?i\)/g, () => {
    if (!flags.includes("i")) {
      flags += "i";
    }
    return "";
  });
  return new RegExp(cleaned, flags);
}

describe("Jinja SQL Grammar", () => {
  const grammarPath = path.resolve(
    __dirname,
    "../../../syntaxes/jinja-sql.tmLanguage.json",
  );

  let grammar: any;

  beforeAll(() => {
    const content = fs.readFileSync(grammarPath, "utf-8");
    grammar = JSON.parse(content);
  });

  it("should be valid JSON with correct scopeName", () => {
    expect(grammar.scopeName).toBe("source.sql.jinja");
    expect(grammar.name).toBe("Jinja SQL");
  });

  it("should have top-level patterns referencing repository", () => {
    expect(grammar.patterns.length).toBeGreaterThan(0);
    for (const pattern of grammar.patterns) {
      expect(pattern.include).toBeDefined();
      const repoKey = pattern.include.replace("#", "");
      expect(grammar.repository[repoKey]).toBeDefined();
    }
  });

  describe("repository completeness", () => {
    it("should have Jinja comment, statement, expression patterns", () => {
      expect(grammar.repository["jinja-comment"]).toBeDefined();
      expect(grammar.repository["jinja-statement"]).toBeDefined();
      expect(grammar.repository["jinja-expression"]).toBeDefined();
    });

    it("should have SQL comment patterns", () => {
      expect(grammar.repository["sql-comment-line"]).toBeDefined();
      expect(grammar.repository["sql-comment-block"]).toBeDefined();
    });

    it("should have SQL keyword categories", () => {
      expect(grammar.repository["sql-keyword-dml"]).toBeDefined();
      expect(grammar.repository["sql-keyword-ddl"]).toBeDefined();
      expect(grammar.repository["sql-keyword-clause"]).toBeDefined();
      expect(grammar.repository["sql-keyword-join"]).toBeDefined();
      expect(grammar.repository["sql-keyword-operator"]).toBeDefined();
    });

    it("should have SQL function categories", () => {
      expect(grammar.repository["sql-function-aggregate"]).toBeDefined();
      expect(grammar.repository["sql-function-window"]).toBeDefined();
      expect(grammar.repository["sql-function-date"]).toBeDefined();
      expect(grammar.repository["sql-function-string"]).toBeDefined();
    });

    it("should have Jinja sub-patterns", () => {
      expect(grammar.repository["jinja-keyword"]).toBeDefined();
      expect(grammar.repository["jinja-dbt-function"]).toBeDefined();
      expect(grammar.repository["jinja-filter"]).toBeDefined();
      expect(grammar.repository["jinja-operator"]).toBeDefined();
    });
  });

  describe("regex pattern validity", () => {
    const getPatternRegexes = (repo: Record<string, any>): string[] => {
      const regexes: string[] = [];
      for (const [, value] of Object.entries(repo)) {
        if (value.match) {
          regexes.push(value.match);
        }
        if (value.begin) {
          regexes.push(value.begin);
        }
        if (value.end) {
          regexes.push(value.end);
        }
      }
      return regexes;
    };

    it("all regex patterns should be valid", () => {
      const regexes = getPatternRegexes(grammar.repository);
      for (const regex of regexes) {
        expect(() => toJsRegex(regex)).not.toThrow();
      }
    });
  });

  describe("dbt function coverage", () => {
    it("should match core dbt functions", () => {
      const dbtFnPattern = grammar.repository["jinja-dbt-function"].match;
      const regex = toJsRegex(dbtFnPattern);
      const expectedFunctions = [
        "ref",
        "source",
        "config",
        "var",
        "env_var",
        "adapter",
        "return",
        "log",
        "run_query",
        "this",
        "graph",
        "flags",
        "target",
        "is_incremental",
      ];

      for (const fn of expectedFunctions) {
        // Test with function call syntax (followed by paren)
        expect(regex.test(`${fn}(`)).toBe(true);
      }
    });
  });

  describe("SQL keyword case insensitivity", () => {
    it("should match SELECT in any case", () => {
      const dmlPattern = grammar.repository["sql-keyword-dml"].match;
      const regex = toJsRegex(dmlPattern);
      expect(regex.test("SELECT")).toBe(true);
      expect(regex.test("select")).toBe(true);
      expect(regex.test("Select")).toBe(true);
    });

    it("should match JOIN variants", () => {
      const joinPattern = grammar.repository["sql-keyword-join"].match;
      const regex = toJsRegex(joinPattern);
      expect(regex.test("JOIN")).toBe(true);
      expect(regex.test("LEFT JOIN")).toBe(true);
      expect(regex.test("left outer join")).toBe(true);
    });
  });

  describe("aggregate function patterns", () => {
    it("should match common aggregates followed by paren", () => {
      const aggPattern = grammar.repository["sql-function-aggregate"].match;
      const regex = toJsRegex(aggPattern);
      expect(regex.test("COUNT(")).toBe(true);
      expect(regex.test("SUM(")).toBe(true);
      expect(regex.test("avg(")).toBe(true);
      expect(regex.test("max(")).toBe(true);
    });

    it("should not match aggregate names without paren", () => {
      const aggPattern = grammar.repository["sql-function-aggregate"].match;
      const regex = toJsRegex(aggPattern);
      // The lookahead (?=\s*\() should prevent matching without paren
      // but the regex engine may still match the word part
      // Test the full pattern behavior
      expect(regex.test("COUNT_column")).toBe(false);
    });
  });

  describe("window function patterns", () => {
    it("should match window functions", () => {
      const winPattern = grammar.repository["sql-function-window"].match;
      const regex = toJsRegex(winPattern);
      expect(regex.test("ROW_NUMBER(")).toBe(true);
      expect(regex.test("RANK(")).toBe(true);
      expect(regex.test("DENSE_RANK(")).toBe(true);
      expect(regex.test("LAG(")).toBe(true);
      expect(regex.test("LEAD(")).toBe(true);
    });
  });

  describe("Jinja delimiter scoping", () => {
    it("expression delimiters should have correct scope names", () => {
      const expr = grammar.repository["jinja-expression"];
      expect(expr.beginCaptures["0"].name).toBe(
        "punctuation.definition.expression.begin.jinja",
      );
      expect(expr.endCaptures["0"].name).toBe(
        "punctuation.definition.expression.end.jinja",
      );
    });

    it("statement delimiters should have correct scope names", () => {
      const stmt = grammar.repository["jinja-statement"];
      expect(stmt.beginCaptures["0"].name).toBe(
        "punctuation.definition.tag.begin.jinja",
      );
      expect(stmt.endCaptures["0"].name).toBe(
        "punctuation.definition.tag.end.jinja",
      );
    });

    it("comment delimiters should have correct scope names", () => {
      const comment = grammar.repository["jinja-comment"];
      expect(comment.name).toBe("comment.block.jinja");
    });
  });

  describe("Jinja whitespace control", () => {
    it("should match expression delimiters with whitespace control", () => {
      const expr = grammar.repository["jinja-expression"];
      const beginRegex = toJsRegex(expr.begin);
      const endRegex = toJsRegex(expr.end);
      expect(beginRegex.test("{{")).toBe(true);
      expect(beginRegex.test("{{-")).toBe(true);
      expect(endRegex.test("}}")).toBe(true);
      expect(endRegex.test("-}}")).toBe(true);
    });

    it("should match statement delimiters with whitespace control", () => {
      const stmt = grammar.repository["jinja-statement"];
      const beginRegex = toJsRegex(stmt.begin);
      const endRegex = toJsRegex(stmt.end);
      expect(beginRegex.test("{%")).toBe(true);
      expect(beginRegex.test("{%-")).toBe(true);
      expect(endRegex.test("%}")).toBe(true);
      expect(endRegex.test("-%}")).toBe(true);
    });
  });
});

describe("Jinja YAML Injection Grammar", () => {
  const grammarPath = path.resolve(
    __dirname,
    "../../../syntaxes/jinja-yaml.tmLanguage.json",
  );

  let grammar: any;

  beforeAll(() => {
    const content = fs.readFileSync(grammarPath, "utf-8");
    grammar = JSON.parse(content);
  });

  it("should be valid JSON with correct injection scope", () => {
    expect(grammar.scopeName).toBe("source.yaml.jinja");
    expect(grammar.injectionSelector).toBe("L:source.yaml");
  });

  it("should inject Jinja patterns into YAML", () => {
    expect(grammar.patterns.length).toBeGreaterThan(0);
    const includeNames = grammar.patterns.map((p: any) => p.include);
    expect(includeNames).toContain("#jinja-comment");
    expect(includeNames).toContain("#jinja-statement");
    expect(includeNames).toContain("#jinja-expression");
  });

  it("should have dbt function support", () => {
    expect(grammar.repository["jinja-dbt-function"]).toBeDefined();
    const regex = toJsRegex(grammar.repository["jinja-dbt-function"].match);
    expect(regex.test("ref(")).toBe(true);
    expect(regex.test("source(")).toBe(true);
    expect(regex.test("var(")).toBe(true);
  });

  it("should have matching Jinja keyword patterns", () => {
    expect(grammar.repository["jinja-keyword"]).toBeDefined();
    const regex = toJsRegex(grammar.repository["jinja-keyword"].match);
    expect(regex.test("for")).toBe(true);
    expect(regex.test("if")).toBe(true);
    expect(regex.test("set")).toBe(true);
    expect(regex.test("macro")).toBe(true);
  });
});
