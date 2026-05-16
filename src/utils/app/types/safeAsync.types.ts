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

export type { SafeAsyncReturn };
