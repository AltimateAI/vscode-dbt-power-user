import { mkdirSync, mkdtempSync, rmSync, utimesSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import * as path from "path";

import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import { EventEmitter, Uri, workspace } from "vscode";

import { SqlPreviewContentProvider } from "../../content_provider/sqlPreviewContentProvider";
import { DBTProject } from "../../dbt_client/dbtProject";
import type { DBTProjectContainer } from "../../dbt_client/dbtProjectContainer";
import type { ManifestCacheChangedEvent } from "../../dbt_client/event/manifestCacheChangedEvent";
import type { TelemetryService } from "../../telemetry";

/**
 * The Compiled SQL preview compiled the editor text as an anonymous query, so
 * Jinja reading the node's own properties — `model.name`, `model.primary_key`,
 * `this` — resolved against a placeholder. Compiling the real node fixes that,
 * but the node is neither the buffer nor, between a save and the rebuild it
 * sets off, the file. And `unsafeCompileNode` resolves a bare ref name, which
 * is not every node a file can be. So the routing is a set of conditions on
 * this file, tested here against a project whose nodes deliberately all share
 * one base name.
 */

const PROJECT_NAME = "jaffle";

/** Every one of these files is `orders.sql` or a variant of that name. */
const FILES = {
  model: path.join("models", "orders.sql"),
  versionedModel: path.join("models", "orders_v2.sql"),
  analysis: path.join("analyses", "orders.sql"),
  snapshot: path.join("snapshots", "orders.sql"),
  packageModel: path.join("dbt_packages", "pkg", "models", "orders.sql"),
  notANode: path.join("models", "scratch.sql"),
};

const NODES: { unique_id: string; file: string }[] = [
  { unique_id: `model.${PROJECT_NAME}.orders`, file: FILES.model },
  { unique_id: `model.${PROJECT_NAME}.orders.v2`, file: FILES.versionedModel },
  { unique_id: `analysis.${PROJECT_NAME}.orders`, file: FILES.analysis },
  { unique_id: `snapshot.${PROJECT_NAME}.orders`, file: FILES.snapshot },
  { unique_id: "model.pkg.orders", file: FILES.packageModel },
];

/**
 * The two moments the routing compares. The caller reads when the file was
 * written and hands that in, so they are plain numbers here.
 */
const MANIFEST_BUILT_AT = 1_000_000;
const SAVED_BEFORE_THAT = MANIFEST_BUILT_AT - 1_000;
const SAVED_AFTER_THAT = MANIFEST_BUILT_AT + 1_000;

const SQL = "select 1 as id";

let projectRoot: string;

/** An absolute path inside the project tree written by `beforeAll`. */
const filePath = (relativePath: string) => path.join(projectRoot, relativePath);

beforeAll(() => {
  projectRoot = path.join(
    mkdtempSync(path.join(tmpdir(), "preview-")),
    PROJECT_NAME,
  );
  for (const relativePath of Object.values(FILES)) {
    const absolute = path.join(projectRoot, relativePath);
    mkdirSync(path.dirname(absolute), { recursive: true });
    writeFileSync(absolute, SQL);
  }
});

interface PreviewProject {
  previewCanUseNode(
    file: string,
    modelName: string,
    savedAt: number,
    hasUnsavedEdits: boolean,
  ): boolean;
  compileQueryForPreview(
    query: string,
    modelName: string,
    useNode: boolean,
  ): Promise<string>;
}

/** The parts of `DBTProject` this routing reads, and nothing else. */
interface ProjectInternals {
  dbtProjectIntegration: {
    unsafeCompileNode: (modelName: string) => Promise<string>;
    unsafeCompileQuery: (query: string, modelName: string) => Promise<string>;
    canInjectNodeContextInSqlSnippetExecution: () => boolean;
  };
  _manifestCacheEvent?: {
    nodeMetaMap: {
      nodes: () => Iterable<{ unique_id: string; path: string }>;
    };
  };
  manifestBuiltFromFilesAsOf?: number;
  manifestRebuildStartTimes: number[];
  noteRebuildStatus: (inProgress: boolean) => void;
  stampManifestFreshness: () => void;
  terminal: { debug: (name: string, message: string) => void };
  throwIfNotAuthenticated: () => void;
  getProjectName: () => string;
}

function createProject(
  opts: {
    nodeCompileFails?: boolean;
    /** The execute path's capability, which this routing must ignore. */
    canInjectNodeContextInSqlSnippetExecution?: boolean;
    withoutManifest?: boolean;
  } = {},
) {
  const unsafeCompileNode = jest.fn(async () => {
    if (opts.nodeCompileFails) {
      throw new Error("This model doesn't exist within this dbt project");
    }
    return "compiled from the node";
  });
  const unsafeCompileQuery = jest.fn(async () => "compiled from the buffer");
  const project = Object.create(DBTProject.prototype) as PreviewProject &
    ProjectInternals;
  project.dbtProjectIntegration = {
    unsafeCompileNode,
    unsafeCompileQuery,
    canInjectNodeContextInSqlSnippetExecution: () =>
      opts.canInjectNodeContextInSqlSnippetExecution ?? true,
  };
  project._manifestCacheEvent = opts.withoutManifest
    ? undefined
    : {
        nodeMetaMap: {
          nodes: () =>
            NODES.map((node) => ({
              unique_id: node.unique_id,
              path: filePath(node.file),
            })),
        },
      };
  project.manifestBuiltFromFilesAsOf = MANIFEST_BUILT_AT;
  project.manifestRebuildStartTimes = [];
  project.terminal = { debug: () => undefined };
  project.throwIfNotAuthenticated = () => undefined;
  project.getProjectName = () => PROJECT_NAME;
  return { project, unsafeCompileNode, unsafeCompileQuery };
}

/** `previewCanUseNode` for a file saved before the manifest was built. */
const canUseNodeFor = (
  project: PreviewProject,
  file: string,
  modelName: string,
) =>
  project.previewCanUseNode(
    filePath(file),
    modelName,
    SAVED_BEFORE_THAT,
    false,
  );

describe("previewCanUseNode", () => {
  it("takes the node for a saved root-project model the manifest describes", () => {
    const { project } = createProject();

    expect(canUseNodeFor(project, FILES.model, "orders")).toBe(true);
  });

  it("refuses while the buffer holds unsaved edits", () => {
    // Compiling the file would answer a question about a version of it that
    // nobody is looking at.
    const { project } = createProject();

    expect(
      project.previewCanUseNode(
        filePath(FILES.model),
        "orders",
        SAVED_BEFORE_THAT,
        true,
      ),
    ).toBe(false);
  });

  it("refuses right after a save, before the rebuild lands", () => {
    // The save clears the dirty flag at once, but the rebuild it sets off is
    // debounced and then takes seconds. A node compiled in between is the
    // previous version of the file, so the preview would show the SQL of the
    // save before this one — or old SQL where a new parse error belongs.
    const { project } = createProject();

    expect(
      project.previewCanUseNode(
        filePath(FILES.model),
        "orders",
        SAVED_AFTER_THAT,
        false,
      ),
    ).toBe(false);
  });

  it("refuses a versioned model, whose ref name is not its file name", () => {
    // `orders_v2.sql` is `orders` v2, and `unsafeCompileNode("orders_v2")`
    // resolves nothing — the preview would error where editor text compiled.
    const { project } = createProject();

    expect(canUseNodeFor(project, FILES.versionedModel, "orders_v2")).toBe(
      false,
    );
  });

  it("refuses an analysis", () => {
    // `resolve_ref` does not return analyses.
    const { project } = createProject();

    expect(canUseNodeFor(project, FILES.analysis, "orders")).toBe(false);
  });

  it("refuses a snapshot", () => {
    const { project } = createProject();

    expect(canUseNodeFor(project, FILES.snapshot, "orders")).toBe(false);
  });

  it("refuses a package model whose name the root project also uses", () => {
    // The ref name resolves in the root project, so compiling by name here
    // would silently show a different model's SQL.
    const { project } = createProject();

    expect(canUseNodeFor(project, FILES.packageModel, "orders")).toBe(false);
  });

  it("refuses a file the manifest does not describe", () => {
    const { project } = createProject();

    expect(canUseNodeFor(project, FILES.notANode, "scratch")).toBe(false);
  });

  it("refuses a file that is not there", () => {
    const { project } = createProject();

    expect(
      canUseNodeFor(project, path.join("models", "deleted.sql"), "deleted"),
    ).toBe(false);
  });

  it("refuses every file until a manifest has been parsed", () => {
    const { project } = createProject({ withoutManifest: true });

    expect(canUseNodeFor(project, FILES.model, "orders")).toBe(false);
  });

  it("refuses every file until a manifest has been built from them", () => {
    const { project } = createProject();
    project.manifestBuiltFromFilesAsOf = undefined;

    expect(canUseNodeFor(project, FILES.model, "orders")).toBe(false);
  });
});

/**
 * Which version of the files the manifest in hand was built from is read off
 * two events: a rebuild's start, and a parse. Neither says which rebuild it
 * belongs to, and rebuilds overlap — the adapter announces a start before the
 * rebuild behind it waits for the project lock, so a save landing in that gap
 * starts a second rebuild while the first is still parsing. Driven here
 * through exactly what the two handlers do, on a clock the test moves.
 */
describe("what the manifest was built from, across overlapping rebuilds", () => {
  /** A save that lands after the first rebuild started reading the files. */
  const SAVED_BETWEEN_REBUILDS = 5_000;
  const FIRST_REBUILD_STARTED = 1_000;
  const SECOND_REBUILD_STARTED = 5_500;

  let now = FIRST_REBUILD_STARTED;
  let clock: ReturnType<typeof jest.spyOn>;

  const at = (time: number) => {
    now = time;
  };

  beforeEach(() => {
    now = FIRST_REBUILD_STARTED;
    clock = jest.spyOn(Date, "now").mockImplementation(() => now);
  });

  afterEach(() => {
    clock.mockRestore();
  });

  /** A project that has parsed a manifest but not yet stamped one. */
  const projectAwaitingFirstStamp = () => {
    const { project } = createProject();
    project.manifestBuiltFromFilesAsOf = undefined;
    return project;
  };

  const canUseNodeAfter = (project: PreviewProject, savedAt: number) =>
    project.previewCanUseNode(filePath(FILES.model), "orders", savedAt, false);

  it("does not credit the first rebuild's manifest with the save that started the second", () => {
    const project = projectAwaitingFirstStamp();

    at(FIRST_REBUILD_STARTED);
    project.noteRebuildStatus(true);
    at(SECOND_REBUILD_STARTED);
    project.noteRebuildStatus(true);
    // The first rebuild had the lock, so its parse is the one that lands now,
    // and it read the files as they were at its own start.
    project.stampManifestFreshness();

    expect(canUseNodeAfter(project, SAVED_BETWEEN_REBUILDS)).toBe(false);

    project.noteRebuildStatus(false);
    project.stampManifestFreshness();

    expect(canUseNodeAfter(project, SAVED_BETWEEN_REBUILDS)).toBe(true);
  });

  it("refuses the node until a rebuild's own parse has said what it read", () => {
    const project = projectAwaitingFirstStamp();

    at(9_000);
    project.stampManifestFreshness();

    expect(canUseNodeAfter(project, SAVED_BETWEEN_REBUILDS)).toBe(false);
  });

  it("does not move forward for a manifest rewritten in place", () => {
    const project = projectAwaitingFirstStamp();

    at(FIRST_REBUILD_STARTED);
    project.noteRebuildStatus(true);
    project.stampManifestFreshness();
    project.noteRebuildStatus(false);
    // What a `dbt compile` does to `target/manifest.json`, and what the node
    // compile this routing asks for therefore does: a parse with no rebuild
    // behind it. Taking that for a newer manifest is what sets the preview
    // compiling in a circle.
    at(9_000);
    project.stampManifestFreshness();

    expect(canUseNodeAfter(project, SAVED_BETWEEN_REBUILDS)).toBe(false);
  });

  it("leaves no start time behind for a rebuild that ended without parsing", () => {
    const project = projectAwaitingFirstStamp();

    at(FIRST_REBUILD_STARTED);
    project.noteRebuildStatus(true);
    project.noteRebuildStatus(false);
    at(SECOND_REBUILD_STARTED);
    project.noteRebuildStatus(true);
    project.stampManifestFreshness();

    expect(canUseNodeAfter(project, SAVED_BETWEEN_REBUILDS)).toBe(true);
  });
});

describe("compileQueryForPreview", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("compiles the real node when the caller says it can answer", async () => {
    const { project, unsafeCompileNode, unsafeCompileQuery } = createProject();

    expect(await project.compileQueryForPreview(SQL, "orders", true)).toBe(
      "compiled from the node",
    );
    expect(unsafeCompileNode).toHaveBeenCalledWith("orders");
    expect(unsafeCompileQuery).not.toHaveBeenCalled();
  });

  it("compiles the editor text when the node cannot answer", async () => {
    const { project, unsafeCompileNode, unsafeCompileQuery } = createProject();

    expect(await project.compileQueryForPreview(SQL, "orders", false)).toBe(
      "compiled from the buffer",
    );
    expect(unsafeCompileQuery).toHaveBeenCalledWith(SQL, "orders");
    expect(unsafeCompileNode).not.toHaveBeenCalled();
  });

  it("falls back to the editor text when the node compile throws", async () => {
    // Whatever the check lets through that dbt still declines to resolve costs
    // an extra compile rather than an error the preview did not produce before.
    const { project, unsafeCompileNode, unsafeCompileQuery } = createProject({
      nodeCompileFails: true,
    });

    expect(await project.compileQueryForPreview(SQL, "orders", true)).toBe(
      "compiled from the buffer",
    );
    expect(unsafeCompileNode).toHaveBeenCalledWith("orders");
    expect(unsafeCompileQuery).toHaveBeenCalledWith(SQL, "orders");
  });

  it("compiles the node in Python-bridge mode too", async () => {
    // The bridge cannot supply a node as context to an inline snippet, but it
    // compiles a node correctly via compile_node(get_ref_node(...)) — which is
    // what this path calls. #2101 was reported on that mode, so treating it as
    // an exception would deny the fix to the reporter.
    const { project, unsafeCompileNode } = createProject({
      canInjectNodeContextInSqlSnippetExecution: false,
    });

    expect(await project.compileQueryForPreview(SQL, "orders", true)).toBe(
      "compiled from the node",
    );
    expect(unsafeCompileNode).toHaveBeenCalledWith("orders");
  });
});

