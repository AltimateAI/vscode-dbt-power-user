import {
  CompletionItem,
  CompletionItemKind,
  CompletionItemProvider,
  CompletionList,
  Disposable,
  ProviderResult,
} from "vscode";
import { provideSingleton } from "../utils";
import { UsersService } from "../services/usersService";

@provideSingleton(UserCompletionProvider)
export class UserCompletionProvider
  implements CompletionItemProvider, Disposable
{
  private disposables: Disposable[] = [];

  constructor(private usersService: UsersService) {}

  dispose() {
    while (this.disposables.length) {
      const x = this.disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  provideCompletionItems(): ProviderResult<
    CompletionItem[] | CompletionList<CompletionItem>
  > {
    return this.usersService.users.map((user) => ({
      label: `${user.display_name}`,
      kind: CompletionItemKind.User,
    }));
  }
}
