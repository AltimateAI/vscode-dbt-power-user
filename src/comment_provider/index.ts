import { Disposable, languages } from "vscode";
import { DBTPowerUserExtension } from "../dbtPowerUserExtension";
import { provideSingleton } from "../utils";
import { ConversationProvider } from "./conversationProvider";

@provideSingleton(CommentProviders)
export class CommentProviders implements Disposable {
  private disposables: Disposable[] = [];
  constructor(private conversationProvider: ConversationProvider) {
    this.disposables.push(this.conversationProvider);
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
