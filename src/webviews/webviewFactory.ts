import { DBTManifestInstance } from "../dbtManifest";
import { ModelGraphView } from "./modelGraphView";
import { ExtensionContext } from "vscode";

export class WebviewFactory {
  static createModelGraphView(context: ExtensionContext): () => void {
    const modelNodeView = new ModelGraphView(context);
    DBTManifestInstance.addOnDBTManifestCacheChangedHandler(
      (event) => modelNodeView.onDBTManifestCacheChanged(event)
    );
    return () => modelNodeView.show();
  }
}