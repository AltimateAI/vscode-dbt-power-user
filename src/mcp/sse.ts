import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import express from "express";
import { createServer } from "./server";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
export class DbtPowerUserMcpNewServer {
  constructor(private dbtProjectContainer: DBTProjectContainer) {
    this.start();
  }

  private async start() {
    const { server, cleanup } = createServer(this.dbtProjectContainer);
    const app = express();
    let transport: SSEServerTransport;
    app.get("/sse", async (req, res) => {
      console.log("Received connection");
      transport = new SSEServerTransport("/message", res);
      await server.connect(transport);

      server.onclose = async () => {
        await cleanup();
        await server.close();
        process.exit(0);
      };
    });

    app.post("/message", async (req, res) => {
      console.log("Received message");

      await transport.handlePostMessage(req, res);
    });

    const PORT = process.env.PORT || 7891;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
}
