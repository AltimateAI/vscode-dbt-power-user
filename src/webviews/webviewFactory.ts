import { DBTManifestInstance } from "../manifest";
import { ModelGraphView } from "./modelGraphView";
import { ExtensionContext } from "vscode";

export class WebviewFactory {
  static createModelGraphView(context: ExtensionContext): () => void {
    const modelNodeView = new ModelGraphView(context);
    DBTManifestInstance.addOnDBTManifestCacheChangedHandler((event: any) =>
      modelNodeView.onDBTManifestCacheChanged(event)
    );
    return () => modelNodeView.show();
  }
}
