import errorCode from "@/api/errors/errorCode";
import throwError from "./throwError";

export default async function fetchHandler(
  fetcher: () => Promise<Response>,
): Promise<Response | undefined> {
  try {
    const res = await fetcher();
    return res;
  } catch (err) {
    throwError(isAbortedError(err), {
      message: "Fetch has cancled",
      code: errorCode.abortedFetch,
      status: 499,
      statusText: "AbortedError",
      details: err,
    });
    throwError(true, {
      code: "FAILD_TO_FETCH",
      message: "مشکلی رخ داده",
      details: err,
    });
  }
}

function isAbortedError(error: unknown): error is DOMException {
  return error instanceof DOMException && error.name === "AbortError";
}
