export class RateLimitException extends Error {
  public retryAfter: number;
  constructor(msg: string, retryAfter: number) {
    super(msg);

    this.retryAfter = retryAfter;
    Object.setPrototypeOf(this, RateLimitException.prototype);
  }
}
