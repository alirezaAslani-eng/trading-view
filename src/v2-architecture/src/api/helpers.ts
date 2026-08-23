import { PaginationResponse } from "./types";

export function getNextPageParam(lastPage: PaginationResponse<any>) {
  const nextPage = lastPage.page + 1;

  return nextPage <= Math.ceil(
    lastPage.totalCount / lastPage.pageSize,
  )
    ? nextPage
    : undefined;
}