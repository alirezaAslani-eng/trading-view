"use client";
import Pagination from "@/components/ui/Pagination/Pagination";
import { PaginationProps } from "@/components/ui/types";
import { useActiveOrders } from "@/context/feature/orders/ActiveOrders/ActiveOrdersContext";
import { useOrderFilters } from "@/context/feature/orders/OrderFilters/hooks";
import { calculatePageCount } from "@/utils/app/pagination";

function ActiveOrdersPagination(
  props: Omit<PaginationProps, "count" | "page" | "onChange">,
) {
  const filters = useOrderFilters();
  const activeOrders = useActiveOrders();
  return (
    <>
      {activeOrders.isSuccess && (
        <Pagination
          page={filters.filters.page}
          count={calculatePageCount(
            activeOrders.data.totalCount,
            activeOrders.data.pageSize,
          )}
          onChange={(_, page) => {
            filters.updateFilter("page", page);
          }}
        />
      )}
    </>
  );
}

export default ActiveOrdersPagination;
