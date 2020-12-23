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

	public async onSourceFileChanged(event: SourceFileChangedEvent): Promise<void> {
		await this.DBTListCommandAndShow(event.projectRoot.fsPath);
	}

	public async checkDBTInstalled(): Promise<void> {
		const checkDBTInstalledProcess = this.checkDBTInstalledCommand();
		try {
			await checkDBTInstalledProcess.complete();
		} catch (err) {
			if (err.match(DBTClient.IS_INSTALLED)) {
				const DBTUpToDate = this.checkDBTUpToDate(err);
				if (DBTUpToDate === false) {
					await this.tryToOperate(DBT.UPDATE);
					return;
				}
				return;
			}
			await this.tryToOperate(DBT.INSTALL);
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

	private checkDBTInstalledCommand(): CommandProcessExecution {
		return new CommandProcessExecution(this.pythonPath, ["-c", this.dbtCommand("'--version'")]);
	}

	private dbtCommand(cmd: string | string[]): string {
		return `import dbt.main; dbt.main.main([${cmd}])`;
	}

	private checkDBTUpToDate(message: string): boolean {
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

	private async tryToOperate(action: DBT): Promise<void> {
		const answer = await this.showPrompt(action);
		if (answer === PromptAnswer.YES) {
			await this.operateDBT(action);
		}
	}

	private async showPrompt(action: DBT): Promise<string | undefined> {
		if (action === DBT.INSTALL) {
			return window.showErrorMessage(
				`DBT not installed in this python environment (${this.pythonPath}). Do you want to install DBT?`,
				PromptAnswer.YES,
				PromptAnswer.NO
			);
		}
		if (action === DBT.UPDATE) {
			return window.showErrorMessage(
				'DBT is not up to date. Do you want to update DBT?',
				PromptAnswer.YES,
				PromptAnswer.NO
			);
		}
	}

	private DBTRunModelCommand(runCommandInfo: RunCommandInfo) {
		const { plusOperatorLeft, modelName, plusOperatorRight, cwd } = runCommandInfo;
		return new CommandProcessExecution(this.pythonPath, ["-c", this.dbtCommand(["'run'", "'--model'", `"${plusOperatorLeft}"`, `"${modelName}"`, `"${plusOperatorRight}"`])], cwd);
	}

	private DBTListCommand(cwd: string): CommandProcessExecution {
		return new CommandProcessExecution(this.pythonPath, ["-c", this.dbtCommand("'list'")], cwd);
	}

	private async operateDBT(action: DBT): Promise<void> {
		if (action === DBT.INSTALL) {
			const outputChannel = window.createOutputChannel('install DBT');
			const installDBTProcess = new CommandProcessExecution(this.pythonPath, ['-m', 'pip', 'install', 'dbt']);
			return installDBTProcess.completeWithOutputChannel(outputChannel);
		}
		if (action === DBT.UPDATE) {
			const outputChannel = window.createOutputChannel('update DBT');
			const updateDBTProcess = new CommandProcessExecution(this.pythonPath, ['-m', 'pip', 'update', 'dbt']);
			return updateDBTProcess.completeWithOutputChannel(outputChannel);
		}

	}
}
