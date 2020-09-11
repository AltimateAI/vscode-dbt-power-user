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
import { DBTManifestCacheChangedEvent } from "../dbtManifest";
import { NodeMetaMap } from "../domain";
import { getProjectRootpath } from "../utils";

export class ModelDefinitionProvider implements DefinitionProvider {
  private modelToLocationMap: Map<string, NodeMetaMap> = new Map();
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
          const definition = this.getDefinitionFor(dbtModel[0], document.uri.path);
          resolve(definition);
          return;
        }
      }
      reject();
    });
  }

  onDBTManifestCacheChanged(event: DBTManifestCacheChangedEvent, rootpath: string): void {
    this.modelToLocationMap.set(rootpath, event.nodeMetaMap);
  }

  private getDefinitionFor(name: string, currentFilePath: string): Definition | undefined {
    const workspaceFolders = workspace.workspaceFolders;
    if (workspaceFolders === undefined) {
      return;
    }
    const projectRootpath = getProjectRootpath(workspaceFolders, currentFilePath);
    if (projectRootpath === undefined) {
      return;
    }
    const nodeMetaMap = this.modelToLocationMap.get(projectRootpath);
    if (nodeMetaMap === undefined) {
      return;
    }
    const location = nodeMetaMap.get(name);
    if (location) {
      return new Location(
        Uri.file(location.path),
        new Range(0, 0, 0, 0)
      );
    }
    return undefined;
  }
}
