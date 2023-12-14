// @ts-nocheck

// Since we are using node-fetch in commonjs for testing, we have to dynamically import the library
// https://github.com/node-fetch/node-fetch/blob/HEAD/docs/v3-UPGRADE-GUIDE.md#converted-to-es-module
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

export default fetch;

export class AbortError extends Error {
  type: string;
  name: "AbortError";
  [Symbol.toStringTag]: "AbortError";
}
