import throwError from "./throwError";

export default async function jsonParseHandler<T = unknown>(
  res: Response,
): Promise<T | undefined> {
  try {
    const json_data = await res.json();
    return json_data;
  } catch (err) {
    throwError(true, {
      code: "JSON_PARSE_ERROR",
      message: "مشکلی پیش آمده",
      status: res.status,
      statusText: res.statusText,
      details: err,
    });
  }
}
