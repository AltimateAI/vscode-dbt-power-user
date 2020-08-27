import {
  DefinitionProvider,
  Definition,
  workspace,
  Location,
  Uri,
  Position,
  TextDocument,
  ProviderResult,
  DefinitionLink,
} from "vscode";
import {
  MacroMetaMap,
  OnDBTManifestCacheChanged,
  DBTManifestCacheChangedEvent,
} from "../dbtManifest";
import { isEnclosedWithinCodeBlock, getPackageName } from "../utils";
export class MacroDefinitionProvider
  implements DefinitionProvider, OnDBTManifestCacheChanged {
  private macroToLocationMap: MacroMetaMap = new Map();
  private static readonly IS_MACRO = /\w+\.?\w+/;
  private static readonly DBT_MODULES = 'dbt_modules';

  provideDefinition(
    document: TextDocument,
    position: Position
  ): ProviderResult<Definition | DefinitionLink[]> {
    return new Promise((resolve, reject) => {
      const textLine = document.lineAt(position).text;
      const range = document.getWordRangeAtPosition(
        position,
        MacroDefinitionProvider.IS_MACRO
      );
      const word = document.getText(range);
      if (
        range &&
        textLine[range.end.character] === "(" &&
        isEnclosedWithinCodeBlock(document, range)
      ) {

        const packageName = getPackageName(document.uri.path);

        const macroName = packageName !== undefined && !word.includes(".") ? `${packageName}.${word}` : word;

        const definition = this.getMacroDefinition(macroName);
        if (definition !== undefined) {
          resolve(definition);
          return;
        }
      }
      reject();
    });
  }

  onDBTManifestCacheChanged(event: DBTManifestCacheChangedEvent): void {
    this.macroToLocationMap = event.macroMetaMap;
  }

  private getMacroDefinition(macroName: string): Definition | undefined {
    const location = this.macroToLocationMap.get(macroName);
    if (workspace.rootPath && location) {
      return new Location(
        Uri.file(location.path),
        new Position(location.line, location.character)
      );
    }
    return undefined;
  }
}
