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
  OnDBTManifestCacheChanged,
  DBTManifestCacheChangedEvent,
} from "../dbtManifest";
import { MacroMetaMap } from "../domain";
import { isEnclosedWithinCodeBlock, getPackageName, getProjectRootpath } from "../utils";
export class MacroDefinitionProvider
  implements DefinitionProvider, OnDBTManifestCacheChanged {
  private macroToLocationMap: Map<string, MacroMetaMap> = new Map();
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

        const packageName = getPackageName(document.uri.path);

        const macroName = packageName !== undefined && !word.includes(".") ? `${packageName}.${word}` : word;

        const definition = this.getMacroDefinition(macroName, document.uri.path);
        if (definition !== undefined) {
          resolve(definition);
          return;
        }
      }
      reject();
    });
  }

  onDBTManifestCacheChanged(event: DBTManifestCacheChangedEvent, rootpath: string): void {
    this.macroToLocationMap.set(rootpath, event.macroMetaMap);
  }

  private getMacroDefinition(macroName: string, currentFilePath: string): Definition | undefined {
    const workspaceFolders = workspace.workspaceFolders;
    if (workspaceFolders === undefined) {
      return;
    }
    const projectRootpath = getProjectRootpath(workspaceFolders, currentFilePath);
    if (projectRootpath === undefined) {
      return;
    }
    const macroMap = this.macroToLocationMap.get(projectRootpath);
    if (macroMap === undefined) {
      return;
    }
    const location = macroMap.get(macroName);
    if (location) {
      return new Location(
        Uri.file(location.path),
        new Position(location.line, location.character)
      );
    }
    return undefined;
  }
}
