import { EventEmitter } from "vscode";
import { SharedStateEventEmitterProps } from "../webview_provider/altimateWebviewProvider";

export class SharedStateService {
  public eventEmitter;

  public constructor() {
    this.eventEmitter = new EventEmitter<SharedStateEventEmitterProps>();
  }

  public fire(data: SharedStateEventEmitterProps) {
    this.eventEmitter.fire(data);
  }
}
