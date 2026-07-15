import {
  DateFilter,
  PaginationFilter,
  PaginationFilterQueries,
} from "./filter.types";

type OrderStatusClient = "pending" | "failed" | "filled";
type OrderStatus =
  | "Cancelled"
  | "Active"
  | "PartiallyFilled"
  | "Filled"
  | "Failed"
  | "AwaitingAdminApproval";

type OrderType = "Market" | "Limit";
type OrderSide = "Buy" | "Sell";
type OrderFilters = PaginationFilter &
  DateFilter & {
    view: "active" | "history" | null;
    orderSide: null | OrderSide;
    productCode: string | null;
    status: OrderStatus | null;
  };

type OrderFilterQueryKeys = "orderSide" | "productCode" | "status" | "viewType";
type OrderFilterQueries = PaginationFilterQueries &
  Record<OrderFilterQueryKeys, string>;

export type {
  OrderStatus,
  OrderSide,
  OrderType,
  OrderFilters,
  OrderStatusClient,
  OrderFilterQueries,
};
