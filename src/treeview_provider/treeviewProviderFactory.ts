import { DBTManifestInstance, GraphMetaMap } from "../dbtManifest";
import { ModelTreeviewProvider } from "./ModelParentTreeviewProvider";

export class TreeviewProviderFactory {
  static createModelTreeview(treeType: keyof GraphMetaMap) {
    const modelParentTreeviewProvider = new ModelTreeviewProvider(treeType);
    DBTManifestInstance.addOnDBTManifestCacheChangedHandler(
      (event) => modelParentTreeviewProvider.onDBTManifestCacheChanged(event)
    );
    return modelParentTreeviewProvider;
  }
}