declare const acquireVsCodeApi: () => { postMessage: (v: unknown) => void };

// Just for handling web
export const vscode =
  typeof acquireVsCodeApi === "undefined"
    ? {
        postMessage: (_v: unknown) => {
          return;
        },
      }
    : acquireVsCodeApi();
