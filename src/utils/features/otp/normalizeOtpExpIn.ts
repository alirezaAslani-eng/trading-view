import { RequestAuthOTPResponse } from "@/api/types";
import { ResponseErrorType } from "@/types";

function normalizeOtpExpIn(
  data: RequestAuthOTPResponse | undefined,
  error: ResponseErrorType | null,
): number {
  const duration =
    (data?.expIn ??
      (error?.details as RequestAuthOTPResponse | undefined)?.expIn) ||
    0;

  return duration;
}

export default normalizeOtpExpIn;
