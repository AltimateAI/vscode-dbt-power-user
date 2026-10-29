import { describe, expect, it } from "@jest/globals";
import { DiagnosticSeverity } from "vscode";
import { DBTProject } from "../../dbt_client/dbtProject";
import {
  classifyLineageError,
  nodeCountBucket,
} from "../../webview_provider/lineageTelemetry";

describe("classifyLineageError", () => {
  // Messages as the lineage panel received them in the wild, one or more per
  // error class.
  const cases: [string, string][] = [
    [
      "Python process closed with exit code null and message: SIGKILL",
      "integration",
    ],
    [
      "Encountered an error: Session occupied. Please wait until your invocation has been completed.",
      "integration",
    ],
    [
      'There is a problem in your dbt project. Compilation failed: Runtime Error Could not read WritableManifest at "target/manifest.json" as JSON',
      "integration",
    ],
    [
      "dbt configuration is invalid : dbt not found. Please install dbt to use this extension.",
      "dbt_not_found",
    ],
    [
      "An error occured while initializing the dbt project: No module named 'dbt.adapters.snowflake'",
      "dbt_not_found",
    ],
    [
      'dbt configuration is invalid : Compilation Error dbt found 3 package(s) specified in packages.yml, but only 0 package(s) installed in dbt_packages. Run "dbt deps" to install package dependencies.',
      "packages",
    ],
    [
      "There is a problem in your dbt project. Compilation failed: Runtime Error Failed to read package: Runtime Error No dbt_project.yml found at expected path",
      "packages",
    ],
    [
      "There is a problem in your dbt project. Compilation failed: Compilation Error Reached EOF without finding a close tag for macro (searched from line 3)",
      "unclosed_jinja",
    ],
    [
      "dbt configuration is invalid : models/README.md, line 4: unexpected EOF, expected }}. dbt reads docs .md files as Jinja: check them for an unclosed {{ or {%.",
      "unclosed_jinja",
    ],
    [
      "dbt configuration is invalid : Parsing Error Env var required but not provided: 'DBT_PASSWORD'",
      "env_var",
    ],
    [
      "dbt configuration is invalid : Runtime Error Could not find profile named 'analytics'",
      "profile",
    ],
    [
      "There is a problem in your dbt project. Compilation failed: Runtime Error The profile 'analytics' does not have a target named 'prod'.",
      "profile",
    ],
    [
      "There is a problem in your dbt project. Compilation failed: Compilation Error Model 'model.shop.orders' (models/orders.sql) depends on a node named 'stg_orderz' which was not found",
      "missing_reference",
    ],
    [
      "dbt configuration is invalid : Compilation Error Model 'model.shop.orders' (models/orders.sql) depends on a source named 'raw.orders' which was not found",
      "missing_reference",
    ],
    [
      "There is a problem in your dbt project. Compilation failed: Compilation Error Documentation for 'model.shop.orders' depends on doc 'orders_doc'  which was not found",
      "missing_reference",
    ],
    [
      "There is a problem in your dbt project. Compilation failed: Runtime Error Resource names cannot contain spaces: * 'orders copy' (models/orders copy.sql)",
      "project",
    ],
    [
      "There is a problem in your dbt project. Compilation failed: Parsing Error Invalid test config given in models/schema.yml",
      "project",
    ],
    ["dbt_project.yml is invalid : bad indentation", "project"],
    ["<REDACTED: Generic Secret>", "other"],
  ];

  it.each(cases)("classifies %j as %s", (message, kind) => {
    expect(classifyLineageError(message)).toBe(kind);
  });
});

describe("nodeCountBucket", () => {
  it.each([
    [0, "0"],
    [1, "1-99"],
    [99, "1-99"],
    [100, "100-499"],
    [499, "100-499"],
    [500, "500-1999"],
    [1999, "500-1999"],
    [2000, "2000-9999"],
    [9999, "2000-9999"],
    [10000, "10000+"],
  ])("puts %i nodes in %s", (count, bucket) => {
    expect(nodeCountBucket(count)).toBe(bucket);
  });
});

describe("DBTProject.getBlockingDiagnostic", () => {
  const error = (message: string) => ({
    message,
    severity: DiagnosticSeverity.Error,
  });
  const warning = (message: string) => ({
    message,
    severity: DiagnosticSeverity.Warning,
  });

  // A project with the integration's diagnostics and the four VS Code
  // collections, each a map of file to diagnostics as VS Code iterates them.
  const project = (fields: {
    pythonBridge?: object[];
    rebuild?: object[];
    collections?: Partial<Record<string, object[]>>;
  }) => {
    const collection = (name: string) =>
      new Map(
        fields.collections?.[name]
          ? [["/ws/dbt_project.yml", fields.collections[name]]]
          : [],
      );
    return Object.assign(Object.create(DBTProject.prototype), {
      getCurrentProjectIntegration: () => ({
        getDiagnostics: () => ({
          pythonBridgeDiagnostics: fields.pythonBridge ?? [],
          rebuildManifestDiagnostics: fields.rebuild ?? [],
          projectConfigDiagnostics: [],
        }),
      }),
      projectHealth: collection("projectHealth"),
      pythonBridgeDiagnostics: collection("pythonBridgeDiagnostics"),
      rebuildManifestDiagnostics: collection("rebuildManifestDiagnostics"),
      projectConfigDiagnostics: collection("projectConfigDiagnostics"),
    }) as DBTProject;
  };

  it("keeps the integration diagnostic's own category", () => {
    const p = project({
      rebuild: [
        {
          message: "Compilation failed",
          severity: "error",
          category: "manifest-rebuild",
        },
      ],
    });
    expect(p.getBlockingDiagnostic()).toEqual({
      message: "Compilation failed",
      category: "manifest-rebuild",
    });
  });

  it("names the VS Code collection an error came from", () => {
    const p = project({
      collections: {
        projectConfigDiagnostics: [
          warning("a warning first"),
          error("dbt configuration is invalid : dbt not found."),
        ],
      },
    });
    expect(p.getBlockingDiagnostic()).toEqual({
      message: "dbt configuration is invalid : dbt not found.",
      category: "project-config",
    });
  });

  it("checks the integration before the collections, as the panel always has", () => {
    const p = project({
      pythonBridge: [
        {
          message: "bridge down",
          severity: "error",
          category: "python-bridge",
        },
      ],
      collections: { projectConfigDiagnostics: [error("config")] },
    });
    expect(p.getBlockingDiagnostic()?.message).toBe("bridge down");
  });

  it("returns nothing when only warnings stand", () => {
    const p = project({
      rebuild: [{ message: "w", severity: "warning", category: "x" }],
      collections: { projectHealth: [warning("w")] },
    });
    expect(p.getBlockingDiagnostic()).toBeUndefined();
    expect(() => p.throwDiagnosticsErrorIfAvailable()).not.toThrow();
  });

  it("still throws the same message for every other caller", () => {
    const p = project({
      collections: { rebuildManifestDiagnostics: [error("parse failed")] },
    });
    expect(() => p.throwDiagnosticsErrorIfAvailable()).toThrow("parse failed");
  });

  it("takes the first error in collection order", () => {
    const p = project({
      collections: {
        projectHealth: [error("health")],
        projectConfigDiagnostics: [error("config")],
      },
    });
    expect(p.getBlockingDiagnostic()).toEqual({
      message: "health",
      category: "project-health",
    });
  });
});
