export interface PythonEnvironmentChangedEvent {
  pythonPath: string;
  environmentVariables:  {
    [key: string]: string | undefined;
};
}
