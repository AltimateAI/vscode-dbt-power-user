declare module "istanbul-lib-instrument" {
  interface InstrumenterOptions {
    compact?: boolean;
    preserveComments?: boolean;
    produceSourceMap?: boolean;
    autoWrap?: boolean;
    esModules?: boolean;
  }

  interface Instrumenter {
    instrumentSync(code: string, filename: string): string;
    fileCoverage: any;
  }

  export function createInstrumenter(
    options?: InstrumenterOptions,
  ): Instrumenter;
}
