import * as chatUtils from "@vscode/chat-extension-utils";
import * as vscode from "vscode";
import * as path from "path";
import { DBTProjectContainer, provideSingleton } from "@extension";

interface IFindFilesParameters {
  pattern: string;
}

export class FindFilesTool
  implements vscode.LanguageModelTool<IFindFilesParameters>
{
  async invoke(
    options: vscode.LanguageModelToolInvocationOptions<IFindFilesParameters>,
    token: vscode.CancellationToken,
  ) {
    const params = options.input as IFindFilesParameters;
    const files = await vscode.workspace.findFiles(
      params.pattern,
      "**/node_modules/**",
      undefined,
      token,
    );

    const strFiles = files.map((f) => f.fsPath).join("\n");
    return new vscode.LanguageModelToolResult([
      new vscode.LanguageModelTextPart(
        `Found ${files.length} files matching "${params.pattern}":\n${strFiles}`,
      ),
    ]);
  }

  async prepareInvocation(
    options: vscode.LanguageModelToolInvocationPrepareOptions<IFindFilesParameters>,
    _token: vscode.CancellationToken,
  ) {
    return {
      invocationMessage: `Searching workspace for "${options.input.pattern}"`,
    };
  }
}

interface IExecuteSqlParameters {
  query?: string;
  model: string;
  project: string;
}

@provideSingleton(ExecuteSqlTool)
export class ExecuteSqlTool
  implements vscode.LanguageModelTool<IExecuteSqlParameters>
{
  constructor(private dbtProjectContainer: DBTProjectContainer) {}

  async invoke(
    options: vscode.LanguageModelToolInvocationOptions<IExecuteSqlParameters>,
    token: vscode.CancellationToken,
  ) {
    const params = options.input as IExecuteSqlParameters;
    const project = this.dbtProjectContainer.findDBTProject(
      vscode.Uri.file(params.project),
    );
    const result = await project?.executeSQLWithLimit(
      params.query || "select * from customers",
      params.model,
      100,
      true,
      true,
    );
    return new vscode.LanguageModelToolResult([
      new vscode.LanguageModelTextPart(JSON.stringify(result)),
    ]);
  }
}

interface IGetProjectsParameters {}

@provideSingleton(GetProjectsTool)
export class GetProjectsTool
  implements vscode.LanguageModelTool<IGetProjectsParameters>
{
  constructor(private dbtProjectContainer: DBTProjectContainer) {}
  async invoke(
    options: vscode.LanguageModelToolInvocationOptions<IGetProjectsParameters>,
    token: vscode.CancellationToken,
  ) {
    const projects = this.dbtProjectContainer.getProjects();
    return new vscode.LanguageModelToolResult([
      new vscode.LanguageModelTextPart(
        `Found ${JSON.stringify(projects.map((p) => p.projectRoot))} projects in the workspace`,
      ),
    ]);
  }
}

@provideSingleton(DataPilotChatParticipant)
export class DataPilotChatParticipant implements vscode.Disposable {
  private static readonly PARTICIPANT_ID = "vscode-dbt-power-user.datapilot";
  private disposables: vscode.Disposable[] = [];

