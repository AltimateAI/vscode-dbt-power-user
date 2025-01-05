import { EventEmitter as NodeEventEmitter } from "events";

class VSCodeEventEmitter<T> extends NodeEventEmitter {
  event: (listener: (e: T) => any) => { dispose: () => void };

  constructor() {
    super();
    this.event = (listener: (e: T) => any) => {
      this.on("event", listener);
      return {
        dispose: () => this.removeListener("event", listener),
      };
    };
  }

  fire(data: T) {
    this.emit("event", data);
  }
}

export default {
  Uri: {
    file: (path: string) => ({
      fsPath: path,
      path: path,
      scheme: "file",
    }),
  },
  workspace: {
    workspaceFolders: [],
    getConfiguration: () => ({
      get: () => null,
      update: () => Promise.resolve(),
    }),
    onDidChangeConfiguration: () => ({ dispose: () => {} }),
    onDidChangeWorkspaceFolders: (listener: any) => ({ dispose: () => {} }),
  },
  window: {
    showInformationMessage: () => Promise.resolve(),
    showErrorMessage: () => Promise.resolve(),
    createOutputChannel: () => ({
      appendLine: () => {},
      show: () => {},
    }),
  },
  commands: {
    registerCommand: () => ({ dispose: () => {} }),
    getCommands: () => Promise.resolve([]),
  },
  languages: {
    createDiagnosticCollection: (name: string) => ({
      name,
      set: () => {},
      clear: () => {},
      dispose: () => {},
      forEach: () => {},
      delete: () => {},
      has: () => false,
      get: () => undefined,
      [Symbol.iterator]: function* () {},
    }),
  },
  EventEmitter: VSCodeEventEmitter,
  ExtensionContext: class {
    subscriptions = [];
    workspaceState = {
      get: () => null,
      update: () => Promise.resolve(),
    };
    globalState = {
      get: () => null,
      update: () => Promise.resolve(),
    };
  },
  ExtensionKind: {
    UI: 1,
    Workspace: 2,
  },
  extensions: {
    all: [],
    getExtension: () => undefined,
  },
  UI: {
    createTree: () => ({
      onDidChangeSelection: () => ({ dispose: () => {} }),
      onDidChangeVisibility: () => ({ dispose: () => {} }),
    }),
  },
};
