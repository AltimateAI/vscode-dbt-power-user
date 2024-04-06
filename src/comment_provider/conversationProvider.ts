import {
  CancellationToken,
  Comment,
  CommentAuthorInformation,
  CommentMode,
  CommentReply,
  CommentThread,
  Disposable,
  MarkdownString,
  Range,
  TextDocument,
  Uri,
  comments,
  env,
  window,
  workspace,
} from "vscode";
import { extendErrorWithSupportLinks, provideSingleton } from "../utils";
import { DBTTerminal } from "../dbt_client/dbtTerminal";
import path = require("path");
import {
  ConversationGroup,
  ConversationService,
} from "../services/conversationService";
import { SharedStateService } from "../services/sharedStateService";
import { UsersService } from "../services/usersService";
import { QueryManifestService } from "../services/queryManifestService";
import { DBTProject } from "../manifest/dbtProject";

export interface ConversationCommentThread extends CommentThread {
  share_id: string;
  conversation_group_id: string;
  meta: ConversationGroup["meta"];
}
export class ConversationComment implements Comment {
  label: string | undefined;
  timestamp: Date;
  savedBody: string | MarkdownString; // for the Cancel button
  constructor(
    public conversation_id: string,
    public body: string | MarkdownString,
    public mode: CommentMode,
    public author: CommentAuthorInformation,
    public time: string,
    public parent?: ConversationCommentThread,
    public contextValue?: string,
  ) {
    this.savedBody = this.body;
    this.timestamp = new Date(this.time);
  }
}

@provideSingleton(ConversationProvider)
export class ConversationProvider implements Disposable {
  private disposables: Disposable[] = [];
  private commentController;
  private _timer: NodeJS.Timeout | undefined;
  // record of share id with conv group
  private _threads: Record<string, Record<string, ConversationCommentThread>> =
    {};

  constructor(
    private conversationService: ConversationService,
    private usersService: UsersService,
    private dbtTerminal: DBTTerminal,
    private emitterService: SharedStateService,
    private queryManifestService: QueryManifestService,
  ) {
    const enableCollaboration = workspace
      .getConfiguration("dbt")
      .get<boolean>("enableCollaboration", false);
    if (!enableCollaboration) {
      this.dbtTerminal.debug(
        "ConversationProvider",
        "collaboration not enabled",
      );
      return;
    }
    this.commentController = comments.createCommentController(
      "altimate-conversations",
      "Altimate dbt conversations",
    );

    this.commentController.commentingRangeProvider = {
      provideCommentingRanges: (
        document: TextDocument,
        token: CancellationToken,
      ) => {
        // enable only for sql files
        if (!document.uri.fsPath.endsWith(".sql")) {
          return null;
        }
        const lineCount = document.lineCount;
        return [new Range(0, 0, lineCount - 1, 0)];
      },
    };

    this.disposables.push(
      emitterService.eventEmitter.event((d) => {
        if (d.command === "manifestCacheChanged") {
          this.loadThreads();
        }
      }),
    );
  }

  // simple polling for getting latest conversations
  private setupRefetch() {
    clearTimeout(this._timer);
    const pollingInterval = workspace
      .getConfiguration("dbt")
      .get<number>("conversationsPollingInterval", 30);
    this.dbtTerminal.debug(
      "ConversationProvider",
      "refresh conversations after",
      pollingInterval,
    );
    this._timer = setTimeout(() => {
      this.loadThreads();
    }, pollingInterval * 1000);
  }

