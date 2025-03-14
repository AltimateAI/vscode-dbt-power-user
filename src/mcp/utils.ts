import portfinder from "portfinder";

export const findAvailablePort = async (): Promise<number> => {
  return await portfinder.getPortPromise({ port: 7800, stopPort: 7900 });
};
