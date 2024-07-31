import * as path from "path";
import * as ch from "child_process";
import * as rpc from "vscode-jsonrpc/node";
import { Disposable, window } from "vscode";

// TODO fix this path
const SERVER_PATH = path.join(
  __dirname,
  "..",
  "src",
  "notebook_provider",
  "python_server.py",
);
let serverInstance: PythonServer | undefined;
export interface ExecutionResult {
  status: boolean;
  output: string;
}

export interface PythonServer extends Disposable {
  execute(code: string): Promise<ExecutionResult | undefined>;
  interrupt(): void;
  input(): void;
  checkValidCommand(code: string): Promise<boolean>;
}

class PythonServerImpl implements Disposable {
  private readonly disposables: Disposable[] = [];

  constructor(
    private connection: rpc.MessageConnection,
    private pythonServer: ch.ChildProcess,
  ) {
    this.initialize();
    this.input();
  }

  private initialize(): void {
    this.disposables.push(
      this.connection.onNotification("log", (message: string) => {
        console.log("Log:", message);
      }),
    );
    this.connection.listen();
  }

  public input(): void {
    // Register input request handler
    this.connection.onRequest("input", async (request) => {
      // Ask for user input via popup quick input, send it back to Python
      let userPrompt = "Enter your input here: ";
      if (request && request.prompt) {
        userPrompt = request.prompt;
      }
      const input = await window.showInputBox({
        title: "Input Request",
        prompt: userPrompt,
        ignoreFocusOut: true,
      });
      return { userInput: input };
    });
  }

  public async execute(code: string): Promise<ExecutionResult | undefined> {
    try {
      const result = await this.connection.sendRequest("execute", code);
      return result as ExecutionResult;
    } catch (err) {
      const error = err as Error;
      console.error(`Error getting response from REPL server:`, error);
    }
    return undefined;
  }

  public interrupt(): void {
    // Passing SIGINT to interrupt only would work for Mac and Linux
    if (this.pythonServer.kill("SIGINT")) {
      console.log("Python REPL server interrupted");
    }
  }

  public async checkValidCommand(code: string): Promise<boolean> {
    const completeCode = await this.connection.sendRequest(
      "check_valid_command",
      code,
    );
    if (completeCode === "True") {
      return new Promise((resolve) => resolve(true));
    }
    return new Promise((resolve) => resolve(false));
  }

  public dispose(): void {
    this.connection.sendNotification("exit");
    this.disposables.forEach((d) => d.dispose());
    this.connection.dispose();
  }
}

export function createPythonServer(interpreter: string[]): PythonServer {
  if (serverInstance) {
    return serverInstance;
  }

  const pythonServer = ch.spawn(interpreter[0], [
    ...interpreter.slice(1),
    SERVER_PATH,
  ]);

  pythonServer.stderr.on("data", (data) => {
    console.error(data.toString());
  });
  pythonServer.on("exit", (code) => {
    console.error(`Python server exited with code ${code}`);
  });
  pythonServer.on("error", (err) => {
    console.error(err);
  });
  const connection = rpc.createMessageConnection(
    new rpc.StreamMessageReader(pythonServer.stdout),
    new rpc.StreamMessageWriter(pythonServer.stdin),
  );
  serverInstance = new PythonServerImpl(connection, pythonServer);
  return serverInstance;
}
