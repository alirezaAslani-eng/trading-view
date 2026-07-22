import { OrderSide } from "@/types";

export const ORDER_SIDE = {
  sell: "Sell",
  buy: "Buy",
} satisfies Record<string, OrderSide>;
