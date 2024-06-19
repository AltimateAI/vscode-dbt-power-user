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
import { readFileSync } from "fs";
import { parse } from "yaml";

export const isEnclosedWithinCodeBlock = (
  document: TextDocument,
  rangeOrPosition: Range | Position,
): boolean => {
  const isWithinCodeBlock = (
    startPosition: Position,
    direction: "asc" | "desc",
    lookupChar: "{" | "}",
    stopChar: "{" | "}",
  ): boolean => {
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

export const deepEqual = (obj1: any, obj2: any): boolean => {
  if (obj1 === obj2) {
    return true;
  }

  if (
    typeof obj1 !== "object" ||
    typeof obj2 !== "object" ||
    obj1 === null ||
    obj2 === null
  ) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
};

export const getColumnNameByCase = (columnName: string, adapter: string) => {
  if (isQuotedIdentifier(columnName, adapter)) {
    return columnName;
  }
  const showColumnNamesInLowercase = workspace
    .getConfiguration("dbt")
    .get<boolean>("showColumnNamesInLowercase", true);
  return showColumnNamesInLowercase ? columnName.toLowerCase() : columnName;
};

export const isColumnNameEqual = (
  columnNameFromYml: string | undefined,
  incomingColumnName: string | undefined,
) => {
  if (!columnNameFromYml || !incomingColumnName) {
    return false;
  }

  if (columnNameFromYml === incomingColumnName) {
    return true;
  }

  const showColumnNamesInLowercase = workspace
    .getConfiguration("dbt")
    .get<boolean>("showColumnNamesInLowercase", true);

  if (showColumnNamesInLowercase) {
    return columnNameFromYml.toLowerCase() === incomingColumnName.toLowerCase();
  }

  return false;
};

export const isQuotedIdentifier = (columnName: string, adapter: string) => {
  const regexFromConfig = workspace
    .getConfiguration("dbt")
    .get<string>("unquotedCaseInsensitiveIdentifierRegex", "");
  if (regexFromConfig) {
    console.log(
      "[isQuotedIdentifier] using user provider regex for",
      regexFromConfig,
    );
    return !new RegExp(regexFromConfig).test(columnName);
  }

  const specialCases = ["trino", "athena", "postgres", "duckdb"];
  if (specialCases.includes(adapter)) {
    return !/^([_a-z]+[_a-z0-9$]*)$/.test(columnName);
  }

  // snowflake and most of the db follow standard sql spec of making the column names to uppercase by default
  return !/^([_A-Z]+[_A-Z0-9$]*)$/.test(columnName);
};

export const getExternalProjectNamesFromDbtLoomConfig = (
  projectRoot: string,
) => {
  const dbtLoomConfigPath =
    process.env.DBT_LOOM_CONFIG_PATH ||
    path.join(projectRoot, "dbt_loom.config.yml");

  try {
    const fileContents = readFileSync(dbtLoomConfigPath, "utf8");
    if (fileContents) {
      const dbtLoomConfig = (parse(fileContents, {
        strict: false,
        uniqueKeys: false,
        maxAliasCount: -1,
      }) || {}) as { manifests?: { name: string }[] };

      return dbtLoomConfig.manifests?.map((manifest) => manifest.name);
    }
  } catch (error) {
    console.debug(
      "NodeParser",
      `Error reading dbt_loom.config.yml at ${dbtLoomConfigPath}`,
      error,
    );
  }
  return null;
};

export function getFormattedDateTime(): string {
  const now = new Date();

  const date = now.toLocaleDateString("en-GB").replace(/\//g, "-");
  const time = now
    .toLocaleTimeString("en-GB", { hour12: false })
    .replace(/:/g, "-");

  return `${date}__${time}`;
}
