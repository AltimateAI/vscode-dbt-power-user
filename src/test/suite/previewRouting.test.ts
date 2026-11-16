import {
  InlinePreviewError,
  QueryExecution,
} from "@altimateai/dbt-integration";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";

import { window, workspace } from "vscode";
import { DBTProject, type PreviewMode } from "../../dbt_client/dbtProject";

/**
 * Previewing with `--inline` compiles the SQL as an anonymous node, so Jinja
 * reading the current node's identity resolves to a placeholder. Running the
 * saved node instead fixes that, but dbt reads it from disk — so the routing
 * has to be sure the editor holds nothing the file does not, and the selector
 * it hands dbt has to name that one node and nothing else.
 */

interface NodeRun {
  modelName: string;
  limit: number;
  nodeSelector: string;
  modelSql: string;
  uri?: { fsPath: string };
}

interface TestableProject {
  nodeRunSelector(filePath: string | undefined): string | undefined;
  offerModelRunOnIdentityFailure(
    execution: Promise<QueryExecution>,
    nodeRun: NodeRun,
  ): Promise<QueryExecution>;
  promptToRunAsModel: jest.Mock;
}

/** The parts of a manifest node this routing reads. */
interface FakeNode {
  unique_id: string;
  path: string;
  package_name: string;
}

function createProject(opts: {
  canInjectNodeContextInSqlSnippetExecution: boolean;
  nodes: FakeNode[];
}): TestableProject {
  const project = Object.create(DBTProject.prototype) as TestableProject;
  (project as any).dbtProjectIntegration = {
    canInjectNodeContextInSqlSnippetExecution: () =>
      opts.canInjectNodeContextInSqlSnippetExecution,
  };
  (project as any)._manifestCacheEvent = {
    nodeMetaMap: { nodes: () => opts.nodes },
  };
  (project as any).projectRoot = { fsPath: "/w/jaffle_shop" };
  // The selector must not depend on the project's name: at preview time it can
  // still read `unknown_<id>` (seen in the E2E), so location decides.
  (project as any).getProjectName = () => "unknown_79898443";
  (project as any).getPackageInstallPath = () => "/w/jaffle_shop/dbt_packages";
  project.promptToRunAsModel = jest.fn(() => Promise.resolve());
  return project;
}

function executionThatThrows(error: unknown): Promise<QueryExecution> {
  return Promise.resolve(
    new QueryExecution(
      async () => undefined,
      async () => {
        throw error;
      },
    ),
  );
}

