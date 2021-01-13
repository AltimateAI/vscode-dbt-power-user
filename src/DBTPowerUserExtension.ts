import { AutocompletionProviderFactory } from "./autocompletion_provider/autocompletionProviderFactory";
import { VSCodeCommandFactory } from "./commands/vscodeCommandFactory";
import { provideSingleton } from "./utils";

@provideSingleton(DBTPowerUserExtension)
export class DBTPowerUserExtension {
  constructor(
    private autocompletionProviderFactory: AutocompletionProviderFactory,
    private vscodeCommandFactory: VSCodeCommandFactory
  ) {}

  createAutoCompletionProviders() {
    return this.autocompletionProviderFactory.createAutoCompletionProviders();
  }

  createCommands() {
    return this.vscodeCommandFactory.createCommands();
  }
}
