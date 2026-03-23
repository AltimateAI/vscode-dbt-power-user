import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import { Uri, window, workspace } from "vscode";
import { SqlPreviewContentProvider } from "../../content_provider/sqlPreviewContentProvider";
import { DBTProjectContainer } from "../../dbt_client/dbtProjectContainer";
import { TelemetryService } from "../../telemetry";

// SqlPreviewContentProvider registers listeners on construction —
// add the missing workspace/window mocks before creating it
(workspace as any).onDidChangeTextDocument = jest
  .fn()
  .mockReturnValue({ dispose: jest.fn() });
(window as any).onDidChangeVisibleTextEditors = jest
  .fn()
  .mockReturnValue({ dispose: jest.fn() });
(window as any).visibleTextEditors = [];
(window as any).withProgress = jest
  .fn()
  .mockImplementation((_opts: any, task: any) => task());

describe("SqlPreviewContentProvider", () => {
  let provider: SqlPreviewContentProvider;
  let mockContainer: jest.Mocked<DBTProjectContainer>;
  let mockTelemetry: jest.Mocked<TelemetryService>;
  let mockProject: any;

  beforeEach(() => {
    mockProject = {
      refreshProjectConfig: jest
        .fn<() => Promise<void>>()
        .mockResolvedValue(undefined),
      unsafeCompileQuery: jest
        .fn<() => Promise<string>>()
        .mockResolvedValue("SELECT * FROM dev.stg_customers"),
    };

    mockContainer = {
      findDBTProject: jest.fn(),
    } as unknown as jest.Mocked<DBTProjectContainer>;

    mockTelemetry = {
      sendTelemetryEvent: jest.fn(),
      sendTelemetryError: jest.fn(),
    } as unknown as jest.Mocked<TelemetryService>;

    provider = new SqlPreviewContentProvider(mockContainer, mockTelemetry);
  });

  afterEach(() => {
    provider.dispose();
    jest.clearAllMocks();
  });

  describe("provideTextDocumentContent with untitled files", () => {
    it("should find untitled source document by path and compile successfully", async () => {
      // Simulate an untitled document in the workspace
      const untitledDoc = {
        uri: {
          path: "Untitled-1",
          scheme: "untitled",
          toString: () => "untitled:Untitled-1",
        },
        getText: jest
          .fn()
          .mockReturnValue("select * from {{ ref('stg_customers') }}"),
      };
      (workspace.textDocuments as any) = [untitledDoc];
      mockContainer.findDBTProject.mockReturnValue(mockProject);

      // Preview URI preserves the path from the original untitled URI
      const previewUri = {
        path: "Untitled-1",
        scheme: SqlPreviewContentProvider.SCHEME,
        fsPath: "Untitled-1",
        toString: () => `${SqlPreviewContentProvider.SCHEME}:Untitled-1`,
      } as unknown as Uri;

      const result = await provider.provideTextDocumentContent(previewUri);

      expect(untitledDoc.getText).toHaveBeenCalled();
      expect(mockContainer.findDBTProject).toHaveBeenCalledWith(
        untitledDoc.uri,
      );
      expect(mockProject.unsafeCompileQuery).toHaveBeenCalledWith(
        "select * from {{ ref('stg_customers') }}",
        "untitled",
      );
      expect(result).toBe("SELECT * FROM dev.stg_customers");
    });

    it("should return helpful message for untitled file when no project is selected", async () => {
      const untitledDoc = {
        uri: {
          path: "Untitled-1",
          scheme: "untitled",
          toString: () => "untitled:Untitled-1",
        },
        getText: jest.fn().mockReturnValue("select 1"),
      };
      (workspace.textDocuments as any) = [untitledDoc];
      mockContainer.findDBTProject.mockReturnValue(undefined);

      const previewUri = {
        path: "Untitled-1",
        scheme: SqlPreviewContentProvider.SCHEME,
        fsPath: "Untitled-1",
        toString: () => `${SqlPreviewContentProvider.SCHEME}:Untitled-1`,
      } as unknown as Uri;

      const result = await provider.provideTextDocumentContent(previewUri);

      expect(result).toBe(
        "No dbt project selected. Please select a project first.",
      );
      expect(mockTelemetry.sendTelemetryError).toHaveBeenCalledWith(
        "sqlPreviewNotLoadingError",
      );
    });

    it("should return loading message for saved file when project is not found", async () => {
      const savedDoc = {
        uri: {
          path: "/Users/test/project/model.sql",
          scheme: "file",
          toString: () => "file:///Users/test/project/model.sql",
        },
        getText: jest.fn().mockReturnValue("select 1"),
      };
      (workspace.textDocuments as any) = [savedDoc];
      mockContainer.findDBTProject.mockReturnValue(undefined);

      const previewUri = {
        path: "/Users/test/project/model.sql",
        scheme: SqlPreviewContentProvider.SCHEME,
        fsPath: "/Users/test/project/model.sql",
        toString: () =>
          `${SqlPreviewContentProvider.SCHEME}:///Users/test/project/model.sql`,
      } as unknown as Uri;

      const result = await provider.provideTextDocumentContent(previewUri);

      expect(result).toBe(
        "Still loading dbt project, please try again later...",
      );
    });

    it("should use 'untitled' as model name for untitled files", async () => {
      const untitledDoc = {
        uri: {
          path: "Untitled-1",
          scheme: "untitled",
          toString: () => "untitled:Untitled-1",
        },
        getText: jest.fn().mockReturnValue("select 1"),
      };
      (workspace.textDocuments as any) = [untitledDoc];
      mockContainer.findDBTProject.mockReturnValue(mockProject);

      const previewUri = {
        path: "Untitled-1",
        scheme: SqlPreviewContentProvider.SCHEME,
        fsPath: "Untitled-1",
        toString: () => `${SqlPreviewContentProvider.SCHEME}:Untitled-1`,
      } as unknown as Uri;

      await provider.provideTextDocumentContent(previewUri);

      expect(mockProject.unsafeCompileQuery).toHaveBeenCalledWith(
        "select 1",
        "untitled",
      );
    });

    it("should not match preview documents as source documents", async () => {
      // Only a preview document exists — no source document
      const previewDoc = {
        uri: {
          path: "Untitled-1",
          scheme: SqlPreviewContentProvider.SCHEME,
          toString: () => `${SqlPreviewContentProvider.SCHEME}:Untitled-1`,
        },
        getText: jest.fn().mockReturnValue("compiled sql"),
      };
      (workspace.textDocuments as any) = [previewDoc];

      const previewUri = {
        path: "Untitled-1",
        scheme: SqlPreviewContentProvider.SCHEME,
        fsPath: "Untitled-1",
        toString: () => `${SqlPreviewContentProvider.SCHEME}:Untitled-1`,
      } as unknown as Uri;

      // Should not use the preview doc as source — falls back to readFileSync
      // which will fail, returning an error message
      const result = await provider.provideTextDocumentContent(previewUri);

      expect(previewDoc.getText).not.toHaveBeenCalled();
      expect(typeof result).toBe("string");
    });
  });
});
