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
  type: "active" | "history";
  // search: string;
  // symbol: null | string;
  // orderType: null | string;
  // side: null | OrderSide;
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
