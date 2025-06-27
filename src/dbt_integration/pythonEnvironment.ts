import { Disposable, Event, Uri } from "vscode";
import { EnvironmentVariables } from "./domain";

export interface PythonEnvironment extends Disposable {
  readonly allPythonPaths: { path: string; pathType: string }[];
  readonly isPython3: boolean;
  readonly pythonPath: string;
  readonly environmentVariables: EnvironmentVariables;
  readonly onPythonEnvironmentChanged: Event<Uri | undefined>;

  initialize(): Promise<void>;
  printEnvVars(): Promise<void>;
  getResolvedConfigValue(key: string): string;
}