  private async loadThreads() {
    this.dbtTerminal.debug("ConversationProvider", "loading threads");
    const shares = await this.conversationService.loadSharedDocs();
    this.setupRefetch();
    if (!shares?.length) {
      this.dbtTerminal.debug("ConversationProvider", "No conversations yet");
      return;
    }

    shares.map(async (dbtDocsShare) => {
      const event = this.queryManifestService.getEventByProjectName(
        dbtDocsShare.project_name,
      );
      if (!event) {
        this.dbtTerminal.debug(
          "ConversationProvider",
          "Not able to get manifest data yet",
        );
        return;
      }
      const { nodeMetaMap } = event;
      this.dbtTerminal.debug(
        "ConversationProvider",
        "loading conversations",
        dbtDocsShare.share_id,
      );
      const conversations =
        await this.conversationService.loadConversationsByShareId(
          dbtDocsShare.share_id,
        );
      if (!conversations?.length) {
        this.dbtTerminal.debug(
          "ConversationProvider",
          "No conversations in latest share",
        );
        return;
      }

      if (this._threads[dbtDocsShare.share_id]) {
        const currentConversationGroupIds = Object.keys(
          this._threads[dbtDocsShare.share_id],
        );
        const conversationGroupIdsFromDB = conversations
          .filter((c) => c.status === "Pending")
          .map((c) => c.conversation_group_id.toString());

        const missingConversationGroupIds = currentConversationGroupIds.filter(
          (id) => !conversationGroupIdsFromDB.includes(id),
        );

        if (missingConversationGroupIds.length) {
          this.dbtTerminal.debug(
            "ConversationProvider",
            "resolving threads",
            missingConversationGroupIds,
          );
          missingConversationGroupIds.forEach((id) =>
            this._threads[dbtDocsShare.share_id][id].dispose(),
          );
        }
      }
      conversations
        .filter((c) => c.status === "Pending")
        .map((conversationGroup) => {
          if (!conversationGroup.meta?.uniqueId) {
            return null;
          }
          // TODO: handle this properly
          const parts = conversationGroup.meta.uniqueId.split(".");
          const modelName = parts[parts.length - 1];
          const node = nodeMetaMap.get(modelName);
          if (!node?.path) {
            return null;
          }
          const uri = Uri.parse(node?.path);
          const thread =
            this._threads[dbtDocsShare.share_id]?.[
              conversationGroup.conversation_group_id
            ] ??
            (this.commentController!.createCommentThread(
              uri,
              new Range(
                conversationGroup.meta.range.start.line,
                conversationGroup.meta.range.start.character,
                conversationGroup.meta.range.end.line,
                conversationGroup.meta.range.end.character,
              ),
              [],
            ) as ConversationCommentThread);
          thread.comments = conversationGroup.conversations.map(
            (conversation) =>
              new ConversationComment(
                conversation.conversation_id,
                this.convertTextFromDbToCommentFormat(conversation.message),
                CommentMode.Preview,
                {
                  name:
                    this.usersService.getUserById(conversation.user_id)
                      ?.first_name || "Unknown",
                },
                conversation.timestamp,
                undefined,
                "canDelete",
              ),
          );
          thread.conversation_group_id =
            conversationGroup.conversation_group_id;
          thread.meta = conversationGroup.meta;
          thread.share_id = dbtDocsShare.share_id;
          thread.label = "Discussion";
          this._threads[dbtDocsShare.share_id] =
            this._threads[dbtDocsShare.share_id] || {};
          this._threads[dbtDocsShare.share_id][
            conversationGroup.conversation_group_id
          ] = thread;
        });
    });
  }

  private convertTextFromDbToCommentFormat(text: string) {
    return new MarkdownString(text.replace(/\[@(\w+)\]\((\w+)\)/g, "@$1"));
  }

  private convertTextToDbFormat(text: string) {
    return new MarkdownString(text).value.replace(/@(\w+)/g, "@[$1]($1)");
  }

  private addComment(reply: CommentReply) {
    const thread = reply.thread;
    const newComment = new ConversationComment(
      "",
      new MarkdownString(reply.text),
      CommentMode.Preview,
      { name: this.usersService.user?.first_name || "Unknown" },
      new Date().toISOString(),
      thread as ConversationCommentThread,
      "canDelete",
    );

    thread.comments = [...thread.comments, newComment];

    return newComment;
  }

  async copyThreadLink(thread: ConversationCommentThread) {
    if (!thread.share_id) {
      window.showErrorMessage(
        extendErrorWithSupportLinks("Unable to find conversation."),
      );
      return;
    }

    const result = await this.conversationService.getAppUrlByShareId(
      thread.share_id,
    );
    if (result?.app_url) {
      env.clipboard.writeText(
        `${result.app_url}/${thread.conversation_group_id}`,
      );
      window.showInformationMessage("Url copied", "Ok");
    }
  }

  async viewInDbtDocs(thread: ConversationCommentThread) {
    if (!thread.share_id) {
      window.showErrorMessage(
        extendErrorWithSupportLinks("Unable to find conversation."),
      );
      return;
    }
    this.dbtTerminal.debug(
      "ConversationProvider",
      `firing render dbtdocs event`,
      thread.share_id,
    );
    this.emitterService.fire({
      command: "dbtdocsview:render",
      payload: {
        shareId: thread.share_id,
        conversationGroupId: thread.conversation_group_id,
        userId: this.usersService.user?.id,
      },
    });
  }

