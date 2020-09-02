import * as vscode from "vscode";
import { readFileSync } from "fs";
import { safeLoad } from "js-yaml";
import * as path from "path";

interface MacroMetaData {
  path: string;
  line: number;
  character: number;
}

interface NodeMetaData {
  path: string;
}

interface SourceMetaData {
  path: string;
  tables: SourceTable[];
}

interface SourceTable {
  name: string;
}

export abstract class Node {
  label: string;
  key: string;
  url: string;
  constructor(label: string, key: string, url: string) {
    this.label = label;
    this.key = key;
    this.url = url;
  }
}

export class Model extends Node { }

export class Seed extends Node { }

export class Test extends Node { }

export class Source extends Node { }

interface NodeGraphMetaData {
  nodes: Node[];
}

type DBTGraphType = {
  [name: string]: string[]
};

type OnDBTManifestCacheChangedHandler = (
  event: DBTManifestCacheChangedEvent
) => void;

export type NodeMetaMap = Map<string, NodeMetaData>;
export type MacroMetaMap = Map<string, MacroMetaData>;
export type SourceMetaMap = Map<string, SourceMetaData>;
export type RunResultMetaMap = Map<string, RunResultMetaData>;

type NodeGraphMap = Map<string, NodeGraphMetaData>;

export interface GraphMetaMap {
  parents: NodeGraphMap;
  children: NodeGraphMap;
}

interface RunResultMetaData {
  buildPath: string;
  error: string;
  timestamp: string;
}

export interface OnDBTManifestCacheChanged {
  onDBTManifestCacheChanged: OnDBTManifestCacheChangedHandler;
}

export class DBTManifestCacheChangedEvent {
  projectName: string;
  nodeMetaMap: NodeMetaMap;
  macroMetaMap: MacroMetaMap;
  sourceMetaMap: SourceMetaMap;
  graphMetaMap: GraphMetaMap;
  runResultMetaMap: RunResultMetaMap;

  constructor(
    projectName: string,
    nodeMetaMap: NodeMetaMap,
    macroMetaMap: MacroMetaMap,
    sourceMetaMap: SourceMetaMap,
    parentModelMap: GraphMetaMap,
    runResultMetaMap: RunResultMetaMap,
  ) {
    this.projectName = projectName;
    this.nodeMetaMap = nodeMetaMap;
    this.macroMetaMap = macroMetaMap;
    this.sourceMetaMap = sourceMetaMap;
    this.graphMetaMap = parentModelMap;
    this.runResultMetaMap = runResultMetaMap;
  }
}

class DBTManifest {
  private static DBT_PROJECT_FILE = "dbt_project.yml";
  private static MANIFEST_FILE = "manifest.json";
  private static TARGET_PATH_VAR = "target-path";
  private static SOURCE_FOLDER_VAR = "source-paths";
  private static RESOURCE_TYPE_MODEL = "model";
  private static DBT_MODULES_PATH = "dbt_modules";
  private static RUN_RESULTS_FILE = "run_results.json";

  private onDBTManifestCacheChangedHandlers: OnDBTManifestCacheChangedHandler[] = [];
  private dbtProjectWatcher?: vscode.FileSystemWatcher;
  private manifestWatcher?: vscode.FileSystemWatcher;
  private sourcesWatcher?: vscode.FileSystemWatcher;
  private runResultsWatcher?: vscode.FileSystemWatcher;
  private currentTargetPath?: string;
  private currentSourcesPath?: string;

  addOnDBTManifestCacheChangedHandler: (
    handler: OnDBTManifestCacheChangedHandler
  ) => void = (handler) => {
    this.onDBTManifestCacheChangedHandlers.push(handler);
  };

  tryRefresh() {
    try {
      this.refresh();
    } catch (error) {
      // will get here if manifest file is not yet compiled
      console.log(error);
    }
  }

  removeEventHandlers: () => void = () => {
    this.onDBTManifestCacheChangedHandlers = [];
  };

  readAndParseProjectConfig() {
    const dbtProjectYamlFile = readFileSync(
      path.join(
        vscode.workspace.workspaceFolders![0].uri.fsPath,
        DBTManifest.DBT_PROJECT_FILE
      ),
      "utf8"
    );
    return safeLoad(dbtProjectYamlFile) as any;
  }

