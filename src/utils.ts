import { workspace, TextDocument, Range, Position } from "vscode";

const DBT_MODULES = "dbt_modules";

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

export const getPackageName = (currentPath: string): string | undefined => {
  const documentPath = currentPath;
  const projectPath = workspace.workspaceFolders![0].uri.path + '/';
  const pathSegments = documentPath
    .replace(projectPath, "")
    .split('/');

  const insidePackage = pathSegments.length > 1 &&
    pathSegments[0] === DBT_MODULES;

  if (insidePackage) {
    return pathSegments[1];
  }
  return undefined;
};

export const notEmpty = <T>(value: T | null | undefined): value is T => {
  return value !== null && value !== undefined;
};