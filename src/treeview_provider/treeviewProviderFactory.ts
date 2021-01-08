import * as vscode from "vscode";
import { GraphMetaMap } from "../domain";
import { ModelTreeviewProvider } from "./ModelParentTreeviewProvider";

export class TreeviewProviderFactory {
  static createModelTreeViews() {
    return [
      vscode.window.registerTreeDataProvider(
        "parent_model_treeview",
        TreeviewProviderFactory.createModelTreeview("parents")
      ),
      vscode.window.registerTreeDataProvider(
        "children_model_treeview",
        TreeviewProviderFactory.createModelTreeview("children")
      ),
    ];
  }
  static createModelTreeview(treeType: keyof GraphMetaMap) {
    return new ModelTreeviewProvider(treeType);
  }
}
