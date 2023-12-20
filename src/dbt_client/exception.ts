import { PythonException } from "python-bridge";

export class CustomException {
  constructor(
    public name: string,
    public message: string,
    public error?: Error,
    public extra?: Record<string, string>,
  ) {}

  getErrorMessage() {
    if (this.error) {
      return this.error.stack || `${this.error.name}:${this.error.message}`;
    }
    return this.message;
  }
}

export class CustomPythonException extends CustomException {
  constructor(
    public name: string,
    message: string,
    public error: PythonException,
    public extra?: Record<string, string>,
  ) {
    super(name, message, error, extra);
    this.message = `${message} : ${error.exception.message}`;
  }
}

export class CustomUnknownException extends CustomException {
  constructor(
    public name: string,
    message: string,
    public extra: Record<string, string>,
  ) {
    super(name, message, undefined, extra);
    this.message = `${message} : ${
      typeof extra === "object" ? JSON.stringify(extra) : extra
    }`;
  }
}
