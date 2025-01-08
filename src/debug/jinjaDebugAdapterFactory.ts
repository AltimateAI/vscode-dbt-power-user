import { injectable, inject } from "inversify";
import {
  DebugAdapterDescriptor,
  DebugAdapterInlineImplementation,
  DebugSession,
  DebugAdapterDescriptorFactory,
} from "vscode";
import { JinjaDebugAdapter } from "./jinjaDebugAdapter";
import { ValidationProvider } from "../validation_provider";
import { DBTProjectIntegration } from "../dbt_client/dbtIntegration";
import { TYPES } from "../types";
import { provideSingleton } from "../utils";

@provideSingleton(JinjaDebugAdapterFactory)
export class JinjaDebugAdapterFactory implements DebugAdapterDescriptorFactory {
  constructor(
    @inject(ValidationProvider) private validationProvider: ValidationProvider,
    @inject(TYPES.DBTProjectIntegration)
    private dbtIntegration: DBTProjectIntegration,
  ) {}

  createDebugAdapterDescriptor(session: DebugSession): DebugAdapterDescriptor {
    this.validationProvider.throwIfNotAuthenticated();
    return new DebugAdapterInlineImplementation(
      new JinjaDebugAdapter(this.dbtIntegration),
    );
  }
}
