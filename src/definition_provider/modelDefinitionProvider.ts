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
import { DBTManifestCacheChangedEvent, NodeMetaMap } from "../dbtManifest";

export class ModelDefinitionProvider implements DefinitionProvider {
  private modelToLocationMap: NodeMetaMap = new Map();
  private static readonly IS_REF = /(ref)\([^)]*\)/;
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
    this.modelToLocationMap = event.nodeMetaMap;
  }

  private getDefinitionFor(name: string): Definition | undefined {
    const location = this.modelToLocationMap.get(name);
    if (location) {
      return new Location(
        Uri.file(location.path),
        new Range(0, 0, 0, 0)
      );
    }
    return undefined;
  }
}
