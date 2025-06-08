import { existsSync, readFileSync } from "fs";
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
          },
        ],
      };
      return event;
    }

    const { nodes, sources, macros, semantic_models, docs, exposures } =
      manifest;

    const parentChildrenPromise =
      this.childrenParentParser.createChildrenParentMetaMap(nodes);

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

@provide(ModelDepthParser)
export class ModelDepthParser {
  constructor(private terminal: DBTTerminal) {}

  public createModelDepthsMap(manifest: any): Map<string, number> {
    const modelDepths = new Map<string, number>();

    if (!manifest) {
      return modelDepths;
    }

    // Get all models from the manifest
    const models: { name: string, id: string }[] = [];
    const nodes = manifest.nodes;
    
    for (const [id, node] of Object.entries(nodes)) {
      if ((node as any).resource_type === 'model') {
        models.push({ 
          name: (node as any).name,
          id: id 
        });
      }
    }

    // Build dependency graph for models only (parent-child based on the manifest's parent_map)
    const parentGraph: Map<string, string[]> = new Map();
    const childGraph: Map<string, string[]> = new Map();

    const parent_map = manifest.parent_map || {};
    
    for (const model of models) {
      const parents = parent_map[model.id] || [];
      // Only include parent models, not sources or other node types
      const parentModels = parents.filter((parent: string) => 
        parent.startsWith('model.')
      );
      
      parentGraph.set(model.id, parentModels);
      
      // Build reverse graph for topological sort
      for (const parent of parentModels) {
        if (!childGraph.has(parent)) {
          childGraph.set(parent, []);
        }
        childGraph.get(parent)!.push(model.id);
      }
      
      if (!childGraph.has(model.id)) {
        childGraph.set(model.id, []);
      }
    }

    // Calculate depths using topological sort approach for longest paths
    const depths = new Map<string, number>();
    const inDegree = new Map<string, number>();
    
    // Initialize depths and in-degrees
    for (const model of models) {
      const modelParents = parentGraph.get(model.id) || [];
      // Models that only depend on sources (no model dependencies) start at depth 1
      // Models that depend on other models start at depth 0 and will be calculated
      depths.set(model.id, modelParents.length === 0 ? 1 : 0);
      inDegree.set(model.id, modelParents.length);
    }
    
    // Queue for nodes with no model dependencies (only depend on sources)
    const queue: string[] = [];
    for (const model of models) {
      if (inDegree.get(model.id) === 0) {
        queue.push(model.id);
      }
    }
    
    // Process nodes in topological order
    while (queue.length > 0) {
      const currentId = queue.shift()!;
      const currentDepth = depths.get(currentId)!;
      
      // Update depths of children (nodes that depend on this one)
      const children = childGraph.get(currentId) || [];
      for (const childId of children) {
        // Set depth to maximum of current depth or (parent depth + 1)
        const newDepth = Math.max(depths.get(childId)!, currentDepth + 1);
        depths.set(childId, newDepth);
        
        // Decrease in-degree and add to queue if all dependencies processed
        const newInDegree = inDegree.get(childId)! - 1;
        inDegree.set(childId, newInDegree);
        
        if (newInDegree === 0) {
          queue.push(childId);
        }
      }
    }

    // Store the calculated depths
    for (const model of models) {
      const depth = depths.get(model.id)!;
      modelDepths.set(model.name, depth);
      modelDepths.set(model.id, depth);
    }

    this.terminal.debug(
      "ModelDepthParser",
      `Model depths calculated for ${modelDepths.size} models`,
    );

    return modelDepths;
  }
}

export const createFullPathForNode: (
  projectName: string,
  rootPath: string,
  packageName: string,
  packagePath: string,
  relativeFilePath: string,
) => string | undefined = (
  projectName,
  rootPath,
  packageName,
  packagePath,
  relativeFilePath,
) => {
  if (packageName !== projectName) {
    const rootPathWithPackage = path.join(
      packagePath,
      packageName,
      relativeFilePath,
    );
    if (existsSync(rootPathWithPackage)) {
      return rootPathWithPackage;
    }
    return undefined;
  }
  return path.join(rootPath, relativeFilePath);
};
