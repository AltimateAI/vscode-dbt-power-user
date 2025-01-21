import { MockEventEmitter } from "../test/common";
import { EventEmitter } from "vscode";

export class EventEmitterFactory {
  static create<T>(): EventEmitter<T> | MockEventEmitter<T> {
    return process.env.NODE_ENV === "test"
      ? new MockEventEmitter<T>()
      : new EventEmitter<T>();
  }
}
