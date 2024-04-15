import * as os from "os";
import { CommentThread, ProgressLocation, Uri, window } from "vscode";
import { extendErrorWithSupportLinks, provideSingleton } from "../utils";
import { QueryManifestService } from "./queryManifestService";
import { DBTProject } from "../manifest/dbtProject";
import path = require("path");
import { DBTTerminal } from "../dbt_client/dbtTerminal";
import { AltimateRequest } from "../altimate";
import { rmSync } from "fs";

export interface SharedDoc {
  share_id: number;
  name: string;
  description: string;
  project_name: string;
}

export interface Conversation {
  conversation_id: number;
  message: string;
  timestamp: string;
  user_id: number;
}

export interface ConversationGroup {
  conversation_group_id: number;
  owner: number;
  status: "Pending" | "Resolved";
  meta: {
    field?: "description";
    column?: string;
    highlight: string;
    uniqueId?: string;
    filePath: string;
    resource_type?: string;
    range: {
      end: CommentThread["range"]["end"];
      start: CommentThread["range"]["start"];
    };
  };
  conversations: Conversation[];
}

@provideSingleton(ConversationService)
export class ConversationService {
  // Local cache to store shared docs
  private sharedDocs: SharedDoc[] = [];
  private conversationsBySharedDoc: Record<
    SharedDoc["share_id"],
    ConversationGroup[]
  > = {};

  public constructor(
    private queryManifestService: QueryManifestService,
    private dbtTerminal: DBTTerminal,
    private altimateRequest: AltimateRequest,
  ) {}

  public getConversations() {
    return this.conversationsBySharedDoc;
  }

  public async loadSharedDocs() {
    try {
      if (this.altimateRequest.getCredentialsMessage()) {
        this.dbtTerminal.debug(
          "ConversationService:loadSharedDocs",
          "Missing credentials. skipping loadSharedDocs",
        );
        return;
      }
      // query the shared docs by current project names in workspace
      const projectNames =
        this.queryManifestService.getProjectNamesInWorkspace();

      if (!projectNames?.length) {
        this.dbtTerminal.debug(
          "ConversationService:loadSharedDocs",
          "no valid project names. skipping loadSharedDocs",
        );
        return;
      }

      const shares = await this.altimateRequest.fetch<SharedDoc[]>(
        `dbt/dbt_docs_share/all?${projectNames
          ?.map((p) => `projects=${p}`)
          .join("&")}`,
      );
      this.sharedDocs = shares || [];
      return this.sharedDocs;
    } catch (err) {
      this.dbtTerminal.error(
        "ConversationService:loadSharedDocs",
        "Unable to load shared docs",
        err,
      );
    }
  }

  public async getAppUrlByShareId(shareId: SharedDoc["share_id"]) {
    try {
      if (!this.altimateRequest.handlePreviewFeatures()) {
        return;
      }
      return await this.altimateRequest.fetch<{
        name: string;
        app_url: string;
      }>(`dbt/dbt_docs_share/${shareId}`, {
        method: "GET",
      });
    } catch (err) {
      this.dbtTerminal.error(
        "ConversationService:getAppUrlByShareId",
        "Unable to get url",
        err,
      );
      window.showErrorMessage(
        extendErrorWithSupportLinks(
          `Unable to get shareable url. Error: ${(err as Error).message}`,
        ),
      );
    }
  }

  public async createConversationGroup(
    shareId: SharedDoc["share_id"],
    data: Partial<ConversationGroup> & { message: string },
  ) {
    try {
      if (!this.altimateRequest.handlePreviewFeatures()) {
        return;
      }
      return await this.altimateRequest.fetch<{
        conversation_group_id: ConversationGroup["conversation_group_id"];
        conversation_id: Conversation["conversation_id"];
      }>(`dbt/dbt_docs_share/${shareId}/conversation_group`, {
        method: "POST",
        body: JSON.stringify(data),
      });
    } catch (err) {
      this.dbtTerminal.error(
        "ConversationService:createConversationGroup",
        "Unable to create conversation group",
        err,
      );
      window.showErrorMessage(
        extendErrorWithSupportLinks(
          `Unable to save your comment. Error: ${(err as Error).message}`,
        ),
      );
    }
  }

  public async addConversationToGroup(
    shareId: SharedDoc["share_id"],
    conversationGroupId: ConversationGroup["conversation_group_id"],
    message: string,
  ) {
    try {
      if (!this.altimateRequest.handlePreviewFeatures()) {
        return;
      }
      const result = await this.altimateRequest.fetch<{ ok: boolean }>(
        `dbt/dbt_docs_share/${shareId}/conversation_group/${conversationGroupId}/conversation`,
        {
          method: "POST",
          body: JSON.stringify({
            message,
          }),
        },
      );
      this.dbtTerminal.debug(
        "ConversationService:addConversationToGroup",
        "added new conversation",
        conversationGroupId,
      );
      return result;
    } catch (err) {
      this.dbtTerminal.error(
        "ConversationService:addConversationToGroup",
        "Unable to add reply to conversation",
        err,
      );
      window.showErrorMessage(
        extendErrorWithSupportLinks(
          `Unable to save your reply. Error: ${(err as Error).message}`,
        ),
      );
    }
  }

