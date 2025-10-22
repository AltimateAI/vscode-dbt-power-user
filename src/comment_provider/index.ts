import { Disposable } from "vscode";
import { ConversationProvider } from "./conversationProvider";

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
