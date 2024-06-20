import {
  CancellationToken,
  CodeLens,
  CodeLensProvider,
  Command,
  Range,
  TextDocument,
} from "vscode";
import { provideSingleton } from "../utils";
import { VirtualSqlContentProvider } from "../content_provider/virtualSqlContentProvider";

@provideSingleton(VirtualSqlCodeLensProvider)
export class VirtualSqlCodeLensProvider implements CodeLensProvider {
  public provideCodeLenses(
    document: TextDocument,
    token: CancellationToken,
  ): CodeLens[] | Thenable<CodeLens[]> {
    if (document.uri.scheme !== VirtualSqlContentProvider.SCHEME) {
      return [];
    }

    const topOfDocument = new Range(0, 0, 0, 0);
    const command: Command = {
      title: "Show Options",
      command: "extension.showOptions", // This command must be implemented and registered in your extension
      arguments: [document.uri], // Optional: pass document URI or other arguments
    };

    return [new CodeLens(topOfDocument, command)];
  }
}
