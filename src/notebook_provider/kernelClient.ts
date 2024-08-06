import * as wireProtocol from "@nteract/messaging/lib/wire-protocol";
import { randomUUID } from "crypto";
import path = require("path");
import { workspace } from "vscode";
// import zeromq from "zeromq";
const zeromqModuleName = `${"zeromq"}`;
const zeromq = require("zeromq");

const HEADER_FIELDS = ["username", "version", "session", "msg_id", "msg_type"];
const IOPUB_CONTENT_FIELDS = {
  stream: { name: "string", text: "string" },
  display_data: { data: "object", metadata: "object" },
  execute_input: { code: "string", execution_count: "number" },
  execute_result: {
    execution_count: "number",
    data: "object",
    metadata: "object",
  },
  error: { ename: "string", evalue: "string", traceback: "object" },
  status: {
    execution_state: [
      "string",
      ["starting", "idle", "busy", "restarting", "dead"],
    ],
  },
  clear_output: { wait: "boolean" },
  comm_open: { comm_id: "string", target_name: "string", data: "object" },
  comm_msg: { comm_id: "string", data: "object" },
  comm_close: { comm_id: "string" },
  shutdown_reply: { restart: "boolean" }, // Emitted by the IPython kernel.
};
function ensureIOPubContent(message: any) {
  if (message.channel !== "iopub") {
    return;
  }
  const messageType = message.header
    .msg_type as keyof typeof IOPUB_CONTENT_FIELDS;
  if (messageType in IOPUB_CONTENT_FIELDS) {
    const fields = IOPUB_CONTENT_FIELDS[messageType] as Record<string, any>;
    // Check for unknown message type.
    if (fields === undefined) {
      return;
    }
    const names = Object.keys(fields);
    const content = message.content as Record<string, any>;
    for (let i = 0; i < names.length; i++) {
      let args = fields[names[i]];
      if (!Array.isArray(args)) {
        args = [args];
      }
      const fieldName = names[i];
      if (!(fieldName in content) || typeof content[fieldName] !== args[0]) {
        // Looks like a mandatory field is missing, add the field with a default value.
        switch (args[0]) {
          case "string":
            content[fieldName] = "";
            break;
          case "boolean":
            content[fieldName] = false;
            break;
          case "object":
            content[fieldName] = {};
            break;
          case "number":
            content[fieldName] = 0;
            break;
        }
      }
    }
  }
}
function ensureFields(message: any, channel: any) {
  const header = message.header as any;
  HEADER_FIELDS.forEach((field) => {
    if (typeof header[field] !== "string") {
      header[field] = "";
    }
  });
  if (typeof message.channel !== "string") {
    message.channel = channel;
  }
  if (!message.content) {
    message.content = {};
  }
  if (!message.metadata) {
    message.metadata = {};
  }
  if (message.channel === "iopub") {
    ensureIOPubContent(message);
  }
}

export const EXTENSION_ROOT_DIR = path.join(__dirname, "..");

export function getZeroMQ(): typeof import("zeromq") {
  try {
    // const zmq: typeof import("zeromq") = require(zeromqModuleName);
    // We do not want to block the process from exiting if there are any pending messages.
    zeromq.context.blocky = false;
    return zeromq;
  } catch (e) {
    try {
      // TODO check from jupyter code
      const zmq = require(
        path.join(EXTENSION_ROOT_DIR, "node_modules", "zeromqold"),
      );
      console.info("ZMQ loaded via fallback mechanism.");
      return zmq;
    } catch (e2) {
      console.warn(
        `Exception while attempting zmq :`,
        (e as Error).message || e,
      ); // No need to display the full stack (when this fails we know why if fails, hence a stack is not useful)
      console.warn(
        `Exception while attempting zmq (fallback) :`,
        (e2 as Error).message || e2,
      ); // No need to display the full stack (when this fails we know why if fails, hence a stack is not useful)
      throw e2;
    }
  }
}
function formConnectionString(config: any, channel: string) {
  const portDelimiter = config.transport === "tcp" ? ":" : "-";
  const port = config[`${channel}_port`];
  if (!port) {
    throw new Error(`Port not found for channel "${channel}"`);
  }
  return `${config.transport}://${config.ip}${portDelimiter}${port}`;
}

export function noop() {}
let nonSerializingKernel: typeof import("@jupyterlab/services/lib/kernel/default");
export const KernelSocketMap = new Map<string, any>();

export class RawSocket {
  public onopen: (event: { target: any }) => void = noop;
  public onerror: (event: {
    error: any;
    message: string;
    type: string;
    target: any;
  }) => void = noop;
  public onclose: (event: {
    wasClean: boolean;
    code: number;
    reason: string;
    target: any;
  }) => void = noop;
  public onmessage: (event: { data: any; type: string; target: any }) => void =
    noop;
  private receiveHooks: ((data: any) => Promise<void>)[] = [];
  private sendHooks: ((
    data: any,
    cb?: (err?: Error) => void,
  ) => Promise<void>)[] = [];
  private msgChain: Promise<any> = Promise.resolve();
  private sendChain: Promise<any> = Promise.resolve();
  private channels: any;
  private closed = false;