describe("nodeRunSelector", () => {
  /**
   * The project of the five-file collision fixture: a root model and a
   * package model sharing a base name, the same name again as an analysis,
   * and a versioned model whose file names are not its node name.
   */
  const ROOT = "/w/jaffle_shop/";
  const NODES: FakeNode[] = [
    {
      unique_id: "model.jaffle_shop.stg_orders",
      path: `${ROOT}models/staging/stg_orders.sql`,
      package_name: "jaffle_shop",
    },
    {
      unique_id: "model.jaffle_shop.orders",
      path: `${ROOT}models/orders.sql`,
      package_name: "jaffle_shop",
    },
    {
      unique_id: "model.pkg.orders",
      path: `${ROOT}dbt_packages/pkg/models/orders.sql`,
      package_name: "pkg",
    },
    {
      unique_id: "analysis.jaffle_shop.orders",
      path: `${ROOT}analysis/orders.sql`,
      package_name: "jaffle_shop",
    },
    {
      unique_id: "model.jaffle_shop.widgets.v2",
      path: `${ROOT}models/widgets_v2.sql`,
      package_name: "jaffle_shop",
    },
  ];

  const project = (
    canInjectNodeContextInSqlSnippetExecution = true,
  ): TestableProject =>
    createProject({ canInjectNodeContextInSqlSnippetExecution, nodes: NODES });

  it("names a model by its package, resource type and name", () => {
    expect(
      project().nodeRunSelector(`${ROOT}models/staging/stg_orders.sql`),
    ).toBe(
      "package:jaffle_shop,resource_type:model,path:models/staging/stg_orders.sql,stg_orders",
    );
  });

  it("names a versioned model by its version, not by its file name", () => {
    // `dbt show --select widgets_v2` resolves on dbt-core only because dbt also
    // matches the file name; the node is `widgets` version 2, and the id dbt
    // composes for it is what selects that one version on both engines.
    expect(project().nodeRunSelector(`${ROOT}models/widgets_v2.sql`)).toBe(
      "package:jaffle_shop,resource_type:model,path:models/widgets_v2.sql,widgets.v2",
    );
  });

  it.each([
    [
      "the root project's",
      `${ROOT}models/orders.sql`,
      "package:jaffle_shop,resource_type:model,path:models/orders.sql,orders",
    ],
    [
      "a package's",
      `${ROOT}dbt_packages/pkg/models/orders.sql`,
      // dbt-core reads a package node's `path:` relative to the package, dbt
      // Fusion from the root project: a union names both, each engine matches one.
      "package:pkg,resource_type:model,path:models/orders.sql,orders package:pkg,resource_type:model,path:dbt_packages/pkg/models/orders.sql,orders",
    ],
  ])(
    "selects %s model when two of that name exist, by the file previewed",
    (_whose, filePath, expected) => {
      // The base name is `orders` for both, so only the path can tell them
      // apart — and only `package:` can keep dbt from previewing both.
      expect(project().nodeRunSelector(filePath)).toBe(expected);
    },
  );

  it("qualifies the node by its own path, so a folder of the same name is not selected", () => {
    // dbt-core matches a bare name as a prefix of the fqn without the package:
    // `orders` also selects models under `models/orders/`. The path term keeps
    // the intersection to the one file.
    const p = createProject({
      canInjectNodeContextInSqlSnippetExecution: true,
      nodes: [
        ...NODES,
        {
          unique_id: "model.jaffle_shop.by_status",
          path: `${ROOT}models/orders/by_status.sql`,
          package_name: "jaffle_shop",
        },
      ],
    });
    expect(p.nodeRunSelector(`${ROOT}models/orders.sql`)).toBe(
      "package:jaffle_shop,resource_type:model,path:models/orders.sql,orders",
    );
    expect(p.nodeRunSelector(`${ROOT}models/orders/by_status.sql`)).toBe(
      "package:jaffle_shop,resource_type:model,path:models/orders/by_status.sql,by_status",
    );
  });

  it("refuses an analysis, which dbt show will not run as a model", () => {
    expect(project().nodeRunSelector(`${ROOT}analysis/orders.sql`)).toBe(
      undefined,
    );
  });

  it("refuses when the integration cannot supply the node as context", () => {
    // The Python bridge reports false; the extension must not test mode strings.
    expect(project(false).nodeRunSelector(`${ROOT}models/orders.sql`)).toBe(
      undefined,
    );
  });

  it("refuses a file that is not a node in the manifest", () => {
    expect(project().nodeRunSelector(`${ROOT}models/scratch_query.sql`)).toBe(
      undefined,
    );
  });

  it("refuses when there is no file, as for an untitled buffer", () => {
    expect(project().nodeRunSelector(undefined)).toBe(undefined);
  });
});

