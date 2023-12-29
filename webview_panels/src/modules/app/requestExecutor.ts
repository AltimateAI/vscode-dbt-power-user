import { vscode } from "../vscode";
import { IncomingSyncResponse } from "./types";

let id = 0;

const requestMap: Record<
  number,
  { resolve: (k: unknown) => void; reject: (reason?: string) => void }
> = {};

export const executeRequestInSync = (
  url: string,
  params: unknown,
): Promise<unknown> =>
  new Promise((resolve, reject) => {
    requestMap[id] = { resolve, reject };
    vscode.postMessage({ command: url, args: { id, params } });
    id += 1;
  });

export const executeRequestInAsync = (url: string, params: unknown): void => {
  vscode.postMessage({ command: url, args: { params } });
};
export const handleIncomingResponse = (args: IncomingSyncResponse): void => {
  const { resolve, reject } = requestMap[args.id];
  if (args.status) {
    resolve(args.body);
  } else {
    reject(args.error);
  }
  delete requestMap[args.id];
};
