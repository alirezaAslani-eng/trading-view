import fetchHandler from "@/utils/app/fetchHandler";
import clientEnv from "@/validations/env/clientEnv";

const URL = `${clientEnv?.NEXT_PUBLIC_BASEURL}/api/v1/auth/csrf-token`;

async function csrfToken(): Promise<string> {
  const res = (await fetchHandler(async () => {
    const res = await fetch(URL);
    return res;
  })) as Response;

  const data = await res.json();

  return data; // * << Token
}

export default csrfToken;
