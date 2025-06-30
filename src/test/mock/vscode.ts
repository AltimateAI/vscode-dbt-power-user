import { jest } from "@jest/globals";
import { Uri } from "vscode";

// Export VSCode types that were previously defined
export const ExtensionKind = {
  UI: 1,
  Workspace: 2,
};

export { Uri };

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

export const TreeItemCollapsibleState = {
  None: 0,
  Collapsed: 1,
  Expanded: 2,
};

export const TreeItem = class {
  constructor(
    public label?: string,
    public collapsibleState?: number,
  ) {}
};

export const Diagnostic = class {
  constructor(
    public range: any,
    public message: string,
    public severity?: number,
  ) {}
};

// Mock VSCode API
export const extensions = {
  getExtension: jest.fn(),
  all: [],
};

export const commands = {
  registerCommand: jest.fn().mockReturnValue({ dispose: jest.fn() }),
  getCommands: jest.fn().mockReturnValue(Promise.resolve([])),
  executeCommand: jest.fn().mockReturnValue(Promise.resolve()),
};

export const window = {
  showInformationMessage: jest.fn().mockReturnValue(Promise.resolve()),
  showErrorMessage: jest.fn().mockReturnValue(Promise.resolve()),
  createOutputChannel: jest.fn().mockReturnValue({
    append: jest.fn(),
    appendLine: jest.fn(),
    clear: jest.fn(),
    show: jest.fn(),
    hide: jest.fn(),
    dispose: jest.fn(),
  }),
  createTerminal: jest.fn().mockReturnValue({
    sendText: jest.fn(),
    show: jest.fn(),
    hide: jest.fn(),
    dispose: jest.fn(),
  }),
};

export const workspace = {
  getConfiguration: jest.fn().mockReturnValue({
    get: jest.fn(),
    has: jest.fn(),
    update: jest.fn(),
  }),
  workspaceFolders: [],
  onDidChangeConfiguration: jest.fn().mockReturnValue({ dispose: jest.fn() }),
  onDidChangeWorkspaceFolders: jest
    .fn()
    .mockReturnValue({ dispose: jest.fn() }),
  createFileSystemWatcher: jest.fn().mockReturnValue({
    onDidChange: jest.fn().mockReturnValue({ dispose: jest.fn() }),
    onDidCreate: jest.fn().mockReturnValue({ dispose: jest.fn() }),
    onDidDelete: jest.fn().mockReturnValue({ dispose: jest.fn() }),
    dispose: jest.fn(),
  }),
};

export const languages = {
  createDiagnosticCollection: jest.fn().mockReturnValue({
    set: jest.fn(),
    delete: jest.fn(),
    clear: jest.fn(),
    dispose: jest.fn(),
    [Symbol.iterator]: function* () {
      yield* new Map();
    },
    entries: function* () {
      yield* new Map();
    },
    forEach: function (
      callback: (uri: typeof Uri, diagnostics: any[]) => void,
    ) {
      // Mock implementation that does nothing by default
    },
  }),
};

export const resetMocks = () => {
  jest.clearAllMocks();
};
