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

@provide(ManifestParser)
export class ManifestParser {
  constructor(
    private nodeParser: NodeParser,
    private macroParser: MacroParser,
    private graphParser: GraphParser,
    private sourceParser: SourceParser,
    private testParser: TestParser,
    private docParser: DocParser,
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
            graphMetaMap: {
              parents: new Map(),
              children: new Map(),
              tests: new Map(),
            },
            docMetaMap: new Map(),
          },
        ],
      };
      return event;
    }

    const { nodes, sources, macros, parent_map, child_map, docs } = manifest;
    const rootPath = projectRoot.fsPath;

    const nodeMetaMapPromise = this.nodeParser.createNodeMetaMap(
      projectName,
      nodes,
      rootPath
    );
    const macroMetaMapPromise = this.macroParser.createMacroMetaMap(
      projectName,
      macros,
      rootPath
    );
    const sourceMetaMapPromise = this.sourceParser.createSourceMetaMap(
      sources,
      rootPath
    );
    const testMetaMapPromise = this.testParser.createTestMetaMap(
      nodes,
      rootPath
    );
    const docMetaMapPromise = this.docParser.createDocMetaMap(
      docs,
      projectName,
      rootPath
    );

    const [nodeMetaMap, macroMetaMap, sourceMetaMap, testMetaMap, docMetaMap] =
      await Promise.all([
        nodeMetaMapPromise,
        macroMetaMapPromise,
        sourceMetaMapPromise,
        testMetaMapPromise,
        docMetaMapPromise,
      ]);

    const graphMetaMap = this.graphParser.createGraphMetaMap(
      parent_map,
      child_map,
      nodeMetaMap,
      sourceMetaMap,
      testMetaMap
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
          testMetaMap: testMetaMap,
          docMetaMap: docMetaMap,
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
      this.terminal.log(
        `Could not read manifest file at ${manifestLocation}: ${error}`
      );
    }
  }
}

export const createFullPathForNode: (
  projectName: string,
  rootPath: string,
  packageName: string,
  relativeFilePath: string
) => string | undefined = (
  projectName,
  rootPath,
  packageName,
  relativeFilePath
) => {
  if (packageName !== projectName) {
    for (const modulePathVariant of DBTProject.DBT_MODULES) {
      const rootPathWithPackage = path.join(
        rootPath,
        modulePathVariant,
        packageName,
        relativeFilePath
      );
      if (existsSync(rootPathWithPackage)) {
        return rootPathWithPackage;
      }
    }
    return undefined;
  }
  return path.join(rootPath, relativeFilePath);
};
