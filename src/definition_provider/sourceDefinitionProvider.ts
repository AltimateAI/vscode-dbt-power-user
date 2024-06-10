import { readFileSync } from "fs";
import {
  CancellationToken,
  Definition,
  DefinitionLink,
  DefinitionProvider,
  Disposable,
  Location,
  Position,
  ProviderResult,
  TextDocument,
  Uri,
} from "vscode";
import { SourceMetaMap } from "../domain";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { ManifestCacheChangedEvent } from "../manifest/event/manifestCacheChangedEvent";
import { isEnclosedWithinCodeBlock, provideSingleton } from "../utils";
import { TelemetryService } from "../telemetry";

@provideSingleton(SourceDefinitionProvider)
export class SourceDefinitionProvider
  implements DefinitionProvider, Disposable
{
  private sourceMetaMap: Map<string, SourceMetaMap> = new Map();
  private static readonly IS_SOURCE = /(source)\([^)]*\)/;
  private static readonly GET_SOURCE_INFO = /(?!['"])(\w+)(?=['"])/g;
  private disposables: Disposable[] = [];

  constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private telemetry: TelemetryService,
  ) {
    this.disposables.push(
      dbtProjectContainer.onManifestChanged((event) =>
        this.onManifestCacheChanged(event),
      ),
    );
  }

  dispose() {
    while (this.disposables.length) {
      const x = this.disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  provideDefinition(
    document: TextDocument,
    position: Position,
    token: CancellationToken,
  ): ProviderResult<Definition | DefinitionLink[]> {
    return new Promise((resolve) => {
      const hover = document.getText(document.getWordRangeAtPosition(position));
      const range = document.getWordRangeAtPosition(
        position,
        SourceDefinitionProvider.IS_SOURCE,
      );
      const word = document.getText(range);

      const linePrefix = document
        .lineAt(position)
        .text.substr(0, position.character);

      if (
        !isEnclosedWithinCodeBlock(document, position) ||
        !linePrefix.includes("source") ||
        hover === "source"
      ) {
        resolve(undefined);
        return;
      }

      const source = word.match(SourceDefinitionProvider.GET_SOURCE_INFO);
      if (source === null || source === undefined) {
        resolve(undefined);
        return;
      }
      if (source.length < 2) {
        resolve(undefined);
        return;
      }
      const definition = this.getSourceDefinition(
        source[0],
        document.uri,
        source[1],
      );
      this.telemetry.sendTelemetryEvent("provideSourceDefinition");
      resolve(definition);
    });
  }

  private onManifestCacheChanged(event: ManifestCacheChangedEvent): void {
    event.added?.forEach((added) => {
      this.sourceMetaMap.set(
        added.project.projectRoot.fsPath,
        added.sourceMetaMap,
      );
    });
    event.removed?.forEach((removed) => {
      this.sourceMetaMap.delete(removed.projectRoot.fsPath);
    });
  }

  private getSourceDefinition(
    sourceName: string,
    currentFilePath: Uri,
    tableName: string,
  ): Definition | undefined {
    const projectRootpath =
      this.dbtProjectContainer.getProjectRootpath(currentFilePath);
    if (projectRootpath === undefined) {
      return;
    }
    const sourceMap = this.sourceMetaMap.get(projectRootpath.fsPath);
    if (sourceMap === undefined) {
      return;
    }
    const location = sourceMap
      .get(sourceName)
      ?.tables.find((table) => table.name === tableName);
    if (location && location.path) {
      const sourceFile: string = readFileSync(location.path).toString("utf8");
      const sourceFileLines = sourceFile.split("\n");
      for (let index = 0; index < sourceFileLines.length; index++) {
        const currentLine = sourceFileLines[index];
        if (currentLine.includes(tableName)) {
          return new Location(
            Uri.file(location.path),
            new Position(index, currentLine.indexOf(tableName)),
          );
        }
      }
    }
    return undefined;
  }
}
