import portfinder from "portfinder";

export const findAvailablePort = async (): Promise<number> => {
  return await portfinder.getPortPromise({ port: 7700, stopPort: 7900 });
};

export const isCursor = () => {
  return (
    process.env.VSCODE_CWD?.includes("Cursor") || !!process.env.CURSOR_TRACE_ID
  );
};