  constructor(
    private connection: any,
    private serialize: (msg: any) => string | ArrayBuffer,
  ) {
    // Setup our ZMQ channels now
    this.channels = this.generateChannels(connection);
  }

  public dispose() {
    if (!this.closed) {
      this.close();
    }
  }

  public close(): void {
    this.closed = true;
    // When the socket is completed / disposed, close all the event
    // listeners and shutdown the socket
    const closer = (closable: { close(): void }) => {
      try {
        closable.close();
      } catch (ex) {
        console.error(`Error during socket shutdown`, ex);
      }
    };
    closer(this.channels.control);
    closer(this.channels.iopub);
    closer(this.channels.shell);
    closer(this.channels.stdin);
  }

  public emit(event: string | symbol, ...args: any[]): boolean {
    switch (event) {
      case "message":
        this.onmessage({ data: args[0], type: "message", target: this });
        break;
      case "close":
        this.onclose({ wasClean: true, code: 0, reason: "", target: this });
        break;
      case "error":
        this.onerror({
          error: "",
          message: "to do",
          type: "error",
          target: this,
        });
        break;
      case "open":
        this.onopen({ target: this });
        break;
      default:
        break;
    }
    return true;
  }
  public send(data: any, _callback: any): void {
    // This comes directly from the jupyter lab kernel. It should be a message already
    this.sendMessage(data as any, false);
  }

  public addReceiveHook(hook: (data: any) => Promise<void>): void {
    this.receiveHooks.push(hook);
  }
  public removeReceiveHook(hook: (data: any) => Promise<void>): void {
    this.receiveHooks = this.receiveHooks.filter((l) => l !== hook);
  }
  public addSendHook(
    hook: (
      data: any,
      cb?: ((err?: Error | undefined) => void) | undefined,
    ) => Promise<void>,
  ): void {
    this.sendHooks.push(hook);
  }
  public removeSendHook(
    hook: (
      data: any,
      cb?: ((err?: Error | undefined) => void) | undefined,
    ) => Promise<void>,
  ): void {
    this.sendHooks = this.sendHooks.filter((p) => p !== hook);
  }
  private generateChannel<T>(connection: any, channel: any, ctor: () => T): T {
    const result = ctor();
    // @ts-expect-error valid
    result.connect(formConnectionString(connection, channel));
    this.processSocketMessages(channel, result).catch((ex) =>
      console.error(`Failed to read messages from channel ${channel}`, ex),
    );
    return result;
  }
  private async processSocketMessages(channel: any, readable: any) {
    // eslint-disable-next-line @typescript-eslint/await-thenable
    for await (const msg of readable) {
      // Make sure to quit if we are disposed.
      if (this.closed) {
        break;
      } else {
        this.onIncomingMessage(channel, msg);
      }
    }
  }

  private generateChannels(connection: any): any {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const zmq = getZeroMQ();

    // Need a routing id for them to share.
    const routingId = randomUUID();

    // Wire up all of the different channels.
    const result: any = {
      iopub: this.generateChannel(
        connection,
        "iopub",
        () =>
          new zmq.Subscriber({
            maxMessageSize: -1,
            // If we get messages too fast and we're too slow in reading/handling the messages,
            // then Node will stop reading messages from the stream & we'll stop getting the messages.
            // See below comments on this config item:
            // The high water mark is a hard limit on the maximum number of incoming messages ØMQ
            // shall queue in memory for any single peer that the specified socket is communicating with.
            // A value of zero means no limit.
            // If this limit has been reached the socket shall enter an exceptional state and
            // depending on the socket type, ØMQ shall take appropriate action such as blocking or dropping sent messages.
            receiveHighWaterMark: 0,
          }),
      ),
      shell: this.generateChannel(
        connection,
        "shell",
        () =>
          new zmq.Dealer({
            routingId,
            sendHighWaterMark: 0,
            receiveHighWaterMark: 0,
            maxMessageSize: -1,
          }),
      ),
      control: this.generateChannel(
        connection,
        "control",
        () =>
          new zmq.Dealer({
            routingId,
            sendHighWaterMark: 0,
            receiveHighWaterMark: 0,
            maxMessageSize: -1,
          }),
      ),
      stdin: this.generateChannel(
        connection,
        "stdin",
        () =>
          new zmq.Dealer({
            routingId,
            sendHighWaterMark: 0,
            receiveHighWaterMark: 0,
            maxMessageSize: -1,
          }),
      ),
    };
    // What about hb port? Enchannel didn't use this one.

    // Make sure to subscribe to general iopub messages (this is stuff like status changes)
    result.iopub.subscribe();

    return result;
  }

