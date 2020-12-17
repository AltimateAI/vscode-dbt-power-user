import { StatusBarAlignment, StatusBarItem, window } from 'vscode';
import { OnSourceFileChanged, SourceFileChangedEvent } from '../manifest/sourceFileChangedEvent';
import { CommandProcessExecution } from '../utils';

enum DBT {
	Install,
	Update
}

enum PromptAnswer {
	Yes = "Yes",
	No = "No"
}

class DBTClient implements OnSourceFileChanged {
	public pythonPath!: string;
	static readonly IS_INSTALLED_VERSION = /(?<=installed\sversion:\s)(\d+.\d+.\d+)(?=\D+)/g;
	static readonly IS_LATEST_VERSION = /(?<=latest\sversion:\s)(\d+.\d+.\d+)(?=\D+)/g;
	static readonly IS_INSTALLED = /installed\sversion/g;
	private statusBar?: StatusBarItem;

	async onSourceFileChanged (event: SourceFileChangedEvent): Promise<void> {
		await this.DBTListCommandAndShowOutput(event.projectRoot.path);
	}

	public async checkDBTInstalled(): Promise<void> {
		const checkDBTInstalledProcess = this.checkDBTInstalledCommand();
		try {
			await checkDBTInstalledProcess.complete();
		} catch (err) {
			if (err.match(DBTClient.IS_INSTALLED)) {
				const DBTUpToDate = this.checkDBTUpToDate(err);
				if (DBTUpToDate === false) {
					await this.tryToOperate(DBT.Update);
					return;
				}
				return;
			}
			await this.tryToOperate(DBT.Install);
		}
	}

	private DBTListCommand(cwd: string): CommandProcessExecution {
		return new CommandProcessExecution(this.pythonPath, ["-c", "import dbt.main; dbt.main.main(['list'])"], cwd);
	}

	public async DBTListCommandAndShowOutput(cwd: string): Promise<void> {
		const listcommandProcess = this.DBTListCommand(cwd);
		const output = await listcommandProcess.complete();
		if (this.statusBar == undefined) {
			this.statusBar = window.createStatusBarItem(StatusBarAlignment.Left, 10);
		}
		this.statusBar.text = 'DBT list';
		this.statusBar.tooltip = output; // TODO think about what the output should be
		this.statusBar.show();
	}

	private checkDBTInstalledCommand(): CommandProcessExecution {
		return new CommandProcessExecution(this.pythonPath, ["-c", "import dbt.main; dbt.main.main(['--version'])"]);
	}

	private checkDBTUpToDate(message: string): boolean | undefined {
		const installedVersionMatch = message.match(DBTClient.IS_INSTALLED_VERSION);
		if (installedVersionMatch === null) {
			return;
		}
		const installedVersion = installedVersionMatch[0];
		const latestVersionMatch = message.match(DBTClient.IS_LATEST_VERSION);
		if (latestVersionMatch === null) {
			return;
		}
		const latestVersion = latestVersionMatch[0];
		if (installedVersion === latestVersion) {
			return true;
		}
		return false;
	}

	private async tryToOperate(action: DBT): Promise<void> {
		const answer = await this.showPrompt(action);
		if (answer === PromptAnswer.Yes) {
			await this.operateDBT(action);
		}
	}

	private async showPrompt(action: DBT): Promise<string | undefined> {
		if (action === DBT.Install) {
			return window.showErrorMessage(
				`DBT not found in this python environment (${this.pythonPath}). Install DBT?`,
				PromptAnswer.Yes,
				PromptAnswer.No
			);
		}
		if (action === DBT.Update) {
			return window.showErrorMessage(
				'DBT is not up to date. Update DBT?',
				PromptAnswer.Yes,
				PromptAnswer.No
			);
		}
	}

	private async operateDBT(action: DBT): Promise<void> {
		if (action === DBT.Install) {
			const outputChannel = window.createOutputChannel('install DBT');
			const installDBTProcess = new CommandProcessExecution(this.pythonPath, ['-m', 'pip', 'install', 'dbt']);
			return installDBTProcess.completeWithOutputChannel(outputChannel);
		}
		if (action === DBT.Update) {
			const outputChannel = window.createOutputChannel('update DBT');
			const updateDBTProcess = new CommandProcessExecution(this.pythonPath, ['-m', 'pip', 'update', 'dbt']);
			return updateDBTProcess.completeWithOutputChannel(outputChannel);
		}

	}
}

export const dbtClient = new DBTClient();
