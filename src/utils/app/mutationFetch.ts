import api from "@/api/api";

const mutationFetch: typeof fetch = async (url, requestInit) => {
  const res = await api(url, {
    ...requestInit,
    credentials: "include",
  });
  return res;
};

export default mutationFetch;
