import { injectable, inject } from "inversify";
import { PythonEnvironment } from "./pythonEnvironment";
import {
  PythonEnvironmentProvider,
  RuntimePythonEnvironment,
} from "../dbt_integration/pythonEnvironment";

@injectable()
export class VSCodeRuntimePythonEnvironmentProvider
  implements PythonEnvironmentProvider
{
  private callbacks: ((environment: RuntimePythonEnvironment) => void)[] = [];

  constructor(
    @inject(PythonEnvironment)
    private vscodeEnvironment: PythonEnvironment,
  ) {
    // TODO: Re-implement python environment change handling
    // Need to access the VSCode extension's python environment changes
    // This would require the VSCode layer to notify this provider
  }

  getCurrentEnvironment(): RuntimePythonEnvironment {
    return {
      pythonPath: this.vscodeEnvironment.pythonPath,
      environmentVariables: this.vscodeEnvironment.environmentVariables,
    };
  }

  onEnvironmentChanged(
    callback: (environment: RuntimePythonEnvironment) => void,
  ): void {
    this.callbacks.push(callback);
  }
}

@injectable()
export class StaticRuntimePythonEnvironment
  implements RuntimePythonEnvironment
{
  constructor(
    @inject(PythonEnvironment)
    private vscodeEnvironment: PythonEnvironment,
  ) {}

  get pythonPath(): string {
    return this.vscodeEnvironment.pythonPath;
  }

  get environmentVariables() {
    return this.vscodeEnvironment.environmentVariables;
  }
}
