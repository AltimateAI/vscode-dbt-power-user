import { inject } from "inversify";
import * as vscode from "vscode";
import { GraphMetaMap } from "../domain";
import { provideSingleton } from "../utils";
import { ModelTreeviewProvider } from "./ModelParentTreeviewProvider";

@provideSingleton(TreeviewProviderFactory)
export class TreeviewProviderFactory {
  constructor(
    @inject("ModelTreeviewProviderFactory")
    private ModelTreeviewProviderFactory: (
      treeType: keyof GraphMetaMap
    ) => ModelTreeviewProvider
  ) {}
  createModelTreeViews() {
    return [
      vscode.window.registerTreeDataProvider(
        "parent_model_treeview",
        this.createModelTreeview("parents")
      ),
      vscode.window.registerTreeDataProvider(
        "children_model_treeview",
        this.createModelTreeview("children")
      ),
    ];
  }
  createModelTreeview(treeType: keyof GraphMetaMap) {
    return this.ModelTreeviewProviderFactory(treeType);
  }
}
