import { readFileSync } from "fs";
import { provide } from "inversify-binding-decorators";
import * as path from "path";
import { Uri } from "vscode";
import { DBTTerminal } from "../../dbt_client/dbtTerminal";
import { DBTProject } from "../dbtProject";
import { ManifestCacheChangedEvent } from "../event/manifestCacheChangedEvent";
import { DocParser } from "./docParser";
import { GraphParser } from "./graphParser";
import { MacroParser } from "./macroParser";
import { NodeMetaMapImpl, NodeParser } from "./nodeParser";
import { SourceParser } from "./sourceParser";
import { TestParser } from "./testParser";
import { TelemetryService } from "../../telemetry";
import { ExposureParser } from "./exposureParser";
import { MetricParser } from "./metricParser";
import { ChildrenParentParser } from "./childrenParentParser";
import { ModelDepthParser } from "./modelDepthParser";
import { createFullPathForNode } from "./utils";

@provide(ManifestParser)
export class ManifestParser {
  private lastSentParseManifestProps: any;
  private consecutiveReadFailures = 0;

  constructor(
    private childrenParentParser: ChildrenParentParser,
    private nodeParser: NodeParser,
    private macroParser: MacroParser,
    private metricParser: MetricParser,
    private graphParser: GraphParser,
    private sourceParser: SourceParser,
    private testParser: TestParser,
    private exposureParser: ExposureParser,
    private docParser: DocParser,
    private terminal: DBTTerminal,
    private telemetry: TelemetryService,
    private modelDepthParser: ModelDepthParser,
  ) {}

  public async parseManifest(project: DBTProject) {
    this.terminal.debug(
      "ManifestParser",
      `Going to parse manifest for "${project.getProjectName()}" at ${
        project.projectRoot
      }`,
    );
    const targetPath = project.getTargetPath();
    if (!targetPath) {
      this.terminal.debug(
        "ManifestParser",
        "targetPath should be defined at this stage for project " +
          project.projectRoot.fsPath,
      );
      return;
    }
    const projectRoot = project.projectRoot;
    const manifest = this.readAndParseManifest(projectRoot, targetPath);
    if (manifest === undefined) {
      const event: ManifestCacheChangedEvent = {
        added: [
          {
            project,
            nodeMetaMap: new NodeMetaMapImpl(),
            macroMetaMap: new Map(),
            metricMetaMap: new Map(),
            sourceMetaMap: new Map(),
            testMetaMap: new Map(),
            graphMetaMap: {
              parents: new Map(),
              children: new Map(),
              tests: new Map(),
              metrics: new Map(),
            },
            docMetaMap: new Map(),
            exposureMetaMap: new Map(),
            modelDepthMap: new Map(),
          },
        ],
      };
      return event;
    }

    const { nodes, sources, macros, semantic_models, docs, exposures } =
      manifest;

    const parentChildrenPromise =
      this.childrenParentParser.createChildrenParentMetaMap({
        ...nodes,
        ...exposures,
      });

    const nodeMetaMapPromise = this.nodeParser.createNodeMetaMap(
      nodes,
      project,
    );
    const macroMetaMapPromise = this.macroParser.createMacroMetaMap(
      macros,
      project,
    );
    const metricMetaMapPromise = this.metricParser.createMetricMetaMap(
      semantic_models,
      project,
    );
    const sourceMetaMapPromise = this.sourceParser.createSourceMetaMap(
      sources,
      project,
    );
    const testMetaMapPromise = this.testParser.createTestMetaMap(
      nodes,
      project,
    );
    const exposuresMetaMapPromise = this.exposureParser.createExposureMetaMap(
      exposures,
      project,
    );

    const docMetaMapPromise = this.docParser.createDocMetaMap(docs, project);

    const [
      { parentMetaMap, childMetaMap },
      nodeMetaMap,
      macroMetaMap,
      metricMetaMap,
      sourceMetaMap,
      testMetaMap,
      docMetaMap,
      exposureMetaMap,
    ] = await Promise.all([
      parentChildrenPromise,
      nodeMetaMapPromise,
      macroMetaMapPromise,
      metricMetaMapPromise,
      sourceMetaMapPromise,
      testMetaMapPromise,
      docMetaMapPromise,
      exposuresMetaMapPromise,
    ]);

    // Calculate model depths
    const modelDepthMap = this.modelDepthParser.createModelDepthsMap(
      nodes,
      parentMetaMap,
      childMetaMap,
    );

    const graphMetaMap = this.graphParser.createGraphMetaMap(
      project,
      parentMetaMap,
      childMetaMap,
      nodeMetaMap,
      sourceMetaMap,
      testMetaMap,
      metricMetaMap,
    );

    const nodeCounts = Object.values(nodes as any[]).reduce((map, node) => {
      const key = node.resource_type + "_count";
      if (!map.has(key)) {
        map.set(key, 0);
      }
      map.set(key, map.get(key) + 1);
      return map;
    }, new Map());
    const parseManifestProps = {
      ...Object.fromEntries(nodeCounts.entries()),
      sources_count: sourceMetaMap.size,
      macros_count: macroMetaMap.size,
    };
    if (
      this.lastSentParseManifestProps === undefined ||
      Object.entries(this.lastSentParseManifestProps).toString() !==
        Object.entries(parseManifestProps).toString()
    ) {
      // we only sent this event if there is a change in the monitored values
      this.telemetry.sendTelemetryEvent(
        "parseManifest",
        {
          project: DBTProject.hashProjectRoot(projectRoot.fsPath),
        },
        parseManifestProps,
      );
      this.lastSentParseManifestProps = parseManifestProps;
    }

    const event: ManifestCacheChangedEvent = {
      added: [
        {
          project,
          nodeMetaMap: nodeMetaMap,
          macroMetaMap: macroMetaMap,
          metricMetaMap: metricMetaMap,
          sourceMetaMap: sourceMetaMap,
          graphMetaMap: graphMetaMap,
          testMetaMap: testMetaMap,
          docMetaMap: docMetaMap,
          exposureMetaMap: exposureMetaMap,
          modelDepthMap,
        },
      ],
    };
    return event;
  }

  private readAndParseManifest(projectRoot: Uri, targetPath: string) {
    const pathParts = [targetPath];
    if (!path.isAbsolute(targetPath)) {
      pathParts.unshift(projectRoot.fsPath);
    }
    const manifestLocation = path.join(...pathParts, DBTProject.MANIFEST_FILE);
    this.terminal.debug(
      "ManifestParser",
      `Reading manifest at ${manifestLocation} for project at ${projectRoot}`,
    );

    try {
      const manifestFile = readFileSync(manifestLocation, "utf8");
      const parsedManifest = JSON.parse(manifestFile);
      this.consecutiveReadFailures = 0; // Reset counter on success
      return parsedManifest;
    } catch (error) {
      this.consecutiveReadFailures++;
      if (this.consecutiveReadFailures > 3) {
        this.terminal.error(
          "ManifestParser",
          `Could not read/parse manifest file at ${manifestLocation} after ${this.consecutiveReadFailures} attempts`,
          error,
        );
      }
    }
  }
}

export { createFullPathForNode } from "./utils";
