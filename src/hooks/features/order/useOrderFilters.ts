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
  fromDate: null,
  toDate: null,
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

  const resetPagination = () => {
    filter.resetFilter("page");
  };
  const setView = (view: OrderFilters["view"]) => {
    filter.setFilter("view", view);
    resetPagination();
  };
  const setSide = (side: OrderFilters["orderSide"]) => {
    filter.setFilter("orderSide", side);
    resetPagination();
  };
  const setSymbol = (symbol: OrderFilters["productCode"]) => {
    filter.setFilter("productCode", symbol);
    resetPagination();
  };
  const setStatus = (status: OrderFilters["status"]) => {
    filter.setFilter("status", status);
    resetPagination();
  };
  const setFromDate = (date: OrderFilters["fromDate"]) => {
    filter.setFilter("fromDate", date);
    resetPagination();
  };

  const setToDate = (date: OrderFilters["toDate"]) => {
    filter.setFilter("toDate", date);
    resetPagination();
  };
  const setPage = (page: OrderFilters["page"]) => {
    filter.setFilter("page", page);
  };

  return {
    setSymbol,
    setFromDate,
    setToDate,
    setSide,
    setStatus,
    setView,
    setPage,
    ...filter,
  };
}

export default useOrderFilters;
