import { OrderSide, OrderStatus, OrderType, PaginationResponse } from "@/types";

interface Order {
  orderId: number;
  date: string;
  productCode: number;
  orderSide: OrderSide;
  orderType: OrderType;
  price: number;
  weight: number;
  status: OrderStatus;
}

// * --start-- orders.ts ----
type OrderView = "active" | "history";
type OrdersApiConfig = { params: { view: OrderView }; queries?: string };

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
