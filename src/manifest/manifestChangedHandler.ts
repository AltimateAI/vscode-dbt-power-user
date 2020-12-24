import { closeSync, openSync, readFileSync, readSync } from "fs";
import path = require("path");
import { FileSystemWatcher, OutputChannel, Uri, window, workspace, RelativePattern } from "vscode";
import { DBTProject } from "./dbtProject";
import { dbtProjectContainer } from "./dbtProjectContainer";
import { GraphMapper } from "./graphMapper";
import { MacroParser } from "./macroParser";
import { ManifestCacheChangedEvent } from "./manifestCacheChangedEvent";
import { NodeParser } from "./nodeParser";
import { RunResultsParser } from "./runResultsParser";
import { SourceParser } from "./sourceParser";

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

    public setupManifestHandler(targetPath: string) {
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

        const modelMetaMap = NodeParser.createModelMetaMap(nodes);
        const macroMetaMap = MacroParser.createMacroMetaMap(this.projectName, macros);
        const sourceMetaMap = SourceParser.createSourceMetaMap(sources);
        const graphMetaMap = GraphMapper.createGraphMetaMap(
            parent_map,
            child_map,
            modelMetaMap,
            sourceMetaMap
        );
        const runResultMetaMap = RunResultsParser.createRunResultMetaMap(this.projectRoot, targetPath);

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

        this.setupOutputChannel(this.projectName);

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

            this.logFileWatcher.onDidChange(() => this.readLogFileFromLastPosition());
            this.logFileWatcher.onDidCreate(() => this.readLogFileFromLastPosition());
            this.logFileWatcher.onDidDelete(() => this.readLogFileFromLastPosition());
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
                    this.outputChannel.show();
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