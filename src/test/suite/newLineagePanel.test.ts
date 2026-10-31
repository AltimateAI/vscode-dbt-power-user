import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import { commands, Uri, window, workspace } from "vscode";
import {
  NewLineagePanel,
  REPARSE_PROJECT_COMMAND,
} from "../../webview_provider/newLineagePanel";

describe("NewLineagePanel", () => {
  let panel: NewLineagePanel;
  let mockPostMessage: jest.Mock;

  beforeEach(() => {
    mockPostMessage = jest.fn();

    // Create a minimal instance by bypassing the constructor DI.
    // We only need the methods under test and the _panel webview stub.
    panel = Object.create(NewLineagePanel.prototype);

    // Stub the internal webview panel so postMessage is captured.
    (panel as any)._panel = {
      webview: { postMessage: mockPostMessage },
    };

    // Stub dependencies used by getStartingNode / renderStartingNode
    (panel as any).queryManifestService = {
      getEventByCurrentProject: jest.fn().mockReturnValue(undefined),
      getProject: jest.fn().mockReturnValue(undefined),
    };
    (panel as any).altimate = { enabled: jest.fn().mockReturnValue(false) };
    (panel as any).validationProvider = {
      isAuthenticated: jest.fn().mockReturnValue(false),
    };
    (panel as any).dbtTerminal = {
      info: jest.fn(),
      debug: jest.fn(),
      error: jest.fn(),
    };
  });

  describe("eventMapChanged", () => {
    it("should re-render the starting node when the event map updates", () => {
      const eventMap = new Map();

      panel.eventMapChanged(eventMap);

      // renderStartingNode posts a "render" command to the webview
      expect(mockPostMessage).toHaveBeenCalledWith(
        expect.objectContaining({ command: "render" }),
      );
    });

    it("should not throw when panel is not visible", () => {
      (panel as any)._panel = undefined;
      const eventMap = new Map();

      expect(() => panel.eventMapChanged(eventMap)).not.toThrow();
    });
  });

  describe("getLineageSettings — defaultExpansion cap", () => {
    it("should cap defaultExpansion at 5 when user sets a higher value", async () => {
      const mockConfig = {
        get: jest
          .fn<any>()
          .mockImplementation((key: string, defaultVal: unknown) => {
            if (key === "defaultExpansion") {
              return 10;
            }
            return defaultVal;
          }),
      };
      (workspace.getConfiguration as jest.Mock).mockReturnValue(mockConfig);

      // Call handleCommand with getLineageSettings
      await (panel as any).handleCommand({
        command: "getLineageSettings",
        args: {},
        syncRequestId: "test-sync-1",
      });

      expect(mockPostMessage).toHaveBeenCalledWith(
        expect.objectContaining({
          command: "response",
          args: expect.objectContaining({
            body: expect.objectContaining({
              defaultExpansion: 5,
            }),
          }),
        }),
      );
    });

    it("should pass through defaultExpansion when within limit", async () => {
      const mockConfig = {
        get: jest
          .fn<any>()
          .mockImplementation((key: string, defaultVal: unknown) => {
            if (key === "defaultExpansion") {
              return 3;
            }
            return defaultVal;
          }),
      };
      (workspace.getConfiguration as jest.Mock).mockReturnValue(mockConfig);

      await (panel as any).handleCommand({
        command: "getLineageSettings",
        args: {},
        syncRequestId: "test-sync-2",
      });

      expect(mockPostMessage).toHaveBeenCalledWith(
        expect.objectContaining({
          command: "response",
          args: expect.objectContaining({
            body: expect.objectContaining({
              defaultExpansion: 3,
            }),
          }),
        }),
      );
    });

    it("should use default value of 1 when setting is not configured", async () => {
      const mockConfig = {
        get: jest
          .fn<any>()
          .mockImplementation((_key: string, defaultVal: unknown) => {
            return defaultVal;
          }),
      };
      (workspace.getConfiguration as jest.Mock).mockReturnValue(mockConfig);

      await (panel as any).handleCommand({
        command: "getLineageSettings",
        args: {},
        syncRequestId: "test-sync-3",
      });

      expect(mockPostMessage).toHaveBeenCalledWith(
        expect.objectContaining({
          command: "response",
          args: expect.objectContaining({
            body: expect.objectContaining({
              defaultExpansion: 1,
            }),
          }),
        }),
      );
    });
  });

  describe("getStartingNode — telemetry noise on non-dbt files", () => {
    // Manifest is loaded (skips the "No event found" branch) but neither the
    // node map nor the function map contains the active file's name, so control
    // reaches the "No node found for <name>" dbtTerminal.info call.
    const eventWithNoMatch = {
      event: {
        nodeMetaMap: { lookupByBaseName: jest.fn().mockReturnValue(undefined) },
        functionMetaMap: { get: jest.fn().mockReturnValue(undefined) },
      },
    };

    const setActiveFile = (fileName: string) => {
      (window as any).activeTextEditor = {
        document: { fileName, uri: { path: fileName } },
      };
    };

    beforeEach(() => {
      (panel as any).queryManifestService.getEventByCurrentProject = jest
        .fn()
        .mockReturnValue(eventWithNoMatch);
      (panel as any).dbtLineageService = { createTable: jest.fn() };
    });

    it("does NOT send telemetry when the active file is a non-dbt file", () => {
      // A shell script can never be a dbt node — this event is pure noise and
      // accounts for the bulk of the in-the-wild Lineage:getStartingNode volume.
      setActiveFile("/ws/scripts/etc-backfill_6.sh");

      (panel as any).getStartingNode();

      // dbtTerminal.info(name, message, sendTelemetry): the 3rd arg must be false.
      expect((panel as any).dbtTerminal.info).toHaveBeenCalledWith(
        "Lineage:getStartingNode",
        expect.stringContaining("No node found"),
        false,
      );
    });

    it("still sends telemetry for a dbt file with no matching node", () => {
      // A .sql file with no node IS a legitimate diagnostic — keep telemetry.
      setActiveFile("/ws/models/orphan.sql");

      (panel as any).getStartingNode();

      expect((panel as any).dbtTerminal.info).toHaveBeenCalledWith(
        "Lineage:getStartingNode",
        expect.stringContaining("No node found"),
        true,
      );
    });
  });
});

