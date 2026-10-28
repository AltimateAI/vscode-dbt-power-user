import {
  mkdirSync,
  mkdtempSync,
  statSync,
  utimesSync,
  writeFileSync,
} from "fs";
import { tmpdir } from "os";
import * as path from "path";

import {
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import { EventEmitter, Uri } from "vscode";

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
 * this file, tested here against a project tree whose nodes deliberately all
 * share one base name.
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

let projectRoot: string;

/** An absolute path inside the project tree written by `beforeAll`. */
const filePath = (relativePath: string) => path.join(projectRoot, relativePath);

const SQL = "select 1 as id";

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

/** The last moment at which every file in the tree had been written. */
const allFilesWrittenBy = () =>
  Math.max(
    ...Object.values(FILES).map(
      (relativePath) => statSync(filePath(relativePath)).mtimeMs,
    ),
  ) + 1;

interface PreviewProject {
  previewCanUseNode(
    file: string,
    modelName: string,
    hasUnsavedEdits: boolean,
  ): boolean;
  compileQueryForPreview(
    query: string,
    modelName: string,
    file: string,
    hasUnsavedEdits: boolean,
  ): Promise<{ compiledSql: string; nodeTried: boolean }>;
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
  terminal: { debug: (name: string, message: string) => void };
  throwIfNotAuthenticated: () => void;
  getProjectName: () => string;
}

function createProject(
  opts: {
    /** When the manifest in hand started being built. */
    manifestBuiltFromFilesAsOf?: number;
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
  project.manifestBuiltFromFilesAsOf =
    opts.manifestBuiltFromFilesAsOf ?? allFilesWrittenBy();
  project.terminal = { debug: () => undefined };
  project.throwIfNotAuthenticated = () => undefined;
  project.getProjectName = () => PROJECT_NAME;
  return { project, unsafeCompileNode, unsafeCompileQuery };
}

describe("previewCanUseNode", () => {
  it("takes the node for a saved root-project model the manifest describes", () => {
    const { project } = createProject();

    expect(
      project.previewCanUseNode(filePath(FILES.model), "orders", false),
    ).toBe(true);
  });

  it("refuses while the buffer holds unsaved edits", () => {
    // Compiling the file would answer a question about a version of it that
    // nobody is looking at.
    const { project } = createProject();

    expect(
      project.previewCanUseNode(filePath(FILES.model), "orders", true),
    ).toBe(false);
  });

  it("refuses right after a save, before the rebuild lands", () => {
    // The save clears the dirty flag immediately but the rebuild it triggers
    // is debounced and then takes seconds. A node compiled in between is the
    // previous version of the file, so the preview would show the SQL of the
    // save before this one — or old SQL where a new parse error belongs.
    const { project } = createProject({
      manifestBuiltFromFilesAsOf:
        statSync(filePath(FILES.model)).mtimeMs - 1000,
    });

    expect(
      project.previewCanUseNode(filePath(FILES.model), "orders", false),
    ).toBe(false);
  });

  it("refuses a versioned model, whose ref name is not its file name", () => {
    // `orders_v2.sql` is `orders` v2, and `unsafeCompileNode("orders_v2")`
    // resolves nothing — the preview would error where editor text compiled.
    const { project } = createProject();

    expect(
      project.previewCanUseNode(
        filePath(FILES.versionedModel),
        "orders_v2",
        false,
      ),
    ).toBe(false);
  });

  it("refuses an analysis", () => {
    // `resolve_ref` does not return analyses.
    const { project } = createProject();

    expect(
      project.previewCanUseNode(filePath(FILES.analysis), "orders", false),
    ).toBe(false);
  });

  it("refuses a snapshot", () => {
    const { project } = createProject();

    expect(
      project.previewCanUseNode(filePath(FILES.snapshot), "orders", false),
    ).toBe(false);
  });

  it("refuses a package model whose name the root project also uses", () => {
    // The ref name resolves in the root project, so compiling by name here
    // would silently show a different model's SQL.
    const { project } = createProject();

    expect(
      project.previewCanUseNode(filePath(FILES.packageModel), "orders", false),
    ).toBe(false);
  });

  it("refuses a file the manifest does not describe", () => {
    const { project } = createProject();

    expect(
      project.previewCanUseNode(filePath(FILES.notANode), "scratch", false),
    ).toBe(false);
  });

  it("refuses every file until a manifest has been parsed", () => {
    const { project } = createProject({ withoutManifest: true });

    expect(
      project.previewCanUseNode(filePath(FILES.model), "orders", false),
    ).toBe(false);
  });

  it("refuses every file until a manifest has been built from them", () => {
    const { project } = createProject();
    project.manifestBuiltFromFilesAsOf = undefined;

    expect(
      project.previewCanUseNode(filePath(FILES.model), "orders", false),
    ).toBe(false);
  });

  it("refuses a file that is not there", () => {
    const { project } = createProject();

    expect(
      project.previewCanUseNode(
        filePath("models/deleted.sql"),
        "deleted",
        false,
      ),
    ).toBe(false);
  });
});

describe("compileQueryForPreview", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("compiles the real node, and says that is where the SQL came from", async () => {
    const { project, unsafeCompileNode, unsafeCompileQuery } = createProject();

    const compiled = await project.compileQueryForPreview(
      SQL,
      "orders",
      filePath(FILES.model),
      false,
    );

    expect(compiled).toEqual({
      compiledSql: "compiled from the node",
      nodeTried: true,
    });
    expect(unsafeCompileNode).toHaveBeenCalledWith("orders");
    expect(unsafeCompileQuery).not.toHaveBeenCalled();
  });

  it("compiles the editor text when the node cannot answer for this file", async () => {
    const { project, unsafeCompileNode, unsafeCompileQuery } = createProject();

    const compiled = await project.compileQueryForPreview(
      SQL,
      "orders",
      filePath(FILES.analysis),
      false,
    );

    expect(compiled).toEqual({
      compiledSql: "compiled from the buffer",
      nodeTried: false,
    });
    expect(unsafeCompileQuery).toHaveBeenCalledWith(SQL, "orders");
    expect(unsafeCompileNode).not.toHaveBeenCalled();
  });

  it("falls back to the editor text when the node compile throws, and still counts the node as tried", async () => {
    // Whatever the check lets through that dbt still declines to resolve costs
    // an extra compile rather than an error the preview did not produce before.
    // The node was asked, though, and no later manifest improves on its
    // answer — re-requesting the preview for that would compile again, and a
    // compile is another manifest change.
    const { project, unsafeCompileNode, unsafeCompileQuery } = createProject({
      nodeCompileFails: true,
    });

    const compiled = await project.compileQueryForPreview(
      SQL,
      "orders",
      filePath(FILES.model),
      false,
    );

    expect(compiled).toEqual({
      compiledSql: "compiled from the buffer",
      nodeTried: true,
    });
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

    const compiled = await project.compileQueryForPreview(
      SQL,
      "orders",
      filePath(FILES.model),
      false,
    );

    expect(compiled.nodeTried).toBe(true);
    expect(unsafeCompileNode).toHaveBeenCalledWith("orders");
  });
});

/**
 * The provider decides `hasUnsavedEdits` from the open document, mirroring how
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

  const asUri = (file: string) =>
    ({
      fsPath: file,
      toString: () => `query-preview:${file}`,
      with: () => ({ toString: () => `file:${file}` }),
    }) as unknown as Uri;

  const createProvider = () => {
    const project = {
      refreshProjectConfig: async () => undefined,
      previewCanUseNode: () => canUseNode,
      compileQueryForPreview: async () => ({
        compiledSql:
          canUseNode && !nodeCompileFails
            ? "compiled from the node"
            : "compiled from the buffer",
        nodeTried: canUseNode,
      }),
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
    const laterSave = new Date(Date.now() + 5000);
    utimesSync(previewFile, laterSave, laterSave);
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

    for (
      let compileWroteTheManifest = 0;
      compileWroteTheManifest < 4;
      compileWroteTheManifest++
    ) {
      manifestChanged.fire({});
      await provider.provideTextDocumentContent(asUri(previewFile));
    }

    expect(refreshed).toEqual([]);
  });
});
