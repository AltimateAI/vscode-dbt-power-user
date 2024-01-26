import { EventEmitter } from "vscode";
import { provideSingleton } from "../utils";

@provideSingleton(EventEmitterService)
export class EventEmitterService {
  public eventEmitter;

  public constructor() {
    this.eventEmitter = new EventEmitter();
  }

  public fire(data: any) {
    this.eventEmitter.fire(data);
  }
}
