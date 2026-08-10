export type QueryParamRules = Partial<
  Record<string, boolean | number | string | null>
>;
export function toQueryParams(
  params?: QueryParamRules,
): Record<string, string> {
  if (!!!params || !!!Object.keys(params).length) return {};
  return Object.fromEntries(
    Object.entries(params)
      .filter(([, value]) => value !== undefined && value !== null)
      .map(([key, value]) => [key, String(value)]),
  );
}
