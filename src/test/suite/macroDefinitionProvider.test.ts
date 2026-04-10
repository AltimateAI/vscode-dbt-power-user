import type { MacroMetaMap } from "@altimateai/dbt-integration";
import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";
import { DBTProjectContainer } from "../../dbt_client/dbtProjectContainer";
import { ManifestCacheChangedEvent } from "../../dbt_client/event/manifestCacheChangedEvent";
import { MacroDefinitionProvider } from "../../definition_provider/macroDefinitionProvider";
import { TelemetryService } from "../../telemetry";

// A minimal text document mock tailored for MacroDefinitionProvider.
// The provider only touches lineAt(position).text, getWordRangeAtPosition,
// getText(range), and uri. It also calls isEnclosedWithinCodeBlock which
// scans lineAt(i).text for '{'/'}' — wrapping each snippet in a jinja
// statement block ({{ ... }}) is enough to satisfy that check.
// The range is returned as a plain `{ start, end }` object because the
// vscode mock's `Position` / `Range` are jest.fn() impls and we don't want
// the `instanceof Position` check in isEnclosedWithinCodeBlock to match.
const createMockDocument = (line: string, word: string) => {
  const character = line.indexOf(word);
  if (character === -1) {
    throw new Error(`word "${word}" not found in line: ${line}`);
  }
  const range = {
    start: { line: 0, character },
    end: { line: 0, character: character + word.length },
  };
  return {
    uri: { fsPath: "/workspace/project/macros/call_toto.sql" } as any,
    lineAt: (_pos: any) => ({ text: line }),
    lineCount: 1,
    getWordRangeAtPosition: (_pos: any, _regex: RegExp) => range,
    getText: (_range: any) => word,
  } as any;
};

describe("MacroDefinitionProvider — issue #1754", () => {
  const PROJECT_ROOT = "/workspace/project";
  let mockContainer: jest.Mocked<DBTProjectContainer>;
  let mockTelemetry: jest.Mocked<TelemetryService>;
  let manifestHandlers: Array<(event: ManifestCacheChangedEvent) => void>;
  let provider: MacroDefinitionProvider;

  const fireManifest = (macroMetaMap: MacroMetaMap) => {
    const event: ManifestCacheChangedEvent = {
      added: [
        {
          project: {
            projectRoot: { fsPath: PROJECT_ROOT } as any,
          } as any,
          macroMetaMap,
        } as any,
      ],
      removed: undefined,
    } as any;
    for (const handler of manifestHandlers) {
      handler(event);
    }
  };

  beforeEach(() => {
    manifestHandlers = [];
    mockContainer = {
      onManifestChanged: (handler: any) => {
        manifestHandlers.push(handler);
        return { dispose: jest.fn() };
      },
      getPackageName: jest.fn(),
      getProjectRootpath: jest.fn().mockReturnValue({ fsPath: PROJECT_ROOT }),
    } as any;

    mockTelemetry = {
      sendTelemetryEvent: jest.fn(),
    } as any;

    provider = new MacroDefinitionProvider(mockContainer, mockTelemetry);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const ownProjectMacro = {
    path: "/workspace/project/macros/log_toto.sql",
    line: 0,
    character: 10,
    unique_id: "macro.jaffle_shop.log_toto",
    name: "log_toto",
    description: "",
    arguments: [],
    depends_on: { macros: [] },
  };

  const dbtUtilsMacro = {
    path: "/workspace/project/dbt_packages/dbt_utils/macros/pivot.sql",
    line: 3,
    character: 10,
    unique_id: "macro.dbt_utils.pivot",
    name: "pivot",
    description: "",
    arguments: [],
    depends_on: { macros: [] },
  };

  it("resolves an unprefixed macro call inside the current project (existing behavior)", async () => {
    const map: MacroMetaMap = new Map();
    // Current-project macros are keyed by bare name — see macroParser.ts.
    map.set("log_toto", ownProjectMacro as any);
    fireManifest(map);

    // packageName is undefined for files inside the current project (only
    // returns a string when the file lives under dbt_packages/).
    (mockContainer.getPackageName as jest.Mock).mockReturnValue(undefined);

    const document = createMockDocument("    {{ log_toto() }}", "log_toto");
    const result: any = await provider.provideDefinition(document, {
      line: 0,
      character: 10,
    } as any);

    expect(result).toBeDefined();
    expect(result.uri.fsPath).toBe(ownProjectMacro.path);
    expect(result.range.line).toBe(0);
    expect(mockTelemetry.sendTelemetryEvent).toHaveBeenCalledWith(
      "provideMacroDefinition",
    );
  });

  it("resolves <current_project>.<macro> self-prefixed calls (issue #1754)", async () => {
    const map: MacroMetaMap = new Map();
    map.set("log_toto", ownProjectMacro as any);
    fireManifest(map);

    (mockContainer.getPackageName as jest.Mock).mockReturnValue(undefined);

    const document = createMockDocument(
      "    {{ jaffle_shop.log_toto() }}",
      "jaffle_shop.log_toto",
    );
    const result: any = await provider.provideDefinition(document, {
      line: 0,
      character: 15,
    } as any);

    expect(result).toBeDefined();
    expect(result.uri.fsPath).toBe(ownProjectMacro.path);
    expect(mockTelemetry.sendTelemetryEvent).toHaveBeenCalledWith(
      "provideMacroDefinition",
    );
  });

  it("resolves cross-package <other_pkg>.<macro> calls", async () => {
    const map: MacroMetaMap = new Map();
    map.set("log_toto", ownProjectMacro as any);
    // Cross-package macros are keyed as `<pkg>.<name>` — see macroParser.ts.
    map.set("dbt_utils.pivot", dbtUtilsMacro as any);
    fireManifest(map);

    (mockContainer.getPackageName as jest.Mock).mockReturnValue(undefined);

    const document = createMockDocument(
      "    {{ dbt_utils.pivot() }}",
      "dbt_utils.pivot",
    );
    const result: any = await provider.provideDefinition(document, {
      line: 0,
      character: 10,
    } as any);

    expect(result).toBeDefined();
    expect(result.uri.fsPath).toBe(dbtUtilsMacro.path);
    expect(result.range.line).toBe(3);
  });

  it("returns undefined for unknown macros without touching telemetry", async () => {
    fireManifest(new Map());

    (mockContainer.getPackageName as jest.Mock).mockReturnValue(undefined);

    const document = createMockDocument(
      "    {{ unknown_macro() }}",
      "unknown_macro",
    );
    const result = await provider.provideDefinition(document, {
      line: 0,
      character: 10,
    } as any);

    expect(result).toBeUndefined();
    expect(mockTelemetry.sendTelemetryEvent).not.toHaveBeenCalled();
  });

  it("resolves unprefixed calls from inside an installed package (preserves existing behavior)", async () => {
    const map: MacroMetaMap = new Map();
    map.set("dbt_utils.pivot", dbtUtilsMacro as any);
    fireManifest(map);

    // Files inside dbt_packages/dbt_utils/... report packageName = "dbt_utils"
    (mockContainer.getPackageName as jest.Mock).mockReturnValue("dbt_utils");

    const document = createMockDocument("    {{ pivot() }}", "pivot");
    const result: any = await provider.provideDefinition(document, {
      line: 0,
      character: 9,
    } as any);

    expect(result).toBeDefined();
    expect(result.uri.fsPath).toBe(dbtUtilsMacro.path);
  });
});
