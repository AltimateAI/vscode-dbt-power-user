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
 * has to be sure the editor holds nothing the file does not.
 */

interface TestableProject {
  canRunAsModel(modelName: string): boolean;
  offerModelRunOnIdentityFailure(
    execution: Promise<QueryExecution>,
    modelName: string,
    limit: number,
  ): Promise<QueryExecution>;
  promptToRunAsModel: jest.Mock;
}

function createProject(opts: {
  canInjectNodeContextInSqlSnippetExecution: boolean;
  knownModels: string[];
}): TestableProject {
  const project = Object.create(DBTProject.prototype) as TestableProject;
  (project as any).dbtProjectIntegration = {
    canInjectNodeContextInSqlSnippetExecution: () =>
      opts.canInjectNodeContextInSqlSnippetExecution,
  };
  (project as any)._manifestCacheEvent = {
    nodeMetaMap: {
      lookupByBaseName: (name: string) =>
        opts.knownModels.includes(name) ? { name } : undefined,
    },
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

describe("canRunAsModel", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("allows it for a known model on a supporting integration", () => {
    const project = createProject({
      canInjectNodeContextInSqlSnippetExecution: true,
      knownModels: ["stg_orders"],
    });

    expect(project.canRunAsModel("stg_orders")).toBe(true);
  });

  it("refuses when the integration cannot supply the node as context", () => {
    // The Python bridge reports false; the extension must not test mode strings.
    const project = createProject({
      canInjectNodeContextInSqlSnippetExecution: false,
      knownModels: ["stg_orders"],
    });

    expect(project.canRunAsModel("stg_orders")).toBe(false);
  });

  it("refuses when the file is not a node in the manifest", () => {
    const project = createProject({
      canInjectNodeContextInSqlSnippetExecution: true,
      knownModels: ["stg_orders"],
    });

    expect(project.canRunAsModel("scratch_query")).toBe(false);
  });
});

describe("offerModelRunOnIdentityFailure", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const project = () =>
    createProject({
      canInjectNodeContextInSqlSnippetExecution: true,
      knownModels: ["stg_orders"],
    });

  it("offers the saved-node run when the failure was about identity", async () => {
    const p = project();
    const wrapped = await p.offerModelRunOnIdentityFailure(
      executionThatThrows(
        new InlinePreviewError(
          "Model 'inline_query' must start with stg_",
        ),
      ),
      "stg_orders",
      500,
    );

    await expect(wrapped.executeQuery()).rejects.toThrow(
      "must start with stg_",
    );
    expect(p.promptToRunAsModel).toHaveBeenCalledWith(
      "stg_orders",
      500,
      undefined,
    );
  });

  it("stays silent for an ordinary SQL error", async () => {
    const p = project();
    const wrapped = await p.offerModelRunOnIdentityFailure(
      executionThatThrows(new Error("relation does not exist")),
      "stg_orders",
      500,
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
      "stg_orders",
      500,
    );

    await expect(wrapped.executeQuery()).resolves.toBe(result);
    expect(p.promptToRunAsModel).not.toHaveBeenCalled();
  });
});
