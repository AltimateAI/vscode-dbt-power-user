import { NodeMetaMap, NodeParser } from "@altimateai/dbt-integration";
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from "@jest/globals";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import * as path from "path";
import * as vscode from "vscode";
import { DBTProjectContainer } from "../../dbt_client/dbtProjectContainer";
import { ManifestCacheChangedEvent } from "../../dbt_client/event/manifestCacheChangedEvent";
import { ModelDefinitionProvider } from "../../definition_provider/modelDefinitionProvider";
import { ModelHoverProvider } from "../../hover_provider/modelHoverProvider";
import { TelemetryService } from "../../telemetry";

// Hover and go-to-definition for ref() in a dbt Mesh setup: a consumer
// project ("marketing") refs a producer ("platform") with two-argument refs.
// A plugin such as dbt-loom injects the producer's public models into the
// consumer manifest without a file path, description or columns; the node
// maps below come from the real NodeParser over manifest nodes shaped that way.

// The shared vscode mock has no Hover / MarkdownString.
class FakeMarkdownString {
  value = "";
  supportHtml = false;
  isTrusted = false;
  supportThemeIcons = false;
  appendMarkdown(text: string) {
    this.value += text;
    return this;
  }
  appendText(text: string) {
    this.value += text;
    return this;
  }
}
class FakeHover {
  constructor(
    public contents: FakeMarkdownString,
    public range: unknown,
  ) {}
}

const terminal = {
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  log: jest.fn(),
  trace: jest.fn(),
} as any;

const modelNode = (
  packageName: string,
  name: string,
  originalFilePath: string,
  extra: Record<string, unknown> = {},
) => ({
  unique_id: `model.${packageName}.${name}`,
  resource_type: "model",
  name,
  package_name: packageName,
  original_file_path: originalFilePath,
  description: "",
  columns: {},
  config: {},
  depends_on: { nodes: [], macros: [] },
  ...extra,
});

// What dbt-loom injects into the consumer manifest for a producer model.
const injectedNode = (
  packageName: string,
  name: string,
  extra: Record<string, unknown> = {},
) => modelNode(packageName, name, "", extra);

const buildNodeMap = (
  projectRoot: string,
  projectName: string,
  nodes: Record<string, unknown>[],
): Promise<NodeMetaMap> =>
  new NodeParser(terminal).createNodeMetaMap(nodes, {
    getProjectRoot: () => projectRoot,
    getProjectName: () => projectName,
    getPackageInstallPath: () => path.join(projectRoot, "dbt_packages"),
    getTargetPath: () => path.join(projectRoot, "target"),
  } as any);

// Settles the provider promise, failing the test if it never does.
const settle = async <T>(result: unknown): Promise<T> => {
  const pending = Symbol("pending");
  const value = await Promise.race([
    Promise.resolve(result as T),
    new Promise<typeof pending>((r) => setTimeout(() => r(pending), 500)),
  ]);
  if (value === pending) {
    throw new Error("provider promise never settled");
  }
  return value as T;
};

