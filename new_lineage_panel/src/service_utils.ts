declare const acquireVsCodeApi: () => { postMessage: (v: unknown) => void };

const vscode = acquireVsCodeApi();

let id = 0;
const requestMap: Map<
  number,
  { resolve: (k: unknown) => void; reject: (reason?: string) => void }
> = new Map();

export const handleResponse = (args: {
  id: number;
  body: unknown;
  status: boolean;
  error: string;
}) => {
  const obj = requestMap.get(args.id);
  if (!obj) return;
  const { resolve, reject } = obj;
  if (args.status) {
    resolve(args.body);
  } else {
    reject(args.error);
  }
  requestMap.delete(args.id);
};

export const requestExecutor = (url: string, params: unknown) => {
  return new Promise((resolve, reject) => {
    requestMap.set(id, { resolve, reject });
    vscode.postMessage({ command: url, args: { id, params } });
    id++;
  });
};

export const openFile = (url: string) => {
  vscode.postMessage({ command: "openFile", args: { url } });
};

export const openURL = (url: string) => {
  vscode.postMessage({ command: "openURL", url });
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

export enum CllEvents {
  START = "start",
  END = "end",
  CANCEL = "cancel",
}

export class CLL {
  static isCancelled = false;
  static inProgress = false;
  static linkCount = 0;

  static onCancel() {
    CLL.isCancelled = true;
    CLL.inProgress = false;
  }

  static cancel() {
    // this is used to cancel from webview
    CLL.onCancel();
    vscode.postMessage({
      command: "columnLineage",
      args: { event: CllEvents.CANCEL },
    });
  }

  static start() {
    CLL.inProgress = true;
    CLL.isCancelled = false;
    CLL.linkCount = 0;
    vscode.postMessage({
      command: "columnLineage",
      args: { event: CllEvents.START },
    });
  }

  static end() {
    CLL.inProgress = false;
    vscode.postMessage({
      command: "columnLineage",
      args: { event: CllEvents.END },
    });
    vscode.postMessage({
      command: "telemetryEvents",
      args: {
        id: "columnLineageNumLinks",
        params: { num: CLL.linkCount },
      },
    });
    CLL.linkCount = 0;
  }

  static addLinks(n: number) {
    CLL.linkCount += n;
  }

  static showCllInProgressMsg() {
    showInfoNotification(
      "Column lineage is in progress. Either wait for it to complete or cancel the current one."
    );
  }
}

export const columnLineage = ({ event }: { event: CllEvents }) => {
  if (event === CllEvents.CANCEL) {
    CLL.onCancel();
  }
};
