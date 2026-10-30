import {
  InlinePreviewError,
  QueryExecution,
} from "@altimateai/dbt-integration";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";

import { DBTProject } from "../../dbt_client/dbtProject";

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
  project.promptToRunAsModel = jest.fn();
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
    ).toBe("package:jaffle_shop,resource_type:model,stg_orders");
  });

  it("names a versioned model by its version, not by its file name", () => {
    // `dbt show --select widgets_v2` resolves on dbt-core only because dbt also
    // matches the file name; the node is `widgets` version 2, and the id dbt
    // composes for it is what selects that one version on both engines.
    expect(project().nodeRunSelector(`${ROOT}models/widgets_v2.sql`)).toBe(
      "package:jaffle_shop,resource_type:model,widgets.v2",
    );
  });

  it.each([
    [
      "the root project's",
      `${ROOT}models/orders.sql`,
      "package:jaffle_shop,resource_type:model,orders",
    ],
    [
      "a package's",
      `${ROOT}dbt_packages/pkg/models/orders.sql`,
      "package:pkg,resource_type:model,orders",
    ],
  ])(
    "selects %s model when two of that name exist, by the file previewed",
    (_whose, filePath, expected) => {
      // The base name is `orders` for both, so only the path can tell them
      // apart — and only `package:` can keep dbt from previewing both.
      expect(project().nodeRunSelector(filePath)).toBe(expected);
    },
  );

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
