import { OrderFilters } from "@/types";
import { UseOrderFiltersReturn } from "./types";
import useFilter from "@/hooks/app/useFilter";

const INITIAL_FILTERS: OrderFilters = {
  orderSide: null,
  page: 1,
  pageSize: 10,
  view: "active",
  productCode: null,
  status: null,
};

function useOrderFilters(
  initialState?: Partial<OrderFilters>,
): UseOrderFiltersReturn {
  const filter = useFilter<OrderFilters>({
    initialState: {
      ...INITIAL_FILTERS,
      ...initialState,
    },
  });

  const setView = (view: OrderFilters["view"]) => {
    filter.setFilter("view", view);
  };
  const setSide = (side: OrderFilters["orderSide"]) => {
    filter.setFilter("orderSide", side);
  };
  const setSymbol = (symbol: OrderFilters["productCode"]) => {
    filter.setFilter("productCode", symbol);
  };
  const setStatus = (status: OrderFilters["status"]) => {
    filter.setFilter("status", status);
  };

  return {
    setSymbol,
    setSide,
    setStatus,
    setView,
    ...filter,
  };
}

export default useOrderFilters;
