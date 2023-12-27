declare const acquireVsCodeApi: () => { postMessage: (v: unknown) => void };

export const vscode = acquireVsCodeApi();
