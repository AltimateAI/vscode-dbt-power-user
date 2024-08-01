import { Uri } from "vscode";
import { provideSingleton } from "../utils";
import { NotebookClient } from "./notebookClient";
import path = require("path");
import { inject } from "inversify";

@provideSingleton(ClientMapper)
export class ClientMapper {
  private clientMap: Map<string, Promise<NotebookClient>> = new Map();

  constructor(
    @inject("Factory<NotebookClient>")
    private notebookClientFactory: (path: string) => NotebookClient,
  ) {}
  async initializeNotebookClient(notebookUri: Uri): Promise<NotebookClient> {
    if (!this.clientMap.has(notebookUri.fsPath)) {
      const client = this.notebookClientFactory(notebookUri.fsPath);
      this.clientMap.set(notebookUri.fsPath, Promise.resolve(client));
    }
    return this.clientMap.get(notebookUri.fsPath)!;
  }

  getNotebookClient(notebookUri: Uri): Promise<NotebookClient> {
    if (!this.clientMap.has(notebookUri.fsPath)) {
      throw new Error("Notebook client not initialized");
    }
    return this.clientMap.get(notebookUri.fsPath)!;
  }
}
