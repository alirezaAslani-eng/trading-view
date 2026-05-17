import throwError from "./throwError";

export default async function fetchHandler(
  fetcher: () => Promise<Response>,
): Promise<Response | undefined> {
  try {
    const res = await fetcher();
    return res;
  } catch (err) {
    throwError(true, {
      code: "FAILD_TO_FETCH",
      message: "مشکلی رخ داده",
      details: err,
    });
  }
}
