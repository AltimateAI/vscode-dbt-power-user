import { jest } from "@jest/globals";

// Export VSCode types that were previously defined
export const ExtensionKind = {
  UI: 1,
  Workspace: 2,
};

export const Uri = {
  file: jest.fn((f: string) => ({ fsPath: f })),
  parse: jest.fn(),
};

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

export class Location {
  public range: Range | Position;
  constructor(
    public uri: typeof Uri | any,
    rangeOrPosition: Range | Position,
  ) {
    this.range = rangeOrPosition;
  }
}

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

export class TextEdit {
  constructor(
    public range: Range,
    public newText: string,
  ) {}

  static insert(position: Position, newText: string): TextEdit {
    return new TextEdit(new Range(position, position), newText);
  }

  static replace(range: Range, newText: string): TextEdit {
    return new TextEdit(range, newText);
  }

  static delete(range: Range): TextEdit {
    return new TextEdit(range, "");
  }
}

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
  showWarningMessage: jest.fn().mockReturnValue(Promise.resolve()),
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
  withProgress: jest
    .fn()
    .mockImplementation((_options: any, task: any) => task()),
};

export const workspace = {
  getConfiguration: jest.fn().mockReturnValue({
    get: jest.fn(),
    has: jest.fn(),
    update: jest.fn(),
  }),
  workspaceFolders: [],
  getWorkspaceFolder: jest.fn((uri: typeof Uri) => {
    if (workspace.workspaceFolders && workspace.workspaceFolders.length > 0) {
      return workspace.workspaceFolders[0];
    }
    return undefined;
  }),
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
} as any;

export const languages = {
  createDiagnosticCollection: jest.fn().mockReturnValue({
    set: jest.fn(),
    get: jest.fn(),
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

export class EventEmitter<T> {
  private listeners: ((e: T) => any)[] = [];

  event = (listener: (e: T) => any) => {
    this.listeners.push(listener);
    return {
      dispose: () => {
        const index = this.listeners.indexOf(listener);
        if (index > -1) {
          this.listeners.splice(index, 1);
        }
      },
    };
  };

  fire(data: T): void {
    this.listeners.forEach((listener) => listener(data));
  }

  dispose(): void {
    this.listeners = [];
  }
}

export const ProgressLocation = {
  Notification: 15,
};

export const RelativePattern = jest.fn();
export const ViewColumn = {};
export const Disposable = Object.assign(jest.fn(), { from: jest.fn() });
export const Event = jest.fn();

export const CancellationTokenSource = jest.fn().mockImplementation(() => ({
  token: {
    onCancellationRequested: jest.fn(),
    isCancellationRequested: false,
  },
  cancel: jest.fn(),
  dispose: jest.fn(),
}));

export const CancellationToken = {
  None: {
    onCancellationRequested: jest.fn(),
    isCancellationRequested: false,
  },
};

export const ThemeIcon = jest.fn().mockImplementation((...args: unknown[]) => ({
  id: args[0],
  color: args[1],
}));

export const ThemeColor = jest
  .fn()
  .mockImplementation((...args: unknown[]) => ({ id: args[0] }));

export const resetMocks = () => {
  jest.clearAllMocks();
};