  private async refresh() {
    this.createProjectConfigWatcher();
    const projectConfig = this.readAndParseProjectConfig();

    const projectName = projectConfig.name;
    const targetPath = projectConfig[DBTManifest.TARGET_PATH_VAR];
    const sourcesPath = projectConfig[DBTManifest.SOURCE_FOLDER_VAR];

    this.createManifestWatcher(targetPath);
    this.createSourcesWatcher(sourcesPath);
    this.createRunResultsWatcher(targetPath);

    const { nodes, macros, parent_map, child_map } = this.readAndParseManifest(targetPath);

    const modelMetaMap = this.createModelMetaMap(projectName, nodes);
    const macroMetaMap = this.createMacroMetaMap(projectName, macros);
    const sourceMetaMap = await this.createSourceMetaMap(sourcesPath);
    const graphMetaMap = this.createGraphMetaMap(parent_map, child_map, modelMetaMap, sourceMetaMap);
    const runResultMetaMap = this.createRunResultMetaMap(targetPath);

    const event = new DBTManifestCacheChangedEvent(projectName, modelMetaMap, macroMetaMap, sourceMetaMap, graphMetaMap, runResultMetaMap);

    this.onDBTManifestCacheChangedHandlers.forEach((handler) => handler(event));
  }

  private createProjectConfigWatcher() {
    if (this.dbtProjectWatcher === undefined) {
      this.dbtProjectWatcher = vscode.workspace.createFileSystemWatcher(
        new vscode.RelativePattern(
          vscode.workspace.workspaceFolders![0],
          DBTManifest.DBT_PROJECT_FILE
        )
      );
      this.dbtProjectWatcher.onDidChange(() => this.tryRefresh());
    }
  }

  private createManifestWatcher(targetPath: any) {
    if (this.currentTargetPath === undefined ||
      this.currentTargetPath !== targetPath) {
      this.manifestWatcher = vscode.workspace.createFileSystemWatcher(
        new vscode.RelativePattern(
          vscode.workspace.workspaceFolders![0],
          `${targetPath}/${DBTManifest.MANIFEST_FILE}`
        )
      );
      this.manifestWatcher.onDidChange(() => this.tryRefresh());
      this.currentTargetPath = targetPath;
    }
  }

  private createSourcesWatcher(sourcesPath: any) {
    if (this.currentSourcesPath === undefined ||
      this.currentSourcesPath !== sourcesPath) {
      this.sourcesWatcher = vscode.workspace.createFileSystemWatcher(
        new vscode.RelativePattern(
          vscode.workspace.workspaceFolders![0],
          `${sourcesPath}/**/*.yml`
        )
      );
      this.sourcesWatcher.onDidChange(() => this.tryRefresh());
      this.currentSourcesPath = sourcesPath;
    };
  }

  private createRunResultsWatcher(targetPath: string) {
    if (this.runResultsWatcher === undefined || this.currentTargetPath === undefined || this.currentTargetPath !== targetPath) {
      this.runResultsWatcher = vscode.workspace.createFileSystemWatcher(
        new vscode.RelativePattern(
          vscode.workspace.workspaceFolders![0],
          `${targetPath}/${DBTManifest.RUN_RESULTS_FILE}`
        )
      );
      this.runResultsWatcher.onDidChange(() => this.tryRefresh());
      this.currentTargetPath = targetPath;
    }
  }

  private readAndParseManifest(targetPath: string) {
    const manifestLocation = path.join(
      vscode.workspace.workspaceFolders![0].uri.fsPath,
      targetPath,
      DBTManifest.MANIFEST_FILE
    );
    console.log(`Reading manifest at location '${manifestLocation}'`);
    try {
      const manifestFile = readFileSync(
        manifestLocation,
        "utf8"
      );
      return JSON.parse(manifestFile);
    } catch (e) {
      vscode.window.showWarningMessage(`Have you compiled your project? Could not read your manifest file at '${manifestLocation}'`);
      throw Error("Could not read the manifest!");
    }

  }

  private async createSourceMetaMap(sourcesPath: string) {
    const sourceMetaMap: SourceMetaMap = new Map();
    const sourceFilePaths = await vscode.workspace.findFiles(
      new vscode.RelativePattern(
        vscode.workspace.workspaceFolders![0],
        `${sourcesPath}/**/*.yml`
      ));
    sourceFilePaths.forEach(sourceFile => {
      try {
        const file = readFileSync(sourceFile.fsPath, "utf8");
        const parsedFile = safeLoad(file) as any;
        const sources = parsedFile.sources;

        if (sources !== undefined) {
          sources.forEach((source: any) => {
            const sourceName = source["name"];
            const tables = source["tables"].map((table: any) => {
              if (table.name !== undefined) {
                return { name: table.name };
              }
            });
            sourceMetaMap.set(sourceName, { path: sourceFile.fsPath, tables: tables });
          });
        }
      } catch (error) {
        // if we can't parse a file, we shouldn't completely fail
        console.log(`An error ocurred while processing ${sourceFile.path}`, error);
      }

    });
    return sourceMetaMap;
  }

