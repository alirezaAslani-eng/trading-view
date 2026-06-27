import { OrderView } from "@/api/types";
import { PaginationFilter } from "./filter.types";

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

export type {
  OrderStatus,
  OrderSide,
  OrderType,
  OrderFilters,
  OrderStatusClient,
};
