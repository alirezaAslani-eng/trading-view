import { csrfToken } from "@/api";
const mutationFetch: typeof fetch = async (url, requestInit) => {
  const csrf_token = await csrfToken();
  const res = await fetch(url, {
    ...requestInit,
    headers: {
      ...requestInit?.headers,
      "X-XSRF-TOKEN": csrf_token,
    },
  });
  return res;
};

export default mutationFetch;