describe("ref() hover and go-to-definition across packages and projects", () => {
  let tmp: string;
  let marketingRoot: string;
  let platformRoot: string;
  let jaffleRoot: string;
  let marketingMap: NodeMetaMap;
  let platformMap: NodeMetaMap;
  let jaffleMap: NodeMetaMap;
  let manifestHandlers: Array<(event: ManifestCacheChangedEvent) => void>;
  let container: jest.Mocked<DBTProjectContainer>;
  let telemetry: jest.Mocked<TelemetryService>;
  let hoverProvider: ModelHoverProvider;
  let definitionProvider: ModelDefinitionProvider;
  const savedVscode: Record<string, unknown> = {};

  beforeAll(async () => {
    savedVscode.Hover = (vscode as any).Hover;
    savedVscode.MarkdownString = (vscode as any).MarkdownString;
    (vscode as any).Hover = FakeHover;
    (vscode as any).MarkdownString = FakeMarkdownString;

    tmp = mkdtempSync(path.join(tmpdir(), "ref-lookup-"));
    marketingRoot = path.join(tmp, "marketing");
    platformRoot = path.join(tmp, "platform");
    jaffleRoot = path.join(tmp, "jaffle_shop");
    // An installed package with a model that shares a name with a local one.
    const pkgModel = path.join(
      marketingRoot,
      "dbt_packages",
      "audit_pkg",
      "models",
      "orders.sql",
    );
    mkdirSync(path.dirname(pkgModel), { recursive: true });
    writeFileSync(pkgModel, "select 1 as id\n");
    writeFileSync(
      path.join(path.dirname(pkgModel), "audit_events.sql"),
      "select 1 as id\n",
    );

    marketingMap = await buildNodeMap(marketingRoot, "marketing", [
      modelNode("marketing", "orders", path.join("models", "orders.sql"), {
        description: "MARKETING orders",
      }),
      modelNode(
        "marketing",
        "customer_segments",
        path.join("models", "customer_segments.sql"),
      ),
      modelNode(
        "marketing",
        "fct_orders",
        path.join("models", "fct_orders_v1.sql"),
        {
          unique_id: "model.marketing.fct_orders.v1",
          version: 1,
          latest_version: 2,
        },
      ),
      modelNode(
        "marketing",
        "fct_orders",
        path.join("models", "fct_orders_v2.sql"),
        {
          unique_id: "model.marketing.fct_orders.v2",
          version: 2,
          latest_version: 2,
        },
      ),
      modelNode("audit_pkg", "orders", path.join("models", "orders.sql"), {
        description: "AUDIT_PKG orders",
      }),
      modelNode(
        "audit_pkg",
        "audit_events",
        path.join("models", "audit_events.sql"),
      ),
      injectedNode("platform", "dim_customers"),
      injectedNode("platform", "orders"),
      // A stale producer manifest: the consumer resolved v1 as the latest.
      injectedNode("platform", "dim_accounts", {
        unique_id: "model.platform.dim_accounts.v1",
        version: 1,
        latest_version: 1,
      }),
      injectedNode("platform", "dim_regions", {
        unique_id: "model.platform.dim_regions.v1",
        version: 1,
        latest_version: 1,
      }),
    ]);
    platformMap = await buildNodeMap(platformRoot, "platform", [
      modelNode(
        "platform",
        "dim_customers",
        path.join("models", "dim_customers.sql"),
        {
          description: "PLATFORM dim_customers",
          columns: {
            customer_id: {
              name: "customer_id",
              description: "Primary key",
              data_type: "",
            },
          },
        },
      ),
      modelNode("platform", "orders", path.join("models", "orders.sql"), {
        description: "PLATFORM orders",
      }),
      ...[1, 2].map((v) =>
        modelNode(
          "platform",
          "dim_accounts",
          path.join("models", `dim_accounts_v${v}.sql`),
          {
            unique_id: `model.platform.dim_accounts.v${v}`,
            version: v,
            latest_version: 2,
          },
        ),
      ),
      // The producer no longer has the version the consumer resolved.
      modelNode(
        "platform",
        "dim_regions",
        path.join("models", "dim_regions_v2.sql"),
        {
          unique_id: "model.platform.dim_regions.v2",
          version: 2,
          latest_version: 2,
        },
      ),
    ]);
    jaffleMap = await buildNodeMap(jaffleRoot, "jaffle_shop", [
      modelNode(
        "jaffle_shop",
        "stg_customers",
        path.join("models", "staging", "stg_customers.sql"),
        { description: "JAFFLE stg_customers" },
      ),
    ]);
  });

  afterAll(() => {
    (vscode as any).Hover = savedVscode.Hover;
    (vscode as any).MarkdownString = savedVscode.MarkdownString;
    rmSync(tmp, { recursive: true, force: true });
  });

  const rootOf = (fsPath: string) =>
    [marketingRoot, platformRoot, jaffleRoot].find(
      (root) => fsPath === root || fsPath.startsWith(root + path.sep),
    );

  beforeEach(() => {
    manifestHandlers = [];
    container = {
      onManifestChanged: (handler: any) => {
        manifestHandlers.push(handler);
        return { dispose: jest.fn() };
      },
      findDBTProject: jest.fn((uri: any) => {
        const root = rootOf(uri.fsPath);
        return root
          ? { projectRoot: vscode.Uri.file(root), getProjectName: jest.fn() }
          : undefined;
      }),
      getProjectRootpath: jest.fn((uri: any) => {
        const root = rootOf(uri.fsPath);
        return root ? vscode.Uri.file(root) : undefined;
      }),
      getFromWorkspaceState: jest.fn(),
    } as any;
    telemetry = { sendTelemetryEvent: jest.fn() } as any;
    hoverProvider = new ModelHoverProvider(container, telemetry, terminal);
    definitionProvider = new ModelDefinitionProvider(
      container,
      telemetry,
      terminal,
    );
  });

  afterEach(() => {
    hoverProvider.dispose();
    definitionProvider.dispose();
    jest.clearAllMocks();
  });

  const load = (...projects: [string, string, NodeMetaMap][]) => {
    const event = {
      added: projects.map(([root, name, nodeMetaMap]) => ({
        project: {
          projectRoot: vscode.Uri.file(root),
          getProjectName: () => name,
        },
        nodeMetaMap,
      })),
    } as any;
    manifestHandlers.forEach((handler) => handler(event));
  };
  const loadConsumer = () => load([marketingRoot, "marketing", marketingMap]);
  const loadBoth = () =>
    load(
      [platformRoot, "platform", platformMap],
      [marketingRoot, "marketing", marketingMap],
    );

  // `refText` is the whole ref(...) call, `word` the identifier under the cursor.
  const doc = (root: string, refText: string, word: string) => {
    const refRange = { kind: "ref" };
    const wordRange = { kind: "word" };
    return {
      uri: vscode.Uri.file(path.join(root, "models", "customer_segments.sql")),
      getWordRangeAtPosition: (_pos: unknown, regex?: RegExp) =>
        regex ? refRange : wordRange,
      getText: (range: unknown) => (range === refRange ? refText : word),
    } as any;
  };
  const position = new vscode.Position(0, 10);

  const hoverText = async (root: string, refText: string, word: string) => {
    const hover = await settle<FakeHover | undefined>(
      hoverProvider.provideHover(doc(root, refText, word), position, {} as any),
    );
    return hover?.contents.value;
  };
  const definitionPath = async (
    root: string,
    refText: string,
    word: string,
  ) => {
    const location = await settle<any>(
      definitionProvider.provideDefinition(
        doc(root, refText, word),
        position,
        {} as any,
      ),
    );
    return location?.uri.fsPath;
  };

  describe("two-argument ref to an installed package", () => {
    it("resolves to the package model, not the same-named local model", async () => {
      loadConsumer();
      const ref = "ref('audit_pkg', 'orders')";
      expect(await hoverText(marketingRoot, ref, "orders")).toContain(
        "AUDIT_PKG orders",
      );
      expect(await definitionPath(marketingRoot, ref, "orders")).toBe(
        path.join(
          marketingRoot,
          "dbt_packages",
          "audit_pkg",
          "models",
          "orders.sql",
        ),
      );
    });
  });

  describe("two-argument ref to a dbt Mesh producer", () => {
    it("with only the consumer loaded, hovers the injected node and has no file to open", async () => {
      loadConsumer();
      const ref = "ref('platform', 'dim_customers')";
      const hover = await hoverText(marketingRoot, ref, "dim_customers");
      expect(hover).toContain("dim_customers");
      expect(hover).not.toContain("PLATFORM");
      expect(await definitionPath(marketingRoot, ref, "dim_customers")).toBe(
        undefined,
      );
    });

    it("with only the consumer loaded, a name collision does not resolve to the local model", async () => {
      loadConsumer();
      const ref = "ref('platform', 'orders')";
      const hover = await hoverText(marketingRoot, ref, "orders");
      expect(hover).toContain("<strong>orders</strong>");
      expect(hover).not.toContain("MARKETING orders");
      expect(await definitionPath(marketingRoot, ref, "orders")).toBe(
        undefined,
      );
    });

    it("with the producer loaded, uses the producer's node and file", async () => {
      loadBoth();
      const ref = "ref('platform', 'dim_customers')";
      const hover = await hoverText(marketingRoot, ref, "dim_customers");
      expect(hover).toContain("PLATFORM dim_customers");
      expect(hover).toContain("customer_id");
      expect(await definitionPath(marketingRoot, ref, "dim_customers")).toBe(
        path.join(platformRoot, "models", "dim_customers.sql"),
      );
    });

    it("with the producer loaded, opens the version the consumer resolved, not the producer's latest", async () => {
      loadBoth();
      const ref = "ref('platform', 'dim_accounts')";
      expect(await definitionPath(marketingRoot, ref, "dim_accounts")).toBe(
        path.join(platformRoot, "models", "dim_accounts_v1.sql"),
      );
    });

    it("with the producer loaded, falls back to the producer's latest when it lacks the consumer's version", async () => {
      loadBoth();
      const ref = "ref('platform', 'dim_regions')";
      expect(await definitionPath(marketingRoot, ref, "dim_regions")).toBe(
        path.join(platformRoot, "models", "dim_regions_v2.sql"),
      );
    });

    it("with the producer loaded, a name collision opens the producer's model", async () => {
      loadBoth();
      const ref = "ref('platform', 'orders')";
      expect(await hoverText(marketingRoot, ref, "orders")).toContain(
        "PLATFORM orders",
      );
      expect(await definitionPath(marketingRoot, ref, "orders")).toBe(
        path.join(platformRoot, "models", "orders.sql"),
      );
    });

    it("settles with no result for an unknown model", async () => {
      loadBoth();
      const ref = "ref('platform', 'nope')";
      expect(await hoverText(marketingRoot, ref, "nope")).toBe(undefined);
      expect(await definitionPath(marketingRoot, ref, "nope")).toBe(undefined);
    });
  });

  describe("single-argument ref", () => {
    it("resolves to the current project's model before a same-named package model", async () => {
      loadBoth();
      const ref = "ref('orders')";
      expect(await hoverText(marketingRoot, ref, "orders")).toContain(
        "MARKETING orders",
      );
      expect(await definitionPath(marketingRoot, ref, "orders")).toBe(
        path.join(marketingRoot, "models", "orders.sql"),
      );
    });

    it("still resolves a model that only an installed package has", async () => {
      loadConsumer();
      expect(
        await definitionPath(
          marketingRoot,
          "ref('audit_events')",
          "audit_events",
        ),
      ).toBe(
        path.join(
          marketingRoot,
          "dbt_packages",
          "audit_pkg",
          "models",
          "audit_events.sql",
        ),
      );
    });

    it("resolves a versioned model to its latest version", async () => {
      loadConsumer();
      expect(
        await definitionPath(marketingRoot, "ref('fct_orders')", "fct_orders"),
      ).toBe(path.join(marketingRoot, "models", "fct_orders_v2.sql"));
    });

    it("settles with no result for an unknown model", async () => {
      loadConsumer();
      expect(await hoverText(marketingRoot, "ref('nope')", "nope")).toBe(
        undefined,
      );
      expect(await definitionPath(marketingRoot, "ref('nope')", "nope")).toBe(
        undefined,
      );
    });

    it("is unchanged in a single-project workspace", async () => {
      load([jaffleRoot, "jaffle_shop", jaffleMap]);
      const ref = "ref('stg_customers')";
      expect(await hoverText(jaffleRoot, ref, "stg_customers")).toContain(
        "JAFFLE stg_customers",
      );
      expect(await definitionPath(jaffleRoot, ref, "stg_customers")).toBe(
        path.join(jaffleRoot, "models", "staging", "stg_customers.sql"),
      );
    });
  });

  it("settles with no result when the file is in no project", async () => {
    loadConsumer();
    const outside = path.join(tmp, "elsewhere");
    expect(await hoverText(outside, "ref('orders')", "orders")).toBe(undefined);
    expect(await definitionPath(outside, "ref('orders')", "orders")).toBe(
      undefined,
    );
  });
});
