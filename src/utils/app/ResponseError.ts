import { ResponseErrorType } from "@/types";

export default class ResponseError implements ResponseErrorType {
  readonly message: string;
  readonly code?: string;
  readonly status?: number;
  readonly statusText?: string;
  readonly details?: unknown;
  constructor(error: ResponseErrorType) {
    this.message = error.message;
    this.status = error.status;
    this.statusText = error.statusText;
    this.code = error.code;
    this.details = error.details;
  }
}
