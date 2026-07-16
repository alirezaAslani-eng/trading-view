import { ResponseErrorType } from "@/types";
import errorCode from "./errorCode";

function isAbortedApiResponse(error: ResponseErrorType) {
  return error.code === errorCode.abortedFetch;
}

export default isAbortedApiResponse;
