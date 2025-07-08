import { jest } from "@jest/globals";
import { Uri } from "vscode";

// Export VSCode types that were previously defined
export const ExtensionKind = {
  UI: 1,
  Workspace: 2,
};

export { Uri };

export class Position {
  constructor(
    public line: number,
    public character: number,
  ) {}

  // Add common Position methods for compatibility
  isEqual(other: Position): boolean {
    return this.line === other.line && this.character === other.character;
  }

  isBefore(other: Position): boolean {
    return (
      this.line < other.line ||
      (this.line === other.line && this.character < other.character)
    );
  }

  isAfter(other: Position): boolean {
    return (
      this.line > other.line ||
      (this.line === other.line && this.character > other.character)
    );
  }

  isBeforeOrEqual(other: Position): boolean {
    return this.isBefore(other) || this.isEqual(other);
  }

  isAfterOrEqual(other: Position): boolean {
    return this.isAfter(other) || this.isEqual(other);
  }
}

export class Range {
  public start: Position;
  public end: Position;

  constructor(start: Position, end: Position) {
    this.start = start;
    this.end = end;
  }
}

export const DiagnosticSeverity = {
  Error: 0,
  Warning: 1,
  Information: 2,
  Hint: 3,
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
  registerCodeLensProvider: jest.fn().mockReturnValue({ dispose: jest.fn() }),
};

export const resetMocks = () => {
  jest.clearAllMocks();
};
