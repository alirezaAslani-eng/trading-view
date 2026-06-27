import { OrderView } from "@/api/types";

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
interface OrderFilters {
  page: number;
  pageSize: number;
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
