import { MacroMetaMap } from "@altimateai/dbt-integration";
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
import { DBTProjectContainer } from "../dbt_client/dbtProjectContainer";
import { ManifestCacheChangedEvent } from "../dbt_client/event/manifestCacheChangedEvent";
import { TelemetryService } from "../telemetry";
import { isEnclosedWithinCodeBlock } from "../utils";
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
    return new Promise((resolve) => {
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

        // Build the list of lookup candidates for the macro meta map. The map
        // stores macros from the current dbt project under their bare name
        // (e.g. `log_toto`) and macros from installed packages under
        // `<package>.<name>` (e.g. `dbt_utils.pivot`). The editor word may
        // already carry a package prefix, and — per issue #1754 — that prefix
        // may be the current project's own name, which dbt accepts as a valid
        // call even though the map is keyed by the bare name.
        const lookupCandidates: string[] = [];
        if (word.includes(".")) {
          // Prefer the full `<pkg>.<name>` lookup first (cross-package call),
          // then fall back to the bare `<name>` lookup, which matches macros
          // defined in the current project (including self-prefixed calls).
          lookupCandidates.push(word);
          const dotIndex = word.indexOf(".");
          lookupCandidates.push(word.substring(dotIndex + 1));
        } else if (packageName !== undefined) {
          // Inside an installed package: unprefixed calls resolve against
          // that package's own macros, which are keyed as `<pkg>.<name>`.
          lookupCandidates.push(`${packageName}.${word}`);
        } else {
          lookupCandidates.push(word);
        }

        for (const candidate of lookupCandidates) {
          const definition = this.getMacroDefinition(candidate, document.uri);
          if (definition !== undefined) {
            resolve(definition);
            this.telemetry.sendTelemetryEvent("provideMacroDefinition");
            return;
          }
        }
      }
      resolve(undefined);
    });
  }

  private onManifestCacheChanged(event: ManifestCacheChangedEvent): void {
    event.added?.forEach((added) => {
      this.macroToLocationMap.set(
        added.project.projectRoot.fsPath,
        added.macroMetaMap,
      );
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
    if (location && location.path) {
      return new Location(
        Uri.file(location.path),
        new Position(location.line, location.character),
      );
    }
    return undefined;
  }
}
