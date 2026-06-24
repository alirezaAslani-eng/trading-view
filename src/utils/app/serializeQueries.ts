const serializeQueries = (
  queries: Record<string, string | number | boolean | null> | {},
): URLSearchParams => {
  const entrisedQueries = Object.entries(queries).map(([k, v]) => [
    k,
    String(v),
  ]);

  const searchParams = new URLSearchParams(entrisedQueries);

  entrisedQueries.forEach(([k, v]) => {
    if (v === "null") searchParams.delete(k);
  });
  
  return searchParams;
};
export default serializeQueries;
