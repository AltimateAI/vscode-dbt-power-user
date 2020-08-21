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
import { isEnclosedWithinCodeBlock } from "../utils";
export class MacroDefinitionProvider
  implements DefinitionProvider, OnDBTManifestCacheChanged {
  private macroToLocationMap: MacroMetaMap = new Map();
  private static readonly IS_MACRO = /\w+\.?\w+/;

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
        const documentPath = document.uri.path;
        const projectPath = workspace.workspaceFolders![0].uri.path + '/';
        const pathSegments = documentPath
          .replace(projectPath, "")
          .split('/');
        const macroName = pathSegments.length > 1 && pathSegments[0] === 'dbt_modules' ? `${pathSegments[1]}.${word}` : word;
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
    this.macroToLocationMap = event.macroToLocationMap;
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
