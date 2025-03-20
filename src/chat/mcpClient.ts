import {
  Client,
  ClientOptions,
} from "@modelcontextprotocol/sdk/client/index.js";
import {
  CreateMessageRequestSchema,
  Implementation,
  ListRootsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";

export class MCPClient extends Client {
  protected _name: string;
  protected _command: string;
  protected _enabled: boolean;

  constructor(
    info: Implementation & { command: string; enabled: boolean },
    options: ClientOptions,
  ) {
    super(info, options);
    this._name = info.name;
    this._command = info.command as string;
    this._enabled = info.enabled;
  }

  public get name() {
    return this._name;
  }
  public set name(name: string) {
    this._name = name;
  }
  public get command() {
    return this._command;
  }
  public set command(command: string) {
    this._command = command;
  }
  public get enabled() {
    return this._enabled;
  }
  public set enabled(enabled: boolean) {
    this._enabled = enabled;
  }
}
