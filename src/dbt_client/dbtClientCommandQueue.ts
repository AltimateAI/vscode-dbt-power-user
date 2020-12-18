import { StatusBarAlignment, StatusBarItem, window } from "vscode";

type Command = () => Promise<any>;

class DBTClientCommandQueue {
    private queue: Command[] = [];
    private currentPromise: any;
    private statusBar: StatusBarItem;

    constructor() {
        this.statusBar = window.createStatusBarItem(StatusBarAlignment.Left, 10);
    }

    public addToQueue(command: Command) {
        this.queue.push(command);
        this.pickCommandToRun();
    }

    private async pickCommandToRun(): Promise<any> {
        this.statusBar.text = 'Running DBT commands';
        this.statusBar.show();
        if (this.currentPromise === undefined && this.queue.length > 0) {
            this.currentPromise = this.queue.shift()!;
            await this.currentPromise();
            this.currentPromise = undefined;
            this.pickCommandToRun();
        }
        if (this.queue.length === 0) {
            this.statusBar.hide();
        }
    }

}

export const dbtClientCommandQueue = new DBTClientCommandQueue();