  private getNodeMeta(uri: Uri, resourceName: string) {
    const event = this.queryManifestService.getEventByDocument(uri);
    if (!event) {
      return;
    }

    const currentNode = event.nodeMetaMap.get(resourceName);
    // For model
    if (currentNode) {
      return {
        resource_type: currentNode.resource_type,
        uniqueId: currentNode.uniqueId,
      };
    }

    const macroNode = event.macroMetaMap.get(resourceName);
    // For macro
    if (macroNode) {
      return {
        resource_type: DBTProject.RESOURCE_TYPE_MACRO,
        uniqueId: macroNode.uniqueId,
      };
    }

    const testNode = event.testMetaMap.get(resourceName);
    // For tests
    if (testNode) {
      return {
        resource_type: DBTProject.RESOURCE_TYPE_TEST,
        uniqueId: testNode.uniqueId,
      };
    }
  }

  async createConversation(reply: CommentReply) {
    const thread = reply.thread as ConversationCommentThread;
    const newComment = this.addComment(reply);
    const model = path.basename(reply.thread.uri.fsPath, ".sql");
    const convertedMessage = this.convertTextToDbFormat(reply.text);

    const nodeMeta = this.getNodeMeta(reply.thread.uri, model);
    if (!nodeMeta) {
      return;
    }

    const editor = window.visibleTextEditors.find(
      (editor) => editor.document.uri.fsPath === thread.uri.fsPath,
    );
    const highlight =
      (thread.range.isSingleLine
        ? editor?.document.lineAt(thread.range.start.line).text
        : editor?.document.getText(thread.range)) || "";

    const meta = {
      highlight,
      uniqueId: nodeMeta.uniqueId,
      resource_type: nodeMeta.resource_type,
      range: {
        end: reply.thread.range.end,
        start: reply.thread.range.start,
      },
    };

    // create share
    const result = await this.conversationService.shareDbtDocs({
      name: convertedMessage,
      description: "",
      uri: reply.thread.uri,
      model,
    });
    if (!result) {
      // If share cannot be created, delete the thread
      thread.dispose();
      return;
    }
    const { shareId, shareUrl } = result;
    this.dbtTerminal.debug(
      "ConversationProvider",
      "created conversation",
      shareId,
      shareUrl,
    );

    this.dbtTerminal.debug(
      "ConversationProvider",
      "adding conversation to share",
      shareId,
    );

    // create conversation group
    const addReplyResult =
      await this.conversationService.createConversationGroup(shareId, {
        message: convertedMessage,
        meta,
      });

    if (!addReplyResult) {
      return;
    }
    newComment.conversation_id = addReplyResult.conversation_id;
    thread.share_id = shareId;
    thread.conversation_group_id = addReplyResult.conversation_group_id;
    thread.meta = meta;

    this.dbtTerminal.debug(
      "ConversationProvider",
      "added conversation to created conversation group",
      addReplyResult,
    );
    // TODO: optimize this
    this._threads[shareId] = this._threads[shareId] || {};
    this._threads[shareId][thread.conversation_group_id] =
      this._threads[shareId][thread.conversation_group_id] || {};
    this._threads[shareId][thread.conversation_group_id] = thread;
  }

  async replyToConversation(reply: CommentReply) {
    const thread = reply.thread as ConversationCommentThread;
    if (!thread.share_id) {
      this.dbtTerminal.error(
        "ConversationProvider",
        "Missing share id",
        new Error("Missing share id"),
      );
      window.showErrorMessage(
        extendErrorWithSupportLinks(
          "Unable to find conversation. Please try again later.",
        ),
      );
      return;
    }
    this.addComment(reply);
    if (!thread.conversation_group_id) {
      this.dbtTerminal.debug(
        "ConversationProvider",
        "Missing conv group id",
        thread.conversation_group_id,
      );
      return;
    }

    await this.conversationService.addConversationToGroup(
      thread.share_id,
      thread.conversation_group_id,
      this.convertTextToDbFormat(reply.text),
    );
  }

  async resolveConversation(commentThread: ConversationCommentThread) {
    if (!commentThread.share_id) {
      this.dbtTerminal.error(
        "ConversationProvider",
        "Missing share id",
        new Error("Missing share id"),
      );
      window.showErrorMessage(
        extendErrorWithSupportLinks(
          "Unable to find conversation. Please try again later.",
        ),
      );
      return;
    }
    this.dbtTerminal.debug(
      "ConversationProvider",
      `resolving conversation: ${commentThread.conversation_group_id} in share: ${commentThread.share_id}`,
    );
    const result = await this.conversationService.resolveConversation(
      commentThread.share_id,
      commentThread.conversation_group_id,
    );
    this.dbtTerminal.debug(
      "ConversationProvider",
      `resolved conversation: ${commentThread.conversation_group_id} in share: ${commentThread.share_id}`,
      result,
    );

    commentThread.dispose();
  }

  dispose() {
    while (this.disposables.length) {
      const x = this.disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }
}