describe("NewLineagePanel — source YAML rooting", () => {
  let panel: NewLineagePanel;

  // Build a fake TextEditor over a source YAML body.
  const makeEditor = (filePath: string, body: string, cursorLine = 0) => {
    const lines = body.split("\n");
    return {
      document: {
        fileName: filePath,
        uri: { fsPath: filePath, path: filePath },
        lineCount: lines.length,
        lineAt: (line: number) => ({ text: lines[line] ?? "" }),
        getText: () => body,
      },
      selection: { active: { line: cursorLine } },
    };
  };

  const sourceTable = (name: string, filePath: string) => ({
    name,
    identifier: name,
    path: filePath,
    description: "",
    columns: {},
  });

  const makeEvent = (sourceMetaMap: Map<string, any>) => ({
    event: {
      sourceMetaMap,
      nodeMetaMap: { lookupByBaseName: jest.fn().mockReturnValue(undefined) },
      functionMetaMap: new Map(),
    },
  });

  beforeEach(() => {
    panel = Object.create(NewLineagePanel.prototype);
    (panel as any)._panel = { webview: { postMessage: jest.fn() } };
    (panel as any).altimate = { enabled: jest.fn().mockReturnValue(false) };
    (panel as any).validationProvider = {
      isAuthenticated: jest.fn().mockReturnValue(false),
    };
    (panel as any).dbtTerminal = {
      info: jest.fn(),
      debug: jest.fn(),
      error: jest.fn(),
    };
    (panel as any).dbtLineageService = {
      createTable: jest.fn((_e: unknown, _u: unknown, key: string) => ({
        table: key,
      })),
    };
    (window as any).activeTextEditor = undefined;
  });

  afterEach(() => {
    (window as any).activeTextEditor = undefined;
  });

  it("builds the source.<pkg>.<source>.<table> key for tables in a file", () => {
    const filePath = "/proj/models/sources/identifies.yml";
    const sourceMetaMap = new Map([
      [
        "segment_website_production",
        {
          package_name: "proj",
          name: "segment_website_production",
          tables: [sourceTable("identifies", filePath)],
        },
      ],
    ]);
    const matches = (panel as any).getSourceTablesForFile(
      sourceMetaMap,
      filePath,
    );
    expect(matches).toHaveLength(1);
    expect(matches[0].key).toBe(
      "source.proj.segment_website_production.identifies",
    );
  });

  it("roots automatically at the only source table in the file", () => {
    const filePath = "/proj/models/sources/identifies.yml";
    const sourceMetaMap = new Map([
      [
        "segment_website_production",
        {
          package_name: "proj",
          name: "segment_website_production",
          tables: [sourceTable("identifies", filePath)],
        },
      ],
    ]);
    (panel as any).queryManifestService = {
      getEventByCurrentProject: jest
        .fn()
        .mockReturnValue(makeEvent(sourceMetaMap)),
      getProject: jest.fn().mockReturnValue(undefined),
    };
    (window as any).activeTextEditor = makeEditor(
      filePath,
      "sources:\n  - name: segment_website_production\n    tables:\n      - name: identifies\n",
    );

    const result = (panel as any).getStartingNode();

    expect(result.node).toEqual({
      table: "source.proj.segment_website_production.identifies",
    });
    expect((panel as any).dbtLineageService.createTable).toHaveBeenCalledWith(
      expect.anything(),
      filePath,
      "source.proj.segment_website_production.identifies",
    );
  });

  it("roots the same way for a .yaml file (not just .yml)", () => {
    const filePath = "/proj/models/sources/identifies.yaml";
    const sourceMetaMap = new Map([
      [
        "segment_website_production",
        {
          package_name: "proj",
          name: "segment_website_production",
          tables: [sourceTable("identifies", filePath)],
        },
      ],
    ]);
    (panel as any).queryManifestService = {
      getEventByCurrentProject: jest
        .fn()
        .mockReturnValue(makeEvent(sourceMetaMap)),
      getProject: jest.fn().mockReturnValue(undefined),
    };
    (window as any).activeTextEditor = makeEditor(
      filePath,
      "sources:\n  - name: segment_website_production\n    tables:\n      - name: identifies\n",
    );

    const result = (panel as any).getStartingNode();

    expect(result.node).toEqual({
      table: "source.proj.segment_website_production.identifies",
    });
    expect((panel as any).dbtLineageService.createTable).toHaveBeenCalledWith(
      expect.anything(),
      filePath,
      "source.proj.segment_website_production.identifies",
    );
  });

  it("picks the source table the cursor sits within when the file has many", () => {
    const filePath = "/proj/models/sources/multi.yml";
    const body = [
      "sources:",
      "  - name: seg",
      "    tables:",
      "      - name: identifies", // line 3
      "      - name: tracks", //      line 4
      "      - name: pages", //       line 5
    ].join("\n");
    const sourceMetaMap = new Map([
      [
        "seg",
        {
          package_name: "proj",
          name: "seg",
          tables: [
            sourceTable("identifies", filePath),
            sourceTable("tracks", filePath),
            sourceTable("pages", filePath),
          ],
        },
      ],
    ]);
    (panel as any).queryManifestService = {
      getEventByCurrentProject: jest
        .fn()
        .mockReturnValue(makeEvent(sourceMetaMap)),
      getProject: jest.fn().mockReturnValue(undefined),
    };
    // Cursor on line 4 → the "tracks" table.
    (window as any).activeTextEditor = makeEditor(filePath, body, 4);

    const result = (panel as any).getStartingNode();

    expect(result.node).toEqual({ table: "source.proj.seg.tracks" });
  });

  it("falls back to the first table when the cursor is above every declaration", () => {
    const filePath = "/proj/models/sources/multi.yml";
    const body = [
      "sources:",
      "  - name: seg",
      "    tables:",
      "      - name: identifies",
      "      - name: tracks",
    ].join("\n");
    const sourceMetaMap = new Map([
      [
        "seg",
        {
          package_name: "proj",
          name: "seg",
          tables: [
            sourceTable("identifies", filePath),
            sourceTable("tracks", filePath),
          ],
        },
      ],
    ]);
    (panel as any).queryManifestService = {
      getEventByCurrentProject: jest
        .fn()
        .mockReturnValue(makeEvent(sourceMetaMap)),
      getProject: jest.fn().mockReturnValue(undefined),
    };
    // Cursor on line 0 (the `sources:` line), above any table name.
    (window as any).activeTextEditor = makeEditor(filePath, body, 0);

    const result = (panel as any).getStartingNode();

    expect(result.node).toEqual({ table: "source.proj.seg.identifies" });
  });

  it("does not mistake a source-level name for a table declaration", () => {
    const filePath = "/proj/models/sources/pages.yml";
    // The SOURCE is named "pages" and one of its TABLES is also named
    // "pages". With a plain line regex the source-level `- name: pages`
    // (line 1) would anchor the table, so a cursor on the `tables:` line
    // (line 2) would wrongly pick "pages"; the AST walk only sees table
    // declarations, so nothing is at-or-above the cursor and the panel
    // falls back to the file's first table.
    const body = [
      "sources:",
      "  - name: pages",
      "    tables:",
      "      - name: identifies",
      "      - name: pages",
    ].join("\n");
    const sourceMetaMap = new Map([
      [
        "pages",
        {
          package_name: "proj",
          name: "pages",
          tables: [
            sourceTable("identifies", filePath),
            sourceTable("pages", filePath),
          ],
        },
      ],
    ]);
    (panel as any).queryManifestService = {
      getEventByCurrentProject: jest
        .fn()
        .mockReturnValue(makeEvent(sourceMetaMap)),
      getProject: jest.fn().mockReturnValue(undefined),
    };
    (window as any).activeTextEditor = makeEditor(filePath, body, 2);

    const result = (panel as any).getStartingNode();

    expect(result.node).toEqual({ table: "source.proj.pages.identifies" });
  });

  it("disambiguates the same table name declared under two sources in one file", () => {
    const filePath = "/proj/models/sources/events.yml";
    const body = [
      "sources:",
      "  - name: seg",
      "    tables:",
      "      - name: events", // line 3
      "  - name: ga",
      "    tables:",
      "      - name: events", // line 6
    ].join("\n");
    const sourceMetaMap = new Map([
      [
        "seg",
        {
          package_name: "proj",
          name: "seg",
          tables: [sourceTable("events", filePath)],
        },
      ],
      [
        "ga",
        {
          package_name: "proj",
          name: "ga",
          tables: [sourceTable("events", filePath)],
        },
      ],
    ]);
    (panel as any).queryManifestService = {
      getEventByCurrentProject: jest
        .fn()
        .mockReturnValue(makeEvent(sourceMetaMap)),
      getProject: jest.fn().mockReturnValue(undefined),
    };
    // Cursor on line 6 → ga's "events", not seg's (a name-only lookup
    // would find seg's declaration line for both candidates).
    (window as any).activeTextEditor = makeEditor(filePath, body, 6);

    const result = (panel as any).getStartingNode();

    expect(result.node).toEqual({ table: "source.proj.ga.events" });
  });

  it("records lastRenderedSourceKey even when createTable returns undefined", () => {
    const filePath = "/proj/models/sources/identifies.yml";
    const sourceMetaMap = new Map([
      [
        "seg",
        {
          package_name: "proj",
          name: "seg",
          tables: [sourceTable("identifies", filePath)],
        },
      ],
    ]);
    (panel as any).queryManifestService = {
      getEventByCurrentProject: jest
        .fn()
        .mockReturnValue(makeEvent(sourceMetaMap)),
      getProject: jest.fn().mockReturnValue(undefined),
    };
    (panel as any).dbtLineageService = {
      createTable: jest.fn().mockReturnValue(undefined),
    };
    (window as any).activeTextEditor = makeEditor(
      filePath,
      "sources:\n  - name: seg\n    tables:\n      - name: identifies\n",
    );

    (panel as any).getStartingNode();

    // The selection guard compares against this key; leaving it undefined on
    // a failed createTable would re-trigger a full render on every cursor
    // move until the service call succeeds.
    expect((panel as any).lastRenderedSourceKey).toBe(
      "source.proj.seg.identifies",
    );
  });

  it("resolves the source only once per cursor-move render", () => {
    const filePath = "/proj/models/sources/identifies.yml";
    const sourceMetaMap = new Map([
      [
        "seg",
        {
          package_name: "proj",
          name: "seg",
          tables: [sourceTable("identifies", filePath)],
        },
      ],
    ]);
    (panel as any).queryManifestService = {
      getEventByCurrentProject: jest
        .fn()
        .mockReturnValue(makeEvent(sourceMetaMap)),
      getProject: jest.fn().mockReturnValue(undefined),
    };
    const editor = makeEditor(
      filePath,
      "sources:\n  - name: seg\n    tables:\n      - name: identifies\n",
      3,
    );
    (window as any).activeTextEditor = editor;
    const resolveSpy = jest.spyOn(
      panel as any,
      "resolveSourceStartingNode" as any,
    );

    (panel as any).changedTextEditorSelection(editor);

    // The guard's resolution is threaded into the render path; without the
    // threading this is 2 (guard + getStartingNode), iterating
    // sourceMetaMap twice per cursor move.
    expect(resolveSpy).toHaveBeenCalledTimes(1);
    expect((panel as any)._panel.webview.postMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        command: "render",
        args: expect.objectContaining({
          node: { table: "source.proj.seg.identifies" },
        }),
      }),
    );
  });

  it("shows the missing-lineage message for a YAML that defines no source in this file", () => {
    const filePath = "/proj/models/staging/schema.yml";
    // The only source lives in a different file.
    const sourceMetaMap = new Map([
      [
        "seg",
        {
          package_name: "proj",
          name: "seg",
          tables: [sourceTable("identifies", "/proj/models/sources/other.yml")],
        },
      ],
    ]);
    (panel as any).queryManifestService = {
      getEventByCurrentProject: jest
        .fn()
        .mockReturnValue(makeEvent(sourceMetaMap)),
      getProject: jest.fn().mockReturnValue(undefined),
    };
    (window as any).activeTextEditor = makeEditor(
      filePath,
      "models:\n  - name: stg_orders\n",
    );

    const result = (panel as any).getStartingNode();

    expect(result.node).toBeUndefined();
    expect(result.missingLineageMessage).toEqual(
      expect.objectContaining({ type: "warning" }),
    );
    expect((panel as any).dbtLineageService.createTable).not.toHaveBeenCalled();
  });
});

