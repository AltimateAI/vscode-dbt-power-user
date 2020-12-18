import { SourceFileChangedEvent } from "../manifest/sourceFileChangedEvent";
import { getPythonPathFromExtention } from "../utils";
import { dbtClient } from "./dbtClient";

export class DBTClientFactory {
    static async createDBTClient() {
        const { pythonPath, onDidChangeExecutionDetails } = await getPythonPathFromExtention();
        onDidChangeExecutionDetails(async () => {
            const { pythonPath } = await getPythonPathFromExtention();
            await DBTClientFactory.setDBTClient(pythonPath);
        });
        await DBTClientFactory.setDBTClient(pythonPath);
    }

    static setDBTClient(pythonPath: string): Promise<void> {
        dbtClient.pythonPath = pythonPath;
        return dbtClient.checkDBTInstalled();
    }

    static passEventToDBTClient(event: SourceFileChangedEvent) {
        dbtClient.onSourceFileChanged(event);
    }
}