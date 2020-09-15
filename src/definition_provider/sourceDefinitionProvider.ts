import {
  ManifestCacheChangedEvent,
  OnManifestCacheChanged,
} from "../manifest/manifestCacheChangedEvent";
import {
  DefinitionProvider,
  TextDocument,
  Position,
  CancellationToken,
  ProviderResult,
  Definition,
  DefinitionLink,
  Location,
  Uri,
} from "vscode";
import { readFileSync } from "fs";
import path = require("path");
import { isEnclosedWithinCodeBlock } from "../utils";
import { SourceMetaMap } from "../domain";
import { manifestContainer } from "../manifest/manifestContainer";

export class SourceDefinitionProvider implements DefinitionProvider, OnManifestCacheChanged  {
  private sourceMetaMap: Map<string, SourceMetaMap> = new Map();
  private static readonly IS_SOURCE = /(source)\([^)]*\)/;
  private static readonly GET_SOURCE_INFO = /(?!['"])(\w+)(?=['"])/g;

  provideDefinition(
    document: TextDocument,
    position: Position,
    token: CancellationToken
  ): ProviderResult<Definition | DefinitionLink[]> {
    return new Promise((resolve, reject) => {
      const hover = document.getText(document.getWordRangeAtPosition(position));
      const range = document.getWordRangeAtPosition(
        position,
        SourceDefinitionProvider.IS_SOURCE
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
        reject();
        return;
      }

      const source = word.match(SourceDefinitionProvider.GET_SOURCE_INFO);
      if (source === null || source === undefined) {
        reject();
        return;
      }
      const definition = this.getSourceDefinition(
        source[0],
        document.uri,
        source.length > 1 && hover === source[1] ? source[1] : undefined,
      );
      resolve(definition);
    });
  }

  onManifestCacheChanged(event: ManifestCacheChangedEvent): void {
    this.sourceMetaMap.set(event.projectRoot.fsPath, event.sourceMetaMap);
  }

  private getSourceDefinition(
    sourceName: string,
    currentFilePath: Uri,
    tableName?: string,
  ): Definition | undefined {
    const projectRootpath = manifestContainer.getProjectRootpath(currentFilePath);
    if (projectRootpath === undefined) {
      return;
    }
    const sourceMap = this.sourceMetaMap.get(projectRootpath.fsPath);
    if (sourceMap === undefined) {
      return;
    }
    const location = sourceMap.get(sourceName);
    if (location) {
      const sourceFile: string = readFileSync(location.path).toString("utf8");
      const sourceFileLines = sourceFile.split("\n");
      const lookupItem = tableName || sourceName;

      for (let index = 0; index < sourceFileLines.length; index++) {
        const currentLine = sourceFileLines[index];
        if (currentLine.includes(lookupItem)) {
          return new Location(
            Uri.file(location.path),
            new Position(index, currentLine.indexOf(lookupItem))
          );
        }
      }
    }
    return undefined;
  }
}
