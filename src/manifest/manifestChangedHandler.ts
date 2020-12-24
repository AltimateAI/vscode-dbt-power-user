import { closeSync, openSync, readFileSync, readSync } from "fs";
import path = require("path");
import { FileSystemWatcher, OutputChannel, Uri, window, workspace, RelativePattern } from "vscode";
import { setupWatcherhHandler } from "../utils";
import { DBTProject } from "./dbtProject";
import { dbtProjectContainer } from "./dbtProjectContainer";
import { ManifestCacheChangedEvent } from "./manifestCacheChangedEvent";
import { GraphParser } from "./parsers/graphParser";
import { MacroParser } from "./parsers/macroParser";
import { NodeParser } from "./parsers/nodeParser";
import { RunResultsParser } from "./parsers/runResultsParser";
import { SourceParser } from "./parsers/sourceParser";

export class ManifestChangedHandler {
  private projectRoot: Uri;
  private projectName: string;
  private outputChannel?: OutputChannel;
  private logFileWatcher?: FileSystemWatcher;
  private logPosition: number = 0;
  private static LOG_PATH = "logs";
  private static LOG_FILE = "dbt.log";
  static RESOURCE_TYPE_MODEL = "model";
  static RESOURCE_TYPE_SOURCE = "source";

  constructor(projectRoot: Uri, projectName: string) {
    this.projectRoot = projectRoot;
    this.projectName = projectName;
  }

  public async parseManifest(targetPath: string) {
    const manifest = this.readAndParseManifest(targetPath);
    if (manifest === undefined) {
      const event = new ManifestCacheChangedEvent(
        this.projectName,
        new Map(),
        new Map(),
        new Map(),
        { parents: new Map(), children: new Map() },
        new Map(),
        this.projectRoot
      );
      dbtProjectContainer.raiseManifestChangedEvent(event);
      return;
    }

    const { nodes, sources, macros, parent_map, child_map } = manifest;

    const modelMetaMapPromise = NodeParser.createModelMetaMap(nodes);
    const macroMetaMapPromise = MacroParser.createMacroMetaMap(this.projectName, macros);
    const sourceMetaMapPromise = SourceParser.createSourceMetaMap(sources);
    const runResultMetaMapPromise = RunResultsParser.createRunResultMetaMap(this.projectRoot, targetPath);

    const [modelMetaMap, macroMetaMap, sourceMetaMap, runResultMetaMap] = await Promise.all([modelMetaMapPromise, macroMetaMapPromise, sourceMetaMapPromise, runResultMetaMapPromise]);
    const graphMetaMap = GraphParser.createGraphMetaMap(
      parent_map,
      child_map,
      modelMetaMap,
      sourceMetaMap
    );

    const event = new ManifestCacheChangedEvent(
      this.projectName,
      modelMetaMap,
      macroMetaMap,
      sourceMetaMap,
      graphMetaMap,
      runResultMetaMap,
      this.projectRoot
    );
    dbtProjectContainer.raiseManifestChangedEvent(event);

    this.setupOutputChannel(this.projectName); // TODO move the whole log to DBTProject
  }

  private readAndParseManifest(targetPath: string) {
    const manifestLocation = path.join(
      this.projectRoot.fsPath,
      targetPath,
      DBTProject.MANIFEST_FILE
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

  private setupOutputChannel(projectName: string): void {
    if (this.outputChannel === undefined) {
      this.outputChannel = window.createOutputChannel(
        `${projectName} dbt logs`
      );
      this.readLogFileFromLastPosition();

      this.logFileWatcher = workspace.createFileSystemWatcher(
        new RelativePattern(
          this.projectRoot.path,
          `${ManifestChangedHandler.LOG_PATH}/${ManifestChangedHandler.LOG_FILE}`
        )
      );
      setupWatcherhHandler(this.logFileWatcher, () => this.readLogFileFromLastPosition());
    }
  }

  private readLogFileFromLastPosition(): void {
    if (this.outputChannel) {
      let fileHandle;
      try {
        fileHandle = openSync(
          path.join(
            this.projectRoot.fsPath,
            ManifestChangedHandler.LOG_PATH,
            ManifestChangedHandler.LOG_FILE
          ),
          "r"
        );
        const chunkSize = 1024 * 1024;
        const buffer = Buffer.alloc(chunkSize);
        while (true) {
          const bytesRead = readSync(
            fileHandle,
            buffer,
            0,
            buffer.length,
            this.logPosition
          );
          if (!bytesRead) {
            break;
          }
          this.logPosition += bytesRead;
          this.outputChannel.appendLine(buffer.toString("utf8", 0, bytesRead));
          this.outputChannel.show(true);
        }
      } catch (error) {
        console.log("Could not read log file", error);
      } finally {
        if (fileHandle) {
          closeSync(fileHandle);
        }
      }
    }
  }
}