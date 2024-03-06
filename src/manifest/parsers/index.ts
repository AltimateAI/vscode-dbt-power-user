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
import { NodeParser } from "./nodeParser";
import { SourceParser } from "./sourceParser";
import { TestParser } from "./testParser";
import { TelemetryService } from "../../telemetry";
import { ExposureParser } from "./exposureParser";

@provide(ManifestParser)
export class ManifestParser {
  private lastSentParseManifestProps: any;

  constructor(
    private nodeParser: NodeParser,
    private macroParser: MacroParser,
    private graphParser: GraphParser,
    private sourceParser: SourceParser,
    private testParser: TestParser,
    private exposureParser: ExposureParser,
    private docParser: DocParser,
    private terminal: DBTTerminal,
    private telemetry: TelemetryService,
  ) {}

  public async parseManifest(project: DBTProject) {
    const targetPath = project.getTargetPath();
    if (!targetPath) {
      this.terminal.debug(
        "parsers:parseManifest",
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
            nodeMetaMap: new Map(),
            macroMetaMap: new Map(),
            sourceMetaMap: new Map(),
            testMetaMap: new Map(),
            graphMetaMap: {
              parents: new Map(),
              children: new Map(),
              tests: new Map(),
            },
            docMetaMap: new Map(),
            exposureMetaMap: new Map(),
          },
        ],
      };
      return event;
    }

    const { nodes, sources, macros, parent_map, child_map, docs, exposures } =
      manifest;
    const rootPath = projectRoot.fsPath;

    const nodeMetaMapPromise = this.nodeParser.createNodeMetaMap(
      nodes,
      project,
    );
    const macroMetaMapPromise = this.macroParser.createMacroMetaMap(
      macros,
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
      rootPath,
    );

    const docMetaMapPromise = this.docParser.createDocMetaMap(docs, project);

    const [
      nodeMetaMap,
      macroMetaMap,
      sourceMetaMap,
      testMetaMap,
      docMetaMap,
      exposureMetaMap,
    ] = await Promise.all([
      nodeMetaMapPromise,
      macroMetaMapPromise,
      sourceMetaMapPromise,
      testMetaMapPromise,
      docMetaMapPromise,
      exposuresMetaMapPromise,
    ]);

    const graphMetaMap = this.graphParser.createGraphMetaMap(
      parent_map,
      child_map,
      nodeMetaMap,
      sourceMetaMap,
      testMetaMap,
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
          sourceMetaMap: sourceMetaMap,
          graphMetaMap: graphMetaMap,
          testMetaMap: testMetaMap,
          docMetaMap: docMetaMap,
          exposureMetaMap: exposureMetaMap,
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

    try {
      const manifestFile = readFileSync(manifestLocation, "utf8");
      return JSON.parse(manifestFile);
    } catch (error) {
      this.terminal.debug(
        "ManifestParser",
        `Could not read manifest file at ${manifestLocation}`,
        error,
      );
    }
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
