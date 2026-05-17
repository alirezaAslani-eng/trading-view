import { SafeAsyncReturn } from "./types";

async function safeAsync<TData = unknown, TError = unknown>(
  fn: () => Promise<TData>,
): Promise<SafeAsyncReturn<TData, TError>> {
  try {
    const successReturn = await fn();
    return { data: successReturn, ok: true };
  } catch (err) {
    return { error: err as TError, ok: false };
  }
}

export default safeAsync;
