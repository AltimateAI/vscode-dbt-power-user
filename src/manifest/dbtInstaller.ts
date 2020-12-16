import { window } from 'vscode';
import { CommandProcessExecution } from '../utils';

enum DBT {
	Install,
	Update
}

enum PromptAnswer {
	Yes = "Yes",
	No = "No"
}

export class DBTClient {
	private readonly pythonPath: string;
	static readonly IS_INSTALLED_VERSION = /(?<=installed\sversion:\s)(\d+.\d+.\d+)(?=\D+)/g;
	static readonly IS_LATESTEST_VERSION = /(?<=latest\sversion:\s)(\d+.\d+.\d+)(?=\D+)/g;
	static readonly IS_INSTALLED = /installed version/g;
	static readonly IS_NOT_INSTALLED = /No module named 'dbt'/g;

	constructor(pythonPath: string) {
		this.pythonPath = pythonPath;
	}

	public async checkDBTInstalled(): Promise<void> {
		const checkDBTInstalledProcess = this.checkDBTInstalledCommand();
		try {
			await checkDBTInstalledProcess.complete();
		} catch (err) {
			if (err.match(DBTClient.IS_NOT_INSTALLED)) {
				await this.tryToOperate(DBT.Install);
			}

			if (err.match(DBTClient.IS_INSTALLED)) {
				const DBTUpToDate = this.checkDBTUpToDate(err);
				if (DBTUpToDate === false) {
					await this.tryToOperate(DBT.Update);
				}
			}
		}
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
		const latestVersionMatch = message.match(DBTClient.IS_LATESTEST_VERSION);
		if (latestVersionMatch === null) {
			return;
		}
		const latestVersion = latestVersionMatch[0];
		if (installedVersion === latestVersion) {
			return true;
		}
		return false;
	}

	public async tryToOperate(action: DBT): Promise<void> {
		const answer = await this.showPrompt(action);
		if (answer === PromptAnswer.Yes) {
			await this.operateDBT(action)
		}
	}

	private async showPrompt(action: DBT): Promise<string | undefined> {
		if (action === DBT.Install) {
			return await window.showErrorMessage(
				'DBT not found in this python environment. Install DBT?',
				PromptAnswer.Yes,
				PromptAnswer.No
			);
		}
		if (action === DBT.Update) {
			return await window.showErrorMessage(
				'DBT is not up to date. Update DBT?',
				PromptAnswer.Yes,
				PromptAnswer.No
			);
		}
	}

	private async operateDBT(action: DBT): Promise<void> {
		if (action === DBT.Install) {
			const outputChannel = window.createOutputChannel('install DBT');
			const installDBTProcess = new CommandProcessExecution(this.pythonPath, ['-m', 'pip', 'install', 'dbt'])
			return installDBTProcess.completeWithOutputChannel(outputChannel)
		}
		if (action === DBT.Update) {
			const outputChannel = window.createOutputChannel('update DBT');
			const updateDBTProcess = new CommandProcessExecution(this.pythonPath, ['-m', 'pip', 'update', 'dbt'])
			return updateDBTProcess.completeWithOutputChannel(outputChannel)
		}

	}
}
