import { Disposable, window } from "vscode";
import { CteProfilerTreeviewProvider } from "../cte_profiler/cteProfilerTreeviewProvider";
import {
  ChildrenModelTreeview,
  DocumentationTreeview,
  IconActionsTreeview,
  ModelTestTreeview,
  ParentModelTreeview,
} from "./modelTreeviewProvider";
import { RunHistoryTreeviewProvider } from "./runHistoryTreeviewProvider";

export class TreeviewProviders implements Disposable {
  private disposables: Disposable[] = [];

  constructor(
    private childrenModelTreeview: ChildrenModelTreeview,
    private parentModelTreeview: ParentModelTreeview,
    private testModelTreeview: ModelTestTreeview,
    private documentationTreeView: DocumentationTreeview,
    private iconActionsTreeview: IconActionsTreeview,
    private runHistoryTreeviewProvider: RunHistoryTreeviewProvider,
    private cteProfilerTreeviewProvider: CteProfilerTreeviewProvider,
  ) {
    this.disposables.push(
      window.registerTreeDataProvider(
        "model_test_treeview",
        this.testModelTreeview,
      ),
      window.registerTreeDataProvider(
        "parent_model_treeview",
        this.parentModelTreeview,
      ),
      window.registerTreeDataProvider(
        "children_model_treeview",
        this.childrenModelTreeview,
      ),
      window.registerTreeDataProvider(
        "documentation_treeview",
        this.documentationTreeView,
      ),
      window.registerTreeDataProvider(
        "icon_actions_treeview",
        this.iconActionsTreeview,
      ),
      window.registerTreeDataProvider(
        "run_history_treeview",
        this.runHistoryTreeviewProvider,
      ),
      window.registerTreeDataProvider(
        "cte_profiler_treeview",
        this.cteProfilerTreeviewProvider,
      ),
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
