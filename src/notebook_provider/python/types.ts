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
