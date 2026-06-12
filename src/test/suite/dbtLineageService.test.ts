import { describe, expect, it } from "@jest/globals";
import { DbtLineageService } from "../../services/dbtLineageService";

// Minimal NodeData-shaped edge.
function node(key: string, edgeType?: "data" | "constraint") {
  return { label: key, key, resourceType: "model", edgeType };
}

// Builds a DbtLineageService with the DI bypassed, a stubbed event carrying the
// given graphMetaMap, and createTable stubbed to a minimal { table: key }.
function makeService(graphMetaMap: any): DbtLineageService {
  const svc = Object.create(DbtLineageService.prototype) as DbtLineageService;
  (svc as any).queryManifestService = {
    getEventByCurrentProject: () => ({ event: { graphMetaMap } }),
  };
  (svc as any).createTable = (
    _e: unknown,
    _url: string | undefined,
    key: string,
  ) => ({
    table: key,
  });
  return svc;
}

describe("DbtLineageService — foreign-key-only edge hiding", () => {
  it("getUpstreamTables hides constraint edges and keeps data edges", () => {
    // upstream reads the `children` map
    const children = new Map([
      [
        "model.p.fact",
        {
          nodes: [
            node("model.p.int", "data"),
            node("model.p.dim", "constraint"),
          ],
        },
      ],
    ]);
    const svc = makeService({ children, parents: new Map() });

    const tables = svc
      .getUpstreamTables({ table: "model.p.fact" })
      .tables!.map((t) => t.table);
    expect(tables).toContain("model.p.int");
    expect(tables).not.toContain("model.p.dim");
  });

  it("getDownstreamTables hides constraint edges", () => {
    // downstream reads the `parents` map
    const parents = new Map([
      ["model.p.dim", { nodes: [node("model.p.fact", "constraint")] }],
      ["model.p.int", { nodes: [node("model.p.fact", "data")] }],
    ]);
    const svc = makeService({ parents, children: new Map() });

    // fact is only a constraint-child of dim → dim has no data-flow downstream
    expect(svc.getDownstreamTables({ table: "model.p.dim" }).tables).toEqual(
      [],
    );
    // but it's a real downstream of int
    expect(
      svc
        .getDownstreamTables({ table: "model.p.int" })
        .tables!.map((t) => t.table),
    ).toEqual(["model.p.fact"]);
  });

  it("treats untagged edges (no edgeType) as data-flow", () => {
    const children = new Map([
      ["model.p.fact", { nodes: [node("model.p.int")] }],
    ]);
    const svc = makeService({ children, parents: new Map() });
    expect(
      svc
        .getUpstreamTables({ table: "model.p.fact" })
        .tables!.map((t) => t.table),
    ).toEqual(["model.p.int"]);
  });

  it("getConnectedNodeCount excludes constraint edges", () => {
    const children = new Map([
      [
        "model.p.fact",
        {
          nodes: [
            node("model.p.int", "data"),
            node("model.p.dim", "constraint"),
          ],
        },
      ],
    ]);
    const svc = makeService({ children, parents: new Map() });
    const count = (svc as any).getConnectedNodeCount(children, "model.p.fact");
    expect(count).toBe(1);
  });
});
