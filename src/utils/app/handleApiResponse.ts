import { BaseApiResponse } from "@/types";
import jsonParseHandler from "./jsonParseHandler";
import throwError from "./throwError";

export default async function handleApiResponse<T = unknown>(
  res: Response,
): Promise<T | undefined> {
  const data = await jsonParseHandler<T>(res);

  if (!res.ok) {
    throwError(true, {
      code: (data as any)?.errorCode,
      message: (data as any)?.message ?? "",
      status: res.status,
      statusText: res.statusText,
      details: data,
    });
  }

  const apiResponse = data as BaseApiResponse<T>;

  if (!apiResponse?.isSuccess) {
    throwError(true, {
      code: apiResponse?.errorCode ?? undefined,
      message: apiResponse?.message ?? "",
      status: res.status,
      statusText: res.statusText,
      details: apiResponse,
    });
  }

  return data;
}
