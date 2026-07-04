import { OrderView } from "@/api/types";
import { PaginationFilter, PaginationFilterQueries } from "./filter.types";

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
interface OrderFilters extends PaginationFilter {
  view: OrderView;
  orderSide: null | OrderSide;
  productCode: string | null;
  status: OrderStatus | null;
}

type OrderFilterQueryKeys = "orderSide" | "productCode" | "status";
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
