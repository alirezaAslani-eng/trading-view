import { OrderType } from "@/types";

export const ORDER_TYPE = {
  market: "Market",
  limit: "Limit",
} satisfies Record<string, OrderType>;

export const ORDER_TYPE_LABELS = {
  Limit: "تعیین قیمت",
  Market: "فوری",
} satisfies Record<OrderType, string>;
