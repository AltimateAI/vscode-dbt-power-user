import { vscode } from "@vscode";
import { IncomingSyncResponse } from "./types";

const requestMap: Record<
  string,
  { resolve: (k: unknown) => void; reject: (reason?: string) => void }
> = {};

export const executeRequestInSync = (
  url: string,
  params: Record<string, unknown>
): Promise<unknown> =>
  new Promise((resolve, reject) => {
    const id = crypto.randomUUID();
    requestMap[id] = { resolve, reject };
    vscode.postMessage({ command: url, ...params, syncRequestId: id });
  });

export const executeRequestInAsync = (
  url: string,
  params: Record<string, unknown>
): void => {
  vscode.postMessage({ command: url, ...params });
};
export const handleIncomingResponse = (args: IncomingSyncResponse): void => {
  if (!requestMap[args.syncRequestId]) {
    return;
  }
  const { resolve, reject } = requestMap[args.syncRequestId];
  if (args.status) {
    resolve(args.body);
  } else {
    reject(args.error);
  }
  delete requestMap[args.syncRequestId];
};
