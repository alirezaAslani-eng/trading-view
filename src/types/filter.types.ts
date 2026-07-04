type PaginationFilter<T = unknown> = T & {
  page: number;
  pageSize: number;
};
type DateFilter<T = unknown> = T & {
  fromDate: Date | null;
  toDate: Date | null;
};
type PaginationFilterQueries<T extends Record<string, string> = {}> = T &
  Record<"page" | "pageSize", string>;

type DateFilterQueries<T extends Record<string, string> = {}> = T &
  Record<"fromDate" | "toDate", string>;

export type {
  PaginationFilter,
  DateFilter,
  PaginationFilterQueries,
  DateFilterQueries,
};
