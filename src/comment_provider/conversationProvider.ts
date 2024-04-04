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
  window,
  workspace,
} from "vscode";
import { extendErrorWithSupportLinks, provideSingleton } from "../utils";
import { AltimateRequest } from "../altimate";
import { DBTTerminal } from "../dbt_client/dbtTerminal";
import path = require("path");
import { ConversationService } from "../services/conversationService";
import { SharedStateService } from "../services/sharedStateService";
import { UsersService } from "../services/usersService";
import { QueryManifestService } from "../services/queryManifestService";

export interface ConversationCommentThread extends CommentThread {
  share_id: string;
  conversation_group_id: string;
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

  constructor(
    private conversationService: ConversationService,
    private usersService: UsersService,
    private altimateRequest: AltimateRequest,
    private dbtTerminal: DBTTerminal,
    private emitterService: SharedStateService,
    private queryManifestService: QueryManifestService,
  ) {
    this.commentController = comments.createCommentController(
      "altimate-conversations",
      "Altimate dbt conversations",
    );

    this.commentController.commentingRangeProvider = {
      provideCommentingRanges: (
        document: TextDocument,
        token: CancellationToken,
      ) => {
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
    this.setupRefetch();
    this.dbtTerminal.debug("ConversationProvider", "loading threads");
    const shares = await this.conversationService.loadSharedDocs();
    if (!shares?.length) {
      this.dbtTerminal.debug("ConversationProvider", "No conversations yet");
      return;
    }

    const eventResult = this.queryManifestService.getEventByCurrentProject();
    if (!eventResult?.event) {
      this.dbtTerminal.debug(
        "ConversationProvider",
        "Not able to get manifest data yet",
      );
      return;
    }
    const {
      event: { nodeMetaMap },
    } = eventResult;

    // for POC, using the latest share
    const [latest] = shares;

    this.dbtTerminal.debug(
      "ConversationProvider",
      "loading conversations",
      latest.share_id,
    );
    const conversations =
      await this.conversationService.loadConversationsByShareId(
        latest.share_id,
      );
    if (!conversations.length) {
      this.dbtTerminal.debug(
        "ConversationProvider",
        "No conversations in latest share",
      );
      return;
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
        const thread = this.commentController.createCommentThread(
          uri,
          new Range(
            conversationGroup.meta.range.start.line,
            conversationGroup.meta.range.start.character,
            conversationGroup.meta.range.end.line,
            conversationGroup.meta.range.end.character,
          ),
          conversationGroup.conversations.map(
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
          ),
        ) as ConversationCommentThread;
        thread.conversation_group_id = conversationGroup.conversation_group_id;
        thread.share_id = latest.share_id;
        thread.label = "Discussion";
      });
  }

  private convertTextFromDbToCommentFormat(text: string) {
    return new MarkdownString(
      text.replace(/@\[([^[\]]+)\]\((\d+)\)/g, "@$1<!--$2-->"),
    );
  }

  private convertTextToDbFormat(text: string) {
    return new MarkdownString(text).value.replace(
      /@\(([^)]+)\)<!--(\d+)-->/g,
      "@[$1]($2)",
    );
  }

  private convertUserMentions(text: string) {
    return text.replace(/@\(([^)]+)\)<!--(\d+)-->/g, "@$1<!--$2-->");
  }

  private addComment(reply: CommentReply) {
    const thread = reply.thread;
    const newComment = new ConversationComment(
      "",
      new MarkdownString(this.convertUserMentions(reply.text)),
      CommentMode.Preview,
      { name: this.usersService.user?.first_name || "Unknown" },
      new Date().toISOString(),
      thread as ConversationCommentThread,
      "canDelete",
    );

    thread.comments = [...thread.comments, newComment];

    return newComment;
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
  async createConversation(reply: CommentReply) {
    const thread = reply.thread as ConversationCommentThread;
    const newComment = this.addComment(reply);
    const model = path.basename(reply.thread.uri.fsPath, ".sql");
    const convertedMessage = this.convertTextToDbFormat(reply.text);
    const event = this.queryManifestService.getEventByDocument(
      reply.thread.uri,
    );
    if (!event) {
      return undefined;
    }

    const currentNode = event.nodeMetaMap.get(model);
    if (currentNode === undefined) {
      return undefined;
    }

    // return;
    // create share
    const { shareId, shareUrl } = await this.conversationService.shareDbtDocs({
      name: convertedMessage,
      description: "",
      uri: reply.thread.uri,
      model,
    });
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
        meta: {
          uniqueId: currentNode.uniqueId,
          resource_type: currentNode.resource_type,
          range: {
            end: reply.thread.range.end,
            start: reply.thread.range.start,
          },
        },
        xpath: "",
      });

    if (!addReplyResult) {
      return;
    }
    newComment.conversation_id = addReplyResult.conversation_id;
    thread.share_id = shareId;
    thread.conversation_group_id = addReplyResult.conversation_group_id;

    this.dbtTerminal.debug(
      "ConversationProvider",
      "added conversation to created conversation group",
      addReplyResult,
    );
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

  editConversation(comment: ConversationComment) {
    if (!comment.parent) {
      return;
    }

    comment.parent.comments = comment.parent.comments.map((cmt) => {
      if (
        (cmt as ConversationComment).conversation_id === comment.conversation_id
      ) {
        cmt.mode = CommentMode.Editing;
      }

      return cmt;
    });
  }
  saveConversation(comment: ConversationComment) {
    if (!comment.parent) {
      return;
    }

    comment.parent.comments = comment.parent.comments.map((cmt) => {
      if (
        (cmt as ConversationComment).conversation_id === comment.conversation_id
      ) {
        (cmt as ConversationComment).savedBody = cmt.body;
        cmt.mode = CommentMode.Preview;
      }

      return cmt;
    });
  }
  cancelSaveConversation(comment: ConversationComment) {
    if (!comment.parent) {
      return;
    }

    comment.parent.comments = comment.parent.comments.map((cmt) => {
      if (
        (cmt as ConversationComment).conversation_id === comment.conversation_id
      ) {
        cmt.body = (cmt as ConversationComment).savedBody;
        cmt.mode = CommentMode.Preview;
      }

      return cmt;
    });
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

  deleteConversationComment(comment: ConversationComment) {
    const thread = comment.parent;
    if (!thread) {
      return;
    }

    thread.comments = thread.comments.filter(
      (cmt) =>
        (cmt as ConversationComment).conversation_id !==
        comment.conversation_id,
    );

    if (thread.comments.length === 0) {
      thread.dispose();
    }
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
