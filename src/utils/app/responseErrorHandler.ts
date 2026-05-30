import jsonParseHandler from "./jsonParseHandler";
import throwError from "./throwError";

export default async function responseErrorHandler(
  res: Response,
): Promise<void> {
  if (res.ok === false) {
    const error = await jsonParseHandler<any>(res);
    throwError(true, {
      code: error?.errorCode,
      message: error?.message ?? "",
      status: res.status,
      statusText: res.statusText,
      details: error,
    });
  }
}
