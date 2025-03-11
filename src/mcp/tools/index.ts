import { ToolDefinition } from "../types";
import { listModelsHandler } from "./listModels";
import { compileModelHandler } from "./compileModel";
import { runQueryHandler } from "./runQuery";
import { getLineageHandler } from "./getLineage";
import { runTestsHandler } from "./runTests";
import { explainQueryHandler } from "./explainQuery";
import { generateModelFromSqlHandler } from "./generateModelFromSql";
import { generateDocsHandler } from "./generateDocs";
import { getModelColumnsHandler } from "./getModelColumns";
import { runModelHandler } from "./runModel";
import { generateTestHandler } from "./generateTest";
import { explainLineageHandler } from "./explainLineage";

/**
 * Register all tools for the MCP server
 */
export function registerTools(): ToolDefinition[] {
  return [
    // List models in the project
    {
      name: "list_models",
      description: "Lists all models in the dbt project",
      schema: {
        type: "object",
        properties: {
          model_type: {
            type: "string",
            description:
              "Optional filter for model type (model, source, seed, snapshot, etc.)",
          },
          include_disabled: {
            type: "boolean",
            description: "Whether to include disabled models (default: false)",
          },
        },
      },
      handler: listModelsHandler,
    },

    // Compile a specific model
    {
      name: "compile_model",
      description: "Compiles a dbt model and returns the generated SQL",
      schema: {
        type: "object",
        properties: {
          model: {
            type: "string",
            description: "The name of the model to compile",
          },
        },
        required: ["model"],
      },
      handler: compileModelHandler,
    },

    // Run a SQL query against the warehouse
    {
      name: "run_query",
      description:
        "Executes a SQL query against the data warehouse and returns results",
      schema: {
        type: "object",
        properties: {
          sql: {
            type: "string",
            description: "The SQL query to execute",
          },
          model: {
            type: "string",
            description: "The model name to run (alternative to SQL)",
          },
          limit: {
            type: "integer",
            description: "Maximum number of rows to return (default: 100)",
          },
        },
        required: [],
      },
      handler: runQueryHandler,
    },

    // Get lineage information for a model
    {
      name: "get_lineage",
      description:
        "Returns lineage information (parents and children) for a given model",
      schema: {
        type: "object",
        properties: {
          model: {
            type: "string",
            description: "The name of the model to get lineage for",
          },
          depth: {
            type: "integer",
            description: "How many levels of lineage to include (default: 1)",
          },
          direction: {
            type: "string",
            description:
              "Direction of lineage: 'upstream', 'downstream', or 'both' (default: 'both')",
          },
        },
        required: ["model"],
      },
      handler: getLineageHandler,
    },

    // Run tests on a model or the project
    {
      name: "run_tests",
      description: "Runs dbt tests on a specific model or the entire project",
      schema: {
        type: "object",
        properties: {
          model: {
            type: "string",
            description:
              "Optional model name to run tests for. If not provided, runs all tests",
          },
          data_tests_only: {
            type: "boolean",
            description: "Whether to run only data tests (default: false)",
          },
          schema_tests_only: {
            type: "boolean",
            description: "Whether to run only schema tests (default: false)",
          },
        },
      },
      handler: runTestsHandler,
    },

    // AI-powered explanation of a SQL query
    {
      name: "explain_query",
      description: "Provides an AI-generated explanation of a SQL query",
      schema: {
        type: "object",
        properties: {
          sql: {
            type: "string",
            description: "The SQL query to explain",
          },
          model: {
            type: "string",
            description: "The model name whose SQL should be explained",
          },
        },
        required: [],
      },
      handler: explainQueryHandler,
    },

    // Generate a dbt model from raw SQL
    {
      name: "generate_model_from_sql",
      description: "Uses AI to generate a dbt model from raw SQL",
      schema: {
        type: "object",
        properties: {
          sql: {
            type: "string",
            description: "The raw SQL to convert to a dbt model",
          },
          model_name: {
            type: "string",
            description: "Desired model name",
          },
        },
        required: ["sql"],
      },
      handler: generateModelFromSqlHandler,
    },

    // Generate documentation for a model
    {
      name: "generate_docs",
      description: "Uses AI to generate documentation for a model",
      schema: {
        type: "object",
        properties: {
          model: {
            type: "string",
            description: "The name of the model to generate documentation for",
          },
        },
        required: ["model"],
      },
      handler: generateDocsHandler,
    },

    // Get column information for a model
    {
      name: "get_model_columns",
      description: "Returns column information for a dbt model",
      schema: {
        type: "object",
        properties: {
          model: {
            type: "string",
            description: "The name of the model to get column information for",
          },
        },
        required: ["model"],
      },
      handler: getModelColumnsHandler,
    },

    // Run a specific model and return results
    {
      name: "run_model",
      description: "Runs a dbt model and returns the results",
      schema: {
        type: "object",
        properties: {
          model: {
            type: "string",
            description: "The name of the model to run",
          },
          limit: {
            type: "integer",
            description: "Maximum number of rows to return (default: 100)",
          },
        },
        required: ["model"],
      },
      handler: runModelHandler,
    },

    // Generate tests for a model
    {
      name: "generate_test",
      description: "Uses AI to generate tests for a dbt model",
      schema: {
        type: "object",
        properties: {
          model: {
            type: "string",
            description: "The name of the model to generate tests for",
          },
          tests_type: {
            type: "string",
            description:
              "Type of tests to generate: 'schema' or 'data' (default: 'schema')",
          },
        },
        required: ["model"],
      },
      handler: generateTestHandler,
    },

    // Explain model lineage in natural language
    {
      name: "explain_lineage",
      description:
        "Provides a natural language explanation of a model's lineage",
      schema: {
        type: "object",
        properties: {
          model: {
            type: "string",
            description: "The name of the model to explain lineage for",
          },
          depth: {
            type: "integer",
            description:
              "How many levels of lineage to include in the explanation (default: 2)",
          },
        },
        required: ["model"],
      },
      handler: explainLineageHandler,
    },
  ];
}
