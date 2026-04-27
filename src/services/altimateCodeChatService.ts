import * as path from "path";
import { Disposable, extensions, Range, Uri, window, workspace } from "vscode";

export class AltimateCodeChatService implements Disposable {
  private disposables: Disposable[] = [];

  async openChat(options: {
    initialMessage: string;
    title: string;
  }): Promise<boolean> {
    const altimateExt = extensions.getExtension(
      "altimateai.vscode-altimate-mcp-server",
    );
    if (!altimateExt) {
      window.showErrorMessage(
        "Datamates extension is not installed or not active.",
      );
      return false;
    }
    if (!altimateExt.isActive) {
      await altimateExt.activate();
    }
    const chat = altimateExt.exports?.chat;
    if (!chat) {
      window.showErrorMessage(
        "Datamates extension is out of date, please update to the latest version.",
      );
      return false;
    }
    // createSession opens the panel, starts the server, creates the session,
    // and sends the initial message — all handled by the Datamates extension's
    // webview:ready lifecycle.
    await chat.createSession({
      initialMessage: options.initialMessage,
      title: options.title,
    });
    return true;
  }

  getEditorContext(): {
    code: string;
    relativePath: string;
    fileName: string;
  } | null {
    const editor = window.activeTextEditor;
    if (!editor) {
      return null;
    }

    const document = editor.document;
    const selection = editor.selection;
    const fileName = path.basename(document.uri.fsPath);
    const relativePath = this.getRelativePath(document.uri);

    if (selection && !selection.isEmpty) {
      const selectionRange = new Range(
        selection.start.line,
        selection.start.character,
        selection.end.line,
        selection.end.character,
      );
      return {
        code: document.getText(selectionRange),
        relativePath,
        fileName,
      };
    }

    return {
      code: document.getText(),
      relativePath,
      fileName,
    };
  }

  getContextForUri(uri: Uri): {
    code: string;
    relativePath: string;
    fileName: string;
  } | null {
    const fileName = path.basename(uri.fsPath);
    const relativePath = this.getRelativePath(uri);
    return {
      code: "",
      relativePath,
      fileName,
    };
  }

  getRelativePath(uri: Uri): string {
    const workspaceFolders = workspace.workspaceFolders;
    if (workspaceFolders && workspaceFolders.length > 0) {
      const relative = path.relative(
        workspaceFolders[0].uri.fsPath,
        uri.fsPath,
      );
      if (!relative.startsWith("..")) {
        return relative;
      }
    }
    return uri.fsPath;
  }

  dispose() {
    while (this.disposables.length) {
      this.disposables.pop()?.dispose();
    }
  }
}
