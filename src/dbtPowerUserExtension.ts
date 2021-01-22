import { Disposable } from "vscode";
import { AutocompletionProviders } from "./autocompletion_provider";
import { VSCodeCommands } from "./commands";
import { DefinitionProviders } from "./definition_provider";
import { DBTProjectContainer } from "./manifest/dbtProjectContainer";
import { Reporter } from "./reporter";
import { ReporterEvents } from './reporter/reporterEvents';
import { StatusBars } from "./statusbar";
import { TreeviewProviders } from "./treeview_provider";
import { provideSingleton } from "./utils";

@provideSingleton(DBTPowerUserExtension)
export class DBTPowerUserExtension implements Disposable {
  static DBT_MODE = { language: "jinja-sql", scheme: "file" };
  private disposables: Disposable[] = [];
  
  constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private autocompletionProviders: AutocompletionProviders,
    private definitionProviders: DefinitionProviders,
    private vscodeCommands: VSCodeCommands,
    private treeviewProviders: TreeviewProviders,
    private statusBars: StatusBars,
    private reporter: Reporter,
  ) {
    this.disposables.push(
      this.dbtProjectContainer,
      this.definitionProviders,
      this.autocompletionProviders,
      this.treeviewProviders,
      this.vscodeCommands,
      this.reporter,
      this.statusBars,
    );
  }

  dispose() {
    this.disposables.forEach(disposable => disposable.dispose());
  }

  async activate(): Promise<void> {
    this.reporter.sendEvent(ReporterEvents.ACTIVATE);
    await this.dbtProjectContainer.detectDBT();
    await this.dbtProjectContainer.initializeDBTProjects();
  }
}
