import { EventEmitter } from "vscode";
import { provideSingleton } from "../utils";
import { SharedStateEventEmitterProps } from "../webview_provider/altimateWebviewProvider";

@provideSingleton(SharedStateService)
export class SharedStateService {
  public eventEmitter;

  public constructor() {
    this.eventEmitter = new EventEmitter<SharedStateEventEmitterProps>();
  }

  public fire(data: SharedStateEventEmitterProps) {
    this.eventEmitter.fire(data);
  }
}
