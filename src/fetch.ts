const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

export default fetch;

export class AbortError extends Error {
  type: string;
  name: "AbortError";
  [Symbol.toStringTag]: "AbortError";
}
