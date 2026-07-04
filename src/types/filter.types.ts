type PaginationFilter<T = unknown> = T & {
  page: number;
  pageSize: number;
};
type PaginationFilterQueries<T extends Record<string, string> = {}> = T &
  Record<"page" | "pageSize", string>;

export type { PaginationFilter, PaginationFilterQueries };
