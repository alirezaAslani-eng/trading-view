import { OrderSide } from "@/types";

export const ORDER_SIDE = {
  sell: "Sell",
  buy: "Buy",
} satisfies Record<string, OrderSide>;

export const ORDER_SIDE_LABELS = {
  Sell: "فروش",
  Buy: "خرید",
} satisfies Record<OrderSide, string>;
