import { vscode } from "@vscode";
import { IncomingSyncResponse } from "./types";

const requestMap: Record<
  string,
  {
    resolve: (k: unknown) => void;
    reject: (reason?: string) => void;
    progress?: (chunk: string) => void;
  }
> = {};

const streamMap: Record<string, string> = {};

export const executeStreamRequest = (
  url: string,
  params: Record<string, unknown>,
  progress: (chunk: string) => void,
): Promise<unknown> =>
  new Promise((resolve, reject) => {
    const id = crypto.randomUUID();
    requestMap[id] = { resolve, reject, progress };
    streamMap[id] = "";
    vscode.postMessage({ command: url, ...params, syncRequestId: id });
  });

export const executeRequestInSync = (
  url: string,
  params: Record<string, unknown>,
): Promise<unknown> =>
  new Promise((resolve, reject) => {
    const id = crypto.randomUUID();
    requestMap[id] = { resolve, reject };
    vscode.postMessage({ command: url, ...params, syncRequestId: id });
  });

export const executeRequestInAsync = (
  url: string,
  params: Record<string, unknown>,
): void => {
  vscode.postMessage({ command: url, ...params });
};

const updateProgress = (
  body: unknown,
  syncRequestId: string,
  progress?: (chunk: string) => void,
) => {
  if (progress && "chunk" in (body as Record<string, unknown>)) {
    streamMap[syncRequestId] += (body as Record<string, unknown>)
      .chunk as string;
    progress(streamMap[syncRequestId]);
    return true;
  }
  return false;
};

export const handleIncomingResponse = (args: IncomingSyncResponse): void => {
  if (!requestMap[args.syncRequestId]) {
    return;
  }
  const { resolve, reject, progress } = requestMap[args.syncRequestId];
  if (args.status) {
    if (updateProgress(args.body, args.syncRequestId, progress)) {
      return;
    }
    resolve(args.body);
  } else {
    reject(args.error);
  }
  delete streamMap[args.syncRequestId];
  delete requestMap[args.syncRequestId];
};
