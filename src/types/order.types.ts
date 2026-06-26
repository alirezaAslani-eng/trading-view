import { OrdersType } from "@/api/types";

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
  type: OrdersType;
  orderSide: null | OrderSide;
  // search: string;
  // symbol: null | string;
  // orderType: null | string;
  // sort: null | "ASC" | "DESC";
  // onlyOpenOrders: boolean;
}

export type {
  OrderStatus,
  OrderSide,
  OrderType,
  OrderFilters,
  OrderStatusClient,
};
