import { Disposable, window } from "vscode";
import { provideSingleton } from "../utils";
import {
  ChildrenModelTreeview,
  ModelTestTreeview,
  ParentModelTreeview,
} from "./modelTreeviewProvider";

@provideSingleton(TreeviewProviders)
export class TreeviewProviders implements Disposable {
  private disposables: Disposable[] = [];

  constructor(
    private childrenModelTreeview: ChildrenModelTreeview,
    private parentModelTreeview: ParentModelTreeview,
    private testModelTreeview: ModelTestTreeview
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
      )
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
}
