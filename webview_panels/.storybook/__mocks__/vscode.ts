let data = undefined;
let timer = 0;

export const vscode = {
  postMessage: async (args: Record<string, unknown>) => {
    if (args.syncRequestId) {
      setTimeout(() => {
        window.postMessage({
          command: "response",
          args: {
            syncRequestId: args.syncRequestId,
            body: data,
            status: true,
          },
        });
      }, timer);
      return;
    }
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve({
          command: "response",
          args: {
            syncRequestId: args.syncRequestId,
            body: data,
            status: true,
          },
        });
      }, timer)
    );
  },
};

export function decorator(story, { parameters }) {
  if (parameters && parameters.vscode) {
    data = parameters.vscode.data;
    timer = parameters.vscode.timer || 0;
  } else {
    data = undefined;
    timer = 0;
  }
  return story();
}
