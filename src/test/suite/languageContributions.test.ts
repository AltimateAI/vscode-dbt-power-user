import { describe, expect, it } from "@jest/globals";
import * as fs from "fs";
import * as path from "path";

/**
 * Power User contributes the Jinja languages it relies on (`jinja-sql`,
 * `jinja-yaml`, `jinja-md`) itself, so it works without a separate Jinja
 * extension. These tests pin those contributions in package.json.
 */

type LanguageContribution = {
  id: string;
  aliases?: string[];
  configuration?: string;
  extensions?: string[];
  filenames?: string[];
  filenamePatterns?: string[];
};
type GrammarContribution = {
  language?: string;
  scopeName: string;
  path: string;
  injectTo?: string[];
};
type SnippetContribution = { language: string; path: string };
type PackageJson = {
  extensionDependencies: string[];
  contributes: {
    languages: LanguageContribution[];
    grammars: GrammarContribution[];
    snippets: SnippetContribution[];
  };
};
type LanguageConfiguration = {
  comments: { lineComment?: string; blockComment?: [string, string] };
  brackets: [string, string][];
  autoClosingPairs: { open: string; close: string; notIn?: string[] }[];
  surroundingPairs: [string, string][];
  folding?: { offSide?: boolean; markers?: { start: string; end: string } };
  indentationRules?: {
    increaseIndentPattern: string;
    decreaseIndentPattern: string;
  };
};
type GrammarFile = {
  scopeName: string;
  patterns: { include?: string }[];
  injections?: Record<string, { patterns: { include?: string }[] }>;
};

const repoRoot = path.resolve(__dirname, "../../..");
const readJson = (relativePath: string): unknown =>
  JSON.parse(fs.readFileSync(path.join(repoRoot, relativePath), "utf-8"));
// The files read here are the subject under test: the assertions check their
// shape, so this is the one place the parsed JSON is given a type.
const readJsonAs = <T>(relativePath: string): T => readJson(relativePath) as T;

const packageJson = readJsonAs<PackageJson>("package.json");
const { contributes } = packageJson;
const { languages, grammars } = contributes;

const languageById = (id: string): LanguageContribution | undefined =>
  languages.find((l) => l.id === id);
const grammarForLanguage = (id: string): GrammarContribution | undefined =>
  grammars.find((g) => g.language === id);

const requireLanguage = (id: string): LanguageContribution => {
  const language = languageById(id);
  if (!language) {
    throw new Error(`language ${id} is not contributed`);
  }
  return language;
};
const requireGrammar = (id: string): GrammarContribution => {
  const grammar = grammarForLanguage(id);
  if (!grammar) {
    throw new Error(`no grammar is contributed for ${id}`);
  }
  return grammar;
};
const configurationOf = (id: string): LanguageConfiguration => {
  const { configuration } = requireLanguage(id);
  if (!configuration) {
    throw new Error(`language ${id} has no configuration`);
  }
  return readJsonAs<LanguageConfiguration>(configuration);
};

const listSourceFiles = (dir: string): string[] =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return entry.name === "test" ? [] : listSourceFiles(fullPath);
    }
    return /\.(tsx?|js)$/.test(entry.name) ? [fullPath] : [];
  });

const JINJA_LANGUAGES = [
  {
    id: "jinja-sql",
    alias: "Jinja SQL",
    scopeName: "source.sql.jinja",
    lineComment: "--",
  },
  {
    id: "jinja-yaml",
    alias: "Jinja YAML",
    scopeName: "text.yaml.jinja",
    lineComment: "#",
  },
  {
    id: "jinja-md",
    alias: "Jinja Markdown",
    scopeName: "text.html.markdown.jinja",
    lineComment: undefined,
  },
];

