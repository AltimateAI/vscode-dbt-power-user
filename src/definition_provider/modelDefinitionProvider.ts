import {
  CancellationToken,
  Definition,
  DefinitionLink,
  DefinitionProvider,
  Disposable,
  Location,
  Position,
  ProviderResult,
  Range,
  TextDocument,
  Uri,
} from "vscode";
import { NodeMetaMap } from "../domain";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { ManifestCacheChangedEvent } from "../manifest/event/manifestCacheChangedEvent";
import { provideSingleton } from "../utils";
import { TelemetryService } from "../telemetry";
import { DBTTerminal } from "../dbt_client/dbtTerminal";

@provideSingleton(ModelDefinitionProvider)
export class ModelDefinitionProvider implements DefinitionProvider, Disposable {
  private modelToLocationMap: Map<string, NodeMetaMap> = new Map();
  private static readonly IS_REF = /(ref)\([^)]*\)/;
  private static readonly GET_DBT_MODEL = /(?!'|")([^(?!'|")]*)(?='|")/gi;
  private disposables: Disposable[] = [];

  constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private telemetry: TelemetryService,
    private dbtTerminal: DBTTerminal,
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
      const word = document.getText(
        document.getWordRangeAtPosition(
          position,
          ModelDefinitionProvider.IS_REF,
        ),
      );
      const project = this.dbtProjectContainer.findDBTProject(document.uri);
      if (!project) {
        this.dbtTerminal.debug(
          "modelDefinitionProvider:provideDefinition",
          "Could not load definition provider, project not found in container for " +
            document.uri.fsPath,
        );
        return;
      }
      if (word !== undefined && hover !== "ref") {
        const dbtModel = word.match(ModelDefinitionProvider.GET_DBT_MODEL);
        if (dbtModel && dbtModel.length === 1) {
          const definition = this.getDefinitionFor(
            project.getProjectName(),
            dbtModel[0],
            document.uri,
          );
          resolve(definition);
          this.telemetry.sendTelemetryEvent("provideModelDefinition", {
            type: "single",
          });
          return;
        }
        if (dbtModel && dbtModel.length === 3) {
          const definition = this.getDefinitionFor(
            dbtModel[0],
            dbtModel[2],
            document.uri,
          );
          this.telemetry.sendTelemetryEvent("provideModelDefinition", {
            type: "dual",
          });
          resolve(definition);
          return;
        }
      }
      resolve(undefined);
    });
  }

  private onManifestCacheChanged(event: ManifestCacheChangedEvent): void {
    event.added?.forEach((added) => {
      this.modelToLocationMap.set(
        added.project.projectRoot.fsPath,
        added.nodeMetaMap,
      );
    });
    event.removed?.forEach((removed) => {
      this.modelToLocationMap.delete(removed.projectRoot.fsPath);
    });
  }

  private getDefinitionFor(
    projectName: string,
    modelName: string,
    currentFilePath: Uri,
  ): Definition | undefined {
    const projectRootpath =
      this.dbtProjectContainer.getProjectRootpath(currentFilePath);
    if (projectRootpath === undefined) {
      return;
    }
    const nodeMap = this.modelToLocationMap.get(projectRootpath.fsPath);
    if (nodeMap === undefined) {
      return;
    }
    const location = nodeMap.get(modelName);
    if (location && location.path) {
      return new Location(Uri.file(location.path), new Range(0, 0, 999, 999));
    }
    return undefined;
  }
}
