import { readFileSync } from "fs";
import * as path from "path";
import { Uri } from "vscode";
import { DBTProject } from "../dbtProject";
import { ManifestCacheChangedEvent } from "../event/manifestCacheChangedEvent";
import { GraphParser } from "./graphParser";
import { MacroParser } from "./macroParser";
import { NodeParser } from "./nodeParser";
import { RunResultsParser } from "./runResultsParser";
import { SourceParser } from "./sourceParser";
import { Reporter } from "../../reporter";
import { provide } from "inversify-binding-decorators";

@provide(ManifestParser)
export class ManifestParser {
  constructor(
    private nodeParser: NodeParser,
    private macroParser: MacroParser,
    private graphParser: GraphParser,
    private runResultsParser: RunResultsParser,
    private sourceParser: SourceParser,
    private reporter: Reporter
  ) {}

  public async parseManifest(
    projectRoot: Uri,
    projectName: string,
    targetPath: string
  ) {
    const manifest = this.readAndParseManifest(projectRoot, targetPath);
    if (manifest === undefined) {
      const event: ManifestCacheChangedEvent = {
        added: [
          {
            projectName: projectName,
            projectRoot: projectRoot,
            nodeMetaMap: new Map(),
            macroMetaMap: new Map(),
            sourceMetaMap: new Map(),
            graphMetaMap: { parents: new Map(), children: new Map() },
            runResultMetaMap: new Map(),
          },
        ],
      };
      return event;
    }

    const { nodes, sources, macros, parent_map, child_map } = manifest;

    const modelMetaMapPromise = this.nodeParser.createModelMetaMap(nodes);
    const macroMetaMapPromise = this.macroParser.createMacroMetaMap(
      projectName,
      macros
    );
    const sourceMetaMapPromise = this.sourceParser.createSourceMetaMap(sources);
    const runResultMetaMapPromise = this.runResultsParser.createRunResultMetaMap(
      projectRoot,
      targetPath
    );

    const [
      modelMetaMap,
      macroMetaMap,
      sourceMetaMap,
      runResultMetaMap,
    ] = await Promise.all([
      modelMetaMapPromise,
      macroMetaMapPromise,
      sourceMetaMapPromise,
      runResultMetaMapPromise,
    ]);
    const graphMetaMap = this.graphParser.createGraphMetaMap(
      parent_map,
      child_map,
      modelMetaMap,
      sourceMetaMap
    );

    const event: ManifestCacheChangedEvent = {
      added: [
        {
          projectName: projectName,
          projectRoot: projectRoot,
          nodeMetaMap: modelMetaMap,
          macroMetaMap: macroMetaMap,
          sourceMetaMap: sourceMetaMap,
          graphMetaMap: graphMetaMap,
          runResultMetaMap: runResultMetaMap,
        },
      ],
    };
    return event;
  }

  private readAndParseManifest(projectRoot: Uri, targetPath: string) {
    const manifestLocation = path.join(
      projectRoot.fsPath,
      targetPath,
      DBTProject.MANIFEST_FILE
    );
    try {
      const manifestFile = readFileSync(manifestLocation, "utf8");
      return JSON.parse(manifestFile);
    } catch (error) {
      this.reporter.sendException(error);
    }
  }
}