describe("Jinja language contributions", () => {
  it("does not depend on samuelcolvin.jinjahtml", () => {
    expect(packageJson.extensionDependencies).not.toContain(
      "samuelcolvin.jinjahtml",
    );
  });

  describe.each(JINJA_LANGUAGES)(
    "$id",
    ({ id, alias, scopeName, lineComment }) => {
      it("is contributed with a display alias", () => {
        expect(languageById(id)?.aliases?.[0]).toBe(alias);
      });

      it("does not claim file extensions or file names", () => {
        const language = requireLanguage(id);
        expect(language.extensions).toBeUndefined();
        expect(language.filenames).toBeUndefined();
        expect(language.filenamePatterns).toBeUndefined();
      });

      it("has a grammar whose file exists and declares the same scope", () => {
        const grammar = requireGrammar(id);
        expect(grammar.scopeName).toBe(scopeName);
        const grammarFile = readJsonAs<GrammarFile>(grammar.path);
        expect(grammarFile.scopeName).toBe(scopeName);
      });

      it("has a language configuration with comments and Jinja brackets", () => {
        const config = configurationOf(id);
        expect(config.comments.lineComment).toBe(lineComment);
        expect(config.comments.blockComment ?? ["{#", "#}"]).toEqual([
          "{#",
          "#}",
        ]);
        for (const pair of [
          ["{{", "}}"],
          ["{%", "%}"],
          ["{#", "#}"],
        ]) {
          expect(config.brackets).toContainEqual(pair);
          expect(config.autoClosingPairs).toContainEqual(
            expect.objectContaining({ open: pair[0], close: pair[1] }),
          );
        }
        expect(config.surroundingPairs.length).toBeGreaterThan(0);
      });

      it("compiles every regular expression in its language configuration", () => {
        const config = configurationOf(id);
        const patterns = [
          config.folding?.markers?.start,
          config.folding?.markers?.end,
          config.indentationRules?.increaseIndentPattern,
          config.indentationRules?.decreaseIndentPattern,
        ].filter((p): p is string => typeof p === "string");
        for (const pattern of patterns) {
          expect(() => new RegExp(pattern)).not.toThrow();
        }
      });
    },
  );

  it("gives jinja-sql both a line comment and a Jinja block comment", () => {
    const config = configurationOf("jinja-sql");
    expect(config.comments).toEqual({
      lineComment: "--",
      blockComment: ["{#", "#}"],
    });
  });

  it("folds Jinja blocks in jinja-sql but not one-line blocks", () => {
    const markers = configurationOf("jinja-sql").folding?.markers;
    expect(markers).toBeDefined();
    const start = new RegExp(markers?.start ?? "");
    const end = new RegExp(markers?.end ?? "");
    expect(start.test("{% if is_incremental() %}")).toBe(true);
    expect(start.test("  {%- for col in cols -%}")).toBe(true);
    expect(start.test("{% macro my_macro(x) %}")).toBe(true);
    expect(start.test("{% if a %}x{% endif %}")).toBe(false);
    expect(start.test("{% set x = 1 %}")).toBe(false);
    expect(end.test("{% endif %}")).toBe(true);
    expect(end.test("  {%- endfor -%}")).toBe(true);
  });

  it.each([
    ["jinja-yaml", "source.yaml"],
    ["jinja-md", "text.html.markdown"],
  ])(
    "%s includes the %s grammar and injects the Jinja rules everywhere",
    (id, baseScope) => {
      const grammarFile = readJsonAs<GrammarFile>(requireGrammar(id).path);
      expect(grammarFile.patterns).toEqual([{ include: baseScope }]);
      const injections = grammarFile.injections ?? {};
      const selectors = Object.keys(injections);
      expect(selectors).toHaveLength(1);
      expect(selectors[0].startsWith(`L:${grammarFile.scopeName} - `)).toBe(
        true,
      );
      expect(injections[selectors[0]].patterns).toEqual([
        { include: "source.yaml.jinja" },
      ]);
    },
  );

  it("contributes the Jinja-only grammar the injections include", () => {
    const jinjaOnly = grammars.find((g) => g.scopeName === "source.yaml.jinja");
    if (!jinjaOnly) {
      throw new Error("source.yaml.jinja is not contributed");
    }
    expect(jinjaOnly.language).toBeUndefined();
    const grammarFile = readJsonAs<GrammarFile>(jinjaOnly.path);
    expect(grammarFile.patterns.map((p) => p.include)).toEqual([
      "#jinja-comment",
      "#jinja-statement",
      "#jinja-expression",
    ]);
  });

  it("points every snippet contribution at a language Power User contributes or a built-in one", () => {
    const contributedIds = new Set(languages.map((l) => l.id));
    for (const snippet of contributes.snippets) {
      expect(fs.existsSync(path.join(repoRoot, snippet.path))).toBe(true);
      if (snippet.language.startsWith("jinja-")) {
        expect(contributedIds).toContain(snippet.language);
      }
    }
  });

  it("contributes every jinja-* language id that package.json and the extension source use", () => {
    const contributedIds = new Set(languages.map((l) => l.id));
    const texts = [
      fs.readFileSync(path.join(repoRoot, "package.json"), "utf-8"),
      ...listSourceFiles(path.join(repoRoot, "src")).map((file) =>
        fs.readFileSync(file, "utf-8"),
      ),
    ];
    const used = new Set(
      texts.flatMap((text) => text.match(/\bjinja-[a-z]+\b/g) ?? []),
    );

    expect([...used].sort()).toEqual(["jinja-md", "jinja-sql", "jinja-yaml"]);
    for (const id of used) {
      expect(contributedIds).toContain(id);
    }
  });
});
