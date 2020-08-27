import {
  DefinitionProvider,
  Definition,
  workspace,
  Uri,
  TextDocument,
  CancellationToken,
  ProviderResult,
  DefinitionLink,
  Location,
  Position,
  Range,
} from "vscode";
import { DBTManifestCacheChangedEvent, ModelMetaMap } from "../dbtManifest";
import * as path from 'path';

export class ModelDefinitionProvider implements DefinitionProvider {
  private modelToLocationMap: ModelMetaMap = new Map();
  private static readonly IS_REF = /(ref)[^}]*/;
  private static readonly GET_DBT_MODEL = /(?!'|")([^(?!'|")]*)(?='|")/gi;

  provideDefinition(
    document: TextDocument,
    position: Position,
    token: CancellationToken
  ): ProviderResult<Definition | DefinitionLink[]> {
    return new Promise((resolve, reject) => {
      const hover = document.getText(document.getWordRangeAtPosition(position));
      const word = document.getText(
        document.getWordRangeAtPosition(position, ModelDefinitionProvider.IS_REF)
      );
      if (word !== undefined && hover !== "ref") {
        const dbtModel = word.match(ModelDefinitionProvider.GET_DBT_MODEL);
        if (dbtModel && dbtModel.length === 1) {
          const definition = this.getDefinitionFor(dbtModel[0]);
          resolve(definition);
          return;
        }
      }
      reject();
    });
  }

  onDBTManifestCacheChanged(event: DBTManifestCacheChangedEvent): void {
    this.modelToLocationMap = event.modelMetaMap;
  }

  private getDefinitionFor(name: string): Definition | undefined {
    const location = this.modelToLocationMap.get(name);
    if (workspace.rootPath && location) {
      return new Location(
        Uri.file(path.join(workspace.rootPath, location.path)),
        new Range(0, 0, 0, 0)
      );
    }
    return undefined;
  }
}
