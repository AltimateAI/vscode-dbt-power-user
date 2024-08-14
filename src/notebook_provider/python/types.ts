import { KernelConnection } from "@jupyterlab/services";
import { Deferred } from "../async";

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
