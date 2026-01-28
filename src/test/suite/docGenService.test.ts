/**
 * Tests for DocGenService.getCompiledDocumentationFromNode().
 *
 * Issue #1645: Column data_type should preserve original case
 *              (e.g. "VARCHAR(255)" not "varchar(255)").
 */
import { beforeEach, describe, expect, it } from "@jest/globals";
import { DocGenService } from "../../services/docGenService";
import { createMockDBTTerminal } from "../helpers/mockTerminal";

describe("DocGenService", () => {
  let service: DocGenService;
  let mockAltimateRequest: any;

  beforeEach(() => {
    mockAltimateRequest = {
      enabled: jest.fn().mockReturnValue(true),
    };

    const mockProjectContainer = {} as any;
    const mockTelemetry = {} as any;
    const mockQueryManifestService = {} as any;
    const mockDbtTerminal = createMockDBTTerminal();
    const mockAuthService = {} as any;

    service = new DocGenService(
      mockAltimateRequest,
      mockProjectContainer,
      mockTelemetry,
      mockQueryManifestService,
      mockDbtTerminal,
      mockAuthService,
    );
  });

  describe("getCompiledDocumentationFromNode (Issue #1645)", () => {
    // Access private method via `as any`
    const callGetCompiledDocumentation = (
      svc: DocGenService,
      node: any,
      modelName: string,
      filePath: string,
    ) => {
      return (svc as any).getCompiledDocumentationFromNode(
        node,
        modelName,
        filePath,
      );
    };

    const createNodeWithColumns = (
      columns: Record<
        string,
        { name: string; description: string; data_type?: string }
      >,
    ) => ({
      columns,
      description: "test model",
      patch_path: "models/schema.yml",
      unique_id: "model.test.my_model",
      resource_type: "model",
    });

    it("should preserve VARCHAR(255) case in column type", () => {
      const node = createNodeWithColumns({
        col1: {
          name: "col1",
          description: "A varchar column",
          data_type: "VARCHAR(255)",
        },
      });

      const result = callGetCompiledDocumentation(
        service,
        node,
        "my_model",
        "/path/to/model.sql",
      );

      // BUG: `.toLowerCase()` on line 118 converts this to "varchar(255)"
      // This test should FAIL before the fix
      expect(result.columns[0].type).toBe("VARCHAR(255)");
    });

    it("should preserve BigInt case in column type", () => {
      const node = createNodeWithColumns({
        col1: {
          name: "col1",
          description: "A bigint column",
          data_type: "BigInt",
        },
      });

      const result = callGetCompiledDocumentation(
        service,
        node,
        "my_model",
        "/path/to/model.sql",
      );

      // BUG: `.toLowerCase()` converts to "bigint"
      // This test should FAIL before the fix
      expect(result.columns[0].type).toBe("BigInt");
    });

    it("should handle undefined data_type gracefully", () => {
      const node = createNodeWithColumns({
        col1: {
          name: "col1",
          description: "No type specified",
          data_type: undefined,
        },
      });

      const result = callGetCompiledDocumentation(
        service,
        node,
        "my_model",
        "/path/to/model.sql",
      );

      // Should already pass — no regression
      expect(result.columns[0].type).toBeUndefined();
    });

    it("should preserve already-lowercase types unchanged", () => {
      const node = createNodeWithColumns({
        col1: {
          name: "col1",
          description: "A text column",
          data_type: "text",
        },
      });

      const result = callGetCompiledDocumentation(
        service,
        node,
        "my_model",
        "/path/to/model.sql",
      );

      // Should already pass — lowercase stays lowercase
      expect(result.columns[0].type).toBe("text");
    });

    it("should return undefined when currentNode is undefined", () => {
      const result = callGetCompiledDocumentation(
        service,
        undefined,
        "my_model",
        "/path/to/model.sql",
      );

      expect(result).toBeUndefined();
    });

    it("should map all columns preserving their types", () => {
      const node = createNodeWithColumns({
        id: {
          name: "id",
          description: "Primary key",
          data_type: "INT64",
        },
        name: {
          name: "name",
          description: "User name",
          data_type: "STRING",
        },
        created_at: {
          name: "created_at",
          description: "Creation timestamp",
          data_type: "TIMESTAMP_NTZ",
        },
      });

      const result = callGetCompiledDocumentation(
        service,
        node,
        "my_model",
        "/path/to/model.sql",
      );

      // BUG: all get lowercased
      // These should FAIL before the fix
      expect(result.columns).toHaveLength(3);
      const typesByName = Object.fromEntries(
        result.columns.map((c: any) => [c.name, c.type]),
      );
      expect(typesByName["id"]).toBe("INT64");
      expect(typesByName["name"]).toBe("STRING");
      expect(typesByName["created_at"]).toBe("TIMESTAMP_NTZ");
    });
  });
});
