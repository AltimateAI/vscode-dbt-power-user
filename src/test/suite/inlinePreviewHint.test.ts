import {
  InlinePreviewCompilationError,
  QueryExecution,
} from "@altimateai/dbt-integration";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { workspace } from "vscode";

import { DBTProject } from "../../dbt_client/dbtProject";

/**
 * The hint that points a failed inline preview at the Execute dbt Model
 * command is only useful when that command would actually work: a real node to
 * select, an integration that implements it, and a preview that sent the whole
 * saved file rather than a selection or unsaved edits.
 */

interface TestableProject {
  canOfferModelPreview(modelName: string, couldRunAsModel: boolean): boolean;
  withModelPreviewHint(
    execution: Promise<QueryExecution>,
  ): Promise<QueryExecution>;
}

function createProject(opts: {
  integration: string;
  knownModels: string[];
}): TestableProject {
  const project = Object.create(DBTProject.prototype) as TestableProject;
  (project as any)._manifestCacheEvent = {
    nodeMetaMap: {
      lookupByBaseName: (name: string) =>
        opts.knownModels.includes(name) ? { name } : undefined,
    },
  };
  (workspace.getConfiguration as jest.Mock).mockReturnValue({
    get: (_key: string, _fallback: unknown) => opts.integration,
  });
  return project;
}

describe("canOfferModelPreview", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("offers the hint for a saved, unedited model file", () => {
    const project = createProject({
      integration: "fusion",
      knownModels: ["stg_orders"],
    });

    expect(project.canOfferModelPreview("stg_orders", true)).toBe(true);
  });

  it("stays silent when a selection or unsaved edit produced the query", () => {
    const project = createProject({
      integration: "fusion",
      knownModels: ["stg_orders"],
    });

    expect(project.canOfferModelPreview("stg_orders", false)).toBe(false);
  });

  it("stays silent in Python-bridge mode, where the command is unavailable", () => {
    const project = createProject({
      integration: "core",
      knownModels: ["stg_orders"],
    });

    expect(project.canOfferModelPreview("stg_orders", true)).toBe(false);
  });

  it("stays silent when the file is not a model in the manifest", () => {
    const project = createProject({
      integration: "fusion",
      knownModels: ["stg_orders"],
    });

    expect(project.canOfferModelPreview("scratch_query", true)).toBe(false);
  });
});

describe("withModelPreviewHint", () => {
  const project = () =>
    createProject({ integration: "fusion", knownModels: ["stg_orders"] });

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

  it("appends the hint to an inline compile failure", async () => {
    const wrapped = await project().withModelPreviewHint(
      executionThatThrows(
        new InlinePreviewCompilationError(
          "Model 'inline_be1ce4b2' must start with stg_",
        ),
      ),
    );

    await expect(wrapped.executeQuery()).rejects.toThrow(
      /must start with stg_[\s\S]*Execute dbt Model/,
    );
  });

  it("leaves unrelated errors untouched", async () => {
    const wrapped = await project().withModelPreviewHint(
      executionThatThrows(new Error("relation does not exist")),
    );

    await expect(wrapped.executeQuery()).rejects.toThrow(
      /^relation does not exist$/,
    );
  });

  it("passes successful results through", async () => {
    const result = { table: { column_names: [], column_types: [], rows: [] } };
    const wrapped = await project().withModelPreviewHint(
      Promise.resolve(
        new QueryExecution(
          async () => undefined,
          async () => result as any,
        ),
      ),
    );

    await expect(wrapped.executeQuery()).resolves.toBe(result);
  });
});
