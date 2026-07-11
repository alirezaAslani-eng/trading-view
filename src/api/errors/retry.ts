import { ResponseErrorType } from "@/types";
import { shouldRetry } from "./shouldRetry";

async function retry<TResolved = unknown>(
  fn: () => Promise<TResolved>,
  failCount: number = 0,
): Promise<TResolved> {
  let res: any;
  try {
    res = await fn();
    return res;
  } catch (err) {
    const error = err as ResponseErrorType;

    const should_retry = shouldRetry({ error, failCount, retryCount: 4 });

    if (!should_retry) throw err as ResponseErrorType;

    await new Promise((res) => setTimeout(res, 1000)); // Delay

    return retry(fn, failCount + 1);
  }
}

export default retry;
