import { fluentProvide } from "inversify-binding-decorators";
import * as path from "path";
import {
  Disposable,
  FileSystemWatcher,
  Position,
  Range,
  TextDocument,
  Uri,
  workspace,
} from "vscode";
import { EnvironmentVariables } from "./domain";

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

export function getResolvedConfigValue(
  key: string,
  vsCodeEnv: EnvironmentVariables,
) {
  const value = workspace.getConfiguration("dbt").get<string>(key, "");
  return substituteSettingsVariables(value, vsCodeEnv);
}

export function parseEnvVarsFromUserSettings(vsCodeEnv: EnvironmentVariables) {
  const newVSCodeEnv = { ...vsCodeEnv };
  for (const key in vsCodeEnv) {
    newVSCodeEnv[key] = substituteSettingsVariables(key, vsCodeEnv);
  }
  return newVSCodeEnv;
}

function substituteSettingsVariables(
  value: any,
  vsCodeEnv: EnvironmentVariables,
): any {
  if (!value) {
    return value;
  }
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
    if (vsCodeEnv[matchResult[1]] !== undefined) {
      value = value.replace(
        new RegExp(`\\\$\\\{env\\\:${matchResult[1]}\\\}`, "gm"),
        vsCodeEnv[matchResult[1]]!,
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
    (error[-1] === " " ? error : error + " ") +
    "If the issue persists, please [contact us](https://www.altimate.ai/support) via chat or Slack"
  );
}

export function stripANSI(src: string): string {
  return src.replace(
    /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
    "",
  );
}

export function getFirstWorkspacePath(): string {
  // If we are executing python via a wrapper like Meltano,
  // we need to execute it from a (any) project directory
  // By default, Command execution is in an ext dir context
  const folders = workspace.workspaceFolders;
  if (folders) {
    return folders[0].uri.fsPath;
  } else {
    // TODO: this shouldn't happen but we should make sure this is valid fallback
    return Uri.file("./").fsPath;
  }
}

export const getProjectRelativePath = (projectRoot: Uri) => {
  const ws = workspace.getWorkspaceFolder(projectRoot);
  return path.relative(ws?.uri.fsPath || "", projectRoot.fsPath);
};

export const processStreamResponse = (
  stream: NodeJS.ReadableStream,
  cb: (data: string) => void,
): Promise<string> => {
  const chunks: Buffer[] = [];
  return new Promise((resolve, reject) => {
    stream.on("data", (chunk: Uint8Array) => {
      cb(new TextDecoder().decode(chunk));
      chunks.push(Buffer.from(chunk));
    });
    stream.on("error", (err: unknown) => reject(err));
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  });
};