  dispose() {}
  constructor(
    private getProjectsTool: GetProjectsTool,
    private executeSqlTool: ExecuteSqlTool,
  ) {
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
        if (_result.metadata?.command === "explain") {
          return [
            {
              prompt: "Count SQL files in models directory",
              label: vscode.l10n.t("Count SQL files"),
              command: "countSqlFiles",
            } satisfies vscode.ChatFollowup,
          ];
        }
      },
    };

    // Set the icon path (optional)
    participant.iconPath = new vscode.ThemeIcon("database");

    // Register telemetry for measuring success
    participant.onDidReceiveFeedback((feedback: vscode.ChatResultFeedback) => {
      // TODO: Implement telemetry logging
      console.log("Received feedback:", feedback.kind);
    });

    this.disposables.push(participant);

    // Register the tool
    this.disposables.push(
      vscode.lm.registerTool(
        "vscode-dbt-power-user-find-files",
        new FindFilesTool(),
      ),
    );

    this.disposables.push(
      vscode.lm.registerTool(
        "vscode-dbt-power-user-get-projects",
        this.getProjectsTool,
      ),
    );

    this.disposables.push(
      vscode.lm.registerTool(
        "vscode-dbt-power-user-execute-sql",
        this.executeSqlTool,
      ),
    );
  }

  private async countSqlFiles(
    args: { directory?: string },
    token: vscode.CancellationToken,
  ): Promise<string> {
    try {
      const workspaceFolders = vscode.workspace.workspaceFolders;
      if (!workspaceFolders) {
        return "No workspace folders found.";
      }

      const rootPath = workspaceFolders[0].uri.fsPath;
      const searchPath = args.directory
        ? path.join(rootPath, args.directory)
        : rootPath;

      const sqlFiles = await vscode.workspace.findFiles(
        new vscode.RelativePattern(searchPath, "**/*.{sql,jinja-sql}"),
        "**/node_modules/**",
        undefined,
        token,
      );

      return `Found ${sqlFiles.length} SQL files in ${args.directory || "workspace"}.`;
    } catch (error) {
      return `Error counting SQL files: ${(error as Error).message}`;
    }
  }

  private async handleRequest(
    request: vscode.ChatRequest,
    context: vscode.ChatContext,
    stream: vscode.ChatResponseStream,
    token: vscode.CancellationToken,
  ): Promise<vscode.ChatResult | void> {
    try {
      if (request.command === "explain") {
        // wait for 2 seconds
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const result = `
This SQL query is designed to extract and analyze customer data from a database using DuckDB. Here's a breakdown of what each part of the query does:

# Common Table Expressions (CTEs):

\`customers\`: This CTE selects all records from the stg_customers table, which contains customer information.
\`orders\`: This CTE selects all records from the stg_orders table, which contains order information.
\`payments\`: This CTE selects all records from the stg_payments table, which contains payment information.
\`customer_orders\` CTE:

This CTE calculates the first order date, the most recent order date, and the total number of orders for each customer by grouping the data from the orders table by customer_id.
\`customer_payments\` CTE:

This CTE calculates the total amount spent by each customer by summing up the payment amounts. It joins the payments table with the orders table on order_id to associate payments with the correct orders, and then groups the results by customer_id.
final CTE:

This CTE combines data from the customers, customer_orders, and customer_payments CTEs. It selects the customer ID, first name, last name, first order date, most recent order date, number of orders, and total amount spent (customer lifetime value) for each customer. It uses LEFT JOINs to ensure that all customers are included, even if they have no orders or payments.
Final SELECT Statement:

The query selects all columns from the final CTE, which contains the combined and processed customer data.
Commented Out Section:

The commented-out section appears to be an additional analysis that calculates the maximum, average, and standard deviation of the time differences (in minutes) between consecutive first orders and most recent orders. This part is not executed because it is within a comment block.
In summary, this query is designed to create a comprehensive view of customer activity, including their order history and total spending, by combining data from multiple tables. The commented-out section suggests an additional analysis of order timing, but it is not currently active in the query.
        `;
        await stream.markdown(result);
        return;
      }

      if (request.command === "list") {
        await stream.markdown(
          `Available tools: ${vscode.lm.tools.map((tool) => tool.name).join(", ")}\n\n`,
        );
        return;
      }
      // const tools =
      //   request.command === "all"
      //     ? vscode.lm.tools
      //     : vscode.lm.tools.filter((tool) => tool.tags.includes("search"));

      const libResult = chatUtils.sendChatParticipantRequest(
        request,
        context,
        {
          prompt: "You are a cat! Answer as a cat.",
          responseStreamOptions: {
            stream,
            references: true,
            responseText: true,
          },
          tools: vscode.lm.tools,
        },
        token,
      );

      return await libResult.result;
      // Check if the request is for counting SQL files
      if (request.prompt?.toLowerCase().includes("count sql files")) {
        const directory = request.prompt.includes("in models") ? "models" : "/";
        const result = await this.countSqlFiles({ directory }, token);
        await stream.markdown(result);

        await stream.button({
          command: "dbtPowerUser.buildCurrentModel",
          title: vscode.l10n.t("Build current model"),
        });
        return;
      }

      // Basic hello world implementation
      if (request.prompt?.toLowerCase().includes("hello")) {
        await stream.markdown(`👋 Hello! I'm Data Pilot, your AI assistant for data operations. How can I help you today?

Here are some things I can help you with:
- Count SQL files in your workspace
- Query your data
- Analyze data structures
- Generate data documentation
                `);

        await stream.button({
          command: "dbtPowerUser.buildCurrentModel",
          title: vscode.l10n.t("Build current model"),
        });
      } else {
        await stream.markdown(
          "I'm still learning! For now, try saying 'hello' or 'count sql files' to get started.",
        );
      }
    } catch (error) {
      throw error;
    }
  }
}
