import * as vscode from "vscode";
import { existsSync, readFileSync } from "fs";
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

export class Model extends Node {}

export class Seed extends Node {}

export class Test extends Node {}

export class Source extends Node {}

interface NodeGraphMetaData {
  nodes: Node[];
}

type DBTGraphType = {
  [name: string]: string[];
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
  compiledPath?: string;
  error: string;
  timestamp: string;
  status: string;
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
    runResultMetaMap: RunResultMetaMap
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
  private static RESOURCE_TYPE_MODEL = "model";
  private static RESOURCE_TYPE_SOURCE = "source";
  private static RUN_RESULTS_FILE = "run_results.json";

  private onDBTManifestCacheChangedHandlers: OnDBTManifestCacheChangedHandler[] = [];
  private dbtProjectWatcher?: vscode.FileSystemWatcher;
  private manifestWatcher?: vscode.FileSystemWatcher;
  private runResultsWatcher?: vscode.FileSystemWatcher;
  private targetFolderWatcher?: vscode.FileSystemWatcher;
  private currentTargetPath?: string;

  addOnDBTManifestCacheChangedHandler: (
    handler: OnDBTManifestCacheChangedHandler
  ) => void = (handler) => {
    this.onDBTManifestCacheChangedHandlers.push(handler);
  };

  async tryRefresh() {
    try {
      await this.refresh();
    } catch (error) {
      console.log(
        "We should never come here, means that our exceptions are not handled!",
        error
      );
      vscode.window.showErrorMessage(`An unknown issue occurred within the dbt Power User extension, please raise this issue on our reposititory (https://github.com/innoverio/vscode-dbt-power-user/issues/) along with the exception: ${error}\n${error.stack}`);
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

    this.createTargetWatchers(targetPath);

    const manifest = this.readAndParseManifest(targetPath);

    if (manifest === undefined) {
      const event = new DBTManifestCacheChangedEvent(
        projectName,
        new Map(),
        new Map(),
        new Map(),
        { parents: new Map(), children: new Map() },
        new Map()
      );
      this.onDBTManifestCacheChangedHandlers.forEach((handler) =>
        handler(event)
      );
      return;
    }

    const { nodes, sources, macros, parent_map, child_map } = manifest;

    const modelMetaMap = this.createModelMetaMap(nodes);
    const macroMetaMap = this.createMacroMetaMap(projectName, macros);
    const sourceMetaMap = this.createSourceMetaMap(sources);
    const graphMetaMap = this.createGraphMetaMap(
      parent_map,
      child_map,
      modelMetaMap,
      sourceMetaMap
    );
    const runResultMetaMap = this.createRunResultMetaMap(targetPath);

    const event = new DBTManifestCacheChangedEvent(
      projectName,
      modelMetaMap,
      macroMetaMap,
      sourceMetaMap,
      graphMetaMap,
      runResultMetaMap
    );
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
      this.setupRefreshHandler(this.dbtProjectWatcher);
    }
  }

  private createTargetWatchers(targetPath: any) {
    if (
      this.currentTargetPath === undefined ||
      this.currentTargetPath !== targetPath
    ) {
      this.manifestWatcher = vscode.workspace.createFileSystemWatcher(
        new vscode.RelativePattern(
          vscode.workspace.workspaceFolders![0],
          `${targetPath}/${DBTManifest.MANIFEST_FILE}`
        )
      );
      this.setupRefreshHandler(this.manifestWatcher);

      this.runResultsWatcher = vscode.workspace.createFileSystemWatcher(
        new vscode.RelativePattern(
          vscode.workspace.workspaceFolders![0],
          `${targetPath}/${DBTManifest.RUN_RESULTS_FILE}`
        )
      );
      this.setupRefreshHandler(this.runResultsWatcher);

      this.targetFolderWatcher = vscode.workspace.createFileSystemWatcher(
        new vscode.RelativePattern(
          vscode.workspace.workspaceFolders![0],
          `${targetPath}`
        )
      );
      this.targetFolderWatcher.onDidDelete(() => this.tryRefresh());

      this.currentTargetPath = targetPath;
    }
  }

  private setupRefreshHandler(watcher: vscode.FileSystemWatcher): void {
    watcher.onDidChange(() => this.tryRefresh());
    watcher.onDidCreate(() => this.tryRefresh());
    watcher.onDidDelete(() => this.tryRefresh());
  }

  private readAndParseManifest(targetPath: string) {
    const manifestLocation = path.join(
      vscode.workspace.workspaceFolders![0].uri.fsPath,
      targetPath,
      DBTManifest.MANIFEST_FILE
    );
    try {
      const manifestFile = readFileSync(manifestLocation, "utf8");
      return JSON.parse(manifestFile);
    } catch (error) {
      console.log(
        `File not found at '${manifestLocation}', probably not compiled!`,
        error
      );
    }
  }

  private createSourceMetaMap(sourcesMap: any[]): SourceMetaMap {
    const sourceMetaMap = new Map<string, SourceMetaData>();
    Object.values(sourcesMap)
      .filter(
        (source) => source.resource_type === DBTManifest.RESOURCE_TYPE_SOURCE
      )
      .reduce(
        (
          previousValue: SourceMetaMap,
          { source_name, name, root_path, original_file_path }
        ) => {
          let source = previousValue.get(source_name);
          if (!source) {
            const fullPath = path.join(root_path, original_file_path);
            source = { path: fullPath, tables: [] };
            previousValue.set(source_name, source);
          }
          source.tables.push(name);
          return previousValue;
        },
        sourceMetaMap
      );
    return sourceMetaMap;
  }

  private createModelMetaMap(nodesMap: any[]): NodeMetaMap {
    const modelMetaMap: NodeMetaMap = new Map();
    Object.values(nodesMap)
      .filter(
        (model) => model.resource_type === DBTManifest.RESOURCE_TYPE_MODEL
      )
      .forEach(({ name, root_path, original_file_path }) => {
        const fullPath = path.join(root_path, original_file_path);
        modelMetaMap.set(name, { path: fullPath });
      });
    return modelMetaMap;
  }

  private createMacroMetaMap(projectName: string, macros: any[]): MacroMetaMap {
    const macroMetaMap: MacroMetaMap = new Map();
    Object.values(macros).forEach(
      ({ package_name, name, root_path, original_file_path }) => {
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
          console.log(
            `File not found at '${fullPath}', probably compiled is outdated!`,
            error
          );
        }
      }
    );
    return macroMetaMap;
  }

  private createGraphMetaMap(
    parentMap: DBTGraphType,
    childrenMap: DBTGraphType,
    modelMetaMap: NodeMetaMap,
    sourceMetaMap: SourceMetaMap
  ): GraphMetaMap {
    const unique = (nodes: any[]) => Array.from(new Set(nodes));

    const parents = Object.entries(parentMap).reduce(
      (map, [nodeName, nodes]) => {
        const currentNodes = unique(nodes).map(
          this.mapToNode(sourceMetaMap, modelMetaMap)
        );
        map.set(nodeName, { nodes: currentNodes });
        return map;
      },
      new Map<string, NodeGraphMetaData>()
    );

    const children = Object.entries(childrenMap).reduce(
      (map, [nodeName, nodes]) => {
        const currentNodes = unique(nodes).map(
          this.mapToNode(sourceMetaMap, modelMetaMap)
        );
        map.set(nodeName, { nodes: currentNodes });
        return map;
      },
      new Map<string, NodeGraphMetaData>()
    );

    return {
      parents,
      children,
    };
  }

  private mapToNode(
    sourceMetaMap: SourceMetaMap,
    nodeMetaMap: NodeMetaMap
  ): (parentNodeName: string) => Node {
    return (parentNodeName) => {
      const nodeSegment = parentNodeName.split(".");
      const nodeType = nodeSegment[0];
      switch (nodeType) {
        case "source": {
          const sourceName = nodeSegment[2];
          const tableName = nodeSegment[3];
          const url = sourceMetaMap.get(sourceName)?.path!;
          return new Source(
            `${tableName} (${sourceName})`,
            parentNodeName,
            url
          );
        }
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
    const runResultMetaMap = new Map<string, RunResultMetaData>();
    const runResultPath = path.join(
      vscode.workspace.workspaceFolders![0].uri.fsPath,
      targetPath,
      DBTManifest.RUN_RESULTS_FILE
    );
    if (!existsSync(runResultPath)) {
      return runResultMetaMap;
    }
    const runResultFile = JSON.parse(readFileSync(runResultPath, "utf8"));
    const { results, generated_at } = runResultFile;
    results.forEach((result: any) => {
      const {
        node: { root_path, build_path, original_file_path, compiled },
        error,
        status,
      } = result;
      const fullPath = path.join(root_path, original_file_path);
      const compiledPath =
        build_path !== null ? path.join(root_path, build_path) : undefined;
      runResultMetaMap.set(fullPath, {
        compiledPath,
        error,
        timestamp: generated_at,
        status,
      });
    });
    return runResultMetaMap;
  }
}

export const DBTManifestInstance = new DBTManifest();
