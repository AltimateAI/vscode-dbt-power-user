import * as vscode from "vscode";
import { DbtProjectContainer } from "../manifest/dbtProjectContainer";
import { provideSingleton } from "../utils";
import { ModelTreeviewProvider } from "./ModelTreeviewProvider";

@provideSingleton(ParentModelTreeview)
class ParentModelTreeview extends ModelTreeviewProvider {
  constructor(dbtProjectContainer: DbtProjectContainer) {
    super(dbtProjectContainer, "parents");
  }
}

@provideSingleton(ChildrenModelTreeview)
class ChildrenModelTreeview extends ModelTreeviewProvider {
  constructor(dbtProjectContainer: DbtProjectContainer) {
    super(dbtProjectContainer, "children");
  }
}
@provideSingleton(TreeviewProviderFactory)
export class TreeviewProviderFactory {
  constructor(
    private childrenModelTreeview: ChildrenModelTreeview,
    private parentModelTreeview: ParentModelTreeview
  ) {}
  createModelTreeViews() {
    return [
      vscode.window.registerTreeDataProvider(
        "parent_model_treeview",
        this.parentModelTreeview
      ),
      vscode.window.registerTreeDataProvider(
        "children_model_treeview",
        this.childrenModelTreeview
      ),
    ];
  }
}
