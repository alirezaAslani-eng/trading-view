import { OrdersResponse } from "@/api/types";
import { UseOrderFiltersReturn } from "@/hooks/features/order/types";
import { OrderFilters, ResponseErrorType } from "@/types";
import { UseQueryResult } from "@tanstack/react-query";

interface OrderFiltersProviderProps {
  defaultFilters?: Partial<OrderFilters>;
}
interface OrderFiltersContextValue extends UseOrderFiltersReturn {}

type OrdersContextValue = UseQueryResult<OrdersResponse, ResponseErrorType>;

export type {
  OrderFiltersContextValue,
  OrdersContextValue,
  OrderFiltersProviderProps,
};
