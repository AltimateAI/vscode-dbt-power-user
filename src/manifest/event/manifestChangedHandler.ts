import { readFileSync } from "fs";
import path = require("path");
import { Uri, EventEmitter } from "vscode";
import { DBTProject } from "../dbtProject";
import { ManifestCacheChangedEvent } from "./manifestCacheChangedEvent";
import { GraphParser } from "../parsers/graphParser";
import { MacroParser } from "../parsers/macroParser";
import { NodeParser } from "../parsers/nodeParser";
import { RunResultsParser } from "../parsers/runResultsParser";
import { SourceParser } from "../parsers/sourceParser";

export class ManifestChangedHandler {
  private projectRoot: Uri;
  private projectName: string;
  private _onManifestChanged: EventEmitter<ManifestCacheChangedEvent>;

  constructor(
    projectRoot: Uri,
    projectName: string,
    _onManifestChanged: EventEmitter<ManifestCacheChangedEvent>
  ) {
    this.projectRoot = projectRoot;
    this.projectName = projectName;
    this._onManifestChanged = _onManifestChanged;
  }

  public async parseManifest(targetPath: string) {
    const manifest = this.readAndParseManifest(targetPath);
    if (manifest === undefined) {
      const event: ManifestCacheChangedEvent = {
        added: [
          {
            projectName: this.projectName,
            projectRoot: this.projectRoot,
            nodeMetaMap: new Map(),
            macroMetaMap: new Map(),
            sourceMetaMap: new Map(),
            graphMetaMap: { parents: new Map(), children: new Map() },
            runResultMetaMap: new Map(),
          },
        ],
      };
      this._onManifestChanged.fire(event);
      return;
    }

    const { nodes, sources, macros, parent_map, child_map } = manifest;

    const modelMetaMapPromise = NodeParser.createModelMetaMap(nodes);
    const macroMetaMapPromise = MacroParser.createMacroMetaMap(
      this.projectName,
      macros
    );
    const sourceMetaMapPromise = SourceParser.createSourceMetaMap(sources);
    const runResultMetaMapPromise = RunResultsParser.createRunResultMetaMap(
      this.projectRoot,
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
    const graphMetaMap = GraphParser.createGraphMetaMap(
      parent_map,
      child_map,
      modelMetaMap,
      sourceMetaMap
    );

    const event: ManifestCacheChangedEvent = {
      added: [
        {
          projectName: this.projectName,
          projectRoot: this.projectRoot,
          nodeMetaMap: modelMetaMap,
          macroMetaMap: macroMetaMap,
          sourceMetaMap: sourceMetaMap,
          graphMetaMap: graphMetaMap,
          runResultMetaMap: runResultMetaMap,
        },
      ],
    };
    this._onManifestChanged.fire(event);
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
}
