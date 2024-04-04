import * as os from "os";
import { CommentThread, ProgressLocation, Uri, window } from "vscode";
import { extendErrorWithSupportLinks, provideSingleton } from "../utils";
import { QueryManifestService } from "./queryManifestService";
import { DBTProject } from "../manifest/dbtProject";
import path = require("path");
import { DBTTerminal } from "../dbt_client/dbtTerminal";
import { AltimateRequest } from "../altimate";
import { rmSync } from "fs";

interface SharedDoc {
  share_id: string;
  name: string;
  description: string;
}

export interface Conversation {
  conversation_id: string;
  message: string;
  timestamp: string;
  user_id: string;
}

export interface ConversationGroup {
  conversation_group_id: string;
  owner: string;
  status: "Pending" | "Resolved";
  xpath: string;
  meta: {
    uniqueId: string;
    resource_type: string;
    range: {
      end: CommentThread["range"]["end"];
      start: CommentThread["range"]["start"];
    };
  };
  conversations: Conversation[];
}

@provideSingleton(ConversationService)
export class ConversationService {
  private sharedDocs: SharedDoc[] = [];

  public constructor(
    private queryManifestService: QueryManifestService,
    private dbtTerminal: DBTTerminal,
    private altimateRequest: AltimateRequest,
  ) {}

  public async loadSharedDocs() {
    try {
      const shares = await this.altimateRequest.fetch<{
        items?: [];
      }>("dbt/dbt_docs_share");
      this.sharedDocs = shares.items || [];
      return this.sharedDocs;
    } catch (err) {
      this.dbtTerminal.error(
        "ConversationService:loadSharedDocs",
        "Unable to load shared docs",
        err,
      );
    }
  }

  public async createConversationGroup(
    shareId: string,
    data: Partial<ConversationGroup> & { message: string },
  ) {
    try {
      return await this.altimateRequest.fetch<{
        conversation_group_id: string;
        conversation_id: string;
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
          `Unable to save conversation. Error: ${(err as Error).message}`,
        ),
      );
    }
  }

  public async addConversationToGroup(
    shareId: string,
    conversationGroupId: string,
    message: string,
  ) {
    try {
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
          `Unable to add reply to conversation. Error: ${
            (err as Error).message
          }`,
        ),
      );
    }
  }

  public async resolveConversation(
    shareId: string,
    conversationGroupId: string,
  ) {
    try {
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

  public async loadConversationsByShareId(shareId: string) {
    const conversations = await this.altimateRequest.fetch<{
      dbt_docs_share_conversations: ConversationGroup[];
    }>(`dbt/dbt_docs_share/${shareId}/conversations`);

    return conversations.dbt_docs_share_conversations;
  }

  public async shareDbtDocs(data: {
    name: string;
    description?: string;
    uri?: Uri;
    model?: string;
  }): Promise<{ shareUrl: string; shareId: string }> {
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
            progress.report({ message: "Creating conversation..." });
            const createShareResult = await this.altimateRequest.fetch<{
              share_id: number;
              manifest_presigned_url: string;
              catalog_presigned_url: string;
            }>("dbt/dbt_docs_share", {
              method: "POST",
              body: JSON.stringify({
                description: data.description,
                name: data.name,
                projectName: project.getProjectName(),
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
              shareId: `${createShareResult.share_id}`,
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
