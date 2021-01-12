import { inject } from "inversify";
import { AutocompletionProviderFactory } from "./autocompletion_provider/autocompletionProviderFactory";
import { provideSingleton } from "./utils";

@provideSingleton(DBTPowerUserExtension)
export class DBTPowerUserExtension {
  @inject(AutocompletionProviderFactory)
  autocompletionProviderFactory!: AutocompletionProviderFactory;

  createAutoCompletionProviders() {
    return this.autocompletionProviderFactory.createAutoCompletionProviders();
  }
}
