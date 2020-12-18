import {
  DefinitionProvider,
  Definition,
  Location,
  Uri,
  Position,
  TextDocument,
  ProviderResult,
  DefinitionLink,
} from "vscode";
import {
  ManifestCacheChangedEvent,
  OnManifestCacheChanged,
} from "../manifest/manifestCacheChangedEvent";
import { MacroMetaMap } from "../domain";
import { dbtProjectContainer } from "../manifest/dbtProjectContainer";
import { isEnclosedWithinCodeBlock } from "../utils";
export class MacroDefinitionProvider
  implements DefinitionProvider, OnManifestCacheChanged {
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

        const packageName = dbtProjectContainer.getPackageName(document.uri);

        const macroName = packageName !== undefined && !word.includes(".") ? `${packageName}.${word}` : word;

        const definition = this.getMacroDefinition(macroName, document.uri);
        if (definition !== undefined) {
          resolve(definition);
          return;
        }
      }
      reject();
    });
  }

  onManifestCacheChanged(event: ManifestCacheChangedEvent): void {
    this.macroToLocationMap.set(event.projectRoot.fsPath, event.macroMetaMap);
  }

  private getMacroDefinition(macroName: string, currentFilePath: Uri): Definition | undefined {
    const projectRootpath = dbtProjectContainer.getProjectRootpath(currentFilePath);
    if (projectRootpath === undefined) {
      return;
    }
    const macroMap = this.macroToLocationMap.get(projectRootpath.fsPath);
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
