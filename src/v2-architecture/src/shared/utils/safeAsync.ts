import type { ResponseError } from "@/api";

interface SuccessReturn<TData> {
  ok: true;
  data: TData;
}
interface ErrorReturn<TError> {
  ok: false;
  error: TError;
}

type SafeAsyncReturn<TData, TError> = Promise<
  SuccessReturn<TData> | ErrorReturn<TError>
>;

async function safeAsync<TData = unknown, TError = ResponseError>(
  fn: () => Promise<TData>
): Promise<SafeAsyncReturn<TData, TError>> {
  try {
    const successReturn = await fn();
    return { data: successReturn, ok: true };
  } catch (err) {
    return { error: err as TError, ok: false };
  }
}

export default safeAsync;
