import * as vscode from "vscode";
import { readFileSync } from "fs";
import { safeLoad } from "js-yaml";
import * as path from "path";

interface MacroMetaData {
  path: string;
  line: number;
  character: number;
}

interface ModelMetaData {
  path: string;
}

interface SourceMetaData {
  path: string;
  tables: SourceTable[];
}

interface SourceTable {
  name: string;
}

type OnDBTManifestCacheChangedHandler = (
  event: DBTManifestCacheChangedEvent
) => void;

export type ModelMetaMap = Map<string, ModelMetaData>;
export type MacroMetaMap = Map<string, MacroMetaData>;
export type SourceMetaMap = Map<string, SourceMetaData>;

export interface OnDBTManifestCacheChanged {
  onDBTManifestCacheChanged: OnDBTManifestCacheChangedHandler;
}

export class DBTManifestCacheChangedEvent {
  modelToLocationMap: ModelMetaMap;
  macroToLocationMap: MacroMetaMap;
  sourceMetaMap: SourceMetaMap;

  constructor(
    modelToLocationMap: ModelMetaMap,
    macroToLocationMap: MacroMetaMap,
    sourceInfoMap: SourceMetaMap
  ) {
    this.modelToLocationMap = modelToLocationMap;
    this.macroToLocationMap = macroToLocationMap;
    this.sourceMetaMap = sourceInfoMap;
  }
}

class DBTManifest {
  private static DBT_PROJECT_FILE = "dbt_project.yml";
  private static MANIFEST_FILE = "manifest.json";
  private static TARGET_PATH_VAR = "target-path";
  private static SOURCE_FOLDER_VAR = "source-paths";
  private static RESOURCE_TYPE_MODEL = "model";
  private static DBT_MODULES_PATH = "dbt_modules";

  private onDBTManifestCacheChangedHandlers: OnDBTManifestCacheChangedHandler[] = [];
  private dbtProjectWatcher?: vscode.FileSystemWatcher;
  private manifestWatcher?: vscode.FileSystemWatcher;
  private sourcesWatcher?: vscode.FileSystemWatcher;
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
        vscode.workspace.workspaceFolders![0].uri.path,
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

    const { nodes, macros } = this.readAndParseManifest(targetPath);

    const modelMetaMap = this.createModelMetaMap(projectName, nodes);
    const macroMetaMap = this.createMacroMetaMap(projectName, macros);
    const sourceMetaMap = await this.createSourceMetaMap(sourcesPath);

    const event = new DBTManifestCacheChangedEvent(modelMetaMap, macroMetaMap, sourceMetaMap);

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
          DBTManifest.MANIFEST_FILE
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

  private readAndParseManifest(targetPath: string) {
    const manifestLocation = path.join(
      vscode.workspace.workspaceFolders![0].uri.path,
      targetPath,
      DBTManifest.MANIFEST_FILE
    );
    console.log(`Reading manifest at location '${manifestLocation}'`);
    const manifestFile = readFileSync(
      manifestLocation,
      "utf8"
    );
    return JSON.parse(manifestFile);
  }

  private async createSourceMetaMap(sourcesPath: string) {
    const sourceMetaMap: SourceMetaMap = new Map();
    const sourceFilePaths = await vscode.workspace.findFiles(
      new vscode.RelativePattern(
        vscode.workspace.workspaceFolders![0],
        `${sourcesPath}/**/*.yml`
      ));
    sourceFilePaths.forEach(sourceFile => {
      const file = readFileSync(sourceFile.path, "utf8");
      try {
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
            sourceMetaMap.set(sourceName, { path: sourceFile.path, tables: tables });
          });
        }
      }catch(error) {
        // if we can't parse a file, we shouldn't completely fail
        console.log(`An error ocurred while processing ${sourceFile.path}`, error);
      }
      
    });
    return sourceMetaMap;
  }

  private createModelMetaMap(projectName: string, nodes: any[]) {
    const modelMetaMap: ModelMetaMap = new Map();
    Object.values(nodes)
      .filter(
        (model) => model.resource_type === DBTManifest.RESOURCE_TYPE_MODEL
      )
      .forEach((model) => {
        const packageName = model.package_name;
        const location =
          packageName === projectName
            ? model.original_file_path
            : path.join(
              DBTManifest.DBT_MODULES_PATH,
              packageName,
              model.original_file_path
            );
        modelMetaMap.set(model.name, { path: location });
      });
    return modelMetaMap;
  }

  private createMacroMetaMap(projectName: string, macros: any[]) {
    const macroMetaMap: MacroMetaMap = new Map();
    Object.values(macros).forEach((macro) => {
      const packageName = macro.package_name;
      const name = macro.name;
      const macroName =
        packageName === projectName ? name : `${packageName}.${name}`;
      const fullPath = path.join(macro.root_path, macro.original_file_path);
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
      }catch (error) {
        console.log(`File not found at '${fullPath}', probably compiled is outdated!`, error);
      }
      
    });
    return macroMetaMap;
  }
}

export const DBTManifestInstance = new DBTManifest();
