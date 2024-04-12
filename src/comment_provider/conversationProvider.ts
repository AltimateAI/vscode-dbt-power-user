import {
  CancellationToken,
  Comment,
  CommentAuthorInformation,
  CommentMode,
  CommentReply,
  CommentThread,
  CommentThreadState,
  Disposable,
  MarkdownString,
  Range,
  TextDocument,
  Uri,
  commands,
  comments,
  env,
  window,
  workspace,
} from "vscode";
import { extendErrorWithSupportLinks, provideSingleton } from "../utils";
import { DBTTerminal } from "../dbt_client/dbtTerminal";
import path = require("path");
import {
  Conversation,
  ConversationGroup,
  ConversationService,
  SharedDoc,
} from "../services/conversationService";
import { SharedStateService } from "../services/sharedStateService";
import { UsersService } from "../services/usersService";
import { QueryManifestService } from "../services/queryManifestService";
import { DBTProject } from "../manifest/dbtProject";

// Extends vscode commentthread and add extra fields for reference
export interface ConversationCommentThread extends CommentThread {
  share_id: SharedDoc["share_id"];
  conversation_group_id: ConversationGroup["conversation_group_id"];
  meta: ConversationGroup["meta"];
}

export class ConversationComment implements Comment {
  label: string | undefined;
  timestamp: Date;
  savedBody: string | MarkdownString; // for the Cancel button
  constructor(
    public conversation_id: Conversation["conversation_id"],
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

const ALLOWED_FILE_EXTENSIONS = [".sql"];
@provideSingleton(ConversationProvider)
export class ConversationProvider implements Disposable {
  private disposables: Disposable[] = [];
  private _commentController;
  private _timer: NodeJS.Timeout | undefined;
  // record of share id with conv group
  // used to identify deleted records during polling
  // can be removed in future if we get right events like delete, add etc.,
  private _threads: Record<string, Record<string, ConversationCommentThread>> =
    {};

  constructor(
    private conversationService: ConversationService,
    private usersService: UsersService,
    private dbtTerminal: DBTTerminal,
    private emitterService: SharedStateService,
    private queryManifestService: QueryManifestService,
  ) {
    if (!this.isCollaborationEnabled()) {
      return;
    }

    // Create comment controller
    this._commentController = comments.createCommentController(
      "altimate-conversations",
      // this title will be used to show in selection options when more than one extension in vscode has commenting feature
      "Altimate dbt conversations",
    );

    this._commentController.commentingRangeProvider = {
      provideCommentingRanges: (
        document: TextDocument,
        token: CancellationToken,
      ) => {
        // enable only for allowed files
        if (
          !ALLOWED_FILE_EXTENSIONS.find((ext) =>
            document.uri.fsPath.endsWith(ext),
          )
        ) {
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

    this.disposables.push(this._commentController);
  }

  private isCollaborationEnabled() {
    const enableCollaboration = workspace
      .getConfiguration("dbt")
      .get<boolean>("enableCollaboration", false);
    this.dbtTerminal.debug(
      "ConversationProvider:isCollaborationEnabled",
      "collaboration status",
      enableCollaboration,
    );

    return enableCollaboration;
  }

  // simple polling for getting latest conversations
  private setupRefetch() {
    clearTimeout(this._timer);
    const pollingInterval = workspace
      .getConfiguration("dbt")
      .get<number>("conversationsPollingInterval", 30);
    this.dbtTerminal.debug(
      "ConversationProvider:setupRefetch",
      "refresh conversations after",
      pollingInterval,
    );
    this._timer = setTimeout(() => {
      this.loadThreads();
    }, pollingInterval * 1000);
  }

  private async loadThreads() {
    this.dbtTerminal.debug(
      "ConversationProvider:loadThreads",
      "loading threads",
    );
    const shares = await this.conversationService.loadSharedDocs();
    this.setupRefetch();

    if (!shares?.length) {
      this.dbtTerminal.debug(
        "ConversationProvider:loadThreads",
        "No conversations yet",
      );
      return;
    }

    shares.map(async (dbtDocsShare) => {
      this.dbtTerminal.debug(
        "ConversationProvider:loadThreads",
        "loading conversations",
        dbtDocsShare.share_id,
      );
      const conversations =
        await this.conversationService.loadConversationsByShareId(
          dbtDocsShare.share_id,
        );
      if (!conversations?.length) {
        this.dbtTerminal.debug(
          "ConversationProvider:loadThreads",
          "No conversations in share",
          dbtDocsShare.share_id,
        );
        return;
      }

      const pendingConversations = conversations.filter(
        (c) => c.status === "Pending",
      );

      // If local cache has this share already, find if any conversation is missing from db (which as resolved)
      // can be removed in future if we get right events like delete, add etc.,
      if (this._threads[dbtDocsShare.share_id]) {
        const currentConversationGroupIds = Object.keys(
          this._threads[dbtDocsShare.share_id],
        );
        const conversationGroupIdsFromDB = pendingConversations.map((c) =>
          c.conversation_group_id.toString(),
        );

        const missingConversationGroupIds = currentConversationGroupIds.filter(
          (id) => !conversationGroupIdsFromDB.includes(id),
        );

        if (missingConversationGroupIds.length) {
          this.dbtTerminal.debug(
            "ConversationProvider:loadThreads",
            "resolving threads",
            missingConversationGroupIds,
          );
          // delete resolved conversations
          missingConversationGroupIds.forEach((id) =>
            this._threads[dbtDocsShare.share_id][id].dispose(),
          );
        }
      }

      const project = this.queryManifestService.getProjectByName(
        dbtDocsShare.project_name,
      );

      if (!project) {
        this.dbtTerminal.debug(
          "ConversationProvider:loadThreads",
          "not able to get project",
          dbtDocsShare,
        );
        return;
      }

      pendingConversations.map((conversationGroup) => {
        const uri = Uri.parse(
          path.join(
            project.projectRoot.fsPath,
            conversationGroup.meta.filePath,
          ),
        );
        const thread =
          this._threads[dbtDocsShare.share_id]?.[
            conversationGroup.conversation_group_id
          ] ??
          (this._commentController!.createCommentThread(
            uri,
            new Range(
              conversationGroup.meta.range.start.line,
              conversationGroup.meta.range.start.character,
              conversationGroup.meta.range.end.line,
              conversationGroup.meta.range.end.character,
            ),
            [],
          ) as ConversationCommentThread);
        thread.state = CommentThreadState.Unresolved;
        const isInDocsEditor = !!conversationGroup.meta.field;
        thread.contextValue = isInDocsEditor ? "docEditor" : "";
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
              "",
            ),
        );

        if (isInDocsEditor) {
          thread.comments = [
            new ConversationComment(
              -1,
              'This comment is added from documentation editor. Please click "View in documentation editor" button to view in documentation editor',
              CommentMode.Preview,
              {
                name: "Altimate",
              },
              new Date().toISOString(),
              undefined,
              "",
            ),
            ...thread.comments,
          ];
        }
        thread.conversation_group_id = conversationGroup.conversation_group_id;
        thread.meta = conversationGroup.meta;
        thread.share_id = dbtDocsShare.share_id;
        thread.label = "Discussion";

        // update the local cache
        this._threads[dbtDocsShare.share_id] = {
          ...this._threads[dbtDocsShare.share_id],
          [conversationGroup.conversation_group_id]: thread,
        };
      });
    });
  }

  // convert "@[john](john)" to "@john"
  private convertTextFromDbToCommentFormat(text: string) {
    return new MarkdownString(text.replace(/@\[(.*?)\]\((.*?)\)/g, "@$2"));
  }

  // convert "@john" to "@[john](john)"
  private convertTextToDbFormat(text: string) {
    return new MarkdownString(text).value.replace(/@(\S+)\s/g, "@[$1]($1) ");
  }

  private addComment(reply: CommentReply) {
    const thread = reply.thread;
    const newComment = new ConversationComment(
      -1,
      new MarkdownString(reply.text),
      CommentMode.Preview,
      { name: this.usersService.user?.first_name || "Unknown" },
      new Date().toISOString(),
      thread as ConversationCommentThread,
      "",
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

  async viewInDocEditor(thread: ConversationCommentThread) {
    commands.executeCommand("dbtPowerUser.DocsEdit.focus");
  }

  async viewInDbtDocs(thread: ConversationCommentThread) {
    if (!thread.share_id) {
      window.showErrorMessage(
        extendErrorWithSupportLinks("Unable to find conversation."),
      );
      return;
    }
    this.dbtTerminal.debug(
      "ConversationProvider:viewInDbtDocs",
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
      this.dbtTerminal.debug("getNodeMeta", "event not available");
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

  createCommentThread(uri: Uri, range: Range) {
    return this._commentController?.createCommentThread(uri, range, []);
  }

  async createConversation(
    reply: CommentReply,
    extraMeta: Record<string, unknown> = {},
  ) {
    try {
      this.dbtTerminal.debug(
        "ConversationProvider:createConversation",
        "creating conversation",
        reply,
      );
      const thread = reply.thread as ConversationCommentThread;
      thread.state = CommentThreadState.Unresolved;
      this.addComment(reply);
      const model = path.basename(thread.uri.fsPath, ".sql");
      const convertedMessage = this.convertTextToDbFormat(reply.text);

      const nodeMeta = this.getNodeMeta(thread.uri, model);

      // Find selected text
      const editor = window.visibleTextEditors.find(
        (editor) => editor.document.uri.fsPath === thread.uri.fsPath,
      );
      const project = this.queryManifestService.getProjectByUri(thread.uri);
      const { value, ...rest } = extraMeta;
      const highlight =
        rest.field === "description"
          ? (value as string)
          : (thread.range.isSingleLine
              ? editor?.document.lineAt(thread.range.start.line).text
              : editor?.document.getText(thread.range)) || "";

      const meta = {
        ...rest,
        highlight,
        source: "extension",
        uniqueId: nodeMeta?.uniqueId,
        filePath: path.relative(
          project?.projectRoot.fsPath || "",
          thread.uri.fsPath,
        ),
        resource_type: nodeMeta?.resource_type,
        range: {
          end: thread.range.end,
          start: thread.range.start,
        },
      };

      // create share
      const result = await this.conversationService.shareDbtDocs({
        name: convertedMessage, // `dbt docs discussion on ${nodeMeta?.uniqueId}`,
        description: "",
        uri: thread.uri,
        model,
      });
      // Failing silently, because this case will happen if key is not added
      // message for adding key will be already shown
      if (!result) {
        return;
      }
      const { shareId, shareUrl } = result;
      this.dbtTerminal.debug(
        "ConversationProvider:createConversation",
        "created conversation, adding conversation to group",
        shareId,
        shareUrl,
      );

      // create conversation group
      const addReplyResult =
        await this.conversationService.createConversationGroup(shareId, {
          message: convertedMessage,
          meta,
        });

      if (!addReplyResult) {
        throw new Error("Unable to create group");
      }

      (thread.comments[0] as ConversationComment).conversation_id =
        addReplyResult.conversation_id;
      thread.share_id = shareId;
      thread.conversation_group_id = addReplyResult.conversation_group_id;
      thread.meta = meta;

      this.dbtTerminal.debug(
        "ConversationProvider",
        "added conversation to created conversation group",
        addReplyResult,
      );

      this._threads[shareId] = {
        ...this._threads[shareId],
        [thread.conversation_group_id]: thread,
      };
    } catch (error) {
      this.dbtTerminal.error(
        "ConversationProvider:createConversation",
        "unable to create conversation",
        error,
      );
      // If share cannot be created, delete the thread
      reply.thread.dispose();
      window.showErrorMessage(
        extendErrorWithSupportLinks(
          `Unable to save your comment. ${(error as Error).message}`,
        ),
      );
    }
  }

  async replyToConversation(reply: CommentReply) {
    const thread = reply.thread as ConversationCommentThread;
    try {
      if (!thread.share_id) {
        throw new Error("Unable to find conversation. Missing share id");
      }

      this.dbtTerminal.debug(
        "ConversationProvider:replyToConversation",
        "replying to conversation",
        reply,
      );
      this.addComment(reply);

      if (!thread.conversation_group_id) {
        if (!thread.share_id) {
          throw new Error(
            "Unable to find conversation. Missing conversation group id",
          );
        }
        return;
      }

      await this.conversationService.addConversationToGroup(
        thread.share_id,
        thread.conversation_group_id,
        this.convertTextToDbFormat(reply.text),
      );
    } catch (error) {
      this.dbtTerminal.error(
        "ConversationProvider:replyToConversation",
        "unable to reply conversation",
        error,
      );
      window.showErrorMessage(
        extendErrorWithSupportLinks(
          `Unable to save your reply. ${(error as Error).message}`,
        ),
      );
    }
  }

  async resolveConversation(commentThread: ConversationCommentThread) {
    try {
      if (!commentThread.share_id) {
        throw new Error("Unable to find conversation. Missing share id");
      }
      this.dbtTerminal.debug(
        "ConversationProvider:resolveConversation",
        `resolving conversation: ${commentThread.conversation_group_id} in share: ${commentThread.share_id}`,
      );
      const result = await this.conversationService.resolveConversation(
        commentThread.share_id,
        commentThread.conversation_group_id,
      );
      this.dbtTerminal.debug(
        "ConversationProvider:resolveConversation",
        `resolved conversation: ${commentThread.conversation_group_id} in share: ${commentThread.share_id}`,
        result,
      );

      commentThread.dispose();
    } catch (error) {
      this.dbtTerminal.error(
        "ConversationProvider:resolveConversation",
        "unable to resolve conversation",
        error,
      );
      window.showErrorMessage(
        extendErrorWithSupportLinks(
          `Unable to resolve comment. ${(error as Error).message}`,
        ),
      );
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
