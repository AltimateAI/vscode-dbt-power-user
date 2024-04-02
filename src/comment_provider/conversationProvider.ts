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
} from "vscode";
import { provideSingleton } from "../utils";
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
  private shareId = "";
  private conversationGroupId = "";

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

  private async loadThreads() {
    if (!window.activeTextEditor?.document.uri) {
      this.dbtTerminal.debug("ConversationProvider", "No active file");
      return;
    }

    // for POC, getting the latest share
    const shares = await this.altimateRequest.fetch<{
      items?: { share_id: string }[];
    }>("dbt/dbt_docs_share");
    if (!shares?.items?.length) {
      this.dbtTerminal.debug("ConversationProvider", "No conversations yet");
      return;
    }

    const [latest] = shares.items;

    this.shareId = latest.share_id;
    const shareDetails = await this.altimateRequest.fetch(
      `dbt/dbt_docs_share/${latest.share_id}`,
    );
    // const commentThread=  this.commentController.createCommentThread(
    //     window.activeTextEditor.document.uri,
    //     new Range(10, 0, 10, 0),
    //     [new NoteComment(
    //       conversation.message,
    //       CommentMode.Preview,
    //       { name: conversation.user_id },
    //       undefined,
    //       "canDelete",
    //     )],
    //   );
    // }
    const conversations = await this.altimateRequest.fetch<{
      dbt_docs_share_conversations: {
        conversation_group_id: string;
        owner: string;
        status: "Pending" | "Resolved";
        xpath: string;
        conversations: {
          conversation_id: string;
          message: string;
          timestamp: string;
          user_id: string;
        }[];
      }[];
    }>(`dbt/dbt_docs_share/${latest.share_id}/conversations`);
    if (!conversations.dbt_docs_share_conversations.length) {
      this.dbtTerminal.debug(
        "ConversationProvider",
        "No conversations in latest share",
      );
      return;
    }

    this.conversationGroupId =
      conversations.dbt_docs_share_conversations[0].conversation_group_id;
    conversations.dbt_docs_share_conversations.map((conversationGroup) => {
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
  }

  private async addReplyToConversation({
    message,
    xpath,
  }: {
    message: string;
    xpath: string;
  }) {
    this.dbtTerminal.debug(
      "ConversationProvider",
      "adding conversation to share",
      this.shareId,
      this.conversationGroupId,
    );
    const result = await this.altimateRequest.fetch(
      `dbt/dbt_docs_share/${this.shareId}/conversation_group`,
      { method: "POST", body: JSON.stringify({ message, xpath }) },
    );
    return result;
  }

  async viewInDbtDocs(reply: CommentThread) {
    this.emitterService.fire({
      command: "dbtdocsview:render",
      payload: { shareId: this.shareId },
    });
  }
  async createConversation(reply: CommentReply) {
    this.addComment(reply);
    const { shareId, shareUrl } = await this.conversationService.shareDbtDocs({
      name: reply.text,
      description: "",
      uri: reply.thread.uri,
    });
    this.shareId = shareId;

    const model = path.basename(reply.thread.uri.fsPath, ".sql");

    const addReplyResult = await this.addReplyToConversation({
      message: reply.text,
      xpath: JSON.stringify({
        model,
        lines: { end: reply.thread.range.end, start: reply.thread.range.start },
      }),
    });
    console.log(addReplyResult);
  }

  async replyToConversation(reply: CommentReply) {
    this.addComment(reply);
    if (!this.shareId || !this.conversationGroupId) {
      this.dbtTerminal.debug(
        "ConversationProvider",
        "Missing share or conv group id",
        this.shareId,
        this.conversationGroupId,
      );
      return;
    }
    const result = await this.altimateRequest.fetch(
      `dbt/dbt_docs_share/${this.shareId}/conversation_group/${this.conversationGroupId}/conversation`,
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
  deleteConversation(thread: CommentThread) {
    thread.dispose();
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
