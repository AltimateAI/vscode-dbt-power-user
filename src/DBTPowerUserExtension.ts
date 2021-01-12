import { inject } from "inversify";
import { provide } from "inversify-binding-decorators";
import { AutocompletionProviderFactory } from "./autocompletion_provider/autocompletionProviderFactory";

@provide(DBTPowerUserExtension)
export class DBTPowerUserExtension {
  @inject(AutocompletionProviderFactory)
  autocompletionProviderFactory!: AutocompletionProviderFactory;

  createAutoCompletionProviders() {
    return this.autocompletionProviderFactory.createAutoCompletionProviders();
  }
}
