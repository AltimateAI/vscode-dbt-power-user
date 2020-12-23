import { ChildProcess, spawn } from "child_process";
import { TextDocument, Range, Position, OutputChannel, extensions, workspace, Event, Uri, StatusBarItem } from "vscode";

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

export class CommandProcessExecution {
  private readonly commandProcess: ChildProcess;
  constructor(command: string, args?: string[], cwd?: string) {
    this.commandProcess = spawn(
      command,
      args,
      { cwd: cwd });
  }

  public async complete(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const stdoutBuffer: Buffer[] = [];
      const stderrBuffer: Buffer[] = [];
      this.commandProcess.stdout!.on('data', chunk => stdoutBuffer.push(chunk));
      this.commandProcess.stderr!.on('data', chunk => stderrBuffer.push(chunk));

      this.commandProcess.once('close', () => {
        const stdout = stdoutBuffer.toString();
        const stderr = stderrBuffer.toString();
        if (!stdout) {
          reject(`Process returned an error:${stderr}`);
        }
        resolve(stdout);
      });

      this.commandProcess.once('error', error => {
        reject(`Error occurred during process execution: ${error}`);
      });
    });

  }

  public async completeWithOutputChannel(outputChannel: OutputChannel): Promise<void> {
    return new Promise((resolve, reject) => {
      this.commandProcess.stdout!.on('data', chunk => { outputChannel.append(chunk.toString()); outputChannel.show(); });
      this.commandProcess.stderr!.on('data', chunk => { outputChannel.append(chunk.toString()); outputChannel.show(); });
      this.commandProcess.once('close', () => {
        resolve();
      });

      this.commandProcess.once('error', error => {
        reject(`Error occurred during process execution: ${error}`);
      });
    });
  }
}

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
