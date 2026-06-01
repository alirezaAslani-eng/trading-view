import { createApiUrl } from "@/utils";

const URL = createApiUrl("/api/v1/auth/refresh");

const api: typeof fetch = async (url, requestInit): Promise<Response> => {
  let res: Response;

  try {
    res = await fetch(url, requestInit);
  } catch (err) {
    throw err; // ! network error forward
  }

  if (res.status !== 401) {
    return res; // ! everything below except 401
  }

  let refreshRes: Response;

  try {
    refreshRes = await fetch(URL, {
      method: "POST",
      //@ts-ignore
      Cookie: requestInit?.headers?.Cookie,
    });
  } catch (err) {
    throw err; // ! refresh network error forward
  }

  if (!refreshRes.ok) {
    return refreshRes; // ! refresh failed → forward
  }

  // * refresh succeeded → retry original request ONCE
  return api(url, requestInit);
};

export default api;
