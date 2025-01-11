import {
  DebugSession,
  InitializedEvent,
  OutputEvent,
  StoppedEvent,
  TerminatedEvent,
  Thread,
} from "@vscode/debugadapter";
import { DebugProtocol } from "@vscode/debugprotocol";
import {
  DBTProjectIntegration,
  DBTCommand,
} from "../dbt_client/dbtIntegration";
import { provideSingleton } from "../utils";

interface JinjaBreakpoint {
  id: number;
  line: number;
  verified: boolean;
}

interface JinjaStackFrame {
  id: number;
  name: string;
  source: string;
  line: number;
  column: number;
}

@provideSingleton(JinjaDebugAdapter)
export class JinjaDebugAdapter extends DebugSession {
  private static threadID = 1;
  private breakpoints = new Map<string, JinjaBreakpoint[]>();
  private currentStackFrames: JinjaStackFrame[] = [];
  private variables = new Map<string, any>();

  constructor(private dbtIntegration: DBTProjectIntegration) {
    super();
  }

  protected initializeRequest(
    response: DebugProtocol.InitializeResponse,
    args: DebugProtocol.InitializeRequestArguments,
  ): void {
    response.body = {
      ...response.body,
      supportsConfigurationDoneRequest: true,
      supportsEvaluateForHovers: true,
      supportsStepBack: false,
      supportsDataBreakpoints: false,
      supportsCompletionsRequest: true,
      supportsFunctionBreakpoints: false,
      supportsConditionalBreakpoints: true,
      supportsHitConditionalBreakpoints: false,
      supportsLogPoints: false,
      supportsModulesRequest: false,
      supportsTerminateRequest: true,
      supportsRestartRequest: false,
      supportsStepInTargetsRequest: false,
      supportsGotoTargetsRequest: false,
      supportsExceptionOptions: false,
      supportsValueFormattingOptions: false,
      supportsExceptionInfoRequest: false,
      supportsSetVariable: true,
      supportsRestartFrame: false,
      supportsSetExpression: false,
      supportsLoadedSourcesRequest: false,
      supportsReadMemoryRequest: false,
      supportsDisassembleRequest: false,
      supportsCancelRequest: true,
      supportsBreakpointLocationsRequest: false,
    };

    super.sendEvent(new InitializedEvent());
    super.sendResponse(response);
  }

  protected async setBreakPointsRequest(
    response: DebugProtocol.SetBreakpointsResponse,
    args: DebugProtocol.SetBreakpointsArguments,
  ): Promise<void> {
    const source = args.source;
    const bps = args.breakpoints || [];

    const verifiedBreakpoints: JinjaBreakpoint[] = bps.map(
      (bp: any, index: number) => ({
        id: index,
        line: bp.line || 0,
        verified: true,
      }),
    );

    this.breakpoints.set(source.path || "", verifiedBreakpoints);

    response.body = {
      breakpoints: verifiedBreakpoints.map((bp) => ({
        id: bp.id,
        verified: bp.verified,
        line: bp.line,
      })),
    };

    super.sendResponse(response);
  }

  protected threadsRequest(response: DebugProtocol.ThreadsResponse): void {
    response.body = {
      threads: [
        new Thread(JinjaDebugAdapter.threadID, "Jinja Template Thread"),
      ],
    };
    super.sendResponse(response);
  }

  protected async stackTraceRequest(
    response: DebugProtocol.StackTraceResponse,
    args: DebugProtocol.StackTraceArguments,
  ): Promise<void> {
    response.body = {
      stackFrames: this.currentStackFrames.map((frame) => ({
        id: frame.id,
        name: frame.name,
        source: {
          name: frame.source,
          path: frame.source,
        },
        line: frame.line,
        column: frame.column,
      })),
      totalFrames: this.currentStackFrames.length,
    };
    super.sendResponse(response);
  }

  protected async scopesRequest(
    response: DebugProtocol.ScopesResponse,
    args: DebugProtocol.ScopesArguments,
  ): Promise<void> {
    response.body = {
      scopes: [
        {
          name: "Jinja Variables",
          variablesReference: 1,
          expensive: false,
        },
      ],
    };
    super.sendResponse(response);
  }

  protected async variablesRequest(
    response: DebugProtocol.VariablesResponse,
    args: DebugProtocol.VariablesArguments,
  ): Promise<void> {
    const variables: DebugProtocol.Variable[] = [];

    for (const [name, value] of this.variables.entries()) {
      variables.push({
        name,
        value: JSON.stringify(value),
        variablesReference: 0,
      });
    }

    response.body = { variables };
    super.sendResponse(response);
  }

  protected async continueRequest(
    response: DebugProtocol.ContinueResponse,
    args: DebugProtocol.ContinueArguments,
  ): Promise<void> {
    super.sendResponse(response);
    super.sendEvent(new TerminatedEvent());
  }

  protected async nextRequest(
    response: DebugProtocol.NextResponse,
    args: DebugProtocol.NextArguments,
  ): Promise<void> {
    // Step to next line of Jinja code
    super.sendResponse(response);
    super.sendEvent(new StoppedEvent("step", JinjaDebugAdapter.threadID));
  }

  protected async evaluateRequest(
    response: DebugProtocol.EvaluateResponse,
    args: DebugProtocol.EvaluateArguments,
  ): Promise<void> {
    const result = "";
    const variablesReference = 0;

    try {
      // Evaluate Jinja expression
      const result = await this.evaluateJinjaExpression(args.expression);
      response.body = {
        result,
        variablesReference,
      };
    } catch (err) {
      response.body = {
        result: (err as Error).message,
        variablesReference,
      };
    }

    super.sendResponse(response);
  }

  private async evaluateJinjaExpression(expression: string): Promise<string> {
    try {
      // Create a debug command
      const command = new DBTCommand(
        "Evaluating Jinja expression",
        ["debug", "--vars", JSON.stringify({ expression })],
        false,
        false,
        false,
      );

      const result = await this.dbtIntegration.debug(command);
      return result;
    } catch (error) {
      throw new Error(`Failed to evaluate expression: ${error}`);
    }
  }

  public sendDebugOutput(output: string): void {
    super.sendEvent(new OutputEvent(`${output}\n`));
  }
}
