declare const acquireVsCodeApi: () => { postMessage: (v: unknown) => void };

const vscode = acquireVsCodeApi();

let id = 0;
const requestMap: Record<
  number,
  { resolve: (k: unknown) => void; reject: (reason?: string) => void }
> = {};

export const handleResponse = (args: {
  id: number;
  body: unknown;
  status: boolean;
  error: string;
}) => {
  const { resolve, reject } = requestMap[args.id];
  if (args.status) {
    resolve(args.body);
  } else {
    reject(args.error);
  }
  delete requestMap[args.id];
};

export const requestExecutor = (url: string, params: unknown) => {
  return new Promise((resolve, reject) => {
    requestMap[id] = { resolve, reject };
    vscode.postMessage({ command: url, args: { id, params } });
    id++;
  });
};

export const openFile = (url: string) => {
  vscode.postMessage({ command: "openFile", args: { url } });
};

export const openURL = (url: string) => {
  vscode.postMessage({
    command: "openURL",
    args: { url },
  });
};

export const openChat = () => openURL("https://app.myaltimate.com/contactus");

export const previewFeature = () => {
  vscode.postMessage({ command: "previewFeature", args: {} });
};

export const showNoLineage = (params: { table: string; name: string }) => {
  vscode.postMessage({ command: "showNoLineage", args: { params } });
};

export const init = () => vscode.postMessage({ command: "init", args: {} });

export const setLegacyLineageView = () =>
  vscode.postMessage({ command: "setLegacyLineageView" });

// column lineage with cancellation

enum CLLStatus {
  START = "start",
  END = "end",
  CANCELLED = "cancelled",
}
const ctxMap: Record<string, Context> = {};

export class Context {
  isCancelled = false;
  id: string;
  static inProgress = false;
  static currId: string;

  constructor(id: string) {
    this.id = id;
  }

  onCancel() {
    this.isCancelled = true;
    Context.inProgress = false;
  }

  cancel() {
    // this is used to cancel from webview
    vscode.postMessage({
      command: "columnLineage",
      args: { ctxId: this.id, status: CLLStatus.CANCELLED },
    });
  }

  start() {
    Context.inProgress = true;
    Context.currId = this.id;
    vscode.postMessage({
      command: "columnLineage",
      args: { ctxId: this.id, status: CLLStatus.START },
    });
  }

  end() {
    Context.inProgress = false;
    vscode.postMessage({
      command: "columnLineage",
      args: { ctxId: this.id, status: CLLStatus.END },
    });
  }

  inProgress() {
    return Context.inProgress;
  }

  static cancelCurr() {
    ctxMap[Context.currId]?.cancel();
  }
}

export const createCLLContext = () => {
  const ctxId: string = window.crypto.randomUUID();
  const ctx = new Context(ctxId);
  ctxMap[ctxId] = ctx;
  return ctx;
};

export const columnLineage = ({
  cancel,
  ctxId,
}: {
  cancel: boolean;
  ctxId: string;
}) => {
  if (cancel) {
    ctxMap[ctxId]?.onCancel();
  }
};
