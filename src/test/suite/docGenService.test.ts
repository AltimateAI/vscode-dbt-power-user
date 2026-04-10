import {
  NodeMetaData,
  NodeMetaMap,
  RESOURCE_TYPE_MODEL,
} from "@altimateai/dbt-integration";
import { describe, expect, it, jest } from "@jest/globals";
import { DocGenService } from "../../services/docGenService";

/**
 * Regression tests for https://github.com/AltimateAI/vscode-dbt-power-user/issues/1706
 *
 * The documentation editor resolved manifest nodes by bare filename via
 * `nodeMetaMap.lookupByBaseName(modelName)`. Because both models and snapshots
 * populate the same name-keyed lookup map, a snapshot sharing a filename with
 * a model (e.g. `orders.sql` existing as both) would shadow the model and the
 * editor either showed snapshot metadata or refused to load with
 * "This file appears to be a snapshot". The fix routes resolution through the
 * file path AND resource_type so the collision can never occur.
 */
describe("DocGenService - model/snapshot name collision (#1706)", () => {
  const MODEL_PATH = "/workspace/project/models/marts/orders.sql";
  const SNAPSHOT_PATH = "/workspace/project/snapshots/orders.sql";

  const modelNode: NodeMetaData = {
    unique_id: "model.project.orders",
    path: MODEL_PATH,
    database: "db",
    schema: "schema",
    alias: "orders",
    name: "orders",
    package_name: "project",
    description: "The canonical orders model",
    patch_path: "",
    columns: {
      order_id: {
        name: "order_id",
        description: "PK",
        data_type: "integer",
        meta: {},
      },
    },
    config: { materialized: "table" },
    resource_type: RESOURCE_TYPE_MODEL,
    depends_on: { nodes: [], macros: [] } as any,
    is_external_project: false,
    compiled_path: "",
    meta: {},
  };

  const snapshotNode: NodeMetaData = {
    unique_id: "snapshot.project.orders",
    path: SNAPSHOT_PATH,
    database: "db",
    schema: "snapshots",
    alias: "orders",
    name: "orders",
    package_name: "project",
    description: "Orders snapshot",
    patch_path: "",
    columns: {
      order_id: {
        name: "order_id",
        description: "PK (snapshot)",
        data_type: "integer",
        meta: {},
      },
    },
    config: { materialized: "snapshot" },
    resource_type: "snapshot",
    depends_on: { nodes: [], macros: [] } as any,
    is_external_project: false,
    compiled_path: "",
    meta: {},
  };

  /**
   * Build a NodeMetaMap stub that mirrors the real `NodeMetaMapImpl`
   * collision behaviour: `lookupByBaseName("orders")` returns whichever node
   * was registered last (last-write-wins on the shared name map).
   */
  function buildNodeMetaMap(
    nodes: NodeMetaData[],
    baseNameWinner: NodeMetaData,
  ): NodeMetaMap {
    return {
      lookupByBaseName: (modelBaseName: string) =>
        modelBaseName === baseNameWinner.name ? baseNameWinner : undefined,
      lookupByUniqueId: (uniqueId: string) =>
        nodes.find((n) => n.unique_id === uniqueId),
      nodes: () => nodes[Symbol.iterator](),
    };
  }

  function buildService(nodeMetaMap: NodeMetaMap): DocGenService {
    const service = Object.create(DocGenService.prototype) as DocGenService;
    (service as any).queryManifestService = {
      getEventByCurrentProject: jest.fn().mockReturnValue({
        event: { nodeMetaMap },
      }),
    };
    return service;
  }

  it("returns the model when the snapshot is iterated last (would previously shadow it)", () => {
    const nodes = [modelNode, snapshotNode];
    const nodeMetaMap = buildNodeMetaMap(nodes, snapshotNode);
    const service = buildService(nodeMetaMap);

    // Simulate opening the model file.
    const result = (service as any).getCurrentNode("orders", MODEL_PATH) as
      | NodeMetaData
      | undefined;

    expect(result).toBeDefined();
    expect(result!.unique_id).toBe("model.project.orders");
    expect(result!.resource_type).toBe(RESOURCE_TYPE_MODEL);
  });

  it("returns the model when the model is iterated last", () => {
    const nodes = [snapshotNode, modelNode];
    const nodeMetaMap = buildNodeMetaMap(nodes, modelNode);
    const service = buildService(nodeMetaMap);

    const result = (service as any).getCurrentNode("orders", MODEL_PATH) as
      | NodeMetaData
      | undefined;

    expect(result).toBeDefined();
    expect(result!.unique_id).toBe("model.project.orders");
  });

  it("returns the snapshot when the active file is actually the snapshot path", () => {
    // Opening the snapshot file should still resolve a node so downstream
    // code can show an accurate "this is a snapshot, not a model" message.
    const nodes = [modelNode, snapshotNode];
    const nodeMetaMap = buildNodeMetaMap(nodes, modelNode);
    const service = buildService(nodeMetaMap);

    const result = (service as any).getCurrentNode("orders", SNAPSHOT_PATH) as
      | NodeMetaData
      | undefined;

    expect(result).toBeDefined();
    expect(result!.unique_id).toBe("snapshot.project.orders");
    expect(result!.resource_type).toBe("snapshot");
  });

  it("falls back to lookupByBaseName when no node has a matching path (dbt Cloud)", () => {
    // dbt Cloud / remote manifests may not populate `path`.
    const cloudModelNode: NodeMetaData = {
      ...modelNode,
      path: undefined,
    };
    const nodes = [cloudModelNode];
    const nodeMetaMap = buildNodeMetaMap(nodes, cloudModelNode);
    const service = buildService(nodeMetaMap);

    const result = (service as any).getCurrentNode("orders", MODEL_PATH) as
      | NodeMetaData
      | undefined;

    expect(result).toBeDefined();
    expect(result!.unique_id).toBe("model.project.orders");
  });

  it("returns undefined when there is no manifest event", () => {
    const service = Object.create(DocGenService.prototype) as DocGenService;
    (service as any).queryManifestService = {
      getEventByCurrentProject: jest.fn().mockReturnValue(undefined),
    };

    const result = (service as any).getCurrentNode("orders", MODEL_PATH);

    expect(result).toBeUndefined();
  });
});
