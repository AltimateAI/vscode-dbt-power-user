export interface Deferred<T> {
  readonly promise: Promise<T>;
  readonly resolved: boolean;
  readonly rejected: boolean;
  readonly completed: boolean;
  readonly value?: T;
  resolve(value?: T | PromiseLike<T>): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reject(reason?: any): void;
}

class DeferredImpl<T> implements Deferred<T> {
  private _resolve!: (value: T | PromiseLike<T>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _reject!: (reason?: any) => void;
  private _resolved: boolean = false;
  private _rejected: boolean = false;
  private _promise: Promise<T>;
  private _value: T | undefined;
  public get value() {
    return this._value;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private scope: any = null) {
    // eslint-disable-next-line
        this._promise = new Promise<T>((res, rej) => {
      this._resolve = res;
      this._reject = rej;
    });
  }
  public resolve(value?: T | PromiseLike<T>) {
    this._value = value as T | undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this._resolve.apply(this.scope ? this.scope : this, arguments as any);
    this._resolved = true;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public reject(_reason?: any) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this._reject.apply(this.scope ? this.scope : this, arguments as any);
    this._rejected = true;
  }
  get promise(): Promise<T> {
    return this._promise;
  }
  get resolved(): boolean {
    return this._resolved;
  }
  get rejected(): boolean {
    return this._rejected;
  }
  get completed(): boolean {
    return this._rejected || this._resolved;
  }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createDeferred<T>(scope: any = null): Deferred<T> {
  return new DeferredImpl<T>(scope);
}
