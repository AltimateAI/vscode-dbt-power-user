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
  comments,
  window,
} from "vscode";
import { extendErrorWithSupportLinks, provideSingleton } from "../utils";
import { AltimateRequest } from "../altimate";
import { DBTTerminal } from "../dbt_client/dbtTerminal";
import path = require("path");
import { ConversationService } from "../services/conversationService";
import { SharedStateService } from "../services/sharedStateService";

let commentId = 1;
export class NoteComment implements Comment {
  id: number;
  label: string | undefined;
  savedBody: string | MarkdownString; // for the Cancel button
  constructor(
    public body: string | MarkdownString,
    public mode: CommentMode,
    public author: CommentAuthorInformation,
    public parent?: CommentThread,
    public contextValue?: string,
  ) {
    this.id = ++commentId;
    this.savedBody = this.body;
  }
}

@provideSingleton(ConversationProvider)
export class ConversationProvider implements Disposable {
  private disposables: Disposable[] = [];
  private commentController;

  constructor(
    private conversationService: ConversationService,
    private altimateRequest: AltimateRequest,
    private dbtTerminal: DBTTerminal,
    protected emitterService: SharedStateService,
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

    this.loadThreads();
  }

  private buildContextValue(shareId: string, conversationGroupId: string) {
    return JSON.stringify({ shareId, conversationGroupId });
  }

  private getContextValue(
    thread: CommentThread,
  ): { shareId: string; conversationGroupId: string } | undefined {
    if (!thread.contextValue) {
      return;
    }
    return JSON.parse(thread.contextValue);
  }

  private async loadThreads() {
    if (!window.activeTextEditor?.document.uri) {
      this.dbtTerminal.debug("ConversationProvider", "No active file");
      return;
    }

    const shares = await this.conversationService.loadSharedDocs();
    if (!shares?.length) {
      this.dbtTerminal.debug("ConversationProvider", "No conversations yet");
      return;
    }

    // for POC, using the latest share
    const [latest] = shares;

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
        if (window.activeTextEditor?.document.uri) {
          this.commentController.createCommentThread(
            window.activeTextEditor.document.uri,
            new Range(10, 0, 10, 0),
            conversationGroup.conversations.map(
              (conversation) =>
                new NoteComment(
                  conversation.message,
                  CommentMode.Preview,
                  { name: conversation.user_id },
                  undefined,
                  "canDelete",
                ),
            ),
          ).contextValue = this.buildContextValue(
            latest.share_id,
            conversationGroup.conversation_group_id,
          );
        }
      });
  }

  private addComment(reply: CommentReply) {
    const thread = reply.thread;
    const newComment = new NoteComment(
      reply.text,
      CommentMode.Preview,
      { name: "vscode" },
      thread,
      "canDelete",
    );

    thread.comments = [...thread.comments, newComment];

    return thread;
  }

  async viewInDbtDocs(thread: CommentThread) {
    const contextValue = this.getContextValue(thread);
    if (!contextValue?.shareId) {
      extendErrorWithSupportLinks("Unable to find conversation.");
      return;
    }
    this.dbtTerminal.debug(
      "ConversationProvider",
      `firing render dbtdocs event`,
      contextValue.shareId,
    );
    this.emitterService.fire({
      command: "dbtdocsview:render",
      payload: { shareId: contextValue.shareId },
    });
  }
  async createConversation(reply: CommentReply) {
    const thread = this.addComment(reply);
    const model = path.basename(reply.thread.uri.fsPath, ".sql");
    const { shareId, shareUrl } = await this.conversationService.shareDbtDocs({
      name: reply.text,
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
    const addReplyResult = await this.altimateRequest.fetch<{
      conversation_group_id: string;
    }>(`dbt/dbt_docs_share/${shareId}/conversation_group`, {
      method: "POST",
      body: JSON.stringify({
        message: reply.text,
        xpath: JSON.stringify({
          model,
          lines: {
            end: reply.thread.range.end,
            start: reply.thread.range.start,
          },
        }),
      }),
    });

    thread.contextValue = this.buildContextValue(
      shareId,
      addReplyResult.conversation_group_id,
    );

    this.dbtTerminal.debug(
      "ConversationProvider",
      "added reply to created conversation",
      addReplyResult,
    );
  }

  async replyToConversation(reply: CommentReply) {
    const contextValue = this.getContextValue(reply.thread);
    if (!contextValue?.shareId) {
      this.dbtTerminal.error(
        "ConversationProvider",
        "Missing share id",
        new Error("Missing share id"),
      );
      extendErrorWithSupportLinks(
        "Unable to find conversation. Please try again later.",
      );
      return;
    }
    const { conversationGroupId, shareId } = contextValue;
    this.addComment(reply);
    if (!conversationGroupId) {
      this.dbtTerminal.debug(
        "ConversationProvider",
        "Missing conv group id",
        conversationGroupId,
      );
      return;
    }
    const result = await this.altimateRequest.fetch(
      `dbt/dbt_docs_share/${shareId}/conversation_group/${conversationGroupId}/conversation`,
      { method: "POST", body: JSON.stringify({ message: reply.text }) },
    );
  }

  editConversation(comment: NoteComment) {
    if (!comment.parent) {
      return;
    }

    comment.parent.comments = comment.parent.comments.map((cmt) => {
      if ((cmt as NoteComment).id === comment.id) {
        cmt.mode = CommentMode.Editing;
      }

      return cmt;
    });
  }
  saveConversation(comment: NoteComment) {
    if (!comment.parent) {
      return;
    }

    comment.parent.comments = comment.parent.comments.map((cmt) => {
      if ((cmt as NoteComment).id === comment.id) {
        (cmt as NoteComment).savedBody = cmt.body;
        cmt.mode = CommentMode.Preview;
      }

      return cmt;
    });
  }
  cancelSaveConversation(comment: NoteComment) {
    if (!comment.parent) {
      return;
    }

    comment.parent.comments = comment.parent.comments.map((cmt) => {
      if ((cmt as NoteComment).id === comment.id) {
        cmt.body = (cmt as NoteComment).savedBody;
        cmt.mode = CommentMode.Preview;
      }

      return cmt;
    });
  }

  async resolveConversation(commentThread: CommentThread) {
    const contextValue = this.getContextValue(commentThread);
    if (!contextValue?.shareId) {
      this.dbtTerminal.error(
        "ConversationProvider",
        "Missing share id",
        new Error("Missing share id"),
      );
      extendErrorWithSupportLinks(
        "Unable to find conversation. Please try again later.",
      );
      return;
    }
    const { conversationGroupId, shareId } = contextValue;
    this.dbtTerminal.debug(
      "ConversationProvider",
      `resolving conversation: ${conversationGroupId} in share: ${shareId}`,
    );
    const result = await this.altimateRequest.fetch(
      `dbt/dbt_docs_share/${shareId}/conversation_group/${conversationGroupId}/resolve`,
      { method: "POST", body: JSON.stringify({ resolved: true }) },
    );
    this.dbtTerminal.debug(
      "ConversationProvider",
      `resolved conversation: ${conversationGroupId} in share: ${shareId}`,
      result,
    );

    commentThread.dispose();
  }

  deleteConversationComment(comment: NoteComment) {
    const thread = comment.parent;
    if (!thread) {
      return;
    }

    thread.comments = thread.comments.filter(
      (cmt) => (cmt as NoteComment).id !== comment.id,
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
