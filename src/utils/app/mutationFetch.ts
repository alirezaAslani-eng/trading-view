import clientEnv from "@/validations/env/clientEnv";
import jsonParseHandler from "./jsonParseHandler";
const mutationFetch: typeof fetch = async (url, requestInit) => {
  // * -------- CSRF Token ----------
  const csrf_res = await fetch(
    `${clientEnv?.NEXT_PUBLIC_BASEURL}/api/v1/auth/csrf-token`,
  );
  const csrf_token = (await jsonParseHandler<string>(csrf_res)) as string;

  // * -------- Mutation ----------
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
