import { OutputChannel, StatusBarAlignment, StatusBarItem, window } from 'vscode';
import { OnSourceFileChanged, SourceFileChangedEvent } from '../manifest/sourceFileChangedEvent';
import { CommandProcessExecution } from '../utils';
import { dbtClientCommandQueue } from './dbtClientCommandQueue';

enum DBT {
	INSTALL,
	UPDATE
}

enum PromptAnswer {
	YES = "Yes",
	NO = "No"
}

interface RunCommandInfo {
	plusOperatorLeft: string,
	modelName: string,
	plusOperatorRight: string,
	cwd: string;
}

export class DBTClient implements OnSourceFileChanged {
	public pythonPath: string;
	static readonly IS_INSTALLED_VERSION = /(?<=installed\sversion:\s)(\d+.\d+.\d+)(?=\D+)/g;
	static readonly IS_LATEST_VERSION = /(?<=latest\sversion:\s)(\d+.\d+.\d+)(?=\D+)/g;
	static readonly IS_INSTALLED = /installed\sversion/g;
	public outputChannel: OutputChannel;
	private statusBar: StatusBarItem;
	private installedVersion?: string;

	constructor(pythonPath: string) {
		this.pythonPath = pythonPath;
		this.outputChannel = window.createOutputChannel('DBT');
		this.statusBar = window.createStatusBarItem(StatusBarAlignment.Left, 10);
	}

	public destroyOldDisplayItems() {
		this.statusBar.dispose();
		this.outputChannel.dispose();
	}

	public async onSourceFileChanged(event: SourceFileChangedEvent): Promise<void> {
		await this.DBTListCommandAndShow(event.projectRoot.fsPath);
	}

	public async checkIfDBTIsInstalled(): Promise<void> {
		const checkDBTInstalledProcess = this.createDBTVersionCommand();
		try {
			await checkDBTInstalledProcess.complete();
		} catch (err) {
			if (err.match(DBTClient.IS_INSTALLED)) {
				const DBTUpToDate = this.checkIfDBTIsUpToDate(err);
				if (DBTUpToDate === false) {
					await this.askForDBTUpdate();
					return;
				}
				return;
			}
			await this.askforDBTInstallation();
		}
	}

	public async DBTRunCommandAndShow(runCommandInfo: RunCommandInfo): Promise<void> {
		const runModelCommand = this.DBTRunModelCommand(runCommandInfo);
		dbtClientCommandQueue.addToQueue(() => runModelCommand.completeWithOutputChannel(this.outputChannel), "Running DBT models...");
	}

	public async DBTListCommandAndShow(cwd: string): Promise<void> {
		dbtClientCommandQueue.addToQueue(() => this.DBTListCommand(cwd).completeWithOutputChannel(this.outputChannel), "Listing DBT models...");
	}

	public showMessageInStatusBar(text: string) {
		this.statusBar.text = text;
		this.statusBar.show();
	}

	public showVersionInStatusBar() {
		this.statusBar.text = `DBT version ${this.installedVersion}`;
		this.statusBar.show();
	}

	private createDBTVersionCommand(): CommandProcessExecution {
		return new CommandProcessExecution(this.pythonPath, ["-c", this.dbtCommand("'--version'")]);
	}

	private dbtCommand(cmd: string | string[]): string {
		return `import dbt.main; dbt.main.main([${cmd}])`;
	}

	private checkIfDBTIsUpToDate(message: string): boolean {
		const installedVersionMatch = message.match(DBTClient.IS_INSTALLED_VERSION);
		if (installedVersionMatch === null) {
			throw Error(`The Regex IS_INSTALLED_VERSION ${DBTClient.IS_INSTALLED_VERSION} is not working ...`);
		}
		const installedVersion = installedVersionMatch[0];
		this.installedVersion = installedVersion;
		this.showVersionInStatusBar();

		const latestVersionMatch = message.match(DBTClient.IS_LATEST_VERSION);
		if (latestVersionMatch === null) {
			throw Error(`The Regex IS_LATEST_VERSION ${DBTClient.IS_LATEST_VERSION} is not working ...`);
		}
		const latestVersion = latestVersionMatch[0];
		return installedVersion === latestVersion;
	}

	private async askforDBTInstallation(): Promise<void> {
		const answer = await window.showErrorMessage(
			`DBT not installed in this python environment (${this.pythonPath}). Do you want to install DBT?`,
			PromptAnswer.YES,
			PromptAnswer.NO
		);
		if (answer === PromptAnswer.YES) {
			const outputChannel = window.createOutputChannel('install DBT');
			const installDBTProcess = new CommandProcessExecution(this.pythonPath, ['-m', 'pip', 'install', 'dbt']);
			await installDBTProcess.completeWithOutputChannel(outputChannel);
		}
	}

	private async askForDBTUpdate(): Promise<void> {
		const answer = await window.showErrorMessage(
			'DBT is not up to date. Do you want to update DBT?',
			PromptAnswer.YES,
			PromptAnswer.NO
		);
		if (answer === PromptAnswer.YES) {
			const outputChannel = window.createOutputChannel('update DBT');
			const updateDBTProcess = new CommandProcessExecution(this.pythonPath, ['-m', 'pip', 'update', 'dbt']);
			await updateDBTProcess.completeWithOutputChannel(outputChannel);
		}
	}

	private DBTRunModelCommand(runCommandInfo: RunCommandInfo) {
		const { plusOperatorLeft, modelName, plusOperatorRight, cwd } = runCommandInfo;
		return new CommandProcessExecution(this.pythonPath, ["-c", this.dbtCommand(["'run'", "'--model'", `"${plusOperatorLeft}"`, `"${modelName}"`, `"${plusOperatorRight}"`])], cwd);
	}

	private DBTListCommand(cwd: string): CommandProcessExecution {
		return new CommandProcessExecution(this.pythonPath, ["-c", this.dbtCommand("'list'")], cwd);
	}
}
