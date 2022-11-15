import { EnvironmentVariables } from "../domain";

export interface PythonEnvironmentChangedEvent {
  pythonPath: string;
  environmentVariables: EnvironmentVariables;
}
