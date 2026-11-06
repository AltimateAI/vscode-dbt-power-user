import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import { commands, env, Uri, window, workspace } from "vscode";
import {
  NewLineagePanel,
  REPARSE_PROJECT_COMMAND,
} from "../../webview_provider/newLineagePanel";

// A POSIX test path as the platform writes it ("\\ws\\..." on Windows).
const native = (posixPath: string) => path.join(posixPath);

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
    expect(result.missingLineageMessage?.message).toContain("A valid dbt file");
    expect(result.lineageCard).toBeUndefined();
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
      reportedCardKinds: new Set<string>(),
      setupToastShown: false,
      dbtProjectContainer: { getProjects: () => [] },
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
      reportedCardKinds: new Set<string>(),
      setupToastShown: false,
      dbtProjectContainer: { getProjects: () => [] },
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
        getProjectName: () => "jaffle_shop",
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
    clearTimeout((panel as any).diagnosticsTimer);
    clearInterval((panel as any).ageTimer);
    jest.useRealTimers();
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
    jest.useFakeTimers();
    event = graphEvent();
    panel.eventMapChanged(new Map());

    // A mid-session break: the banner appears over the drawn graph.
    blocking = { message: MISSING_REF, category: "manifest-rebuild" };
    panel.changedDiagnostics();
    jest.advanceTimersByTime(250);
    panel.changedDiagnostics();
    jest.advanceTimersByTime(250);
    expect(posted("lineageBanner")).toHaveLength(1);
    expect(posted("lineageBanner")[0].args.banner.id).toBe(
      "stale-graph-midsession",
    );

    // The fix: the banner clears.
    blocking = undefined;
    panel.changedDiagnostics();
    jest.advanceTimersByTime(250);
    expect(posted("lineageBanner")).toHaveLength(2);
    expect(posted("lineageBanner")[1].args.banner).toBeUndefined();
    // The graph was never re-rendered for it.
    expect(posted("render")).toHaveLength(1);
  });

  it("shows no banner when the diagnostic lookup fails, and still renders the graph", () => {
    const failure = new Error("diagnostics unavailable");
    (panel as any).queryManifestService.getProject = jest.fn(() => ({
      projectRoot: { fsPath: "/ws" },
      getBlockingDiagnostic: () => {
        throw failure;
      },
      getManifestPath: () => "/ws/target/manifest.json",
    }));
    jest.useFakeTimers();
    event = graphEvent();
    panel.eventMapChanged(new Map());
    panel.changedDiagnostics();
    jest.advanceTimersByTime(250);

    const [render] = posted("render");
    expect(render.args.node).toBeDefined();
    expect(render.args.lineageBanner).toBeUndefined();
    expect(posted("lineageBanner")).toHaveLength(0);
    expect((panel as any).dbtTerminal.debug).toHaveBeenCalledWith(
      "Lineage:getStaleGraphBanner",
      "Could not build the stale-graph banner",
      failure,
    );
  });

  it("sends no banner while no graph is drawn", () => {
    blocking = { message: MISSING_REF, category: "manifest-rebuild" };
    panel.eventMapChanged(new Map());
    panel.changedDiagnostics();

    expect(posted("render")[0].args.lineageBanner).toBeUndefined();
    expect(posted("lineageBanner")).toHaveLength(0);
  });

  it("skips diagnostics changes on files outside the drawn project", () => {
    jest.useFakeTimers();
    event = graphEvent();
    panel.eventMapChanged(new Map());
    blocking = { message: MISSING_REF, category: "manifest-rebuild" };
    const build = jest.spyOn(panel as any, "getStaleGraphBanner");

    panel.changedDiagnostics([
      Uri.file("/other/app.ts"),
      Uri.file("/ws-sibling/x.sql"),
    ]);
    jest.advanceTimersByTime(1000);
    expect(build).not.toHaveBeenCalled();
    expect(posted("lineageBanner")).toHaveLength(0);

    panel.changedDiagnostics([Uri.file("/ws/dbt_project.yml")]);
    jest.advanceTimersByTime(250);
    expect(build).toHaveBeenCalledTimes(1);
    expect(posted("lineageBanner")).toHaveLength(1);
  });

  it("builds the banner once for a burst of diagnostics changes", () => {
    jest.useFakeTimers();
    event = graphEvent();
    panel.eventMapChanged(new Map());
    blocking = { message: MISSING_REF, category: "manifest-rebuild" };
    const build = jest.spyOn(panel as any, "getStaleGraphBanner");

    for (let i = 0; i < 5; i++) {
      panel.changedDiagnostics([Uri.file("/ws/models/orders.sql")]);
      jest.advanceTimersByTime(100);
    }
    expect(build).not.toHaveBeenCalled();
    jest.advanceTimersByTime(150);
    expect(build).toHaveBeenCalledTimes(1);
    expect(posted("lineageBanner")).toHaveLength(1);
  });

  it("keeps the banner's age current while it shows, and stops when it clears", () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2026, 10, 5, 12, 0, 0));
    blocking = { message: MISSING_REF, category: "manifest-rebuild" };
    event = graphEvent();
    event.event.staleManifest = {
      manifestPath: "/ws/target/manifest.json",
      writtenAt: Date.now() - 30 * 1000,
    };
    panel.eventMapChanged(new Map());
    expect(posted("render")[0].args.lineageBanner.age).toBe(
      "manifest written less than a minute ago",
    );

    jest.advanceTimersByTime(60 * 1000);
    expect(posted("lineageBanner").map((m) => m.args.banner.age)).toEqual([
      "manifest written 1 minute ago",
    ]);
    // The same text a minute later in the hour isn't posted again.
    jest.advanceTimersByTime(60 * 1000);
    expect(posted("lineageBanner")).toHaveLength(2);

    blocking = undefined;
    jest.advanceTimersByTime(60 * 1000);
    expect(posted("lineageBanner")[2].args.banner).toBeUndefined();
    expect((panel as any).ageTimer).toBeUndefined();
    jest.advanceTimersByTime(10 * 60 * 1000);
    expect(posted("lineageBanner")).toHaveLength(3);
  });

  it("keeps following the drawn graph's project after the last editor closes", () => {
    jest.useFakeTimers();
    blocking = { message: MISSING_REF, category: "manifest-rebuild" };
    event = graphEvent();
    event.event.staleManifest = {
      manifestPath: "/ws/target/manifest.json",
      writtenAt: Date.now() - 2 * 60 * 60 * 1000,
    };
    panel.eventMapChanged(new Map());
    expect(posted("render")[0].args.lineageBanner.id).toBe(
      "stale-graph-startup",
    );

    // No editor: the active-editor lookups find no project or event.
    const service = (panel as any).queryManifestService;
    service.getProject = jest.fn(() => undefined);
    service.getEventByCurrentProject = jest.fn(() => undefined);

    // The minute refresh keeps the same notice up.
    jest.advanceTimersByTime(60 * 1000);
    expect(posted("lineageBanner")).toHaveLength(0);

    // The error is fixed outside an editor: the notice still clears.
    blocking = undefined;
    panel.changedDiagnostics([Uri.file("/ws/dbt_project.yml")]);
    jest.advanceTimersByTime(250);
    expect(posted("lineageBanner")).toHaveLength(1);
    expect(posted("lineageBanner")[0].args.banner).toBeUndefined();
  });

  it("stops the banner's timers and posts nothing once the view is disposed", () => {
    jest.useFakeTimers();
    (panel as any)._disposables = [];
    const base = Object.getPrototypeOf(NewLineagePanel.prototype);
    const resolve = jest
      .spyOn(base, "resolveWebviewView")
      .mockImplementation(() => undefined);
    let disposeView: () => void = () => {};
    panel.resolveWebviewView(
      {
        onDidDispose: (listener: () => void) => {
          disposeView = listener;
          return { dispose: () => {} };
        },
      } as any,
      {} as any,
      {} as any,
    );

    blocking = { message: MISSING_REF, category: "manifest-rebuild" };
    event = graphEvent();
    event.event.staleManifest = {
      manifestPath: "/ws/target/manifest.json",
      writtenAt: Date.now() - 30 * 1000,
    };
    panel.eventMapChanged(new Map());
    expect((panel as any).ageTimer).toBeDefined();

    disposeView();
    expect((panel as any).ageTimer).toBeUndefined();
    panel.changedDiagnostics([Uri.file("/ws/dbt_project.yml")]);
    jest.advanceTimersByTime(10 * 60 * 1000);
    expect(posted("lineageBanner")).toHaveLength(0);
    resolve.mockRestore();
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
    (panel as any).fileExists = (filePath: string) =>
      filePath === native("/ws/models/marts/orders.sql");
    (panel as any).listPackages = () => [];
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
      { fsPath: native("/ws/models/marts/orders.sql") },
      expect.objectContaining({ selection: expect.anything() }),
    );
    expect(executeCommand.mock.calls).toEqual([
      ["workbench.action.problems.focus"],
      // The project the graph belongs to, not whichever one is active.
      [REPARSE_PROJECT_COMMAND, { fsPath: "/ws" }],
    ]);
    delete (window as any).showTextDocument;
  });

  it("opens a file from the package dbt names, and says so when it can't place one", async () => {
    const showTextDocument = jest.fn();
    const showErrorMessage = jest.fn();
    (window as any).showTextDocument = showTextDocument;
    (window as any).showErrorMessage = showErrorMessage;
    // Both the root project and the package have models/x.sql.
    (panel as any).fileExists = (filePath: string) =>
      [
        native("/ws/models/x.sql"),
        native("/ws/dbt_packages/dbt_utils/models/x.sql"),
      ].includes(filePath);
    (panel as any).listPackages = () => [
      { dir: "/ws/dbt_packages/dbt_utils", name: "dbt_utils" },
      { dir: "/ws/dbt_packages/audit_helper", name: "audit_helper" },
    ];

    await panel.handleCommand({
      command: "lineageBannerAction",
      args: {
        action: "openFile",
        params: { path: "models/x.sql", package: "dbt_utils" },
      },
    });
    expect(showTextDocument).toHaveBeenCalledWith(
      { fsPath: native("/ws/dbt_packages/dbt_utils/models/x.sql") },
      expect.anything(),
    );

    await panel.handleCommand({
      command: "lineageBannerAction",
      args: {
        action: "openFile",
        params: { path: "models/y.sql", package: "audit_helper" },
      },
    });
    expect(showTextDocument).toHaveBeenCalledTimes(1);
    expect(showErrorMessage).toHaveBeenCalledWith(
      expect.stringContaining(
        "models/y.sql wasn't found in the package audit_helper",
      ),
    );
    delete (window as any).showTextDocument;
    delete (window as any).showErrorMessage;
  });
});

