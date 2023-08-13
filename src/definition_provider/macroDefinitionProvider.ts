import {
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
import { MacroMetaMap } from "../domain";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { ManifestCacheChangedEvent } from "../manifest/event/manifestCacheChangedEvent";
import { isEnclosedWithinCodeBlock, provideSingleton } from "../utils";
import { TelemetryService } from "../telemetry";
@provideSingleton(MacroDefinitionProvider)
export class MacroDefinitionProvider implements DefinitionProvider, Disposable {
  private macroToLocationMap: Map<string, MacroMetaMap> = new Map();
  private static readonly IS_MACRO = /\w+\.?\w+/;
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
  ): ProviderResult<Definition | DefinitionLink[]> {
    return new Promise((resolve, reject) => {
      const textLine = document.lineAt(position).text;
      const range = document.getWordRangeAtPosition(
        position,
        MacroDefinitionProvider.IS_MACRO,
      );
      const word = document.getText(range);
      if (
        range &&
        textLine[range.end.character] === "(" &&
        isEnclosedWithinCodeBlock(document, range)
      ) {
        const packageName = this.dbtProjectContainer.getPackageName(
          document.uri,
        );

        const macroName =
          packageName !== undefined && !word.includes(".")
            ? `${packageName}.${word}`
            : word;

        const definition = this.getMacroDefinition(macroName, document.uri);
        if (definition !== undefined) {
          resolve(definition);
          this.telemetry.sendTelemetryEvent("provideMacroDefinition");
          return;
        }
      }
      reject();
    });
  }

  private onManifestCacheChanged(event: ManifestCacheChangedEvent): void {
    event.added?.forEach((added) => {
      this.macroToLocationMap.set(added.projectRoot.fsPath, added.macroMetaMap);
    });
    event.removed?.forEach((removed) => {
      this.macroToLocationMap.delete(removed.projectRoot.fsPath);
    });
  }

  private getMacroDefinition(
    macroName: string,
    currentFilePath: Uri,
  ): Definition | undefined {
    const projectRootpath =
      this.dbtProjectContainer.getProjectRootpath(currentFilePath);
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
        new Position(location.line, location.character),
      );
    }
    return undefined;
  }
}
