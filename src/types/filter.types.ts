import { QueryParams } from "@/utils/app/toQueryParams";
import { Dayjs } from "dayjs";

type PaginationFilter<T = unknown> = T & {
  page: number;
  pageSize: number;
};
type DateFilter<T = unknown> = T & {
  fromDate: Dayjs | null;
  toDate: Dayjs | null;
};
type PaginationFilterQueries = QueryParams<
  Record<"page" | "pageSize", string | number | null>
>;

type DateFilterQueries = QueryParams<
  Record<"fromDate" | "toDate", string | Date | Dayjs>
>;

export type {
  PaginationFilter,
  DateFilter,
  PaginationFilterQueries,
  DateFilterQueries,
};
