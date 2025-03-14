import { env } from "vscode";
import portfinder from "portfinder";

// Base port range for MCP server
const BASE_PORT = 7800;
const MAX_PORT_OFFSET = 100;

export const findAvailablePort = async (): Promise<number> => {
  // Use the last 4 digits of the session ID to create a unique base port for this window
  const sessionId = env.sessionId;
  const windowSpecificOffset =
    parseInt(sessionId.slice(-4), 16) % MAX_PORT_OFFSET;

  portfinder.basePort = BASE_PORT + windowSpecificOffset;
  portfinder.highestPort = portfinder.basePort + MAX_PORT_OFFSET;

  try {
    return await portfinder.getPortPromise();
  } catch (err) {
    // Fallback to base port if port finding fails
    return BASE_PORT;
  }
};
