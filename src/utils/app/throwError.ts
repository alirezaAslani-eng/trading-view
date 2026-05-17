import { ResponseErrorType } from "@/types";
import ResponseError from "./ResponseError";

function throwError(isError: boolean, error: ResponseErrorType) {
  if (!isError) return;
  throw new ResponseError(error);
}

export default throwError;
