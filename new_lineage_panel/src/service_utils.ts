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
  vscode.postMessage({ command: "openURL", args: { url } });
};

export const openChat = () => openURL("https://app.myaltimate.com/contactus");

export const previewFeature = () => {
  vscode.postMessage({ command: "previewFeature", args: {} });
};

export const showInfoNotification = (message: string) => {
  vscode.postMessage({ command: "showInfoNotification", args: { message } });
};

export const init = () => vscode.postMessage({ command: "init", args: {} });

export const setLegacyLineageView = () =>
  vscode.postMessage({ command: "setLegacyLineageView" });

// column lineage with cancellation

enum CllEvents {
  START = "start",
  END = "end",
  CANCEL = "cancel",
}

export class CllContext {
  static isCancelled = false;
  static inProgress = false;
  static linkCount = 0;

  static onCancel() {
    CllContext.isCancelled = true;
    CllContext.inProgress = false;
  }

  static cancel() {
    // this is used to cancel from webview
    vscode.postMessage({
      command: "columnLineage",
      args: { event: CllEvents.CANCEL },
    });
  }

  static start() {
    CllContext.inProgress = true;
    CllContext.linkCount = 0;
    vscode.postMessage({
      command: "columnLineage",
      args: { event: CllEvents.START },
    });
  }

  static end() {
    CllContext.inProgress = false;
    vscode.postMessage({
      command: "columnLineage",
      args: { event: CllEvents.END },
    });
    vscode.postMessage({
      command: "telemetryEvents",
      args: { event: "columnLineageNumLinks", props: { num: CllContext.linkCount } },
    });
    CllContext.linkCount = 0;
  }

  static addLinks(n: number) {
    CllContext.linkCount += n;
  }
}

export const columnLineage = ({ event }: { event: CllEvents }) => {
  if (event === CllEvents.CANCEL) {
    CllContext.onCancel();
  }
};