/**
 * The provider derives `hasUnsavedEdits` from the open document, mirroring how
 * it already decides whether to read the buffer or the file. Characterized the
 * same way as `sqlPreviewCommandGuard.test.ts` rather than standing up the
 * VS Code host.
 */
describe("hasUnsavedEdits, as the preview provider derives it", () => {
  type Document = { isDirty: boolean } | undefined;

  // sqlPreviewContentProvider.requestCompilation
  const hasUnsavedEdits = (document: Document) => document?.isDirty === true;

  it("is false when the file is not open in an editor", () => {
    // Nothing is open, so the provider reads the file from disk — which the
    // manifest-freshness check then vouches for, or does not.
    expect(hasUnsavedEdits(undefined)).toBe(false);
  });

  it("is false for an open document with no unsaved edits", () => {
    expect(hasUnsavedEdits({ isDirty: false })).toBe(false);
  });

  it("is true for an open document with unsaved edits", () => {
    expect(hasUnsavedEdits({ isDirty: true })).toBe(true);
  });
});

/**
 * Nothing re-requests a preview once the manifest catches up with the file, so
 * a save would leave a preview built from editor text on screen until the next
 * keystroke. The provider watches for the manifest instead — which has to be
 * done without a round trip, because the compile that a re-request leads to
 * rewrites `target/manifest.json` on the command-line integrations, and that
 * is another manifest change.
 */