describe("NewLineagePanel — lineage telemetry", () => {
  let panel: NewLineagePanel;
  let blocking: { message: string; category: string } | undefined;
  let event: any;
  let sendTelemetryEvent: jest.Mock;
  let sendTelemetryError: jest.Mock;

  const DBT_NOT_FOUND =
    "dbt configuration is invalid : dbt not found. Please install dbt to use this extension.";
  const MISSING_REF =
    "There is a problem in your dbt project. Compilation failed: Compilation Error Model 'orders' depends on a node named 'stg_orderz' which was not found";

  // A loaded project whose node map has the open model and `size` nodes.
  const loadedEvent = (size: number) => ({
    event: {
      nodeMetaMap: {
        lookupByBaseName: jest
          .fn()
          .mockReturnValue({ unique_id: "model.p.orders" }),
        nodes: () =>
          Array.from({ length: size }, (_, i) => ({
            unique_id: `model.p.m${i}`,
          })),
      },
      functionMetaMap: new Map(),
    },
  });

  const rendered = () =>
    sendTelemetryEvent.mock.calls.filter(
      (call) => call[0] === "lineageRendered",
    );
  const lineageErrors = () =>
    sendTelemetryError.mock.calls.filter(
      (call) => call[0] === "Lineage:getMissingLineageMessage",
    );

  beforeEach(() => {
    blocking = undefined;
    event = undefined;
    sendTelemetryEvent = jest.fn();
    sendTelemetryError = jest.fn();
    panel = Object.create(NewLineagePanel.prototype);
    // The constructor's field initializers, which Object.create skips.
    Object.assign(panel as any, {
      reportedErrorKinds: new Set<string>(),
      firstErrorAt: undefined,
      renderReported: false,
    });
    // A retained webview that isn't visible: the panel still renders into it.
    (panel as any)._panel = {
      visible: false,
      webview: { postMessage: jest.fn() },
    };
    (panel as any).telemetry = { sendTelemetryEvent, sendTelemetryError };
    (panel as any).queryManifestService = {
      getEventByCurrentProject: jest.fn(() => event),
      getProject: jest.fn(() => ({
        projectRoot: { fsPath: "/ws" },
        getBlockingDiagnostic: () => blocking,
        // No manifest file on disk in these tests.
        getManifestPath: () => "/ws/target/manifest.json",
      })),
    };
    (panel as any).altimate = { enabled: jest.fn().mockReturnValue(false) };
    (panel as any).validationProvider = {
      isAuthenticated: jest.fn().mockReturnValue(false),
    };
    (panel as any).dbtTerminal = {
      info: jest.fn(),
      debug: jest.fn(),
      error: jest.fn(),
    };
    (panel as any).dbtLineageService = {
      createTable: jest.fn(() => ({ table: "model.p.orders" })),
    };
    (window as any).activeTextEditor = {
      document: {
        fileName: "/ws/models/orders.sql",
        uri: { path: "/ws/models/orders.sql" },
      },
    };
  });

  afterEach(() => {
    (window as any).activeTextEditor = undefined;
  });

  it("sends one error event for an error the panel re-renders many times", () => {
    blocking = { message: DBT_NOT_FOUND, category: "project-config" };
    for (let i = 0; i < 5; i++) {
      panel.eventMapChanged(new Map());
    }

    expect(lineageErrors()).toHaveLength(1);
    expect(lineageErrors()[0][2]).toEqual({
      message: DBT_NOT_FOUND,
      errorKind: "dbt_not_found",
      diagnosticCategory: "project-config",
    });
    // The output channel still logs every render, without telemetry.
    expect((panel as any).dbtTerminal.error).toHaveBeenCalledTimes(5);
    for (const call of (panel as any).dbtTerminal.error.mock.calls) {
      expect(call[3]).toBe(false);
    }
  });

  it("sends one error event per error kind", () => {
    blocking = { message: DBT_NOT_FOUND, category: "project-config" };
    panel.eventMapChanged(new Map());
    blocking = { message: MISSING_REF, category: "manifest-rebuild" };
    panel.eventMapChanged(new Map());
    panel.eventMapChanged(new Map());

    expect(lineageErrors().map((call) => (call[2] as any).errorKind)).toEqual([
      "dbt_not_found",
      "missing_reference",
    ]);
  });

  it("sends exactly one lineageRendered for a session's graphs, rendered while hidden", () => {
    event = loadedEvent(150);
    for (let i = 0; i < 3; i++) {
      panel.eventMapChanged(new Map());
    }

    expect(rendered()).toHaveLength(1);
    expect(rendered()[0][1]).toEqual({
      nodeCountBucket: "100-499",
      staleManifest: "false",
      manifestAgeBucket: "none",
      errorKindsBefore: "none",
    });
    expect(rendered()[0][2]).toBeUndefined();
    expect(lineageErrors()).toHaveLength(0);
  });

  it("records a startup failure the session recovered from", () => {
    // The project failed its first check: no manifest, an error in the panel.
    blocking = { message: DBT_NOT_FOUND, category: "project-config" };
    panel.eventMapChanged(new Map());
    expect(rendered()).toHaveLength(0);

    // The user fixed it; the project parsed and the graph rendered.
    blocking = undefined;
    event = loadedEvent(12);
    panel.eventMapChanged(new Map());

    expect(rendered()).toHaveLength(1);
    expect(rendered()[0][1]).toEqual({
      nodeCountBucket: "1-99",
      staleManifest: "false",
      manifestAgeBucket: "none",
      errorKindsBefore: "dbt_not_found",
    });
    expect((rendered()[0][2] as any).msSinceFirstError).toBeGreaterThanOrEqual(
      0,
    );
  });

  it("lists the error kinds seen before the graph in sorted order", () => {
    blocking = {
      message:
        "dbt configuration is invalid : Runtime Error Could not find profile named 'analytics'",
      category: "project-config",
    };
    panel.eventMapChanged(new Map());
    blocking = { message: DBT_NOT_FOUND, category: "project-config" };
    panel.eventMapChanged(new Map());
    blocking = undefined;
    event = loadedEvent(12);
    panel.eventMapChanged(new Map());

    expect((rendered()[0][1] as any).errorKindsBefore).toBe(
      "dbt_not_found,profile",
    );
  });

  it("marks a graph drawn while an error still stands as stale", () => {
    blocking = { message: MISSING_REF, category: "manifest-rebuild" };
    event = loadedEvent(3);
    panel.eventMapChanged(new Map());

    expect(rendered()).toHaveLength(1);
    expect((rendered()[0][1] as any).staleManifest).toBe("true");
    // There is no manifest file to date it by.
    expect((rendered()[0][1] as any).manifestAgeBucket).toBe("unknown");
  });

  it("buckets the age of a stale manifest read from disk", () => {
    blocking = { message: MISSING_REF, category: "manifest-rebuild" };
    event = loadedEvent(3);
    event.event.staleManifest = {
      manifestPath: "/ws/target/manifest.json",
      writtenAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
    };
    panel.eventMapChanged(new Map());

    expect((rendered()[0][1] as any).manifestAgeBucket).toBe("1d-7d");
  });

  it("sends no lineageRendered when the panel has no graph to draw", () => {
    panel.eventMapChanged(new Map());

    expect(rendered()).toHaveLength(0);
  });

  it("reports a non-Error thrown while reading the diagnostics", () => {
    (panel as any).queryManifestService.getProject = jest.fn(() => ({
      getBlockingDiagnostic: () => {
        // The value under test is a thrown non-Error.
        // eslint-disable-next-line no-throw-literal
        throw "diagnostics unavailable";
      },
    }));

    expect(() => panel.eventMapChanged(new Map())).not.toThrow();
    expect(lineageErrors()[0][2]).toEqual({
      message: "diagnostics unavailable",
      errorKind: "other",
      diagnosticCategory: "unknown",
    });
  });

  it("still renders when reporting the graph fails", () => {
    event = loadedEvent(1);
    const nodes = jest.fn(() => {
      throw new Error("boom");
    });
    event.event.nodeMetaMap.nodes = nodes;

    expect(() => panel.eventMapChanged(new Map())).not.toThrow();
    expect((panel as any)._panel.webview.postMessage).toHaveBeenCalledWith(
      expect.objectContaining({ command: "render" }),
    );
    // The report ran and its failure went to the debug log.
    expect(nodes).toHaveBeenCalled();
    expect((panel as any).dbtTerminal.debug).toHaveBeenCalledWith(
      "Lineage:reportLineageRendered",
      "Could not report the rendered graph",
      expect.any(Error),
    );
    expect(rendered()).toHaveLength(0);
  });
});

