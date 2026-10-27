import { beforeEach, describe, expect, it, jest } from "@jest/globals";

import { DBTProject } from "../../dbt_client/dbtProject";

/**
 * The Compiled SQL preview compiled the editor text as an anonymous query, so
 * Jinja reading the node's own properties — `model.name`, `model.primary_key`,
 * `this` — resolved against a placeholder. Compiling the real node fixes that,
 * but dbt reads the node from disk, so the routing turns on whether the buffer
 * holds anything the file does not.
 */

interface TestableProject {
  compileQueryForPreview(
    query: string,
    modelName: string,
    hasUnsavedEdits: boolean,
  ): Promise<string>;
  canCompileAsModel(modelName: string): boolean;
}

function createProject(opts: {
  knownModels: string[];
  /** The execute path's capability, which this routing must ignore. */
  canInjectNodeContextInSqlSnippetExecution?: boolean;
}) {
  const unsafeCompileNode = jest.fn(async () => "compiled from the node");
  const unsafeCompileQuery = jest.fn(async () => "compiled from the buffer");
  const project = Object.create(DBTProject.prototype) as TestableProject;
  (project as any).dbtProjectIntegration = {
    unsafeCompileNode,
    unsafeCompileQuery,
    canInjectNodeContextInSqlSnippetExecution: () =>
      opts.canInjectNodeContextInSqlSnippetExecution ?? true,
  };
  (project as any)._manifestCacheEvent = {
    nodeMetaMap: {
      lookupByBaseName: (name: string) =>
        opts.knownModels.includes(name) ? { name } : undefined,
    },
  };
  (project as any).throwIfNotAuthenticated = () => undefined;
  return { project, unsafeCompileNode, unsafeCompileQuery };
}

const SQL = "select 1 as id";

describe("compileQueryForPreview", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("compiles the real node when the file has no unsaved edits", async () => {
    const { project, unsafeCompileNode, unsafeCompileQuery } = createProject({
      knownModels: ["empty_order_lines"],
    });

    const compiled = await project.compileQueryForPreview(
      SQL,
      "empty_order_lines",
      false,
    );

    expect(compiled).toBe("compiled from the node");
    expect(unsafeCompileNode).toHaveBeenCalledWith("empty_order_lines");
    expect(unsafeCompileQuery).not.toHaveBeenCalled();
  });

  it("compiles the buffer when there are unsaved edits", async () => {
    // Showing compiled output for the file on disk would answer a question the
    // user did not ask.
    const { project, unsafeCompileNode, unsafeCompileQuery } = createProject({
      knownModels: ["empty_order_lines"],
    });

    const compiled = await project.compileQueryForPreview(
      SQL,
      "empty_order_lines",
      true,
    );

    expect(compiled).toBe("compiled from the buffer");
    expect(unsafeCompileQuery).toHaveBeenCalledWith(SQL, "empty_order_lines");
    expect(unsafeCompileNode).not.toHaveBeenCalled();
  });

  it("compiles the buffer for a file that is not a node we know", async () => {
    const { project, unsafeCompileNode, unsafeCompileQuery } = createProject({
      knownModels: [],
    });

    const compiled = await project.compileQueryForPreview(
      SQL,
      "scratch_query",
      false,
    );

    expect(compiled).toBe("compiled from the buffer");
    expect(unsafeCompileQuery).toHaveBeenCalledWith(SQL, "scratch_query");
    expect(unsafeCompileNode).not.toHaveBeenCalled();
  });

  it("compiles the node in Python-bridge mode too", async () => {
    // The bridge cannot supply a node as context to an inline snippet, but it
    // compiles a node correctly via compile_node(get_ref_node(...)) — which is
    // what this path calls. #2101 was reported on that mode, so treating it as
    // an exception would deny the fix to the reporter.
    const { project, unsafeCompileNode } = createProject({
      knownModels: ["empty_order_lines"],
      canInjectNodeContextInSqlSnippetExecution: false,
    });

    const compiled = await project.compileQueryForPreview(
      SQL,
      "empty_order_lines",
      false,
    );

    expect(compiled).toBe("compiled from the node");
    expect(unsafeCompileNode).toHaveBeenCalledWith("empty_order_lines");
  });

  it("refuses to treat an unknown file as a node", () => {
    const { project } = createProject({ knownModels: ["empty_order_lines"] });

    expect(project.canCompileAsModel("empty_order_lines")).toBe(true);
    expect(project.canCompileAsModel("not_a_model")).toBe(false);
  });

  it("treats a project with no parsed manifest as having no nodes", () => {
    const { project } = createProject({ knownModels: ["empty_order_lines"] });
    (project as any)._manifestCacheEvent = undefined;

    expect(project.canCompileAsModel("empty_order_lines")).toBe(false);
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
    // Nothing is open, so the provider reads the file from disk — exactly what
    // compiling the node does.
    expect(hasUnsavedEdits(undefined)).toBe(false);
  });

  it("is false for an open document with no unsaved edits", () => {
    expect(hasUnsavedEdits({ isDirty: false })).toBe(false);
  });

  it("is true for an open document with unsaved edits", () => {
    expect(hasUnsavedEdits({ isDirty: true })).toBe(true);
  });
});
