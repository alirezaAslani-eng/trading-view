
const mutationFetch: typeof fetch = async (url, requestInit) => {
  const res = await fetch(url, {
    ...requestInit,
    credentials: "include",
  });
  return res;
};

export default mutationFetch;
