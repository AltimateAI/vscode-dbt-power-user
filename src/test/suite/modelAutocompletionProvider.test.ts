import { afterAll, beforeAll, describe, expect, it, jest } from "@jest/globals";
import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";
import { ModelAutocompletionProvider } from "../../autocompletion_provider/modelAutocompletionProvider";

// The shared vscode mock has no CompletionItemKind or SnippetString; add them
// for this suite only.
class SnippetString {
  constructor(public value: string) {}
}
const CompletionItemKind = { Value: 11, Snippet: 14 };
const mock = vscode as unknown as Record<string, unknown>;
const added = { SnippetString, CompletionItemKind };

const PROJECT_ROOT = "/ws/jaffle_shop";

type Item = {
  label: string;
  kind: number;
  detail?: string;
  insertText: string | SnippetString;
  command?: { command: string };
};

function makeDocument(text: string) {
  const lines = text.split("\n");
  return {
    uri: { fsPath: `${PROJECT_ROOT}/models/m.sql` },
    lineCount: lines.length,
    lineAt: (lineOrPosition: number | vscode.Position) => {
      const n =
        typeof lineOrPosition === "number"
          ? lineOrPosition
          : lineOrPosition.line;
      return { text: lines[n] };
    },
    getText: (range: vscode.Range) => {
      const out = lines.slice(0, range.end.line + 1);
      out[out.length - 1] = out[out.length - 1].substring(
        0,
        range.end.character,
      );
      return out.join("\n");
    },
  };
}

// `|` marks the cursor.
function complete(
  provider: ModelAutocompletionProvider,
  textWithCursor: string,
): Item[] | undefined {
  const offset = textWithCursor.indexOf("|");
  const text =
    textWithCursor.slice(0, offset) + textWithCursor.slice(offset + 1);
  const before = text.substring(0, offset).split("\n");
  const position = new vscode.Position(
    before.length - 1,
    before[before.length - 1].length,
  );
  return provider.provideCompletionItems(
    makeDocument(text) as unknown as vscode.TextDocument,
    position,
    {} as vscode.CancellationToken,
    {} as vscode.CompletionContext,
  ) as Item[] | undefined;
}

function setup(inProject = true) {
  let onManifest: ((event: unknown) => void) | undefined;
  const container = {
    onManifestChanged: jest.fn((cb: (event: unknown) => void) => {
      onManifest = cb;
      return { dispose: jest.fn() };
    }),
    getProjectRootpath: jest.fn(() =>
      inProject ? { fsPath: PROJECT_ROOT } : undefined,
    ),
    getFromWorkspaceState: jest.fn(() => undefined),
  };
  const telemetry = { sendTelemetryEvent: jest.fn() };
  const provider = new ModelAutocompletionProvider(
    container as never,
    telemetry as never,
  );
  onManifest!({
    added: [
      {
        project: {
          getProjectName: () => "jaffle_shop",
          projectRoot: { fsPath: PROJECT_ROOT },
        },
        nodeMetaMap: {
          nodes: () => [
            {
              name: "customers",
              package_name: "jaffle_shop",
              resource_type: "model",
            },
            {
              name: "orders",
              package_name: "jaffle_shop",
              resource_type: "model",
            },
          ],
        },
      },
    ],
  });
  return { provider, telemetry };
}

const snippetBody = (items: Item[] | undefined) => {
  expect(items).toHaveLength(1);
  const [item] = items!;
  expect(item.label).toBe("ref");
  expect(item.kind).toBe(CompletionItemKind.Snippet);
  expect(item.insertText).toBeInstanceOf(SnippetString);
  return (item.insertText as SnippetString).value;
};

describe("ModelAutocompletionProvider ref keyword", () => {
  beforeAll(() => {
    Object.assign(mock, added);
  });
  afterAll(() => {
    for (const key of Object.keys(added)) {
      delete mock[key];
    }
  });

  it("inserts {{ ref('') }} with an empty tab stop on a blank line and reopens suggestions", () => {
    const { provider } = setup();
    const items = complete(provider, "select 1 as id\nfrom (\nref|\n)");
    expect(snippetBody(items)).toBe("{{ ref('$1') }}");
    expect(items![0].command?.command).toBe("editor.action.triggerSuggest");
  });

  it("inserts only ref('') inside auto-closed {{ }}", () => {
    const { provider } = setup();
    expect(snippetBody(complete(provider, "select * from {{ ref|}}"))).toBe(
      "ref('$1')",
    );
  });

  it("inserts only ref('') inside an unclosed {{", () => {
    const { provider } = setup();
    expect(snippetBody(complete(provider, "select * from {{ re|"))).toBe(
      "ref('$1')",
    );
  });

  it("inserts only ref('') inside a {% %} statement", () => {
    const { provider } = setup();
    expect(snippetBody(complete(provider, "{% set x = ref| %}"))).toBe(
      "ref('$1')",
    );
  });

  it("wraps in braces again after a closed block on the same line", () => {
    const { provider } = setup();
    expect(
      snippetBody(complete(provider, "{{ config(materialized='view') }} r|")),
    ).toBe("{{ ref('$1') }}");
  });

  it("is not offered inside quotes, after a dot, or with nothing typed", () => {
    const { provider } = setup();
    expect(complete(provider, "{{ source('r|') }}")).toBeUndefined();
    expect(complete(provider, "{{ adapter.r| }}")).toBeUndefined();
    expect(complete(provider, "select |")).toBeUndefined();
  });

  it("is not offered outside a dbt project", () => {
    const { provider } = setup(false);
    expect(complete(provider, "ref|")).toBeUndefined();
  });

  it("does not send model-completion telemetry for the keyword item", () => {
    const { provider, telemetry } = setup();
    complete(provider, "ref|");
    expect(telemetry.sendTelemetryEvent).not.toHaveBeenCalled();
  });

  it("still lists models between the quotes the item leaves", () => {
    const { provider } = setup();
    const items = complete(provider, "select * from {{ ref('|') }}");
    expect(items!.map((i) => i.label)).toEqual([
      "(jaffle_shop) customers",
      "(jaffle_shop) orders",
    ]);
    expect(items!.map((i) => i.insertText)).toEqual(["customers", "orders"]);
  });
});

describe("jinja-sql snippets", () => {
  it("has no static ref snippet (the completion provider supplies it)", () => {
    const snippets = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, "../../../snippets/snippets_sql.json"),
        "utf-8",
      ),
    ) as Record<string, { prefix: string }>;
    expect(
      Object.values(snippets).filter((s) => s.prefix === "ref"),
    ).toHaveLength(0);
  });
});
