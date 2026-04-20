import "reflect-metadata";

// Set up the container before tests
import "../inversify.config";
import { MockEventEmitter } from "./common";

// Mock VS Code APIs before any imports
jest.mock("vscode", () => ({
  EventEmitter: jest.fn().mockImplementation(() => new MockEventEmitter()),
  workspace: {
    getConfiguration: jest.fn().mockReturnValue({
      get: jest.fn(),
      update: jest.fn(),
    }),
    workspaceFolders: [],
    onDidChangeConfiguration: jest.fn(),
    onDidChangeWorkspaceFolders: jest.fn().mockImplementation((callback) => ({
      dispose: jest.fn(),
    })),
    createFileSystemWatcher: jest.fn().mockReturnValue({
      onDidChange: jest.fn(),
      onDidCreate: jest.fn(),
      onDidDelete: jest.fn(),
      dispose: jest.fn(),
    }),
  },
  commands: {
    getCommands: jest.fn().mockResolvedValue([]),
    registerCommand: jest.fn(),
    executeCommand: jest.fn(),
  },
  window: {
    showInformationMessage: jest.fn(),
    showWarningMessage: jest.fn(),
    showErrorMessage: jest.fn(),
    createTerminal: jest.fn().mockReturnValue({
      dispose: jest.fn(),
      hide: jest.fn(),
      show: jest.fn(),
      sendText: jest.fn(),
    }),
    createOutputChannel: jest.fn().mockReturnValue({
      appendLine: jest.fn(),
      show: jest.fn(),
      clear: jest.fn(),
      dispose: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    }),
  },
  languages: {
    createDiagnosticCollection: jest.fn().mockReturnValue({
      set: jest.fn(),
      delete: jest.fn(),
      clear: jest.fn(),
      dispose: jest.fn(),
    }),
  },
  Uri: {
    file: jest.fn((f: string) => ({ fsPath: f })),
    parse: jest.fn(),
  },
  DiagnosticSeverity: {
    Error: 0,
    Warning: 1,
    Information: 2,
    Hint: 3,
  },
  Disposable: {
    from: jest.fn(),
  },
  ExtensionKind: {
    UI: 1,
    Workspace: 2,
  },
  Diagnostic: jest.fn().mockImplementation((range, message, severity) => ({
    range,
    message,
    severity,
  })),
  Range: jest
    .fn()
    .mockImplementation((startLine, startChar, endLine, endChar) => ({
      start: { line: startLine, character: startChar },
      end: { line: endLine, character: endChar },
    })),
  Position: jest.fn().mockImplementation((line, character) => ({
    line,
    character,
  })),
  Location: jest.fn().mockImplementation((uri: any, rangeOrPosition: any) => ({
    uri,
    range: rangeOrPosition,
  })),
  TreeItemCollapsibleState: {
    None: 0,
    Collapsed: 1,
    Expanded: 2,
  },
  TreeItem: class TreeItem {
    label: string | undefined;
    collapsibleState: number | undefined;
    description?: string;
    iconPath?: any;
    tooltip?: string;
    contextValue?: string;
    constructor(label?: string, collapsibleState?: number) {
      this.label = label;
      this.collapsibleState = collapsibleState;
    }
  },
  CancellationTokenSource: jest.fn().mockImplementation(() => ({
    token: {
      onCancellationRequested: jest.fn(),
      isCancellationRequested: false,
    },
    cancel: jest.fn(),
    dispose: jest.fn(),
  })),
  CancellationToken: {
    None: {
      onCancellationRequested: jest.fn(),
      isCancellationRequested: false,
    },
  },
  ThemeIcon: jest.fn().mockImplementation((id, color) => ({
    id,
    color,
  })),
  ThemeColor: jest.fn().mockImplementation((id) => ({
    id,
  })),
  SymbolKind: {
    File: 0,
    Module: 1,
    Namespace: 2,
    Package: 3,
    Class: 4,
    Method: 5,
    Property: 6,
    Field: 7,
    Constructor: 8,
    Enum: 9,
    Interface: 10,
    Function: 11,
    Variable: 12,
    Constant: 13,
    String: 14,
    Number: 15,
    Boolean: 16,
    Array: 17,
    Object: 18,
    Key: 19,
    Null: 20,
    EnumMember: 21,
    Struct: 22,
    Event: 23,
    Operator: 24,
    TypeParameter: 25,
  },
  DocumentSymbol: jest
    .fn()
    .mockImplementation((name, detail, kind, range, selectionRange) => ({
      name,
      detail,
      kind,
      range,
      selectionRange,
      children: [],
    })),
  SymbolInformation: jest
    .fn()
    .mockImplementation((name, kind, containerName, location) => ({
      name,
      kind,
      containerName,
      location,
    })),
  Location: jest.fn().mockImplementation((uri, rangeOrPosition) => ({
    uri,
    range: rangeOrPosition,
  })),
}));
