import { apiError } from "./apiError";

type RequestConfig = RequestInit;

class ApiClient {
  //#region // ! ------------ Private ------------
  private request(url: string, config?: RequestConfig): Promise<Response> {
    const headers: HeadersInit = {};

    if (!(config?.body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }
    return apiError.requestHandler(() =>
      fetch(url, {
        credentials: "include",
        ...config,
        headers: {
          ...headers,
          ...config?.headers,
        },
      }),
    ) as Promise<Response>;
  }

  private async mutationRequest(url: string, config?: RequestConfig) {
    // TODO CSRF request before real mutation request
    return this.request(url, config);
  }
  //#endregion // ! ------------ Private ------------

  get(url: string, config?: RequestConfig): Promise<Response> {
    return this.request(url, {
      ...config,
      method: "GET",
    });
  }

  post(url: string, config?: RequestConfig) {
    return this.mutationRequest(url, {
      ...config,
      method: "POST",
    });
  }
  patch(url: string, config?: RequestConfig) {
    return this.mutationRequest(url, {
      ...config,
      method: "PATCH",
    });
  }
  put(url: string, config?: RequestConfig) {
    return this.mutationRequest(url, {
      ...config,
      method: "PUT",
    });
  }
  delete(url: string, config?: RequestConfig) {
    return this.mutationRequest(url, {
      ...config,
      method: "DELETE",
    });
  }
  authBaseURL(url: string) {
    return `${process.env.NEXT_PUBLIC_AUTH_BASEURL!}${url}`;
  }
  baseURL(url: string) {
    return `${process.env.NEXT_PUBLIC_BASEURL!}${url}`;
  }
}

export const apiClient = new ApiClient();
