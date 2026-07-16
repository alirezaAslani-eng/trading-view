export function isAbortedError(error: unknown): error is DOMException {
  return error instanceof DOMException && error.name === "AbortError";
}
