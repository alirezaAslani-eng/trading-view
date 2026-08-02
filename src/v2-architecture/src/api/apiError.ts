import { retryableStatus } from "@/api/errors/config";
import { shouldRetry } from "@/api/errors/shouldRetry";
import { BaseApiResponse } from "@/types";

type ErrorCode = "FAILED_TO_FETCH" | "ABORTED_FETCH";

interface RetryOption {
  failCount: number;
  error: ResponseError;
  retryCount?: number;
}

class ResponseError {
  readonly message: string;
  readonly code?: string;
  readonly status?: number;
  readonly statusText?: string;
  readonly details?: unknown;
  constructor(error: {
    readonly code?: string;
    readonly message: string;
    readonly status?: number;
    readonly statusText?: string;
    readonly details?: unknown;
  }) {
    this.message = error.message;
    this.status = error.status;
    this.statusText = error.statusText;
    this.code = error.code;
    this.details = error.details;
  }
}

class ApiError {
  constructor() {
    this.RETRYABLE_STATUS = [408, 409, 425, 429, 500, 502, 503, 504];
    this.ERR_CODE = {
      FAILED_TO_FETCH: "FAILED_TO_FETCH",
      ABORTED_FETCH: "ABORTED_FETCH",
    };
  }
  // ! --------- Private ---------
  private ERR_CODE: Record<ErrorCode, string>;
  private RETRYABLE_STATUS: number[];

  private isAbortedError(error: unknown): error is DOMException {
    return error instanceof DOMException && error.name === "AbortError";
  }

  private async jsonParseHandler<T = unknown>(
    res: Response,
  ): Promise<T | undefined> {
    try {
      const json_data = await res.json();
      return json_data;
    } catch (err) {
      console.warn("JSON_PARSE_ERROR -> ", err);
      return undefined;
    }
  }

  // ! --------- Private ---------

  throwError(isError: boolean, error: ResponseError) {
    if (!isError) return;
    throw new ResponseError(error);
  }

  async jsonHandler<T = unknown>(res: Response): Promise<T> {
    const data = await this.jsonParseHandler<T>(res);

    if (!res.ok) {
      this.throwError(true, {
        code: (data as any)?.errorCode,
        message: (data as any)?.message ?? getFallbackErrorMessage(res.status),
        status: res.status,
        statusText: res.statusText,
        details: data,
      });
    }

    const apiResponse = data as BaseApiResponse<T>;

    if (apiResponse?.isSuccess === false) {
      this.throwError(true, {
        code: apiResponse?.errorCode ?? undefined,
        message: apiResponse?.message ?? getFallbackErrorMessage(res.status),
        status: res.status,
        statusText: res.statusText,
        details: apiResponse,
      });
    }

    return data as T;
  }
  async blobHandler(res: Response): Promise<Blob | undefined> {
    if (!res.ok) {
      const data = await this.jsonParseHandler(res);
      this.throwError(true, {
        code: (data as any)?.errorCode,
        message: (data as any)?.message ?? getFallbackErrorMessage(res.status),
        status: res.status,
        statusText: res.statusText,
        details: data,
      });
    }

    try {
      const blob = await res.blob();
      return blob;
    } catch (err) {
      console.warn("BLOB_PARSE_ERROR -> ", err);
      return undefined;
    }
  }

  async requestHandler(fetcher: () => Promise<Response>) {
    try {
      const res = await fetcher();
      return res;
    } catch (err) {
      this.throwError(this.isAbortedError(err), {
        message: "Fetch has cancled",
        code: this.ERR_CODE.ABORTED_FETCH,
        status: 499,
        statusText: "AbortedError",
        details: err,
      });
      this.throwError(true, {
        code: "FAILD_TO_FETCH",
        message: "مشکلی رخ داده",
        details: err,
      });
    }
  }

  async retryApi<TResolved = unknown>(
    fn: () => Promise<TResolved>,
    failCount: number = 0,
  ): Promise<TResolved> {
    let res: any;
    try {
      res = await fn();
      return res;
    } catch (err) {
      const error = err as ResponseError;

      const should_retry = this.shouldRetry({
        error,
        failCount,
        retryCount: 4,
      });

      if (!should_retry) throw err as ResponseError;

      await new Promise((res) => setTimeout(res, 1000)); // Delay

      return this.retryApi(fn, failCount + 1);
    }
  }

  shouldRetry = ({ error, failCount, retryCount = 3 }: RetryOption) => {
    const status = error?.status;
    if (!status) return true;
    return this.RETRYABLE_STATUS.includes(status) && failCount < retryCount;
  };
}

const apiError = new ApiError();
export { apiError, ResponseError };

//#region // * ------------ Fallback Errors ------------
const ERROR_MESSAGES = {
  400: "درخواست نامعتبر است. لطفاً اطلاعات وارد شده را بررسی کنید. (400)",
  401: "دوباره وارد شوید. (401)",
  403: "اجازه انجام این کار را ندارید. (403)",
  404: "در حال حاضر امکان استفاده از این سرویس وجود ندارد (404)",
  409: "تعارضی در اطلاعات وجود دارد. لطفاً صفحه را دوباره بارگذاری کنید و دوباره تلاش کنید. (409)",
  422: "اطلاعات وارد شده صحیح نیست. لطفاً آن را بررسی کنید. (422)",
  429: "تعداد درخواست‌ها زیاد است. لطفاً کمی صبر کنید و دوباره تلاش کنید. (429)",

  SERVER_ERROR:
    "در حال حاضر امکان انجام این درخواست وجود ندارد. لطفاً بعداً دوباره تلاش کنید.",
} as const;

function getFallbackErrorMessage(status: number) {
  if (status >= 500) {
    return ERROR_MESSAGES.SERVER_ERROR;
  }
  return (
    (ERROR_MESSAGES as Record<number, string>)[status] ??
    ERROR_MESSAGES.SERVER_ERROR
  );
}
//#endregion // * ------------ Fallback Errors ------------
