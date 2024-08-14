import type * as nbformat from "@jupyterlab/nbformat";
import {
  NotebookRendererMessaging,
  Disposable,
  notebooks,
  NotebookEditor,
  NotebookDocument,
} from "vscode";
import { DBTTerminal } from "../../dbt_client/dbtTerminal";
import { TelemetryService } from "../../telemetry";
import { provideSingleton } from "../../utils";
import { TelemetryEvents } from "../../telemetry/events";
import { noop, WIDGET_MIMETYPE } from "./constants";
import { SemVer } from "semver";
import { ClientMapper } from "../clientMapper";
import { WidgetData } from "./types";
import { KernelConnection } from "@jupyterlab/services";

type QueryWidgetStateCommand = {
  command: "query-widget-state";
  model_id: string;
};

@provideSingleton(RendererMessageHandler)
export class RendererMessageHandler implements Disposable {
  private messageChannel: NotebookRendererMessaging;
  private disposables: Disposable[] = [];
  private readonly widgetOutputsPerNotebook = new WeakMap<
    NotebookDocument,
    Set<string>
  >();

  constructor(
    private clientMapper: ClientMapper,
    private readonly dbtTerminal: DBTTerminal,
    private readonly telemetry: TelemetryService,
  ) {
    this.messageChannel = notebooks.createRendererMessaging(
      "datapilot-notebook-jupyter-renderer",
    );

    this.messageChannel.onDidReceiveMessage(({ editor, message }) => {
      if (
        message &&
        typeof message === "object" &&
        message.command === "query-widget-state"
      ) {
        return this.queryWidgetState(this.messageChannel, editor, message);
      }
      if (
        message &&
        typeof message === "object" &&
        message.command === "ipywidget-renderer-loaded"
      ) {
        return this.sendWidgetVersionAndState(this.messageChannel, editor);
      }
    });
  }

  public hookupKernel(kernel: KernelConnection, notebook: NotebookDocument) {
    kernel.iopubMessage.connect((slot, msg) => this.handler(msg, notebook));
    this.disposables.push(
      new Disposable(() =>
        kernel.iopubMessage.disconnect((slot, msg) =>
          this.handler(msg, notebook),
        ),
      ),
    );
  }

  private handler(msg: any, notebook: NotebookDocument) {
    const jupyterLab =
      require("@jupyterlab/services") as typeof import("@jupyterlab/services");

    if (
      jupyterLab.KernelMessage.isDisplayDataMsg(msg) ||
      jupyterLab.KernelMessage.isUpdateDisplayDataMsg(msg) ||
      jupyterLab.KernelMessage.isExecuteReplyMsg(msg) ||
      jupyterLab.KernelMessage.isExecuteResultMsg(msg)
    ) {
      // @ts-expect-error - need to update the type
      this.trackModelId(notebook, msg);
    }
  }

  private trackModelId(
    notebook: NotebookDocument,
    msg: {
      content: {
        data: nbformat.IMimeBundle;
      };
    },
  ) {
    const output = msg.content;
    if (
      output.data &&
      typeof output.data === "object" &&
      WIDGET_MIMETYPE in output.data
    ) {
      const widgetData = output.data[WIDGET_MIMETYPE] as WidgetData;
      if (widgetData && "model_id" in widgetData) {
        const set =
          this.widgetOutputsPerNotebook.get(notebook) || new Set<string>();
        set.add(widgetData.model_id);
        this.widgetOutputsPerNotebook.set(notebook, set);
      }
    }
  }

  private queryWidgetState(
    comms: NotebookRendererMessaging,
    editor: NotebookEditor,
    message: QueryWidgetStateCommand,
  ) {
    const availableModels = this.widgetOutputsPerNotebook.get(editor.notebook);
    const kernelSelected = true;
    const hasWidgetState = !!availableModels?.has(message.model_id);
    comms
      .postMessage(
        {
          command: "query-widget-state",
          model_id: message.model_id,
          hasWidgetState,
          kernelSelected,
        },
        editor,
      )
      .then(noop, noop);
  }

  private async sendWidgetVersionAndState(
    comms: NotebookRendererMessaging,
    editor: NotebookEditor,
  ) {
    try {
      const client = await this.clientMapper.getNotebookClient(
        editor.notebook.uri,
      );

      const dependencyVersions = client.jupyterPackagesVersions;
      if (!dependencyVersions) {
        throw new Error("Dependency versions not found");
      }
      const version = new SemVer(dependencyVersions.ipywidgets).major;
      const kernelSelected = true;
      comms
        .postMessage(
          {
            command: "ipywidget-renderer-init",
            version,
            widgetState: undefined,
            kernelSelected,
          },
          editor,
        )
        .then(noop, noop);
    } catch (error) {
      this.dbtTerminal.error(
        TelemetryEvents["Notebook/WidgetVersionError"],
        (error as Error).message,
        error,
      );
    }
  }

  public onNotebookClosed(notebook: NotebookDocument) {
    this.widgetOutputsPerNotebook.delete(notebook);
  }
  dispose() {
    this.disposables.forEach((d) => d.dispose());
  }
}
