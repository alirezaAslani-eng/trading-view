"use client";
import Pagination from "@/components/ui/Pagination/Pagination";
import { PaginationProps } from "@/components/ui/types";
import {
  useOrderFiltersProvider,
  useOrders,
} from "@/context/feature/orders/Orders/hooks";
import { calculatePageCount } from "@/utils/app/pagination";

function OrdersPagination(
  props: Omit<PaginationProps, "count" | "page" | "onChange">,
) {
  const filters = useOrderFiltersProvider()!;
  const ordersQuery = useOrders()!;

  const pageCount = calculatePageCount(
    ordersQuery.data?.totalCount ?? 0,
    ordersQuery.data?.pageSize ?? 0,
  );

  return (
    <>
      {ordersQuery.isSuccess && pageCount > 1 && (
        <Pagination
          {...props}
          page={filters.filters.page}
          count={pageCount}
          onChange={(_, page) => {
            filters.setFilter("page", page);
          }}
        />
      )}
    </>
  );
}

export default OrdersPagination;
