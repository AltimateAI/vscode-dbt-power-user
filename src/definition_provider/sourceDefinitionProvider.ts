import { SourceMetaMap, DBTManifestCacheChangedEvent } from "../dbtManifest";
import { DefinitionProvider, TextDocument, Position, CancellationToken, ProviderResult, Definition, DefinitionLink, Location, Uri } from "vscode";
import { readFileSync } from "fs";
import path = require("path");
import { isEnclosedWithinCodeBlock } from "../utils";

export class SourceDefinitionProvider implements DefinitionProvider {
  private sourceMetaMap: SourceMetaMap = new Map();
  private static readonly IS_SOURCE = /(source)[^}]*/;
  private static readonly HAS_SOURCE_NAME = /(?!['"])(\w+)(?=['"])/;
  private static readonly GET_SOURCE_INFO = /(?!['"])(\w+)(?=['"])/g;

  provideDefinition(
    document: TextDocument,
    position: Position,
    token: CancellationToken
  ): ProviderResult<Definition | DefinitionLink[]> {
    return new Promise((resolve, reject) => {
      const hover = document.getText(document.getWordRangeAtPosition(position));
      const range = document.getWordRangeAtPosition(position, SourceDefinitionProvider.IS_SOURCE);
      const word = document.getText(range);

      const linePrefix = document
        .lineAt(position)
        .text.substr(0, position.character);

      if (!isEnclosedWithinCodeBlock(document, position) ||
        !linePrefix.includes('source') ||
        hover === 'source') { return undefined; }

      const source = word.match(SourceDefinitionProvider.GET_SOURCE_INFO);
      if (source === null || source === undefined) {
        return undefined;
      }

      const sourceInfo = linePrefix.match(SourceDefinitionProvider.HAS_SOURCE_NAME) ? this.getTableName(source) : this.getSourceName(source);

      if (sourceInfo) {
        const definition = this.getSourceDefinition(sourceInfo.sourceName, sourceInfo.lookupItem);
        resolve(definition);
        return;
      }
      
      reject();
    });
  }

  onDBTManifestCacheChanged(event: DBTManifestCacheChangedEvent): void {
    this.sourceMetaMap = event.sourceMetaMap;
  }

  private getSourceName(source: RegExpMatchArray) {
    return {
      sourceName: source[0],
      lookupItem: source[0]
    };
  }

  private getTableName(source: RegExpMatchArray) {
    return {
      sourceName: source[0],
      lookupItem: source[1]
    };
  }

  private getSourceDefinition(sourceName: string, lookupItem: string): Definition | undefined {
    const location = this.sourceMetaMap.get(sourceName);
    if (location) {
      const sourceFile: string = readFileSync(location.path).toString("utf8");
      const sourceFileLines = sourceFile.split("\n");

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