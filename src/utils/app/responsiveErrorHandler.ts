import throwError from "./throwError";

export default async function responseErrorHandler(
  res: Response,
): Promise<void> {
  if (!res.ok) {
    const error = await res.json();
    throwError(true, {
      code: error?.errorCode,
      message: error?.message ?? "مشکلی پیش آمده",
      status: res.status,
      statusText: res.statusText,
      details: error,
    });
  }
}
