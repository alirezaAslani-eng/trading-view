import { OrderSide, OrderStatus, OrderType, PaginationResponse } from "@/types";

interface Order {
  orderId: number;
  date: string;
  productCode: number;
  orderSide: OrderSide;
  orderType: OrderType;
  price: number;
  status: OrderStatus;
  totalWeight: 30;
  filledWeight: 0;
  remainingWeight: 30;
  progress: 0;
  settlementMode: 0 | 1;
}

// * --start-- orders.ts ----
type OrderView = "active" | "history";
type OrdersApiConfig = { queries?: string };

type OrdersResponse = PaginationResponse<Order[]>;
// * --end-- orders.ts ----

// * --start-- cancleOrder.ts ----
type CancleOrderParam = `${number}` | number;
// * --end-- cancleOrder.ts ----

export type {
  OrdersResponse,
  OrdersApiConfig,
  Order,
  OrderView,
  CancleOrderParam,
};
