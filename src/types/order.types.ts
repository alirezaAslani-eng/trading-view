type OrderStatus =
  | "Cancelled"
  | "Active"
  | "PartiallyFilled"
  | "Filled"
  | "Failed"
  | "AwaitingAdminApproval";

type OrderType = "Market" | "Limit";
type OrderSide = "Buy" | "Sell";

export type { OrderStatus, OrderSide, OrderType };
