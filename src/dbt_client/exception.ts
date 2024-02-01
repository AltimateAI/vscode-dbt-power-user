import { PythonException } from "python-bridge";

export abstract class CustomException {
  constructor(
    public name: string,
    public error?: Error | unknown,
  ) {}

  abstract getMessage(): string;
}

export class CustomPythonException extends CustomException {
  constructor(
    public name: string,
    public error: PythonException,
  ) {
    super(name, error);
  }

  getMessage(): string {
    return this.error.exception.message;
  }
}

export class CustomUnknownException extends CustomException {
  constructor(
    public name: string,
    public error: unknown,
  ) {
    super(name, error);
  }

  getMessage(): string {
    if (this.error && this.error instanceof Error) {
      return this.error.message;
    }
    return `${this.error}`;
  }
}
