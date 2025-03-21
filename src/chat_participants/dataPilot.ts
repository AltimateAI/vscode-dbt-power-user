import * as chatUtils from "@vscode/chat-extension-utils";
import * as vscode from "vscode";
import * as path from "path";
import { DBTTerminal, provideSingleton } from "@extension";
import { McpProxyTool } from "./mcpProxyTool";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";
import { TelemetryService } from "@extension";
import { Uri } from "vscode";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";

@provideSingleton(DataPilotChatParticipant)
export class DataPilotChatParticipant implements vscode.Disposable {
  private static readonly PARTICIPANT_ID = "vscode-dbt-power-user.datapilot";
  private disposables: vscode.Disposable[] = [];

  constructor(
    private telemetry: TelemetryService,
    private terminal: DBTTerminal,
  ) {}

  public async initializeChatParticipant(port: number) {
    // Create the chat participant
    const participant = vscode.chat.createChatParticipant(
      DataPilotChatParticipant.PARTICIPANT_ID,
      this.handleRequest.bind(this),
    );

    participant.followupProvider = {
      provideFollowups(
        _result: vscode.ChatResult,
        _context: vscode.ChatContext,
        _token: vscode.CancellationToken,
      ) {
        return [];
      },
    };

    participant.iconPath = {
      light: Uri.file(
        path.join(path.resolve(__dirname), "../media/images/altimate-blue.svg"),
      ),
      dark: Uri.file(
        path.join(path.resolve(__dirname), "../media/images/altimate-blue.svg"),
      ),
    };

    // Register telemetry for measuring success
    participant.onDidReceiveFeedback((feedback: vscode.ChatResultFeedback) => {
      this.terminal.info(
        "DataPilotChatParticipant:onDidReceiveFeedback",
        "Feedback received",
        true,
        feedback,
      );
    });

    this.disposables.push(participant);

    await this.registerMCPClient(port);
  }

  private async registerMCPClient(port: number) {
    try {
      const transport = new SSEClientTransport(
        new URL(`http://localhost:${port}/sse`),
        {},
      );

      const client = new Client(
        {
          name: "dbtpoweruserclient",
          version: "0.0.0",
          command: "",
          enabled: true,
        },
        {
          capabilities: {
            prompts: {},
            resources: {},
            tools: {},
            roots: {
              listChanged: true,
            },
            sampling: {},
          },
        },
      );
      await client.connect(transport);

      client.onclose = () => {
        this.terminal.info(
          "DataPilotChatParticipant:registerMCPClient",
          "Client closed",
          false,
        );
      };
      client.onerror = (error) => {
        this.terminal.error(
          "DataPilotChatParticipant:registerMCPClient",
          "Client error",
          error,
        );
      };

      const tools = await client.listTools();

      this.terminal.info(
        "DataPilotChatParticipant:registerMCPClient",
        "registering tools",
        false,
        {
          tools: tools.tools.map((t) => t.name),
        },
      );

      for (const tool of tools.tools) {
        const vscodeTool: vscode.LanguageModelTool<
          (typeof tool)["inputSchema"]
        > = new McpProxyTool(client, tool, this.terminal);
        const disposable = vscode.lm.registerTool(tool.name, vscodeTool);
        this.disposables.push(disposable);
      }

      this.disposables.push({
        dispose: () => {
          client.close();
          transport.close();
        },
      });
    } catch (error) {
      this.terminal.error(
        "DataPilotChatParticipant:registerMCPClient",
        "Error registering mcp client",
        error,
      );
      throw error;
    }
  }
  private async handleRequest(
    request: vscode.ChatRequest,
    context: vscode.ChatContext,
    stream: vscode.ChatResponseStream,
    token: vscode.CancellationToken,
  ): Promise<vscode.ChatResult | void> {
    try {
      if (request.command === "list") {
        await stream.markdown(
          `Available tools: ${vscode.lm.tools.map((tool) => tool.name).join(", ")}\n\n`,
        );
        return;
      }
      // const tools = vscode.lm.tools.filter(
      //   (tool) => tool.tags.includes("dbt") || tool.tags.includes("datapilot"),
      // );

      const libResult = chatUtils.sendChatParticipantRequest(
        request,
        context,
        {
          // TODO: validate this. This prompt will be sent to the LLM for tool selection or response generation
          prompt:
            "You are a helpful assistant for dbt or data related operations. Answer the user's question or request using the tools available to you.",
          responseStreamOptions: {
            stream,
            references: true,
            responseText: true,
          },
          // TODO: use the filtered tools
          tools: vscode.lm.tools,
        },
        token,
      );

      return await libResult.result;
    } catch (error) {
      this.terminal.error(
        "DataPilotChatParticipant:handleRequest",
        "Error handling request",
        error,
      );
      throw error;
    }
  }

  dispose() {
    this.disposables.forEach((disposable) => disposable.dispose());
  }
}
