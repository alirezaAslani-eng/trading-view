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

// * --start-- activeOrders.ts ----
type UserOrdersResponse = PaginationResponse<Order[]>;
// * --end-- activeOrders.ts ----

export type { UserOrdersResponse, Order };
