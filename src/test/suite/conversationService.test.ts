import {
  expect,
  describe,
  it,
  beforeEach,
  afterEach,
  jest,
} from "@jest/globals";
import * as vscode from "../mock/vscode";
import { ConversationService } from "../../services/conversationService";
import { QueryManifestService } from "../../services/queryManifestService";
import { DBTTerminal } from "../../dbt_client/dbtTerminal";
import { AltimateRequest } from "../../altimate";

describe("ConversationService Test Suite", () => {
  let conversationService: ConversationService;
  let mockQueryManifestService: jest.Mocked<QueryManifestService>;
  let mockDbtTerminal: jest.Mocked<DBTTerminal>;
  let mockAltimateRequest: jest.Mocked<AltimateRequest>;

  beforeEach(() => {
    // Create mocks
    mockQueryManifestService = {
      getProjectNamesInWorkspace: jest.fn(),
      getProjectByUri: jest.fn(),
    } as any;

    mockDbtTerminal = {
      debug: jest.fn(),
      error: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
    } as any;

    mockAltimateRequest = {
      getCredentialsMessage: jest.fn(),
      handlePreviewFeatures: jest.fn().mockReturnValue(true),
      getAllSharedDbtDocs: jest.fn(),
      getAppUrlByShareId: jest.fn(),
      createConversationGroup: jest.fn(),
      addConversationToGroup: jest.fn(),
      resolveConversation: jest.fn(),
      loadConversationsByShareId: jest.fn(),
      createDbtDocsShare: jest.fn(),
      uploadToS3: jest.fn(),
      verifyDbtDocsUpload: jest.fn(),
    } as any;

    conversationService = new ConversationService(
      mockQueryManifestService,
      mockDbtTerminal,
      mockAltimateRequest,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("loadSharedDocs", () => {
    it("should skip loading when credentials are missing", async () => {
      mockAltimateRequest.getCredentialsMessage.mockReturnValue(
        "Missing credentials",
      );

      await conversationService.loadSharedDocs();

      expect(mockDbtTerminal.debug).toHaveBeenCalledWith(
        "ConversationService:loadSharedDocs",
        "Missing credentials. skipping loadSharedDocs",
      );
      expect(
        mockQueryManifestService.getProjectNamesInWorkspace,
      ).not.toHaveBeenCalled();
    });

    it("should skip loading when no project names are found", async () => {
      mockAltimateRequest.getCredentialsMessage.mockReturnValue(undefined);
      mockQueryManifestService.getProjectNamesInWorkspace.mockReturnValue([]);

      await conversationService.loadSharedDocs();

      expect(mockDbtTerminal.debug).toHaveBeenCalledWith(
        "ConversationService:loadSharedDocs",
        "no valid project names. skipping loadSharedDocs",
      );
      expect(mockAltimateRequest.getAllSharedDbtDocs).not.toHaveBeenCalled();
    });

    it("should load shared docs successfully", async () => {
      const mockSharedDocs = [
        {
          share_id: 1,
          name: "Test Share 1",
          description: "Test description",
          project_name: "project1",
          conversation_group: [
            {
              conversation_group_id: 1,
              owner: 1,
              status: "Pending" as const,
              meta: {
                highlight: "test",
                filePath: "/test/path",
                range: undefined,
              },
              conversations: [],
            },
          ],
        },
      ];

      mockAltimateRequest.getCredentialsMessage.mockReturnValue(undefined);
      mockQueryManifestService.getProjectNamesInWorkspace.mockReturnValue([
        "project1",
        "project2",
      ]);
      mockAltimateRequest.getAllSharedDbtDocs.mockResolvedValue(
        mockSharedDocs as any,
      );

      const result = await conversationService.loadSharedDocs();

      expect(result).toEqual(mockSharedDocs);
      expect(mockAltimateRequest.getAllSharedDbtDocs).toHaveBeenCalledWith([
        "project1",
        "project2",
      ]);
    });

    it("should handle errors gracefully", async () => {
      const error = new Error("Network error");
      mockAltimateRequest.getCredentialsMessage.mockReturnValue(undefined);
      mockQueryManifestService.getProjectNamesInWorkspace.mockReturnValue([
        "project1",
      ]);
      mockAltimateRequest.getAllSharedDbtDocs.mockRejectedValue(error);

      await conversationService.loadSharedDocs();

      expect(mockDbtTerminal.error).toHaveBeenCalledWith(
        "ConversationService:loadSharedDocs",
        "Unable to load shared docs",
        error,
      );
    });
  });

  describe("getAppUrlByShareId", () => {
    it("should return undefined when preview features are disabled", async () => {
      mockAltimateRequest.handlePreviewFeatures.mockReturnValue(false);

      const result = await conversationService.getAppUrlByShareId(1);

      expect(result).toBeUndefined();
      expect(mockAltimateRequest.getAppUrlByShareId).not.toHaveBeenCalled();
    });

    it("should get app URL successfully", async () => {
      const mockResponse = {
        name: "Test Share",
        app_url: "https://app.example.com/share/1",
      };
      mockAltimateRequest.getAppUrlByShareId.mockResolvedValue(mockResponse);

      const result = await conversationService.getAppUrlByShareId(1);

      expect(result).toBe(mockResponse);
      expect(mockAltimateRequest.getAppUrlByShareId).toHaveBeenCalledWith(1);
    });
  });

  describe("createConversationGroup", () => {
    it("should return undefined when preview features are disabled", async () => {
      mockAltimateRequest.handlePreviewFeatures.mockReturnValue(false);

      const result = await conversationService.createConversationGroup(1, {
        message: "Test message",
      });

      expect(result).toBeUndefined();
      expect(
        mockAltimateRequest.createConversationGroup,
      ).not.toHaveBeenCalled();
    });

    it("should create conversation group successfully", async () => {
      const mockData = { message: "Test message" };
      const mockResult = {
        conversation_group_id: 1,
        conversation_id: 1,
      };
      mockAltimateRequest.createConversationGroup.mockResolvedValue(mockResult);

      const result = await conversationService.createConversationGroup(
        1,
        mockData,
      );

      expect(result).toEqual(mockResult);
      expect(mockAltimateRequest.createConversationGroup).toHaveBeenCalledWith(
        1,
        mockData,
      );
    });
  });

  describe("addConversationToGroup", () => {
    it("should return undefined when preview features are disabled", async () => {
      mockAltimateRequest.handlePreviewFeatures.mockReturnValue(false);

      const result = await conversationService.addConversationToGroup(
        1,
        1,
        "Test reply",
      );

      expect(result).toBeUndefined();
      expect(mockAltimateRequest.addConversationToGroup).not.toHaveBeenCalled();
    });

    it("should add conversation to group successfully", async () => {
      const mockResult = { ok: true };
      mockAltimateRequest.addConversationToGroup.mockResolvedValue(mockResult);

      const result = await conversationService.addConversationToGroup(
        1,
        1,
        "Test reply",
      );

      expect(result).toEqual(mockResult);
      expect(mockAltimateRequest.addConversationToGroup).toHaveBeenCalledWith(
        1,
        1,
        "Test reply",
      );
      expect(mockDbtTerminal.debug).toHaveBeenCalledWith(
        "ConversationService:addConversationToGroup",
        "added new conversation",
        1,
      );
    });
  });

  describe("resolveConversation", () => {
    it("should return undefined when preview features are disabled", async () => {
      mockAltimateRequest.handlePreviewFeatures.mockReturnValue(false);

      const result = await conversationService.resolveConversation(1, 1);

      expect(result).toBeUndefined();
      expect(mockAltimateRequest.resolveConversation).not.toHaveBeenCalled();
    });

    it("should resolve conversation successfully", async () => {
      const mockResult = { ok: true };
      mockAltimateRequest.resolveConversation.mockResolvedValue(mockResult);

      const result = await conversationService.resolveConversation(1, 1);

      expect(result).toEqual(mockResult);
      expect(mockAltimateRequest.resolveConversation).toHaveBeenCalledWith(
        1,
        1,
      );
    });
  });

  describe("loadConversationsByShareId", () => {
    it("should return undefined when preview features are disabled", async () => {
      mockAltimateRequest.handlePreviewFeatures.mockReturnValue(false);

      const result = await conversationService.loadConversationsByShareId(1);

      expect(result).toBeUndefined();
      expect(
        mockAltimateRequest.loadConversationsByShareId,
      ).not.toHaveBeenCalled();
    });

    it("should load conversations successfully", async () => {
      const mockConversations = [
        {
          conversation_group_id: 1,
          owner: 1,
          status: "Pending" as const,
          meta: {
            highlight: "test",
            filePath: "/test/path",
            range: undefined,
          },
          conversations: [],
        },
      ];
      mockAltimateRequest.loadConversationsByShareId.mockResolvedValue({
        dbt_docs_share_conversations: mockConversations,
      });

      const result = await conversationService.loadConversationsByShareId(1);

      expect(result).toEqual(mockConversations);
      expect(
        mockAltimateRequest.loadConversationsByShareId,
      ).toHaveBeenCalledWith(1);
    });
  });

  describe("getConversations", () => {
    it("should return empty object initially", () => {
      expect(conversationService.getConversations()).toEqual({});
    });
  });
});
