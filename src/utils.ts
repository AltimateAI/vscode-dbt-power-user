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
  window,
} from "vscode";
import { readFileSync } from "fs";
import { parse, parseDocument } from "yaml";
import {
  TestMetadataAcceptedValues,
  TestMetadataRelationships,
} from "@altimateai/dbt-integration";

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

export const arrayEquals = <T>(a: Array<T>, b: Array<T>): boolean => {
  return a.sort().toString() === b.sort().toString();
};

export const debounce = (fn: (args: unknown) => void, wait: number) => {
  let timeout: NodeJS.Timeout;
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

export const isRelationship = (
  metadata:
    | TestMetadataRelationships
    | TestMetadataAcceptedValues
    | { [x: string]: unknown },
): metadata is TestMetadataRelationships => {
  return (
    (metadata as TestMetadataRelationships).field !== undefined &&
    (metadata as TestMetadataRelationships).to !== undefined
  );
};

export const isAcceptedValues = (
  metadata:
    | TestMetadataRelationships
    | TestMetadataAcceptedValues
    | { [x: string]: unknown },
): metadata is TestMetadataAcceptedValues => {
  return (metadata as TestMetadataAcceptedValues).values !== undefined;
};

export const getColumnTestConfigFromYml = (
  allTests: any[] | undefined,
  kwargs:
    | TestMetadataAcceptedValues
    | TestMetadataRelationships
    | { [x: string]: unknown },
  testName: string,
) => {
  const testsByTestName = allTests?.filter((t: any) => {
    if (typeof t === "string") {
      return t === testName;
    }
    const [key] = Object.keys(t);
    return key === testName;
  });

  const testWithRightConfigValues = testsByTestName?.find((t: any) => {
    if (typeof t === "string") {
      return t === testName;
    }

    if (isRelationship(kwargs)) {
      return (
        kwargs.field === t.relationships.field &&
        kwargs.to === t.relationships.to
      );
    }

    if (isAcceptedValues(kwargs)) {
      return (
        kwargs.values?.sort().toString() ===
        t.accepted_values.values.sort().toString()
      );
    }

    // For multiple tests with same name but diff config from  external packages like dbt_utils,
    // match all the config values
    const { model, column_name, ...rest } = kwargs;
    return Object.entries(rest).every(([k, v]) => t[testName][k] === v);
  });

  if (isRelationship(kwargs)) {
    return (
      testWithRightConfigValues as
        | { relationships: TestMetadataAcceptedValues }
        | undefined
    )?.["relationships"];
  }

  if (isAcceptedValues(kwargs)) {
    return (
      testWithRightConfigValues as
        | { accepted_values: TestMetadataAcceptedValues }
        | undefined
    )?.["accepted_values"];
  }

  if (testWithRightConfigValues?.[testName]) {
    return {
      [testName]: testWithRightConfigValues?.[testName],
    };
  }
};

export function getFormattedDateTime(): string {
  const now = new Date();

  const date = now.toLocaleDateString("en-GB").replace(/\//g, "-");
  const time = now
    .toLocaleTimeString("en-GB", { hour12: false })
    .replace(/:/g, "-");

  return `${date}-${time}`;
}

export const getStringSizeInMb = (str: string): number => {
  let sizeInBytes = 0;
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);
    if (charCode <= 0x7f) {
      sizeInBytes += 1;
    } else if (charCode <= 0x7ff) {
      sizeInBytes += 2;
    } else if (charCode <= 0xffff) {
      sizeInBytes += 3;
    } else {
      sizeInBytes += 4;
    }
  }
  const sizeInMB = sizeInBytes / (1024 * 1024);
  return sizeInMB;
};

interface YamlModel {
  key?: { value: string };
  value?: { items?: Array<YamlModelItem> };
}

interface YamlModelItem {
  items?: Array<{
    key?: { value: string };
    value?: { toString(): string };
  }>;
  range?: [number, number];
}

export function getCurrentlySelectedModelNameInYamlConfig(): string {
  if (
    window.activeTextEditor === undefined ||
    window.activeTextEditor.document.languageId !== "yaml"
  ) {
    return "";
  }

  try {
    const parsedYaml = parseDocument(
      window.activeTextEditor.document.getText(),
    );
    if (parsedYaml.contents === null) {
      return "";
    }
    const cursorPosition = window.activeTextEditor.selection.active;
    const offset = window.activeTextEditor.document.offsetAt(cursorPosition);

    const contents = parsedYaml.contents as { items?: Array<YamlModel> };
    if (!contents.items) {
      return "";
    }

    const modelsNode = contents.items.find(
      (item) => item?.key?.value === "models",
    );
    if (!modelsNode?.value?.items) {
      return "";
    }

    // Find a model at the current position
    for (const model of modelsNode.value.items) {
      if (!model?.items) {
        continue;
      }

      const nameNode = model.items.find((item) => item?.key?.value === "name");
      if (!nameNode?.value) {
        continue;
      }

      if (model.range && model.range[0] < offset && offset < model.range[1]) {
        return nameNode.value.toString();
      }
    }
  } catch (error) {
    console.error("Error parsing YAML document:", {
      error,
      document: window.activeTextEditor?.document.fileName,
      position: window.activeTextEditor?.selection.active,
    });
  }
  return "";
}

export function removeProtocol(input: string): string {
  return input.replace(/^[^:]+:\/\//, "");
}

export function getDepthColor(depth: number): string {
  const mediumDepthThreshold = workspace
    .getConfiguration("dbt")
    .get<number>("mediumDepthThreshold", 5);
  const highDepthThreshold = workspace
    .getConfiguration("dbt")
    .get<number>("highDepthThreshold", 10);

  const lowDepthColor = workspace
    .getConfiguration("dbt")
    .get<string>("lowDepthColor", "#00ff00");
  const mediumDepthColor = workspace
    .getConfiguration("dbt")
    .get<string>("mediumDepthColor", "#ffa500");
  const highDepthColor = workspace
    .getConfiguration("dbt")
    .get<string>("highDepthColor", "#ff0000");

  if (depth >= highDepthThreshold) {
    return highDepthColor; // Configurable color for high depth
  } else if (depth >= mediumDepthThreshold) {
    return mediumDepthColor; // Configurable color for medium depth
  } else {
    return lowDepthColor; // Configurable color for low depth
  }
}
