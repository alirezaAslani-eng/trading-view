import { OrdersResponse } from "@/api/types";
import { OrderFilters, ResponseErrorType } from "@/types";
import { UseQueryResult } from "@tanstack/react-query";

interface OrderFiltersProviderProps {
  defaultFilters: OrderFilters;
}
interface OrderFiltersContextValue {
  filters: OrderFilters;
  resetFilters: () => void;
  setFilter: <K extends keyof OrderFilters>(
    key: K,
    value: OrderFilters[K],
  ) => void;
}

type OrdersContextValue = UseQueryResult<OrdersResponse, ResponseErrorType>;

export type {
  OrderFiltersContextValue,
  OrdersContextValue,
  OrderFiltersProviderProps,
};
