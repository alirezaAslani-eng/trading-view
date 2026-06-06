import { BaseApiResponse } from "@/types";
import jsonParseHandler from "./jsonParseHandler";
import throwError from "./throwError";

export default async function responseErrorHandler(
  res: Response,
): Promise<void> {
  if (res.ok === false) {
    const error = await jsonParseHandler<any>(res);
    throwError(true, {
      code: error?.errorCode,
      // TODO : message handler
      message: error?.message ?? "",
      status: res.status,
      statusText: res.statusText,
      details: error,
    });
  }

  // * When serevr respons is ok but isSuccess is false
  if (res.ok === true) {
    const data = (await jsonParseHandler(res)) as BaseApiResponse<unknown>;
    if (!!data?.isSuccess) return;
    throwError(true, {
      code: data?.errorCode ?? undefined,
      // TODO : message handler
      message: data?.message ?? "",
      status: res.status,
      statusText: res.statusText,
      details: data,
    });
  }
}
