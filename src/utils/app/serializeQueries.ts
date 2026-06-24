const serializeQueries = (
  queries: Record<string, string | number | boolean> | {},
): URLSearchParams =>
  new URLSearchParams(Object.entries(queries).map(([k, v]) => [k, String(v)]));

export default serializeQueries;
