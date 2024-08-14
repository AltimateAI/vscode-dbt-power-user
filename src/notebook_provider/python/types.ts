import type * as nbformat from "@jupyterlab/nbformat";
import { KernelConnection } from "@jupyterlab/services";
import { Deferred } from "./async";

export interface ConnectionSettings {
  control_port: number;
  hb_port: number;
  iopub_port: number;
  ip: string;
  key: string;
  kernel_name: string;
  shell_port: number;
  signature_scheme: string;
  stdin_port: number;
  transport: string;
}

export interface PendingMessage {
  resultPromise: Deferred<void>;
  startTime: number;
}

export interface RawKernelType {
  realKernel: KernelConnection;
  socket: any;
  kernelProcess: {
    connection: ConnectionSettings;
    pid: number;
  };
}

/**
 * Metadata we store in VS Code cell output items.
 * This contains the original metadata from the Jupyuter Outputs.
 */
export interface CellOutputMetadata {
  /**
   * Cell output metadata.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata?: any;
  /**
   * Transient data from Jupyter.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transient?: {
    /**
     * This is used for updating the output in other cells.
     * We don't know of others properties, but this is definitely used.
     */
    display_id?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  };
  /**
   * Original cell output type
   */
  outputType: nbformat.OutputType | string;
  executionCount?: nbformat.IExecuteResult["ExecutionCount"];
  /**
   * Whether the original Mime data is JSON or not.
   * This properly only exists in metadata for NotebookCellOutputItems
   * (this is something we have added)
   */
  __isJson?: boolean;
  /**
   * Whether to display the open plot icon.
   */
  __displayOpenPlotIcon?: boolean;
}
