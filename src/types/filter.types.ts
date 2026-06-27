type PaginationFilter<T = unknown> = T & {
  page: number;
  pageSize: number;
};

export type { PaginationFilter };
