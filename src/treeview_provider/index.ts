import { Disposable, window } from "vscode";
import { provideSingleton } from "../utils";
import { ChildrenModelTreeview, ParentModelTreeview, ModelTestTreeview } from "./ModelTreeviewProvider";

@provideSingleton(TreeviewProviders)
export class TreeviewProviders implements Disposable {
  private disposables: Disposable[] = [];

  constructor(
    private childrenModelTreeview: ChildrenModelTreeview,
    private parentModelTreeview: ParentModelTreeview,
    private testModelTreeview: ModelTestTreeview,
  ) {
    this.disposables.push(
      window.registerTreeDataProvider(
        "model_test_treeview",
        this.testModelTreeview
      ),
      window.registerTreeDataProvider(
        "parent_model_treeview",
        this.parentModelTreeview
      ),
      window.registerTreeDataProvider(
        "children_model_treeview",
        this.childrenModelTreeview
      ),
    );
  }

  dispose() {
    this.disposables.forEach(disposable => disposable.dispose());
  }
}
