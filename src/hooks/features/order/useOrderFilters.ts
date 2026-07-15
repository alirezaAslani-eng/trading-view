import { OrderFilters } from "@/types";
import { UseOrderFiltersReturn } from "./types";
import useFilter from "@/hooks/app/useFilter";
import { dayjs } from "@/packages/dayjs";
import { useCallback } from "react";
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

  const onlyToday = useCallback(() => {
    filter.setFilter("fromDate", dayjs().startOf("day"));
    filter.setFilter("toDate", dayjs().endOf("day"));
    filter.setFilter("view", null);
    resetPagination();
  }, []);

  return {
    setSymbol,
    setFromDate,
    setToDate,
    setSide,
    setStatus,
    setView,
    setPage,
    onlyToday,
    ...filter,
  };
}

export default useOrderFilters;
