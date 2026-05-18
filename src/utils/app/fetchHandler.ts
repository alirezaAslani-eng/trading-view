import ResponseError from "./ResponseError";
import throwError from "./throwError";

export default async function fetchHandler(
  fetcher: () => Promise<Response>,
): Promise<Response | undefined> {
  try {
    const res = await fetcher();
    return res;
  } catch (err) {
    throwError(err instanceof ResponseError, err as ResponseError);
    throwError(true, {
      code: "FAILD_TO_FETCH",
      message: "مشکلی رخ داده",
      details: err,
    });
  }
}