  public async resolveConversation(
    shareId: SharedDoc["share_id"],
    conversationGroupId: ConversationGroup["conversation_group_id"],
  ) {
    try {
      if (!this.altimateRequest.handlePreviewFeatures()) {
        return;
      }
      return await this.altimateRequest.fetch<{ ok: boolean }>(
        `dbt/dbt_docs_share/${shareId}/conversation_group/${conversationGroupId}/resolve`,
        { method: "POST", body: JSON.stringify({ resolved: true }) },
      );
    } catch (err) {
      this.dbtTerminal.error(
        "ConversationService:resolveConversation",
        "Unable to resolve conversation group",
        err,
      );
      window.showErrorMessage(
        extendErrorWithSupportLinks(
          `Unable to resolve conversation. Error: ${(err as Error).message}`,
        ),
      );
    }
  }

  public async loadConversationsByShareId(shareId: SharedDoc["share_id"]) {
    if (!this.altimateRequest.handlePreviewFeatures()) {
      return;
    }
    const conversations = await this.altimateRequest.fetch<{
      dbt_docs_share_conversations: ConversationGroup[];
    }>(`dbt/dbt_docs_share/${shareId}/conversations`);

    this.conversationsBySharedDoc[shareId] =
      conversations.dbt_docs_share_conversations;
    return conversations.dbt_docs_share_conversations;
  }

  /**
   * create shareable dbt docs
   * Steps involved
   * 1. generate dbt docs by current state of project in temporary directory
   * 2. create share doc and get presigned upload urls
   * 3. upload manifest and catalog
   * 4. verify upload
   * 5. delete the temporary directory
   */
  public async shareDbtDocs(data: {
    name: string;
    description?: string;
    uri?: Uri;
    model?: string;
  }): Promise<
    { shareUrl: string; shareId: SharedDoc["share_id"] } | undefined
  > {
    if (!this.altimateRequest.handlePreviewFeatures()) {
      return;
    }
    return new Promise((resolve, reject) => {
      window.withProgress(
        {
          title: "",
          location: ProgressLocation.Notification,
          cancellable: false,
        },
        async (progress) => {
          const project = this.queryManifestService.getProjectByUri(data.uri);
          if (!project) {
            reject(new Error("Invalid dbt project"));
            return;
          }
          progress.report({ message: "Generating dbt docs..." });

          // generate docs in tmp directory
          const hashedProjectRoot = DBTProject.hashProjectRoot(
            project.projectRoot.fsPath,
          );
          const tmpDirPath = path.join(os.tmpdir(), hashedProjectRoot);

          try {
            const args = data.model
              ? ["--target-path", tmpDirPath, "--models", `+${data.model}+`]
              : ["--target-path", tmpDirPath];
            this.dbtTerminal.debug(
              "docGenService:shareDbtDocs",
              "generating docs in path:",
              args,
            );

            // generate docs in tmp directory
            await project.generateDocsImmediately(args);

            this.dbtTerminal.debug(
              "docGenService:shareDbtDocs",
              "generated docs in path:",
              tmpDirPath,
            );
            this.dbtTerminal.debug(
              "docGenService:shareDbtDocs",
              "creating dbt share id",
              data,
            );

            // create a shareid
            progress.report({ message: "Creating dbt_docs_share record..." });
            const createShareResult = await this.altimateRequest.fetch<{
              share_id: number;
              manifest_presigned_url: string;
              catalog_presigned_url: string;
            }>("dbt/dbt_docs_share", {
              method: "POST",
              body: JSON.stringify({
                description: data.description,
                name: data.name,
                project_name: project.getProjectName(),
              }),
            });
            this.dbtTerminal.debug(
              "docGenService:shareDbtDocs",
              "created dbt share id",
              createShareResult,
            );

            const filePathMapping = {
              "manifest.json": "manifest_presigned_url",
              "catalog.json": "catalog_presigned_url",
            };

            // Upload the artifacts
            progress.report({ message: "Uploading artifacts..." });
            const fileUploadResponses = await Promise.all(
              Object.keys(filePathMapping).map(async (file) => {
                // @ts-ignore
                const url = createShareResult[filePathMapping[file]];
                if (!url) {
                  throw new Error(`Invalid presigned url for ${file}`);
                }
                return this.altimateRequest.uploadToS3(
                  url,
                  {},
                  path.join(tmpDirPath, file),
                );
              }),
            );

            if (fileUploadResponses.length !== 2) {
              reject(
                new Error(
                  "Unable to upload required artifacts. Please try again later.",
                ),
              );
              return;
            }

            // verify the uploads
            progress.report({ message: "Verifying uploads..." });
            const verifyResult = await this.altimateRequest.fetch<{
              dbt_docs_share_url: string;
            }>("dbt/dbt_docs_share/verify_upload/", {
              method: "POST",
              body: JSON.stringify({ share_id: createShareResult.share_id }),
            });
            if (!verifyResult.dbt_docs_share_url) {
              reject(new Error("Unable to verify uploads. Please try again."));
              return;
            }

            progress.report({ message: "Resolving..." });
            resolve({
              shareUrl: verifyResult.dbt_docs_share_url,
              shareId: createShareResult.share_id,
            });
          } catch (err) {
            reject(err);
          } finally {
            this.dbtTerminal.debug(
              "docGenService:shareDbtDocs",
              "deleting docs tmp directory",
              tmpDirPath,
            );
            rmSync(tmpDirPath, { force: true, recursive: true });
          }
        },
      );
    });
  }
}
