let data = undefined;
let timer = 0;
let func = undefined;

export const vscode = {
  postMessage: async (args: Record<string, unknown>) => {
    if (args.syncRequestId) {
      let response;
      let status = true;
      try {
        const body =
          typeof func === "function" ? await (func as Function)(args) : data;
        response = { body };
      } catch (error) {
        response = {
          error: (error as Error).message,
        };
        status = false;
      }
      setTimeout(() => {
        window.postMessage({
          command: "response",
          args: {
            syncRequestId: args.syncRequestId,
            ...response,
            status,
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
