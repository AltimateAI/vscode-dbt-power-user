import { TextDocument, Range, Position, extensions, workspace, Event, Uri, FileSystemWatcher } from "vscode";

export const isEnclosedWithinCodeBlock: (
  document: TextDocument,
  rangeOrPosition: Range | Position
) => boolean = (document, rangeOrPosition) => {
  const isWithinCodeBlock: (
    startPosition: Position,
    direction: "asc" | "desc",
    lookupChar: "{" | "}",
    stopChar: "{" | "}"
  ) => boolean = (startPosition, direction, lookupChar, stopChar) => {
    const increment = direction === "desc" ? -1 : 1;
    let characterPosition: number | undefined = startPosition.character;
    let lineNumber = startPosition.line;
    while (lineNumber >= 0) {
      const line = document.lineAt(lineNumber).text;
      if (characterPosition === undefined) {
        characterPosition = direction === "desc" ? line.length - 1 : 0;
      }
      while (
        direction === "desc"
          ? characterPosition >= 0
          : characterPosition <= line.length - 1
      ) {
        if (["#", "%", stopChar].includes(line[characterPosition])) {
          if (
            characterPosition + increment >= 0 &&
            line[characterPosition + increment] === stopChar
          ) {
            return false;
          }
        }

        if (["#", "%", lookupChar].includes(line[characterPosition])) {
          if (
            characterPosition + increment >= 0 &&
            line[characterPosition + increment] === lookupChar
          ) {
            return true;
          }
        }
        characterPosition += increment;
      }
      lineNumber += increment;
      characterPosition = undefined;
    }
    return false;
  };
  const { start, end } =
    rangeOrPosition instanceof Position
      ? { start: rangeOrPosition, end: rangeOrPosition }
      : rangeOrPosition;
  return (
    isWithinCodeBlock(start, "desc", "{", "}") &&
    isWithinCodeBlock(end, "asc", "}", "{")
  );
};

export const notEmpty = <T>(value: T | null | undefined): value is T => {
  return value !== null && value !== undefined;
};

interface PythonExecutionDetails {
  pythonPath: string;
  onDidChangeExecutionDetails: Event<Uri | undefined>;
}

export const getPythonPathFromExtention = async (): Promise<PythonExecutionDetails> => {
  const extension = extensions.getExtension('ms-python.python')!;

  if (!extension.isActive) {
    await extension.activate();
  }
  await extension.exports.ready;

  const settings = extension.exports.settings;

  return { pythonPath: settings.getExecutionDetails(workspace.workspaceFile).execCommand[0], onDidChangeExecutionDetails: settings.onDidChangeExecutionDetails };
};

export const arrayEquals = <T>(a: Array<T>, b: Array<T>): boolean => {
  return a.sort().toString() === b.sort().toString();
};

export const debounce = (fn: Function, wait: number) => {
  let timeout: NodeJS.Timeout;

  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(fn(), wait);
  };
};

export const setupWatcherHandler = (watcher: FileSystemWatcher, handler: Function): void => {
  watcher.onDidChange(() => handler());
  watcher.onDidCreate(() => handler());
  watcher.onDidDelete(() => handler());
};