describe("offerModelRunOnIdentityFailure", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const NODE_RUN: NodeRun = {
    modelName: "stg_orders",
    limit: 500,
    nodeSelector: "package:jaffle_shop,resource_type:model,stg_orders",
    modelSql: "select 1 as id",
  };

  const project = () =>
    createProject({
      canInjectNodeContextInSqlSnippetExecution: true,
      nodes: [
        {
          unique_id: "model.jaffle_shop.stg_orders",
          path: "/w/jaffle_shop/models/staging/stg_orders.sql",
          package_name: "jaffle_shop",
        },
      ],
    });

  it("offers the saved-node run when the failure was about identity", async () => {
    const p = project();
    const wrapped = await p.offerModelRunOnIdentityFailure(
      executionThatThrows(
        new InlinePreviewError(
          "Model 'inline_query' must start with stg_",
          "select 1 as id",
        ),
      ),
      NODE_RUN,
    );

    await expect(wrapped.executeQuery()).rejects.toThrow(
      "must start with stg_",
    );
    expect(p.promptToRunAsModel).toHaveBeenCalledWith(NODE_RUN);
  });

  it("stays silent for an ordinary SQL error", async () => {
    const p = project();
    const wrapped = await p.offerModelRunOnIdentityFailure(
      executionThatThrows(new Error("relation does not exist")),
      NODE_RUN,
    );

    await expect(wrapped.executeQuery()).rejects.toThrow(
      "relation does not exist",
    );
    expect(p.promptToRunAsModel).not.toHaveBeenCalled();
  });

  it("passes successful results through untouched", async () => {
    const p = project();
    const result = { table: { column_names: [], column_types: [], rows: [] } };
    const wrapped = await p.offerModelRunOnIdentityFailure(
      Promise.resolve(
        new QueryExecution(
          async () => undefined,
          async () => result as any,
        ),
      ),
      NODE_RUN,
    );

    await expect(wrapped.executeQuery()).resolves.toBe(result);
    expect(p.promptToRunAsModel).not.toHaveBeenCalled();
  });
});

/** The open documents the offer looks through; only what `promptToRunAsModel` reads. */
type OpenDocument = {
  uri: { fsPath: string; toString(): string };
  save: () => Promise<boolean>;
  getText?: () => string;
};
const setOpenDocuments = (documents: OpenDocument[]) => {
  (workspace as unknown as { textDocuments: OpenDocument[] }).textDocuments =
    documents;
};

describe("promptToRunAsModel", () => {
  const RUN_AS_MODEL = "Save and run as model";
  const PROMPT_NODES = [
    {
      unique_id: "model.jaffle_shop.orders",
      path: "models/orders.sql",
      package_name: "jaffle_shop",
    },
  ];
  const nodeRun = {
    modelName: "orders",
    limit: 500,
    nodeSelector: "package:jaffle_shop,resource_type:model,orders",
    modelSql: "select 1",
    uri: {
      fsPath: "/p/models/orders.sql",
      toString: () => "file:///p/models/orders.sql",
    },
  };
  function promptingProject() {
    const p = createProject({
      canInjectNodeContextInSqlSnippetExecution: true,
      nodes: PROMPT_NODES,
    }) as any;
    delete p.promptToRunAsModel; // the real method
    p.executeSqlWithNodeContextWithLimitOnQueryPanel = jest.fn(
      async () => undefined,
    );
    (window.showWarningMessage as jest.Mock).mockReturnValue(
      Promise.resolve(RUN_AS_MODEL) as never,
    );
    return p;
  }
  afterEach(() => {
    setOpenDocuments([]);
    (window.showWarningMessage as jest.Mock).mockReset();
    (window.showWarningMessage as jest.Mock).mockReturnValue(
      Promise.resolve() as never,
    );
  });

  it("saves the open document, then runs the saved node", async () => {
    const p = promptingProject();
    const save = jest.fn(async () => true);
    setOpenDocuments([
      { uri: nodeRun.uri, save, getText: () => nodeRun.modelSql },
    ]);
    await p.promptToRunAsModel(nodeRun);
    expect(save).toHaveBeenCalledTimes(1);
    expect(
      p.executeSqlWithNodeContextWithLimitOnQueryPanel,
    ).toHaveBeenCalledWith(nodeRun);
    expect(window.showErrorMessage).not.toHaveBeenCalled();
  });

  it("shows the SQL that was saved, not the SQL the failed preview ran", async () => {
    // The warning is not modal: the buffer can change between the failed
    // inline run and the choice. The node runs what was saved, so the panel
    // and its history entry get that text (Codex round 3 on 270c5d04).
    const p = promptingProject();
    const save = jest.fn(async () => true);
    setOpenDocuments([
      { uri: nodeRun.uri, save, getText: () => "select 2 as id" },
    ]);
    await p.promptToRunAsModel({ ...nodeRun, modelSql: "select 1 as id" });
    expect(
      p.executeSqlWithNodeContextWithLimitOnQueryPanel,
    ).toHaveBeenCalledWith({ ...nodeRun, modelSql: "select 2 as id" });
  });

  it("stops with a message when the document was closed before the choice", async () => {
    const p = promptingProject();
    setOpenDocuments([]);
    await p.promptToRunAsModel(nodeRun);
    expect(
      p.executeSqlWithNodeContextWithLimitOnQueryPanel,
    ).not.toHaveBeenCalled();
    expect(window.showErrorMessage).toHaveBeenCalledWith(
      expect.stringContaining("is no longer open, so nothing was saved or run"),
    );
  });

  it("stops with a message when the save fails", async () => {
    const p = promptingProject();
    setOpenDocuments([{ uri: nodeRun.uri, save: jest.fn(async () => false) }]);
    await p.promptToRunAsModel(nodeRun);
    expect(
      p.executeSqlWithNodeContextWithLimitOnQueryPanel,
    ).not.toHaveBeenCalled();
    expect(window.showErrorMessage).toHaveBeenCalledWith(
      expect.stringContaining("Could not save"),
    );
  });

  it("runs nothing when the offer is dismissed", async () => {
    const p = promptingProject();
    (window.showWarningMessage as jest.Mock).mockReturnValue(
      Promise.resolve(undefined) as never,
    );
    setOpenDocuments([{ uri: nodeRun.uri, save: jest.fn(async () => true) }]);
    await p.promptToRunAsModel(nodeRun);
    expect(
      p.executeSqlWithNodeContextWithLimitOnQueryPanel,
    ).not.toHaveBeenCalled();
  });
});

