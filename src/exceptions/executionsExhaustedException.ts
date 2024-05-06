export class ExecutionsExhaustedException extends Error {
  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, ExecutionsExhaustedException.prototype);
  }
}
