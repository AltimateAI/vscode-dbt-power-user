import { OutputChannel, window } from "vscode";
import { provideSingleton, stripANSI } from "../utils";

@provideSingleton(DiagnosticsOutputChannel)
export class DiagnosticsOutputChannel {
  private outputChannel: OutputChannel;

  constructor() {
    this.outputChannel = window.createOutputChannel(
      "dbt Power User - Diagnostics",
      "log",
    );
  }

  show(): void {
    this.outputChannel.show(true);
  }

  log(message: string): void {
    this.outputChannel.appendLine(stripANSI(message));
  }

  logNewLine(): void {
    this.outputChannel.appendLine("");
  }

  logLine(line: string): void {
    this.outputChannel.appendLine(stripANSI(line));
  }

  logHorizontalRule(): void {
    this.outputChannel.appendLine(
      "--------------------------------------------------------------------------",
    );
  }

  logBlock(block: string[]): void {
    this.logHorizontalRule();
    for (const line of block) {
      if (line) {
        this.logLine(line);
      }
    }
    this.logHorizontalRule();
  }

  logBlockWithHeader(header: string[], block: string[]): void {
    this.logHorizontalRule();
    for (const line of header) {
      this.logLine(line);
    }
    this.logHorizontalRule();
    for (const line of block) {
      this.logLine(line);
    }
    this.logHorizontalRule();
  }

  dispose(): void {
    this.outputChannel.dispose();
  }
}
