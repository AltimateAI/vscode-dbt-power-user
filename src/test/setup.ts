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
  TreeItemCollapsibleState: {
    None: 0,
    Collapsed: 1,
    Expanded: 2,
  },
  TreeItem: jest.fn().mockImplementation((label, collapsibleState) => ({
    label,
    collapsibleState,
  })),
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
}));
