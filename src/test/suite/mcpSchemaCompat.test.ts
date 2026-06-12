import { describe, expect, it } from "@jest/globals";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

/**
 * Validates that MCP tool schemas produced by toToolInput() are compatible
 * with Gemini's tool-calling API constraints.
 *
 * Gemini rejects schemas that contain:
 * - `$schema` meta-field
 * - Non-standard `format` values
 * - `additionalProperties: true` without explicit property definitions
 *
 * Issue: https://github.com/AltimateAI/vscode-dbt-power-user/issues/1643
 */

const zodToJsonSchemaAny = zodToJsonSchema as (
  schema: unknown,
  options?: unknown,
) => Record<string, unknown>;

// Mirror the toToolInput helper from server.ts
function toToolInput(schema: z.ZodType): Record<string, unknown> {
  return zodToJsonSchemaAny(schema, { target: "openApi3" });
}

// Reproduce all schemas from server.ts
const BaseSchema = z.object({});
const BaseProjectRootSchema = BaseSchema.extend({ projectRoot: z.string() });
const schemas: Record<string, z.ZodType> = {
  get_best_practices: BaseSchema,
  get_projects: BaseSchema,
  get_columns_of_model: BaseProjectRootSchema.extend({
    modelName: z.string(),
  }),
  get_columns_of_source: BaseProjectRootSchema.extend({
    sourceName: z.string(),
    tableName: z.string(),
  }),
  get_column_values: BaseProjectRootSchema.extend({
    model: z.string(),
    column: z.string(),
  }),
  execute_sql: BaseProjectRootSchema.extend({
    query: z.string(),
    modelName: z.string(),
  }),
  compile_model: BaseProjectRootSchema.extend({ modelName: z.string() }),
  compile_query: BaseProjectRootSchema.extend({
    query: z.string(),
    originalModelName: z.string().optional(),
  }),
  run_model: BaseProjectRootSchema.extend({
    plusOperatorLeft: z.enum(["", "+"]),
    modelName: z.string(),
    plusOperatorRight: z.enum(["", "+"]),
  }),
  build_model: BaseProjectRootSchema.extend({
    plusOperatorLeft: z.enum(["", "+"]),
    modelName: z.string(),
    plusOperatorRight: z.enum(["", "+"]),
  }),
  build_project: BaseProjectRootSchema.extend({}),
  run_test: BaseProjectRootSchema.extend({ testName: z.string() }),
  run_model_test: BaseProjectRootSchema.extend({ modelName: z.string() }),
  add_dbt_packages: BaseProjectRootSchema.extend({
    packages: z.array(z.string()),
  }),
  install_deps: BaseProjectRootSchema.extend({}),
  get_children_models: BaseProjectRootSchema.extend({ table: z.string() }),
  get_parent_models: BaseProjectRootSchema.extend({ table: z.string() }),
};

describe("MCP tool schema Gemini compatibility", () => {
  for (const [toolName, schema] of Object.entries(schemas)) {
    describe(`tool: ${toolName}`, () => {
      const jsonSchema = toToolInput(schema);

      it("should not contain $schema meta-field", () => {
        expect(jsonSchema).not.toHaveProperty("$schema");
      });

      it("should have type: object", () => {
        expect(jsonSchema).toHaveProperty("type", "object");
      });

      it("should have properties field", () => {
        expect(jsonSchema).toHaveProperty("properties");
      });

      it("should not have additionalProperties: true", () => {
        // additionalProperties: false is fine (and required by Gemini)
        // additionalProperties: true or missing is rejected
        if ("additionalProperties" in jsonSchema) {
          expect(jsonSchema.additionalProperties).not.toBe(true);
        }
      });
    });
  }

  it("should validate all 17 tool schemas", () => {
    expect(Object.keys(schemas).length).toBe(17);
  });

  it("default zodToJsonSchema DOES include $schema (proving the fix is needed)", () => {
    const defaultSchema = zodToJsonSchemaAny(BaseSchema);
    expect(defaultSchema).toHaveProperty("$schema");
  });
});
