import {
  discriminatedUnion,
  object,
  literal,
  enum as enum_,
  coerce,
} from "zod";

const sharedTradeFormSchema = object({
  side: enum_(["buy", "sell"]),
  amount: coerce.number().positive(),
});
const tradeFormSchema = discriminatedUnion("orderType", [
  object({
    orderType: literal("market"),
  }).merge(sharedTradeFormSchema),

  object({
    orderType: literal("limit"),
    limitPrice: coerce.number().positive(),
  }).merge(sharedTradeFormSchema),
]);

export default tradeFormSchema;