describe("NewLineagePanel — state card", () => {
  let panel: NewLineagePanel;
  let blocking: { message: string; category: string } | undefined;
  let postMessage: jest.Mock;
  let sendTelemetryEvent: jest.Mock;
  let project: any;

  const PROFILE = "Runtime Error\n  Could not find profile named 'jaffle_shop'";
  const MISSING_REF =
    "Compilation Error in model orders (models/orders.sql)\n  depends on a node named 'stg_orderz' which was not found";

  const renders = () =>
    (postMessage.mock.calls as [{ command: string; args: any }][])
      .map((call) => call[0])
      .filter((message) => message.command === "render");
  const events = (name: string) =>
    sendTelemetryEvent.mock.calls.filter((call) => call[0] === name);
  const settle = () => jest.advanceTimersByTime(300);

  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    blocking = undefined;
    postMessage = jest.fn();
    sendTelemetryEvent = jest.fn();
    project = {
      projectRoot: { fsPath: "/ws" },
      getBlockingDiagnostic: () => blocking,
      getProjectName: () => "jaffle_shop",
      getPythonPath: () => "/ws/.venv/bin/python",
      getProfilesDirEnv: () => "/ws/conf",
      getManifestPath: () => "/ws/target/manifest.json",
    };
    panel = Object.create(NewLineagePanel.prototype);
    Object.assign(panel as any, {
      reportedCardKinds: new Set<string>(),
      reportedErrorKinds: new Set<string>(),
      setupToastShown: false,
      rebuildInProgress: false,
      renderReported: false,
      graphDrawn: false,
      noGraphShown: false,
      postedBanner: undefined,
      reparseAvailable: true,
    });
    (panel as any)._panel = { visible: true, webview: { postMessage } };
    (panel as any).telemetry = {
      sendTelemetryEvent,
      sendTelemetryError: jest.fn(),
    };
    (panel as any).queryManifestService = {
      getEventByCurrentProject: jest.fn(() => undefined),
      getProject: jest.fn(() => project),
    };
    (panel as any).dbtProjectContainer = { getProjects: () => [project] };
    (panel as any).validationProvider = {
      isAuthenticated: jest.fn().mockReturnValue(false),
    };
    (panel as any).dbtTerminal = {
      info: jest.fn(),
      debug: jest.fn(),
      error: jest.fn(),
    };
    (panel as any).terminal = { debug: jest.fn(), show: jest.fn() };
    (window as any).activeTextEditor = undefined;
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("sends a card in place of the yellow note when an error blocks the graph", () => {
    blocking = { message: PROFILE, category: "project-config" };
    (panel as any).renderStartingNode();

    const { args } = renders()[0];
    expect(args.missingLineageMessage).toBeUndefined();
    expect(args.lineageCard).toMatchObject({
      kind: "profile-not-found",
      title: "dbt can't find the profile 'jaffle_shop'",
      detail:
        "dbt_project.yml uses the profile 'jaffle_shop', but it isn't in /ws/conf/profiles.yml.",
    });
  });

  it("keeps the yellow note when no error stands", () => {
    (panel as any).renderStartingNode();

    const { args } = renders()[0];
    expect(args.lineageCard).toBeUndefined();
    expect(args.missingLineageMessage.message).toContain("A valid dbt file");
  });

  it("shows the card when the interpreter can't be read", () => {
    project.getPythonPath = () => {
      throw new TypeError("no execution details yet");
    };
    blocking = { message: "No module named 'dbt'", category: "project-config" };
    (panel as any).renderStartingNode();

    expect(renders()[0].args.lineageCard.detail).toContain(
      "the selected Python environment",
    );
  });

  describe("the file a project error names", () => {
    const message = (node: string) =>
      `Compilation Error\n  Model '${node}' (models/orders.sql) depends on a node named 'x' which was not found`;
    let root: string;

    beforeEach(() => {
      root = fs.mkdtempSync(path.join(os.tmpdir(), "lineage-card-"));
      fs.writeFileSync(
        path.join(root, "dbt_project.yml"),
        "name: 'jaffle_shop'\n",
      );
      project.projectRoot = { fsPath: root };
      // A project that failed at startup never learned its name.
      project.getProjectName = () => "unknown_1234";
    });

    afterEach(() => {
      fs.rmSync(root, { recursive: true, force: true });
    });

    it("is the root project's when dbt names the root project", () => {
      blocking = {
        message: message("model.jaffle_shop.orders"),
        category: "manifest-rebuild",
      };
      (panel as any).renderStartingNode();

      expect(renders()[0].args.lineageCard.actions[0].args).toEqual({
        path: "models/orders.sql",
        line: undefined,
      });
    });

    it("is the package's when dbt names a package", () => {
      blocking = {
        message: message("model.dbt_utils.orders"),
        category: "manifest-rebuild",
      };
      (panel as any).renderStartingNode();

      expect(renders()[0].args.lineageCard.actions[0].args.package).toBe(
        "dbt_utils",
      );
    });
  });

  it("adds Try again to the card once the re-parse command turns out to exist", async () => {
    jest.useRealTimers();
    (panel as any).reparseAvailable = false;
    (commands as any).getCommands = jest.fn(async () => [
      "dbtPowerUser.reparseProject",
    ]);
    blocking = { message: PROFILE, category: "project-config" };
    (panel as any).renderStartingNode();
    const ids = (index: number) =>
      renders()[index].args.lineageCard.actions.map((a: any) => a.id);
    expect(ids(0)).toEqual(["openProfiles"]);

    (panel as any).checkReparseAvailable();
    await new Promise((resolve) => setImmediate(resolve));

    expect(ids(1)).toEqual(["openProfiles", "tryAgain"]);
  });

  it("reports each kind once per session", () => {
    blocking = { message: PROFILE, category: "project-config" };
    (panel as any).renderStartingNode();
    (panel as any).renderStartingNode();
    blocking = { message: MISSING_REF, category: "manifest-rebuild" };
    (panel as any).renderStartingNode();

    expect(events("lineageStateShown").map((call) => call[1])).toEqual([
      { kind: "profile-not-found" },
      { kind: "project-error" },
    ]);
  });

  it("renders again only when the error changes", () => {
    blocking = { message: PROFILE, category: "project-config" };
    (panel as any).renderStartingNode();

    panel.changedDiagnostics();
    settle();
    expect(renders()).toHaveLength(1);

    blocking = { message: MISSING_REF, category: "manifest-rebuild" };
    panel.changedDiagnostics();
    settle();
    expect(renders()).toHaveLength(2);
    expect(renders()[1].args.lineageCard.kind).toBe("project-error");

    blocking = undefined;
    panel.changedDiagnostics();
    settle();
    expect(renders()).toHaveLength(3);
    expect(renders()[2].args.lineageCard).toBeUndefined();
  });

  it("follows an error that changes without a diagnostics event when a parse ends", () => {
    blocking = { message: PROFILE, category: "project-config" };
    (panel as any).renderStartingNode();

    blocking = { message: MISSING_REF, category: "manifest-rebuild" };
    panel.changedRebuildStatus(false);

    expect(renders()).toHaveLength(2);
  });

  it("keeps the card while a parse runs, until it ends", () => {
    blocking = { message: PROFILE, category: "project-config" };
    (panel as any).renderStartingNode();

    panel.changedRebuildStatus(true);
    blocking = undefined;
    panel.changedDiagnostics();
    settle();
    expect(renders()).toHaveLength(1);

    panel.changedRebuildStatus(false);
    expect(renders()).toHaveLength(2);
    expect(renders()[1].args.lineageCard).toBeUndefined();
  });

  it("ignores diagnostics on files outside the project", () => {
    blocking = { message: PROFILE, category: "project-config" };
    (panel as any).renderStartingNode();

    blocking = { message: MISSING_REF, category: "manifest-rebuild" };
    panel.changedDiagnostics([Uri.file("/elsewhere/a.ts")] as any);
    settle();

    expect(renders()).toHaveLength(1);
  });

  it("posts nothing to a view that has been disposed", () => {
    blocking = { message: PROFILE, category: "project-config" };
    (panel as any).renderStartingNode();
    (panel as any).forgetDrawnGraph();

    blocking = { message: MISSING_REF, category: "manifest-rebuild" };
    panel.changedDiagnostics();
    settle();
    panel.changedRebuildStatus(false);

    expect(renders()).toHaveLength(1);
  });

  describe("the setup toast", () => {
    const toast = () => window.showWarningMessage as jest.Mock;

    it("shows once per window, with the panel closed", () => {
      (panel as any)._panel = undefined;
      blocking = { message: PROFILE, category: "project-config" };

      panel.changedDiagnostics();
      settle();
      panel.changedRebuildStatus(false);
      settle();

      expect(toast()).toHaveBeenCalledTimes(1);
      expect(toast()).toHaveBeenCalledWith(
        "dbt Power User: dbt can't find the profile 'jaffle_shop', so lineage and other features can't load.",
        "Show lineage",
        "Open profiles.yml",
      );
      expect(events("lineageSetupToastShown")[0][1]).toEqual({
        kind: "profile-not-found",
      });
    });

    it("waits for a burst of changes to settle", () => {
      blocking = { message: PROFILE, category: "project-config" };
      panel.changedDiagnostics();
      panel.changedDiagnostics();
      expect(toast()).not.toHaveBeenCalled();
      settle();
      expect(toast()).toHaveBeenCalledTimes(1);
    });

    it("leaves dbt not found to its own toast", () => {
      blocking = {
        message: "No module named 'dbt'",
        category: "project-config",
      };
      panel.changedDiagnostics();
      settle();
      expect(toast()).not.toHaveBeenCalled();
    });

    it("doesn't show for a project error, and can still show for a later setup problem", () => {
      blocking = { message: MISSING_REF, category: "manifest-rebuild" };
      panel.changedDiagnostics();
      settle();
      expect(toast()).not.toHaveBeenCalled();

      blocking = { message: PROFILE, category: "project-config" };
      panel.changedDiagnostics();
      settle();
      expect(toast()).toHaveBeenCalledTimes(1);
    });

    it("finds the setup problem in any project of the window", () => {
      const healthy = { ...project, getBlockingDiagnostic: () => undefined };
      (panel as any).dbtProjectContainer = {
        getProjects: () => [healthy, project],
      };
      blocking = { message: PROFILE, category: "project-config" };
      panel.changedDiagnostics();
      settle();
      expect(toast()).toHaveBeenCalledTimes(1);
      expect(toast().mock.calls[0][0]).toContain("dbt Power User (ws):");
    });

    it("focuses the panel on Show lineage", async () => {
      toast().mockReturnValueOnce(Promise.resolve("Show lineage"));
      blocking = { message: PROFILE, category: "project-config" };
      panel.changedDiagnostics();
      settle();
      await Promise.resolve();
      await Promise.resolve();

      expect(commands.executeCommand).toHaveBeenCalledWith(
        "dbtPowerUser.Lineage.focus",
      );
      expect(events("lineageAction")[0][1]).toEqual({
        kind: "profile-not-found",
        action: "showLineage",
        from: "toast",
      });
    });

    it("runs the card's first action on the project that has the problem", async () => {
      toast().mockReturnValueOnce(Promise.resolve("Select Python interpreter"));
      blocking = {
        message: "Could not find adapter type duckdb!",
        category: "project-config",
      };
      panel.changedDiagnostics();
      settle();
      await Promise.resolve();
      await Promise.resolve();

      expect(commands.executeCommand).toHaveBeenCalledWith(
        "python.setInterpreter",
      );
      expect(events("lineageAction")[0][1]).toEqual({
        kind: "dbt-broken",
        action: "selectInterpreter",
        from: "toast",
      });
    });
  });

  describe("the card's buttons", () => {
    const press = (action: string, params?: unknown) =>
      (panel as any).handleCommand({
        command: "lineageCardAction",
        args: { kind: "packages", action, params },
      });

    it.each([
      ["selectInterpreter", "python.setInterpreter"],
      ["installDbt", "dbtPowerUser.installDbt"],
      ["showProblems", "workbench.action.problems.focus"],
      ["getStarted", "dbtPowerUser.openOnboarding"],
    ])("%s runs %s", async (action, command) => {
      await press(action);
      expect(commands.executeCommand).toHaveBeenCalledWith(command);
      expect(events("lineageAction")[0][1]).toEqual({
        kind: "packages",
        action,
        from: "card",
      });
    });

    it("runs dbt deps in the card's project, whatever the walkthrough picked", async () => {
      (window as any).withProgress = jest.fn((_options: any, task: any) =>
        task(),
      );
      project.installDeps = jest.fn();
      await press("runDeps");
      expect(project.installDeps).toHaveBeenCalledTimes(1);
      expect(commands.executeCommand).not.toHaveBeenCalled();
    });

    it("re-parses the card's project on Try again", async () => {
      await press("tryAgain");
      expect(commands.executeCommand).toHaveBeenCalledWith(
        "dbtPowerUser.reparseProject",
        project.projectRoot,
      );
    });

    it("shows the dbt output channel", async () => {
      await press("showOutput");
      expect((panel as any).terminal.show).toHaveBeenCalledWith(true);
    });

    it("opens the env var docs", async () => {
      await press("openEnvVarDocs");
      expect(env.openExternal).toHaveBeenCalledTimes(1);
    });

    it("reveals the file with a space in its name", async () => {
      (Uri as any).joinPath = (base: { fsPath: string }, rel: string) => ({
        fsPath: path.join(base.fsPath, rel),
      });
      await press("revealFile", { path: "models/a copy.sql" });
      expect(commands.executeCommand).toHaveBeenCalledWith("revealInExplorer", {
        fsPath: "/ws/models/a copy.sql",
      });
    });

    it("opens the profiles.yml dbt reads", async () => {
      (window as any).showTextDocument = jest.fn();
      (panel as any).fileExists = () => true;
      await press("openProfiles");
      const opened = (window.showTextDocument as jest.Mock).mock.calls[0][0];
      expect((opened as Uri).fsPath).toBe("/ws/conf/profiles.yml");
    });

    it("says where it looked when that file doesn't exist", async () => {
      (window as any).showTextDocument = jest.fn();
      (window as any).showErrorMessage = jest.fn();
      (panel as any).fileExists = () => false;
      await press("openProfiles");
      expect(window.showTextDocument).not.toHaveBeenCalled();
      expect(window.showErrorMessage).toHaveBeenCalledWith(
        expect.stringContaining("/ws/conf/profiles.yml wasn't found"),
      );
    });
  });
});