  private createModelMetaMap(projectName: string, nodes: any[]) {
    const modelMetaMap: NodeMetaMap = new Map();
    Object.values(nodes)
      .filter(
        (model) => model.resource_type === DBTManifest.RESOURCE_TYPE_MODEL
      )
      .forEach(({ name, root_path, original_file_path }) => {
        const fullPath = path.join(root_path, original_file_path);
        modelMetaMap.set(name, { path: fullPath });
      });
    return modelMetaMap;
  }

  private createMacroMetaMap(projectName: string, macros: any[]) {
    const macroMetaMap: MacroMetaMap = new Map();
    Object.values(macros).forEach(({ package_name, name, root_path, original_file_path }) => {
      const packageName = package_name;
      const macroName =
        packageName === projectName ? name : `${packageName}.${name}`;
      const fullPath = path.join(root_path, original_file_path);
      try {
        const macroFile: string = readFileSync(fullPath).toString("utf8");
        const macroFileLines = macroFile.split("\n");

        for (let index = 0; index < macroFileLines.length; index++) {
          const currentLine = macroFileLines[index];
          if (currentLine.match(new RegExp(`macro\\s${name}\\(`))) {
            macroMetaMap.set(macroName, {
              path: fullPath,
              line: index,
              character: currentLine.indexOf(name),
            });
            break;
          }
        }
      } catch (error) {
        console.log(`File not found at '${fullPath}', probably compiled is outdated!`, error);
      }

    });
    return macroMetaMap;
  }

  private createGraphMetaMap(parentMap: DBTGraphType, childrenMap: DBTGraphType, modelMetaMap: NodeMetaMap, sourceMetaMap: SourceMetaMap): GraphMetaMap {
    const unique = (nodes: any[]) => Array.from(new Set(nodes));

    const parents = Object.entries(parentMap)
      .reduce((map, [nodeName, nodes]) => {
        const currentNodes = unique(nodes).map(this.mapToNode(sourceMetaMap, modelMetaMap));
        map.set(nodeName, { nodes: currentNodes });
        return map;
      }, new Map<string, NodeGraphMetaData>());

    const children = Object.entries(childrenMap)
      .reduce((map, [nodeName, nodes]) => {
        const currentNodes = unique(nodes).map(this.mapToNode(sourceMetaMap, modelMetaMap));
        map.set(nodeName, { nodes: currentNodes });
        return map;
      }, new Map<string, NodeGraphMetaData>());

    return {
      parents,
      children
    };
  }

  private mapToNode(sourceMetaMap: SourceMetaMap, nodeMetaMap: NodeMetaMap): (parentNodeName: string) => Node {
    return parentNodeName => {
      const nodeSegment = parentNodeName.split('.');
      const nodeType = nodeSegment[0];
      switch (nodeType) {
        case "source": {
          const sourceName = nodeSegment[2];
          const tableName = nodeSegment[3];
          const url = sourceMetaMap.get(sourceName)?.path!;
          return new Source(`${tableName} (${sourceName})`, parentNodeName, url);
        };
        case "model": {
          const modelName = nodeSegment[2];
          const url = nodeMetaMap.get(modelName)?.path!;
          return new Model(modelName, parentNodeName, url);
        }
        case "seed": {
          const modelName = nodeSegment[2];
          const url = nodeMetaMap.get(modelName)?.path!;
          return new Seed(modelName, parentNodeName, url);
        }
        case "test": {
          const modelName = nodeSegment[2];
          const url = nodeMetaMap.get(modelName)?.path!;
          return new Test(modelName, parentNodeName, url);
        }
        default:
          throw Error(`Node Type '${nodeType}' not implemented!`);
      }
    };
  }

  private createRunResultMetaMap(targetPath: string): RunResultMetaMap {
    const runResultMetaMap = new Map();
    const runResultPath = path.join(
      vscode.workspace.workspaceFolders![0].uri.fsPath,
      targetPath,
      'run_results.json');
    const runResultFile = JSON.parse(readFileSync(runResultPath, 'utf8'));
    const results = runResultFile["results"];
    const timestamp = runResultFile["generated_at"];
    results.forEach((result: any) => {
      const node = result["node"];
      const fullPath = path.join(node["root_path"], node["original_file_path"]);
      const buildPath = node["build_path"] !== null ? path.join(node["root_path"], node["build_path"]) : null;
      runResultMetaMap.set(fullPath, {
        buildPath,
        error: result["error"],
        timestamp,
      });
    });
    return runResultMetaMap;
  }
}

export const DBTManifestInstance = new DBTManifest();