describe("NewLineagePanel — stale-graph banner", () => {
  let panel: NewLineagePanel;
  let blocking: { message: string; category: string } | undefined;
  let event: any;
  let postMessage: jest.Mock;

  const MISSING_REF =
    "There is a problem in your dbt project. Compilation failed: Compilation Error in model orders (models/marts/orders.sql)\n  Model 'model.jaffle_shop.orders' (models/marts/orders.sql) depends on a node named 'stg_orderz' which was not found";

  const graphEvent = () => ({
    event: {
      nodeMetaMap: {
        lookupByBaseName: jest
          .fn()
          .mockReturnValue({ unique_id: "model.p.orders" }),
        nodes: () => [],
      },
      functionMetaMap: new Map(),
    },
  });

  const posted = (command: string) =>
    postMessage.mock.calls
      .map((call) => call[0] as { command: string; args: any })
      .filter((message) => message.command === command);

  beforeEach(() => {
    blocking = undefined;
    event = undefined;
    postMessage = jest.fn();
    panel = Object.create(NewLineagePanel.prototype);
    Object.assign(panel as any, {
      reportedErrorKinds: new Set<string>(),
      renderReported: false,
      graphDrawn: false,
      postedBanner: undefined,
      reparseAvailable: false,
    });
    (panel as any)._panel = { visible: true, webview: { postMessage } };
    (panel as any).telemetry = {
      sendTelemetryEvent: jest.fn(),
      sendTelemetryError: jest.fn(),
    };
    (panel as any).queryManifestService = {
      getEventByCurrentProject: jest.fn(() => event),
      getProject: jest.fn(() => ({
        projectRoot: { fsPath: "/ws" },
        getBlockingDiagnostic: () => blocking,
        getManifestPath: () => "/ws/target/manifest.json",
      })),
    };
    (panel as any).validationProvider = {
      isAuthenticated: jest.fn().mockReturnValue(false),
    };
    (panel as any).dbtTerminal = {
      info: jest.fn(),
      debug: jest.fn(),
      error: jest.fn(),
    };
    (panel as any).dbtLineageService = {
      createTable: jest.fn(() => ({ table: "model.p.orders" })),
    };
    (window as any).activeTextEditor = {
      document: {
        fileName: "/ws/models/orders.sql",
        uri: { path: "/ws/models/orders.sql" },
      },
    };
  });

  afterEach(() => {
    (window as any).activeTextEditor = undefined;
  });

  it("renders a graph drawn under a standing error with the banner", () => {
    blocking = { message: MISSING_REF, category: "manifest-rebuild" };
    event = graphEvent();
    panel.eventMapChanged(new Map());

    const [render] = posted("render");
    expect(render.args.node).toBeDefined();
    expect(render.args.lineageBanner).toMatchObject({
      id: "stale-graph-midsession",
      title: "This graph is from the last successful parse.",
    });
  });

  it("marks a manifest read from disk at startup with its file", () => {
    blocking = {
      message:
        "dbt configuration is invalid : Runtime Error\n  Could not find profile named 'jaffle_shop'",
      category: "project-config",
    };
    event = graphEvent();
    event.event.staleManifest = {
      manifestPath: "/ws/target/manifest.json",
      writtenAt: Date.now() - 5 * 60 * 1000,
    };
    panel.eventMapChanged(new Map());

    expect(posted("render")[0].args.lineageBanner).toMatchObject({
      id: "stale-graph-startup",
      title: "This graph is from target/manifest.json, written 5 minutes ago.",
    });
  });

  it("renders a fresh graph without the banner", () => {
    event = graphEvent();
    panel.eventMapChanged(new Map());

    expect(posted("render")[0].args.lineageBanner).toBeUndefined();
  });

  it("updates only the banner when the diagnostics change, and only when it changes", () => {
    event = graphEvent();
    panel.eventMapChanged(new Map());

    // A mid-session break: the banner appears over the drawn graph.
    blocking = { message: MISSING_REF, category: "manifest-rebuild" };
    panel.changedDiagnostics();
    panel.changedDiagnostics();
    expect(posted("lineageBanner")).toHaveLength(1);
    expect(posted("lineageBanner")[0].args.banner.id).toBe(
      "stale-graph-midsession",
    );

    // The fix: the banner clears.
    blocking = undefined;
    panel.changedDiagnostics();
    expect(posted("lineageBanner")).toHaveLength(2);
    expect(posted("lineageBanner")[1].args.banner).toBeUndefined();
    // The graph was never re-rendered for it.
    expect(posted("render")).toHaveLength(1);
  });

  it("sends no banner while no graph is drawn", () => {
    blocking = { message: MISSING_REF, category: "manifest-rebuild" };
    panel.eventMapChanged(new Map());
    panel.changedDiagnostics();

    expect(posted("render")[0].args.lineageBanner).toBeUndefined();
    expect(posted("lineageBanner")).toHaveLength(0);
  });

  it("offers Try again once the re-parse command is registered", async () => {
    blocking = { message: MISSING_REF, category: "manifest-rebuild" };
    event = graphEvent();
    panel.eventMapChanged(new Map());
    const ids = (banner: any) => banner.actions.map((action: any) => action.id);
    expect(ids(posted("render")[0].args.lineageBanner)).toEqual([
      "openFile",
      "showProblems",
    ]);

    (commands.getCommands as jest.Mock).mockReturnValueOnce(
      Promise.resolve(["other.command", REPARSE_PROJECT_COMMAND]),
    );
    (panel as any).checkReparseAvailable();
    await new Promise((resolve) => setImmediate(resolve));

    expect(ids(posted("lineageBanner")[0].args.banner)).toEqual([
      "openFile",
      "showProblems",
      "tryAgain",
    ]);
  });

  it("runs the banner's buttons", async () => {
    const showTextDocument = jest.fn();
    (window as any).showTextDocument = showTextDocument;
    (Uri as any).joinPath = jest.fn((base: any, rel: string) => ({
      fsPath: `${base.fsPath}/${rel}`,
    }));
    const executeCommand = commands.executeCommand as jest.Mock;
    executeCommand.mockClear();

    await panel.handleCommand({
      command: "lineageBannerAction",
      args: {
        action: "openFile",
        params: { path: "models/marts/orders.sql", line: 14 },
      },
    });
    await panel.handleCommand({
      command: "lineageBannerAction",
      args: { action: "showProblems" },
    });
    await panel.handleCommand({
      command: "lineageBannerAction",
      args: { action: "tryAgain" },
    });

    expect(showTextDocument).toHaveBeenCalledWith(
      { fsPath: "/ws/models/marts/orders.sql" },
      expect.objectContaining({ selection: expect.anything() }),
    );
    expect(executeCommand.mock.calls).toEqual([
      ["workbench.action.problems.focus"],
      // The project the graph belongs to, not whichever one is active.
      [REPARSE_PROJECT_COMMAND, { fsPath: "/ws" }],
    ]);
    delete (window as any).showTextDocument;
    delete (Uri as any).joinPath;
  });
});
