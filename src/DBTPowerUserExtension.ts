import { AutocompletionProviderFactory } from "./autocompletion_provider/autocompletionProviderFactory";
import { VSCodeCommandFactory } from "./commands/vscodeCommandFactory";
import { DefinitionProviderFactory } from "./definition_provider/definitionProviderFactory";
import { TreeviewProviderFactory } from "./treeview_provider/treeviewProviderFactory";
import { provideSingleton } from "./utils";

@provideSingleton(DBTPowerUserExtension)
export class DBTPowerUserExtension {
  constructor(
    private autocompletionProviderFactory: AutocompletionProviderFactory,
    private definitionProviderFactory: DefinitionProviderFactory,
    private vscodeCommandFactory: VSCodeCommandFactory,
    private treeviewProviderFactory: TreeviewProviderFactory
  ) {}

  createAutoCompletionProviders() {
    return this.autocompletionProviderFactory.createAutoCompletionProviders();
  }

  createDefinitionProviders() {
    return this.definitionProviderFactory.createDefinitionProviders();
  }

  createCommands() {
    return this.vscodeCommandFactory.createCommands();
  }

  createModelTreeViews() {
    return this.treeviewProviderFactory.createModelTreeViews();
  }
}
