import Pagination from "@/components/ui/Pagination/Pagination";
import { useOrderFilters } from "@/context/feature/orders/OrderFilters/hooks";

interface OrdersPaginationProps {
  pageCount: number;
}

function OrdersPagination(props: OrdersPaginationProps) {
  const filters = useOrderFilters();

  return (
    <Pagination
      page={filters.filters.page}
      count={props.pageCount}
      onChange={(_, page) => {
        filters.updateFilter("page", page);
      }}
    />
  );
}

export default OrdersPagination;
