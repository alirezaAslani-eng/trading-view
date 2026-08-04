"use client";
import Pagination from "@/components/ui/Pagination/Pagination";
import { PaginationProps } from "@/components/ui/types";
import { calculatePageCount, getPageOptions } from "@/utils/app/pagination";
import {
  useTransactionFiltersProvider,
  useTransactions,
} from "@/context/feature/transaction/Transactions/hooks";
import { Box } from "@mui/material";
import {
  InputSelect,
  InputSelectItem,
  InputSelectMenu,
} from "@/components/ui/Input/InputSelect";

function TransactionsPagination(
  props: Omit<PaginationProps, "count" | "page" | "onChange">,
) {
  const transactionsQuery = useTransactions()!;
  const { totalCount = 0, pageSize = 0 } = transactionsQuery.data ?? {};
  const { filters, setPageSize, setPage } = useTransactionFiltersProvider()!;
  const pageCount = calculatePageCount(totalCount, pageSize ?? 0);
  const pageOptions = getPageOptions(totalCount);
  return (
    <>
      {transactionsQuery.isSuccess && pageCount > 1 && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {!!pageOptions.length && (
            <InputSelect
              size="small"
              variant="outlined"
              value={filters.pageSize}
              onChange={(page) => setPageSize(page, totalCount)}
            >
              <InputSelectMenu>
                {pageOptions.map((item) => {
                  return (
                    <InputSelectItem key={item} value={item}>
                      {item}
                    </InputSelectItem>
                  );
                })}
              </InputSelectMenu>
            </InputSelect>
          )}
          <Pagination
            {...props}
            page={filters.page}
            count={pageCount}
            onChange={(_, page) => setPage(page)}
          />
        </Box>
      )}
    </>
  );
}

export default TransactionsPagination;
