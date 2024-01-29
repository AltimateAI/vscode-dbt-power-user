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

export const startProgressBar = () => {
  vscode.postMessage({ command: "startProgressBar", args: {} });
};

export const endProgressBar = () => {
  vscode.postMessage({ command: "endProgressBar", args: {} });
};

export const previewFeature = () => {
  vscode.postMessage({ command: "previewFeature", args: {} });
};

export const showNoLineage = (params: { table: string; name: string }) => {
  vscode.postMessage({ command: "showNoLineage", args: { params } });
};

export const init = () => vscode.postMessage({ command: "init", args: {} });

export const setLegacyLineageView = () =>
  vscode.postMessage({ command: "setLegacyLineageView" });