describe("executeSqlWithNodeContextWithLimitOnQueryPanel", () => {
  it("hands the panel the model's SQL, not a comment, so history replays the model", async () => {
    const p = createProject({
      canInjectNodeContextInSqlSnippetExecution: true,
      nodes: [],
    }) as any;
    const fired: any[] = [];
    p.eventEmitterService = { fire: (e: unknown) => fired.push(e) };
    p.terminal = { info: jest.fn(), debug: jest.fn(), error: jest.fn() };
    p.getAdapterType = () => "duckdb";
    p.dbtProjectIntegration.executeSQLWithLimit = jest.fn(() =>
      Promise.resolve("execution"),
    );
    await p.executeSqlWithNodeContextWithLimitOnQueryPanel({
      modelName: "orders",
      limit: 500,
      nodeSelector:
        "package:jaffle_shop,resource_type:model,path:models/orders.sql,orders",
      modelSql: "select * from {{ ref('stg_orders') }}",
    });
    expect(fired).toHaveLength(1);
    expect(fired[0].command).toBe("executeQuery");
    expect(fired[0].payload.query).toBe(
      "select * from {{ ref('stg_orders') }}",
    );
    expect(p.dbtProjectIntegration.executeSQLWithLimit).toHaveBeenCalledWith(
      "select * from {{ ref('stg_orders') }}",
      "orders",
      500,
      {
        useNodeContext: true,
        nodeSelector:
          "package:jaffle_shop,resource_type:model,path:models/orders.sql,orders",
      },
    );
  });
});

describe("offerModelRunOnIdentityFailure when the offer itself fails", () => {
  it("reports a failed save or prompt instead of dropping it", async () => {
    const p = createProject({
      canInjectNodeContextInSqlSnippetExecution: true,
      nodes: [],
    });
    p.promptToRunAsModel.mockImplementation(() =>
      Promise.reject(new Error("disk full")),
    );
    const wrapped = await p.offerModelRunOnIdentityFailure(
      executionThatThrows(new InlinePreviewError("inline failed", "select 1")),
      {
        modelName: "orders",
        limit: 500,
        nodeSelector:
          "package:jaffle_shop,resource_type:model,path:models/orders.sql,orders",
        modelSql: "select 1",
      },
    );
    await expect(wrapped.executeQuery()).rejects.toThrow("inline failed");
    await new Promise((resolve) => setImmediate(resolve));
    expect(window.showErrorMessage).toHaveBeenCalledWith(
      expect.stringContaining("Could not run orders as a model: disk full"),
    );
  });
});

