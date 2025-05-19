import {
  expect,
  describe,
  it,
  beforeEach,
  afterEach,
  jest,
} from "@jest/globals";
import { Readable } from "stream";
import { Uri, workspace, window } from "vscode";
import {
  processStreamResponse,
  deepEqual,
  getStringSizeInMb,
  isQuotedIdentifier,
  getColumnNameByCase,
  isColumnNameEqual,
  getFirstWorkspacePath,
  getExternalProjectNamesFromDbtLoomConfig,
  getCurrentlySelectedModelNameInYamlConfig,
  isRelationship,
  isAcceptedValues,
  getColumnTestConfigFromYml,
} from "../../utils";
import { RateLimitException } from "../../exceptions/rateLimitException";
import { NoCredentialsError } from "../../exceptions/noCredentialsError";
import * as fs from "fs";
import * as path from "path";

describe("utils tests", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("processStreamResponse handles Node streams", async () => {
    const stream = Readable.from(["foo", "bar"]);
    const cb = jest.fn();
    const result = await processStreamResponse(stream, cb);
    expect(result).toBe("foobar");
    expect(cb).toHaveBeenCalledTimes(2);
    expect(cb).toHaveBeenCalledWith("foo");
    expect(cb).toHaveBeenCalledWith("bar");
  });

  it("processStreamResponse handles Web streams", async () => {
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode("baz"));
        controller.close();
      },
    });
    const cb = jest.fn();
    const result = await processStreamResponse(stream, cb);
    expect(result).toBe("baz");
    expect(cb).toHaveBeenCalledWith("baz");
  });

  it("deepEqual compares nested objects", () => {
    const obj1 = { a: 1, b: { c: [1, 2] } };
    const obj2 = { b: { c: [1, 2] }, a: 1 };
    const obj3 = { a: 1, b: { c: [2, 1] } };
    expect(deepEqual(obj1, obj2)).toBe(true);
    expect(deepEqual(obj1, obj3)).toBe(false);
  });

  it("getStringSizeInMb handles multibyte characters", () => {
    const asciiSize = getStringSizeInMb("abc");
    const multiSize = getStringSizeInMb("πππ");
    expect(asciiSize).toBeCloseTo(3 / (1024 * 1024));
    expect(multiSize).toBeCloseTo(6 / (1024 * 1024));
  });

  it("isQuotedIdentifier respects custom regex", () => {
    jest.spyOn(workspace, "getConfiguration").mockReturnValue({
      get: (key: string) =>
        key === "unquotedCaseInsensitiveIdentifierRegex"
          ? "^[a-z]+$"
          : undefined,
    } as any);
    expect(isQuotedIdentifier("abc", "any")).toBe(false);
    expect(isQuotedIdentifier("ABC", "any")).toBe(true);
  });

  it("getColumnNameByCase and isColumnNameEqual use config", () => {
    jest.spyOn(workspace, "getConfiguration").mockReturnValue({
      get: (key: string) => (key === "showColumnNamesInLowercase" ? true : ""),
    } as any);
    expect(getColumnNameByCase("TEST", "snowflake")).toBe("test");
    expect(isColumnNameEqual("CoL", "col")).toBe(true);
  });

  it("getFirstWorkspacePath falls back when no workspace", () => {
    (workspace.workspaceFolders as any) = undefined;
    jest.spyOn(Uri, "file").mockReturnValue({ fsPath: "./" } as any);
    expect(getFirstWorkspacePath()).toBe("./");
  });

  it("getCurrentlySelectedModelNameInYamlConfig returns model", () => {
    const yaml = `models:\n  - name: model_a\n  - name: model_b`;
    const lines = yaml.split("\n");
    const document = {
      languageId: "yaml",
      getText: () => yaml,
      offsetAt: ({ line, character }: any) =>
        lines.slice(0, line).join("\n").length + (line > 0 ? 1 : 0) + character,
    } as any;
    (window as any).activeTextEditor = {
      document,
      selection: { active: { line: 2, character: 5 } },
    };
    expect(getCurrentlySelectedModelNameInYamlConfig()).toBe("model_b");
  });

  it("type guard helpers identify metadata", () => {
    const rel = { field: "id", to: "ref" };
    const acc = { values: ["a", "b"] };
    expect(isRelationship(rel)).toBe(true);
    expect(isAcceptedValues(rel)).toBe(false);
    expect(isAcceptedValues(acc)).toBe(true);
    expect(isRelationship(acc)).toBe(false);
  });

  it("getColumnTestConfigFromYml extracts config", () => {
    const tests = [
      { relationships: { field: "id", to: "ref" } },
      { accepted_values: { values: ["a", "b"] } },
      { not_null: { severity: "warn" } },
    ];
    expect(
      getColumnTestConfigFromYml(
        tests,
        { field: "id", to: "ref" },
        "relationships",
      ),
    ).toEqual({ field: "id", to: "ref" });
    expect(
      getColumnTestConfigFromYml(
        tests,
        { values: ["b", "a"] },
        "accepted_values",
      ),
    ).toEqual({ values: ["a", "b"] });
    expect(
      getColumnTestConfigFromYml(tests, { severity: "warn" }, "not_null"),
    ).toEqual({ not_null: { severity: "warn" } });
  });

  it("getExternalProjectNamesFromDbtLoomConfig reads file", () => {
    const dir = fs.mkdtempSync(path.join("/tmp", "loom"));
    const file = path.join(dir, "dbt_loom.config.yml");
    fs.writeFileSync(file, "manifests:\n  - name: proj1\n  - name: proj2\n");
    const result = getExternalProjectNamesFromDbtLoomConfig(dir);
    expect(result).toEqual(["proj1", "proj2"]);
    fs.rmSync(dir, { recursive: true, force: true });
  });

  it("getExternalProjectNamesFromDbtLoomConfig handles missing file", () => {
    const result = getExternalProjectNamesFromDbtLoomConfig("/no/such/dir");
    expect(result).toBeNull();
  });

  it("custom exceptions expose properties", () => {
    const rl = new RateLimitException("msg", 42);
    expect(rl.retryAfter).toBe(42);
    const nc = new NoCredentialsError("missing");
    expect(nc.name).toBe("NoCredentialsError");
  });
});
