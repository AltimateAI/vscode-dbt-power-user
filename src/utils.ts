import { fluentProvide } from "inversify-binding-decorators";
import {
  Disposable,
  FileSystemWatcher,
  Position,
  Range,
  TextDocument,
  workspace,
} from "vscode";

export const isEnclosedWithinCodeBlock: (
  document: TextDocument,
  rangeOrPosition: Range | Position,
) => boolean = (document, rangeOrPosition) => {
  const isWithinCodeBlock: (
    startPosition: Position,
    direction: "asc" | "desc",
    lookupChar: "{" | "}",
    stopChar: "{" | "}",
  ) => boolean = (startPosition, direction, lookupChar, stopChar) => {
    const increment = direction === "desc" ? -1 : 1;
    let characterPosition: number | undefined = startPosition.character;
    let lineNumber = startPosition.line;
    while (lineNumber >= 0 && lineNumber < document.lineCount) {
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

export const arrayEquals = <T>(a: Array<T>, b: Array<T>): boolean => {
  return a.sort().toString() === b.sort().toString();
};

export const debounce = (fn: Function, wait: number) => {
  let timeout: number;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(fn, wait);
  };
};

export const setupWatcherHandler: (
  watcher: FileSystemWatcher,
  handler: Function,
) => Disposable[] = (watcher, handler) => [
  watcher.onDidChange(() => handler()),
  watcher.onDidCreate(() => handler()),
  watcher.onDidDelete(() => handler()),
];

export const provideSingleton = (identifier: any) => {
  return fluentProvide(identifier).inSingletonScope().done();
};

export function substituteSettingsVariables(value: any): any {
  if (typeof value !== "string") {
    return value;
  }
  const regexVsCodeEnv = /\$\{env\:(.*?)\}/gm;
  let matchResult;
  while ((matchResult = regexVsCodeEnv.exec(value)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (matchResult.index === regexVsCodeEnv.lastIndex) {
      regexVsCodeEnv.lastIndex++;
    }
    if (process.env[matchResult[1]] !== undefined) {
      value = value.replace(
        new RegExp(`\\\$\\\{env\\\:${matchResult[1]}\\\}`, "gm"),
        process.env[matchResult[1]]!,
      );
    }
  }
  value = value.replace(
    "${workspaceFolder}",
    workspace.workspaceFolders![0].uri.fsPath,
  );
  return value;
}

export function extendErrorWithSupportLinks(error: string): string {
  return (
    error +
    "If the issue persists, please [contact us](https://www.altimate.ai/support) via chat or Slack"
  );
}

export function stripANSI(src: string): string {
  return src.replace(
    /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
    "",
  );
}