describe("executeSQLWithLimitOnQueryPanel routes by preview mode", () => {
  const SELECTOR =
    "package:jaffle_shop,resource_type:model,path:models/orders.sql,orders";
  const routed = async (previewMode: PreviewMode, filePath?: string) => {
    const p = createProject({
      canInjectNodeContextInSqlSnippetExecution: true,
      nodes: [
        {
          unique_id: "model.jaffle_shop.orders",
          path: "/w/jaffle_shop/models/orders.sql",
          package_name: "jaffle_shop",
        },
      ],
    }) as any;
    const fired: any[] = [];
    p.eventEmitterService = { fire: (e: unknown) => fired.push(e) };
    p.terminal = { info: jest.fn(), debug: jest.fn(), error: jest.fn() };
    p.getAdapterType = () => "duckdb";
    const inline = Symbol("inline execution");
    p.dbtProjectIntegration.executeSQLWithLimit = jest.fn(() => inline);
    p.executeSqlWithNodeContextWithLimitOnQueryPanel = jest.fn(() =>
      Promise.resolve(),
    );
    p.offerModelRunOnIdentityFailure = jest.fn(() => "wrapped");
    p.findNodeForFile = jest.fn(p.findNodeForFile.bind(p));
    const uri = filePath ? { fsPath: filePath } : undefined;
    await p.executeSQLWithLimitOnQueryPanel(
      "select 1",
      "orders",
      500,
      previewMode,
      uri,
    );
    return { p, fired, inline };
  };

  it("as-model with a node runs the node, not the editor text", async () => {
    const { p, fired } = await routed(
      "as-model",
      "/w/jaffle_shop/models/orders.sql",
    );
    expect(
      p.executeSqlWithNodeContextWithLimitOnQueryPanel,
    ).toHaveBeenCalledWith(
      expect.objectContaining({ nodeSelector: SELECTOR, modelSql: "select 1" }),
    );
    expect(fired).toHaveLength(0);
  });

  it("as-model without a node falls back to the plain inline run", async () => {
    const { p, fired, inline } = await routed(
      "as-model",
      "/w/jaffle_shop/models/other.sql",
    );
    expect(
      p.executeSqlWithNodeContextWithLimitOnQueryPanel,
    ).not.toHaveBeenCalled();
    expect(fired[0].payload.fn).toBe(inline);
    expect(p.offerModelRunOnIdentityFailure).not.toHaveBeenCalled();
  });

  it("inline-then-offer wraps the inline run with the offer", async () => {
    const { p, fired } = await routed(
      "inline-then-offer",
      "/w/jaffle_shop/models/orders.sql",
    );
    expect(p.offerModelRunOnIdentityFailure).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ nodeSelector: SELECTOR }),
    );
    expect(fired[0].payload.fn).toBe("wrapped");
    expect(
      p.executeSqlWithNodeContextWithLimitOnQueryPanel,
    ).not.toHaveBeenCalled();
  });

  it("inline never looks the node up: a selection preview pays no manifest scan", async () => {
    const { p } = await routed("inline", "/w/jaffle_shop/models/orders.sql");
    expect(p.findNodeForFile).not.toHaveBeenCalled();
  });

  it("inline runs the editor text with no offer, node or not", async () => {
    const { p, fired, inline } = await routed(
      "inline",
      "/w/jaffle_shop/models/orders.sql",
    );
    expect(fired[0].payload.fn).toBe(inline);
    expect(fired[0].payload.query).toBe("select 1");
    expect(p.offerModelRunOnIdentityFailure).not.toHaveBeenCalled();
    expect(
      p.executeSqlWithNodeContextWithLimitOnQueryPanel,
    ).not.toHaveBeenCalled();
  });
});
