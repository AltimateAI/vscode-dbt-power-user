import {
  CancellationToken,
  HoverProvider,
  Disposable,
  Position,
  ProviderResult,
  Range,
  TextDocument,
  Uri,
  Hover,
  MarkdownString,
} from "vscode";
import { NodeMetaMap } from "../domain";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { ManifestCacheChangedEvent } from "../manifest/event/manifestCacheChangedEvent";
import { provideSingleton } from "../utils";
import { TelemetryService } from "../telemetry";
import { GenerateHoverMarkdownString } from "./utils";

@provideSingleton(ModelHoverProvider)
export class ModelHoverProvider implements HoverProvider, Disposable {
  private modelToLocationMap: Map<string, NodeMetaMap> = new Map();
  private static readonly IS_REF = /(ref)\([^)]*\)/;
  private static readonly GET_DBT_MODEL = /(?!'|")([^(?!'|")]*)(?='|")/gi;
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

  provideHover(
    document: TextDocument,
    position: Position,
    token: CancellationToken,
  ): ProviderResult<Hover> {
    return new Promise((resolve) => {
      const hover = document.getText(document.getWordRangeAtPosition(position));
      const word = document.getText(
        document.getWordRangeAtPosition(position, ModelHoverProvider.IS_REF),
      );
      const project = this.dbtProjectContainer.findDBTProject(document.uri);
      if (!project) {
        console.error(
          "Could not load hover provider, project not found in container for " +
            document.uri.fsPath,
        );
        return;
      }
      if (word !== undefined && hover !== "ref") {
        const dbtModel = word.match(ModelHoverProvider.GET_DBT_MODEL);
        if (dbtModel && dbtModel.length === 1) {
          const mdString = this.getHoverMarkdownFor(
            project.getProjectName(),
            dbtModel[0],
            document.uri,
          );
          if (mdString !== undefined) {
            const hover = new Hover(mdString, new Range(position, position));
            resolve(hover);
          }
          this.telemetry.sendTelemetryEvent("provideModelHover", {
            type: "single",
          });
          return;
        }
        if (dbtModel && dbtModel.length === 3) {
          const mdString = this.getHoverMarkdownFor(
            dbtModel[0],
            dbtModel[2],
            document.uri,
          );
          if (mdString !== undefined) {
            const hover = new Hover(mdString, new Range(position, position));
            resolve(hover);
          }
          this.telemetry.sendTelemetryEvent("provideModelHover", {
            type: "dual",
          });
          return;
        }
      }
      resolve(undefined);
    });
  }

  private onManifestCacheChanged(event: ManifestCacheChangedEvent): void {
    event.added?.forEach((added) => {
      this.modelToLocationMap.set(added.projectRoot.fsPath, added.nodeMetaMap);
    });
    event.removed?.forEach((removed) => {
      this.modelToLocationMap.delete(removed.projectRoot.fsPath);
    });
  }

  private getHoverMarkdownFor(
    projectName: string,
    modelName: string,
    currentFilePath: Uri,
  ): MarkdownString | undefined {
    const projectRootpath =
      this.dbtProjectContainer.getProjectRootpath(currentFilePath);
    if (projectRootpath === undefined) {
      return;
    }
    const nodeMap = this.modelToLocationMap.get(projectRootpath.fsPath);
    if (nodeMap === undefined) {
      return;
    }
    const node = nodeMap.get(modelName);
    if (node) {
      return GenerateHoverMarkdownString(node, "ref");
    }
    return undefined;
  }
}