  private onIncomingMessage(channel: any, data: any) {
    // Decode the message if still possible.
    const message: any = this.closed
      ? {}
      : (wireProtocol.decode(
          data,
          this.connection.key,
          this.connection.signature_scheme,
        ) as any);

    // Make sure it has a channel on it
    message.channel = channel as any;

    if (this.receiveHooks.length) {
      // Stick the receive hooks into the message chain. We use chain
      // to ensure that:
      // a) Hooks finish before we fire the event for real
      // b) Event fires
      // c) Next message happens after this one (so this side can handle the message before another event goes through)
      this.msgChain = this.msgChain
        .then(() => {
          // Hooks expect serialized data as this normally comes from a WebSocket
          const serialized = this.serialize(message);
          return Promise.all(this.receiveHooks.map((p) => p(serialized)));
        })
        .then(() => this.fireOnMessage(message, channel));
    } else {
      this.msgChain = this.msgChain.then(() =>
        this.fireOnMessage(message, channel),
      );
    }
  }

  private fireOnMessage(message: any, channel: any) {
    if (!this.closed) {
      try {
        ensureFields(message, channel);
        this.onmessage({ data: message as any, type: "message", target: this });
      } catch (ex) {
        // Swallow this error, so that other messages get processed.
        console.error(
          `Failed to handle message in Jupyter Kernel package ${JSON.stringify(message)}`,
          ex,
        );
      }
    }
  }

  private sendMessage(msg: any, bypassHooking: boolean) {
    // First encode the message.
    const data = wireProtocol.encode(
      msg as any,
      this.connection.key,
      this.connection.signature_scheme,
    );

    // Then send through our hooks, and then post to the real zmq socket
    if (!bypassHooking && this.sendHooks.length) {
      // Separate encoding for ipywidgets. It expects the same result a WebSocket would generate.
      const hookData = this.serialize(msg);

      this.sendChain = this.sendChain
        .then(() => Promise.all(this.sendHooks.map((s) => s(hookData, noop))))
        .then(async () => {
          try {
            await this.postToSocket(msg.channel, data);
          } catch (ex) {
            console.error(
              `Failed to write data to the kernel channel ${msg.channel}`,
              data,
              ex,
            );
            // No point throwing this error, as that would mean nothing else works from here on end.
            // Lets ignore this error but log it and then continue
            // Hopefully users will file bugs and we can fix this (based on the error message).
            // throw ex;
          }
        });
    } else {
      this.sendChain = this.sendChain.then(() => {
        this.postToSocket(msg.channel, data);
      });
    }
    // Ensure we don't have any unhandled exceptions (swallow exceptions as we're not awaiting on this promise).
    this.sendChain.catch(noop);
  }

  private postToSocket(channel: string, data: any) {
    const socket = (this.channels as any)[channel];
    if (socket) {
      (socket as any).send(data).catch((exc: unknown) => {
        console.error(`Error communicating with the kernel`, exc);
      });
    } else {
      console.error(
        `Attempting to send message on invalid channel: ${channel}`,
      );
    }
  }
}

// TODO: add right types
export function newRawKernel(
  kernelProcess: any,
  clientId: string,
  username: string,
  model: any,
) {
  const jupyterLab =
    require("@jupyterlab/services") as typeof import("@jupyterlab/services"); // NOSONAR
  const jupyterLabSerialize =
    require("@jupyterlab/services/lib/kernel/serialize") as typeof import("@jupyterlab/services/lib/kernel/serialize"); // NOSONAR

  // Dummy websocket we give to the underlying real kernel
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let socketInstance: any;
  class RawSocketWrapper extends RawSocket {
    constructor() {
      super(kernelProcess.connection, jupyterLabSerialize.serialize);
      socketInstance = this;
    }
  }

  // Remap the server settings for the real kernel to use our dummy websocket
  const settings = jupyterLab.ServerConnection.makeSettings({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    WebSocket: RawSocketWrapper as any, // NOSONAR
    wsUrl: "RAW",
  });

  // Then create the real kernel. We will remap its serialize/deserialize functions
  // to do nothing so that we can control serialization at our socket layer.
  if (!nonSerializingKernel) {
    // Note, this is done with a postInstall step (found in build\ci\postInstall.js). In that post install step
    // we eliminate the serialize import from the default kernel and remap it to do nothing.
    nonSerializingKernel =
      require("@jupyterlab/services/lib/kernel/default") as typeof import("@jupyterlab/services/lib/kernel/default"); // NOSONAR
  }
  const realKernel = new nonSerializingKernel.KernelConnection({
    serverSettings: settings,
    clientId,
    handleComms: true,
    username,
    model,
  });
  if (
    workspace
      .getConfiguration("jupyter")
      .get("enablePythonKernelLogging", false)
  ) {
    realKernel.anyMessage.connect((_, msg) => {
      console.trace(
        `[AnyMessage Event] [${msg.direction}] [${kernelProcess.pid}] ${JSON.stringify(msg.msg)}`,
      );
    });
  }

  KernelSocketMap.set(realKernel.id, socketInstance!);
  socketInstance!.emit("open");
  // Use this real kernel in result.
  return { realKernel, socket: socketInstance!, kernelProcess };
}
