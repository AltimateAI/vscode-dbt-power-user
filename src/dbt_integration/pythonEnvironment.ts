import { EnvironmentVariables } from "./domain";

export interface RuntimePythonEnvironment {
  readonly pythonPath: string;
  readonly environmentVariables: EnvironmentVariables;
}

export interface PythonEnvironmentProvider {
  getCurrentEnvironment(): RuntimePythonEnvironment;
  onEnvironmentChanged(
    callback: (environment: RuntimePythonEnvironment) => void,
  ): void;
}
