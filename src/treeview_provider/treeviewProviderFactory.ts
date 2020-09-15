import { GraphMetaMap } from "../domain";
import { manifestContainer } from "../manifest/manifestContainer";
import { ModelTreeviewProvider } from "./ModelParentTreeviewProvider";

export class TreeviewProviderFactory {
  static createModelTreeview(treeType: keyof GraphMetaMap) {
    const modelParentTreeviewProvider = new ModelTreeviewProvider(treeType);
    manifestContainer.addEventHandler(modelParentTreeviewProvider);
    return modelParentTreeviewProvider;
  }
}