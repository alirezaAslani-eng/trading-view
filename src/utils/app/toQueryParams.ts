import { Dayjs } from "dayjs";

export type QueryParamRules = Partial<
  Record<string, boolean | number | string | Date | null | Dayjs>
>;

export type QueryParams<TParams extends QueryParamRules> = TParams;

export function toQueryParams(
  params?: QueryParamRules,
): Record<string, string> {
  if (!params || !Object.keys(params).length) return {};

  return Object.fromEntries(
    Object.entries(params)
      .filter(([, value]) => value !== undefined && value !== null)
      .map(([key, value]) => [
        key,
        value instanceof Date || value instanceof Dayjs
          ? value.toISOString()
          : String(value),
      ]),
  );
}
