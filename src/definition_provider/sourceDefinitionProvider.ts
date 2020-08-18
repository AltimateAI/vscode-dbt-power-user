import { SourceMetaMap, DBTManifestCacheChangedEvent } from "../dbtManifest";
import { DefinitionProvider, TextDocument, Position, CancellationToken, ProviderResult, Definition, DefinitionLink, workspace, Location, Uri, Range } from "vscode";
import path = require("path");
import { isEnclosedWithinCodeBlock } from "../utils";

export class SourceDefinitionProvider implements DefinitionProvider {
  private sourceMetaMap: SourceMetaMap = new Map();
  private static readonly IS_SOURCE = /(source)[^}]*/;
  private static readonly GET_SOURCE_NAME = /(?!['"])(\w+)(?=['"])/ig;

  provideDefinition(
    document: TextDocument,
    position: Position,
    token: CancellationToken
  ): ProviderResult<Definition | DefinitionLink[]> {
    return new Promise((resolve, reject) => {
      const hover = document.getText(document.getWordRangeAtPosition(position));
      const range = document.getWordRangeAtPosition(position, SourceDefinitionProvider.IS_SOURCE);
      const word = document.getText(range);

      if (range && word !== undefined && hover !== "source"
        && isEnclosedWithinCodeBlock(document, range)) {
        const source = word.match(SourceDefinitionProvider.GET_SOURCE_NAME);
        if (source) {
          const definition = this.getSourceDefinition(source[0]);
          resolve(definition);
          return;
        }
      }
      reject();
    });
  }

  onDBTManifestCacheChanged(event: DBTManifestCacheChangedEvent): void {
    this.sourceMetaMap = event.sourceMetaMap;
  }

  private getSourceDefinition(name: string): Definition | undefined {
    const location = this.sourceMetaMap.get(name);
    if (location) {
      return new Location(
        Uri.file(location.path),
        new Range(0, 0, 0, 0)
      );
    }
    return undefined;
  }
}