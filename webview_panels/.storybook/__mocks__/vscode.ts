let data = undefined;
let timer = 0;
let func = undefined;

export const vscode = {
  postMessage: async (args: Record<string, unknown>) => {
    if (args.syncRequestId) {
      const body = typeof func === 'function' ? (func as Function)(args) : data;
      setTimeout(() => {
        window.postMessage({
          command: "response",
          args: {
            syncRequestId: args.syncRequestId,
            body,
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
    func = parameters.vscode.func || 0;
  } else {
    data = undefined;
    timer = 0;
  }
  return story();
}
