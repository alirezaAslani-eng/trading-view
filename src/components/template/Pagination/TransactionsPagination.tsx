"use client";
import Pagination from "@/components/ui/Pagination/Pagination";
import { PaginationProps } from "@/components/ui/types";
import { calculatePageCount } from "@/utils/app/pagination";
import {
  useTransactionFiltersProvider,
  useTransactions,
} from "@/context/feature/transaction/Transactions/hooks";

function TransactionsPagination(
  props: Omit<PaginationProps, "count" | "page" | "onChange">,
) {
  const transactionsQuery = useTransactions()!;
  const filters = useTransactionFiltersProvider()!;

  const pageCount = calculatePageCount(
    transactionsQuery.data?.totalCount ?? 0,
    transactionsQuery.data?.pageSize ?? 0,
  );

  return (
    <>
      {transactionsQuery.isSuccess && pageCount > 1 && (
        <Pagination
          {...props}
          page={filters.filters.page}
          count={pageCount}
          onChange={(_, page) => filters.setPage(page)}
        />
      )}
    </>
  );
}

export default TransactionsPagination;
