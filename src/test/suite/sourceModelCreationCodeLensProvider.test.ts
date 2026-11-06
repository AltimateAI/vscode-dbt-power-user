import { afterEach, describe, expect, it, jest } from "@jest/globals";
import { CodeLens, Uri } from "vscode";
import {
  GenerateModelFromSourceParams,
  SourceModelCreationCodeLensProvider,
} from "../../code_lens_provider/sourceModelCreationCodeLensProvider";

jest.mock("vscode", () => jest.requireActual("../mock/vscode"));

const SOURCES_YAML = `version: 2
sources:
  - name: raw
    database: analytics
    schema: public
    tables:
      - name: orders
        identifier: orders_raw
      - name: customers
`;

function document(text: string) {
  return {
    uri: Uri.file("/proj/models/sources.yml"),
    getText: () => text,
  } as never;
}

function lensesFor(text: string): CodeLens[] {
  return new SourceModelCreationCodeLensProvider().provideCodeLenses(
    document(text),
    {} as never,
  ) as CodeLens[];
}

function params(lens: CodeLens): GenerateModelFromSourceParams {
  return lens.command?.arguments?.[0] as GenerateModelFromSourceParams;
}

describe("SourceModelCreationCodeLensProvider", () => {
  // Another extension in the same extension host can add an enumerable
  // property to Array.prototype; `for...in` over an array then visits it.
  const POLLUTED = "enumerableAddedByAnotherExtension";

  afterEach(() => {
    delete (Array.prototype as unknown as Record<string, unknown>)[POLLUTED];
  });

  it("emits one lens per source table, on the table's line", () => {
    const lenses = lensesFor(SOURCES_YAML);

    expect(lenses.map((l) => params(l).tableName)).toEqual([
      "orders",
      "customers",
    ]);
    expect(params(lenses[0])).toMatchObject({
      sourceName: "raw",
      database: "analytics",
      schema: "public",
      tableIdentifier: "orders_raw",
    });
    // The mock Range keeps the first constructor argument as `start`.
    expect(
      lenses.map((l) => (l.range as unknown as { start: unknown }).start),
    ).toEqual([6, 8]);
  });

  it("ignores enumerable properties another extension added to Array.prototype", () => {
    Object.defineProperty(Array.prototype, POLLUTED, {
      value: "not a table",
      enumerable: true,
      configurable: true,
      writable: true,
    });

    const lenses = lensesFor(SOURCES_YAML);

    expect(lenses.map((l) => params(l).tableName)).toEqual([
      "orders",
      "customers",
    ]);
  });

  it("emits nothing for a document without sources", () => {
    expect(lensesFor("version: 2\nmodels:\n  - name: m\n")).toEqual([]);
  });
});
