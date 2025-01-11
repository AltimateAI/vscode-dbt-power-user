export interface VSCodeCommand {
  command: string;
  execute(...args: any[]): Promise<void>;
}
