"use client";
import {
  InputSelect,
  InputSelectItem,
  InputSelectMenu,
} from "@/components/ui/Input/InputSelect";
import Pagination from "@/components/ui/Pagination/Pagination";
import { PaginationProps } from "@/components/ui/types";
import {
  useOrderFiltersProvider,
  useOrders,
} from "@/context/feature/orders/Orders/hooks";
import { calculatePageCount, getPageOptions } from "@/utils/app/pagination";
import { Box } from "@mui/material";

function OrdersPagination(
  props: Omit<PaginationProps, "count" | "page" | "onChange">,
) {
  const orderFilters = useOrderFiltersProvider()!;
  const ordersQuery = useOrders()!;
  const { totalCount = 0 } = ordersQuery.data ?? {};
  const pageOptions = getPageOptions(totalCount);
  const pageCount = calculatePageCount(
    ordersQuery.data?.totalCount ?? 0,
    ordersQuery.data?.pageSize ?? 0,
  );

  return (
    <>
      {ordersQuery.isSuccess && pageCount > 1 && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {!!pageOptions.length && (
            <InputSelect
              size="small"
              variant="outlined"
              value={orderFilters.filters.pageSize}
              onChange={(page) => orderFilters.setPageSize(page, totalCount)}
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
            page={orderFilters.filters.page}
            count={pageCount}
            onChange={(_, page) => orderFilters.setPage(page)}
          />
        </Box>
      )}
    </>
  );
}

export default OrdersPagination;
