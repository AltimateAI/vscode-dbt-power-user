import type { Data as WebSocketData } from "ws";
import { randomUUID } from "crypto";
import { Event, EventEmitter } from "vscode";
import { ConnectionSettings, PendingMessage, RawKernelType } from "./types";
import { createDeferred } from "./async";
import { KernelMessage } from "@jupyterlab/services";
import { shouldMessageBeMirroredWithRenderer } from "./helpers";
import { deserialize } from "@jupyterlab/services/lib/kernel/serialize";
import { Identifiers, WIDGET_MIMETYPE } from "./constants";
import { serializeDataViews } from "./serializers";
import { IPyWidgetMessage } from "./notebookKernelClient";
import { RawSocket } from "./rawSocket";

let nonSerializingKernel: typeof import("@jupyterlab/services/lib/kernel/default");

export class RawKernel {
  private isUsingIPyWidgets = false;
  private outputWidgetIds = new Set<string>();
  private waitingMessageIds = new Map<string, PendingMessage>();
  private kernel?: RawKernelType;
  public get postMessage(): Event<IPyWidgetMessage> {
    return this._postMessageEmitter.event;
  }

  private _postMessageEmitter = new EventEmitter<IPyWidgetMessage>();

  constructor(
    kernelProcess: {
      connection: ConnectionSettings;
      pid: number;
    },
    clientId: string,
    username: string,
    model: any,
  ) {
    this.kernel = this.initializeKernel(
      kernelProcess,
      clientId,
      username,
      model,
    );
  }

  public get rawKernel() {
    return this.kernel;
  }

  initializeKernel(
    kernelProcess: RawKernelType["kernelProcess"],
    clientId: string,
    username: string,
    model: any,
  ): RawKernelType {
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
        require("@jupyterlab/services/lib/kernel/nonSerializingKernel") as typeof import("@jupyterlab/services/lib/kernel/default"); // NOSONAR
    }
    const realKernel = new nonSerializingKernel.KernelConnection({
      serverSettings: settings,
      clientId,
      handleComms: true,
      username,
      model,
    });

    if (socketInstance) {
      socketInstance.emit("open");
      socketInstance.addReceiveHook(this.onKernelSocketMessage.bind(this));
      socketInstance.addSendHook(this.mirrorSend.bind(this));
    }
    // Use this real kernel in result.
    return { realKernel, socket: socketInstance!, kernelProcess };
  }

  private async mirrorSend(
    data: any,
    _cb?: (err?: Error) => void,
  ): Promise<void> {
    // If this is shell control message, mirror to the other side. This is how
    // we get the kernel in the UI to have the same set of futures we have on this side
    if (
      typeof data === "string" &&
      data.includes("shell") &&
      data.includes("execute_request")
    ) {
      const msg = deserialize(data) as KernelMessage.IExecuteRequestMsg;
      if (
        msg.channel === "shell" &&
        msg.header.msg_type === "execute_request"
      ) {
        if (!shouldMessageBeMirroredWithRenderer(msg)) {
          return;
        }
        const promise = this.mirrorExecuteRequest(
          msg as KernelMessage.IExecuteRequestMsg,
        ); // NOSONAR
        // If there are no ipywidgets thusfar in the notebook, then no need to synchronize messages.
        if (this.isUsingIPyWidgets) {
          await promise;
        }
      }
    }
  }

  private raisePostMessage(type: string, payload: unknown) {
    this._postMessageEmitter.fire({ payload, type });
  }

  private mirrorExecuteRequest(msg: KernelMessage.IExecuteRequestMsg) {
    const promise = createDeferred<void>();
    this.waitingMessageIds.set(msg.header.msg_id, {
      startTime: Date.now(),
      resultPromise: promise,
    });
    this.raisePostMessage("IPyWidgets_mirror_execute", {
      id: msg.header.msg_id,
      msg,
    });
    return promise.promise;
  }

  private async onKernelSocketMessage(data: WebSocketData): Promise<void> {
    // Hooks expect serialized data as this normally comes from a WebSocket
    const msgUuid = randomUUID();
    const promise = createDeferred<void>();
    this.waitingMessageIds.set(msgUuid, {
      startTime: Date.now(),
      resultPromise: promise,
    });

    if (typeof data === "string") {
      if (shouldMessageBeMirroredWithRenderer(data)) {
        this.raisePostMessage("IPyWidgets_msg", {
          id: msgUuid,
          data,
        });
      }
    } else {
      this.raisePostMessage("IPyWidgets_binary_msg", {
        id: msgUuid,
        data: serializeDataViews([data as any]),
      });
    }

    // Lets deserialize only if we know we have a potential case
    // where this message contains some data we're interested in.
    const mustDeserialize =
      typeof data !== "string" ||
      data.includes(WIDGET_MIMETYPE) ||
      data.includes(Identifiers.DefaultCommTarget) ||
      data.includes("comm_open") ||
      data.includes("comm_close") ||
      data.includes("comm_msg");
    if (mustDeserialize) {
      const message = deserialize(data as any) as any;
      if (!shouldMessageBeMirroredWithRenderer(message)) {
        return;
      }

      // Check for hints that would indicate whether ipywidgest are used in outputs.
      if (
        message &&
        message.content &&
        message.content.data &&
        (message.content.data[WIDGET_MIMETYPE] ||
          message.content.target_name === Identifiers.DefaultCommTarget)
      ) {
        this.isUsingIPyWidgets = true;
      }

      const isIPYWidgetOutputModelOpen =
        message.header?.msg_type === "comm_open" &&
        message.content?.data?.state?._model_module ===
          "@jupyter-widgets/output" &&
        message.content?.data?.state?._model_name === "OutputModel";
      const isIPYWidgetOutputModelClose =
        message.header?.msg_type === "comm_close" &&
        this.outputWidgetIds.has(message.content?.comm_id);

      if (isIPYWidgetOutputModelOpen) {
        this.outputWidgetIds.add(message.content.comm_id);
      } else if (isIPYWidgetOutputModelClose) {
        this.outputWidgetIds.delete(message.content.comm_id);
      }
    }
  }

  onKernelSocketResponse(payload: { id: string }) {
    const pending = this.waitingMessageIds.get(payload.id);
    if (pending) {
      this.waitingMessageIds.delete(payload.id);
      pending.resultPromise.resolve();
    }
  }
}