describe("the preview provider, when the manifest changes", () => {
  const manifestChanged = new EventEmitter<ManifestCacheChangedEvent>();
  let canUseNode: boolean;
  let nodeCompileFails: boolean;
  let previewFile: string;
  /** Requests held open, so a test can interleave them. */
  let heldCompiles: { useNode: boolean; finish: () => void }[];
  let heldStarts: (() => void)[];
  let holdCompiles: boolean;
  let holdStarts: boolean;

  const asUri = (file: string) =>
    ({
      fsPath: file,
      toString: () => `query-preview:${file}`,
      with: () => ({ toString: () => `file:${file}` }),
    }) as unknown as Uri;

  /** Lets queued microtasks run until `held` has `count` entries. */
  const untilHeld = async (held: unknown[], count: number) => {
    for (let tick = 0; tick < 100 && held.length < count; tick++) {
      await Promise.resolve();
    }
    expect(held).toHaveLength(count);
  };

  /**
   * Writes the file with a modification time later than every save before it,
   * including those in earlier tests — `Date.now()` is too coarse to separate
   * two of these on its own.
   */
  let lastSaveAt = Date.now();
  const saveNow = () => {
    lastSaveAt += 60_000;
    const at = new Date(lastSaveAt);
    utimesSync(previewFile, at, at);
  };

  /** The mock's open documents, which the real API declares readonly. */
  const openDocuments = workspace.textDocuments as unknown as {
    uri: { toString: () => string };
    getText: () => string;
    isDirty: boolean;
  }[];

  /**
   * Puts the file in an editor, so the request reads the buffer rather than
   * the file — which is the only way it gets past a file that is not there.
   */
  const openTheFile = () => {
    openDocuments.push({
      uri: { toString: () => `file:${previewFile}` },
      getText: () => SQL,
      isDirty: false,
    });
  };

  const createProvider = () => {
    const project = {
      refreshProjectConfig: async () => {
        if (holdStarts) {
          await new Promise<void>((resolve) => {
            heldStarts.push(resolve);
          });
        }
      },
      previewCanUseNode: () => canUseNode,
      compileQueryForPreview: async (
        _query: string,
        _modelName: string,
        useNode: boolean,
      ) => {
        if (holdCompiles) {
          await new Promise<void>((resolve) => {
            heldCompiles.push({ useNode, finish: resolve });
          });
        }
        return useNode && !nodeCompileFails
          ? "compiled from the node"
          : "compiled from the buffer";
      },
    };
    const container = {
      onManifestChanged: manifestChanged.event,
      findDBTProject: () => project,
    } as unknown as DBTProjectContainer;
    const telemetry = {
      sendTelemetryEvent: () => undefined,
      sendTelemetryError: () => undefined,
    } as unknown as TelemetryService;
    const provider = new SqlPreviewContentProvider(container, telemetry);
    const refreshed: string[] = [];
    provider.onDidChange((uri) => refreshed.push(uri.toString()));
    return { provider, refreshed };
  };

  beforeEach(() => {
    previewFile = filePath(FILES.model);
    canUseNode = false;
    nodeCompileFails = false;
    heldCompiles = [];
    heldStarts = [];
    holdCompiles = false;
    holdStarts = false;
    openDocuments.length = 0;
  });

  it("re-requests a preview the node can now answer, once", async () => {
    const { provider, refreshed } = createProvider();
    await provider.provideTextDocumentContent(asUri(previewFile));

    canUseNode = true;
    manifestChanged.fire({});
    manifestChanged.fire({});

    expect(refreshed).toEqual([`query-preview:${previewFile}`]);
  });

  it("re-requests it again after the next save", async () => {
    const { provider, refreshed } = createProvider();
    await provider.provideTextDocumentContent(asUri(previewFile));

    canUseNode = true;
    manifestChanged.fire({});
    saveNow();
    manifestChanged.fire({});

    expect(refreshed).toHaveLength(2);
  });

  it("leaves a preview already built from the node alone", async () => {
    canUseNode = true;
    const { provider, refreshed } = createProvider();
    await provider.provideTextDocumentContent(asUri(previewFile));

    manifestChanged.fire({});

    expect(refreshed).toEqual([]);
  });

  it("leaves a preview the node still cannot answer alone", async () => {
    const { provider, refreshed } = createProvider();
    await provider.provideTextDocumentContent(asUri(previewFile));

    manifestChanged.fire({});

    expect(refreshed).toEqual([]);
  });

  it("stops after one try at a node whose compile throws", async () => {
    // The fallback is itself a `dbt compile` on the command-line integrations,
    // so it rewrites `target/manifest.json` and arrives back here. A node that
    // keeps throwing for a file nobody has saved since would otherwise be
    // re-requested for as long as the preview stays open.
    canUseNode = true;
    nodeCompileFails = true;
    const { provider, refreshed } = createProvider();
    await provider.provideTextDocumentContent(asUri(previewFile));

    for (let manifestWrite = 0; manifestWrite < 4; manifestWrite++) {
      manifestChanged.fire({});
      await provider.provideTextDocumentContent(asUri(previewFile));
    }

    expect(refreshed).toEqual([]);
  });

  it("does not let a slower editor-text request erase the node request that overtook it", async () => {
    // The editor-text request goes out before the rebuild lands and is still
    // running when the manifest arrives and the node request for the same
    // saved version goes out. If the slower one's completion spoke for that
    // version, the node request would be made a second time with nobody
    // having saved in between.
    holdCompiles = true;
    const { provider, refreshed } = createProvider();
    const forEditorText = provider.provideTextDocumentContent(
      asUri(previewFile),
    );
    await untilHeld(heldCompiles, 1);

    canUseNode = true;
    manifestChanged.fire({});
    const forTheNode = provider.provideTextDocumentContent(asUri(previewFile));
    await untilHeld(heldCompiles, 2);

    heldCompiles[0].finish();
    await forEditorText;
    manifestChanged.fire({});
    heldCompiles[1].finish();
    await forTheNode;

    expect(heldCompiles.map((compile) => compile.useNode)).toEqual([
      false,
      true,
    ]);
    expect(refreshed).toEqual([`query-preview:${previewFile}`]);
  });

  it("does not let a request for an older version speak for a newer one", async () => {
    // Two requests in flight, and the one that started first is the last to
    // reach the point where it records what it asked for.
    holdStarts = true;
    canUseNode = true;
    const { provider, refreshed } = createProvider();
    const forFirstVersion = provider.provideTextDocumentContent(
      asUri(previewFile),
    );
    await untilHeld(heldStarts, 1);

    saveNow();
    const forSecondVersion = provider.provideTextDocumentContent(
      asUri(previewFile),
    );
    await untilHeld(heldStarts, 2);

    heldStarts[1]();
    await forSecondVersion;
    heldStarts[0]();
    await forFirstVersion;

    manifestChanged.fire({});

    expect(refreshed).toEqual([]);
  });

  it("asks again for a file that was missing when the last request went out", async () => {
    // A save that deletes and recreates the file can leave a request reading
    // the buffer with no version to name. Standing in a sentinel version
    // instead would outrank every real one, and nothing could ever record the
    // version that followed — so every manifest change would ask again, and
    // on the command-line integrations each of those writes a manifest.
    openTheFile();
    rmSync(previewFile);
    const { provider, refreshed } = createProvider();
    await provider.provideTextDocumentContent(asUri(previewFile));

    writeFileSync(previewFile, SQL);
    saveNow();
    canUseNode = true;
    manifestChanged.fire({});
    manifestChanged.fire({});

    expect(refreshed).toEqual([`query-preview:${previewFile}`]);
  });

  it("re-requests a version saved while an earlier request was still running", async () => {
    // The version a request speaks for is the one its routing decided on, not
    // whatever is on disk by the time it returns. Otherwise a save landing
    // mid-compile counts as already asked about, and never catches up.
    canUseNode = true;
    holdCompiles = true;
    const { provider, refreshed } = createProvider();
    const compiling = provider.provideTextDocumentContent(asUri(previewFile));
    await untilHeld(heldCompiles, 1);
    saveNow();
    heldCompiles[0].finish();
    await compiling;

    manifestChanged.fire({});

    expect(refreshed).toEqual([`query-preview:${previewFile}`]);
  });
});
