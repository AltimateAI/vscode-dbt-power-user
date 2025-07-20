export class NoCredentialsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NoCredentialsError";
  }
}
