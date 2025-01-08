import * as sinon from "sinon";

export const ExtensionKind = {
  UI: 1,
  Workspace: 2,
};

export const Uri = {
  file: (path: string) => ({ fsPath: path, path }),
  parse: (uri: string) => ({ fsPath: uri, path: uri }),
};

export const extensions = {
  getExtension: sinon.stub(),
  all: [],
};

export const commands = {
  registerCommand: sinon.stub(),
  getCommands: sinon.stub(),
  executeCommand: sinon.stub(),
};

export const window = {
  showInformationMessage: sinon.stub(),
  showErrorMessage: sinon.stub(),
  createOutputChannel: sinon.stub(),
  createTerminal: sinon.stub(),
};

export const workspace = {
  getConfiguration: sinon.stub(),
  workspaceFolders: [],
  onDidChangeConfiguration: sinon.stub(),
  onDidChangeWorkspaceFolders: sinon.stub(),
  createFileSystemWatcher: sinon.stub(),
};

export const languages = {
  createDiagnosticCollection: sinon.stub().returns({
    set: sinon.stub(),
    delete: sinon.stub(),
    clear: sinon.stub(),
    dispose: sinon.stub(),
    [Symbol.iterator]: function* () {
      // Mock implementation that yields no diagnostics by default
      yield* new Map();
    },
    entries: function* () {
      // Mock implementation that yields no entries by default
      yield* new Map();
    },
    forEach: function (
      callback: (uri: typeof Uri, diagnostics: any[]) => void,
    ) {
      // Mock implementation that does nothing by default
    },
  }),
};

export const Diagnostic = class {
  constructor(
    public range: any,
    public message: string,
    public severity?: number,
  ) {}
};

export const Range = class {
  constructor(
    public startLine: number,
    public startCharacter: number,
    public endLine: number,
    public endCharacter: number,
  ) {}
};

export const Position = class {
  constructor(
    public line: number,
    public character: number,
  ) {}
};

export const DiagnosticSeverity = {
  Error: 0,
  Warning: 1,
  Information: 2,
  Hint: 3,
};
