import { readFileSync } from "fs";
import * as path from "path";
import * as os from "os";
import { Uri, workspace, window } from "vscode";
import { DBTProject } from "../dbtProject";
import { ManifestCacheChangedEvent } from "../event/manifestCacheChangedEvent";
import { GraphParser } from "./graphParser";
import { MacroParser } from "./macroParser";
import { NodeParser } from "./nodeParser";
import { SourceParser } from "./sourceParser";
import { TestParser } from "./testParser";
import { provide } from "inversify-binding-decorators";
import { DBTTerminal } from "../../dbt_client/dbtTerminal";

@provide(ManifestParser)
export class ManifestParser {
  constructor(
    private nodeParser: NodeParser,
    private macroParser: MacroParser,
    private graphParser: GraphParser,
    private sourceParser: SourceParser,
    private testParser: TestParser,
    private terminal: DBTTerminal
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
            testMetaMap: new Map(),
            graphMetaMap: { parents: new Map(), children: new Map(), tests: new Map() },
          },
        ],
      };
      return event;
    }

    const { nodes, sources, macros, parent_map, child_map } = manifest;

    const nodeMetaMapPromise = this.nodeParser.createNodeMetaMap(nodes);
    const macroMetaMapPromise = this.macroParser.createMacroMetaMap(
      projectName,
      macros
    );
    const sourceMetaMapPromise = this.sourceParser.createSourceMetaMap(sources);
    const testMetaMapPromise = this.testParser.createTestMetaMap(nodes);

    const [
      nodeMetaMap,
      macroMetaMap,
      sourceMetaMap,
      testMetaMap,
    ] = await Promise.all([
      nodeMetaMapPromise,
      macroMetaMapPromise,
      sourceMetaMapPromise,
      testMetaMapPromise,
    ]);

    const graphMetaMap = this.graphParser.createGraphMetaMap(
      parent_map,
      child_map,
      nodeMetaMap,
      sourceMetaMap,
      testMetaMap,
    );

    const event: ManifestCacheChangedEvent = {
      added: [
        {
          projectName: projectName,
          projectRoot: projectRoot,
          nodeMetaMap: nodeMetaMap,
          macroMetaMap: macroMetaMap,
          sourceMetaMap: sourceMetaMap,
          graphMetaMap: graphMetaMap,
          testMetaMap: testMetaMap
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
      this.terminal.log(`Could not read manifest file at ${manifestLocation}: ${error}`);
    }
  }
}
