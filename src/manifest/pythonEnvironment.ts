import { extensions, Event, Uri, workspace } from "vscode";
import { provideSingleton } from "../utils";

interface PythonExecutionDetails {
  getPythonPath: () => string;
  onDidChangeExecutionDetails: Event<Uri | undefined>;
  getEnvVars: () => {
    [key: string]: string | undefined;
  };
}

@provideSingleton(PythonEnvironment)
export class PythonEnvironment {
  private executionDetails?: PythonExecutionDetails;

  async getEnvironment(): Promise<PythonExecutionDetails> {
    if (this.executionDetails !== undefined) {
      return this.executionDetails;
    }

    return await this.activatePythonExtension();
  }

  private parseEnvVarsFromUserSettings = (vsCodeEnv: { [k: string]: string }, regexVsCodeEnv: RegExp) => {
    // TODO: add any other relevant variables, maybe workspacefolder?
    return Object.keys(vsCodeEnv).reduce((prev: { [k: string]: string }, key: string) => {
      const value = vsCodeEnv[key];
      let matchResult;
      while ((matchResult = regexVsCodeEnv.exec(value)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (matchResult.index === regexVsCodeEnv.lastIndex) {
          regexVsCodeEnv.lastIndex++;
        }
        if (process.env[matchResult[1]] !== undefined) {
          prev[key] = prev[key].replace(new RegExp(`\\\$\\\{env\\\:${matchResult[1]}\\\}`, "gm"), process.env[matchResult[1]]!);
        }
      }
      return prev;
    }, vsCodeEnv);
  };

  private async activatePythonExtension(): Promise<PythonExecutionDetails> {
    const extension = extensions.getExtension("ms-python.python")!;

    if (!extension.isActive) {
      await extension.activate();
    }
    await extension.exports.ready;

    const api = extension.exports;    

    return (this.executionDetails = {
      getPythonPath: () => api.settings.getExecutionDetails(workspace.workspaceFile).execCommand[0],
      onDidChangeExecutionDetails: api.settings.onDidChangeExecutionDetails,
      getEnvVars: () => {
        try {
          if (api.environment) {
            return api.environments.getEnvironmentVariables(workspace.workspaceFolders![0]);
          }
        } catch(e) {
          console.error("Could not call environment api, maybe python version is outdated", e);
        }
        
        // fallback for users that set python path by themselves (Meltano), we better get rid of this as it will be always a source of complaint
        const configText = workspace.getConfiguration();
        const config = JSON.parse(JSON.stringify(configText));
        let envVars = {};
        if (config.terminal !== undefined && config.terminal.integrated !== undefined && config.terminal.integrated.env !== undefined) {
          const env = config.terminal.integrated.env;
          // parse vs code environment variables
          const regexVsCodeEnv = /\$\{env\:(.*?)\}/gm;
          for (let prop in env) {
            const vsCodeEnv = env[prop];
            envVars = {
              ...process.env,
              ...envVars,
              ...this.parseEnvVarsFromUserSettings(vsCodeEnv, regexVsCodeEnv)
            };
          }
        }
        return envVars;
      }
    });
  }
}
