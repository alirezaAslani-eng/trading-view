import {
  discriminatedUnion,
  object,
  literal,
  enum as enum_,
  coerce,
} from "zod";

const sharedTradeFormSchema = object({
  side: enum_(["buy", "sell"]).transform((val) => (val === "buy" ? 0 : 1)),
  amount: coerce.number().positive(),
});
const tradeFormSchema = discriminatedUnion("orderType", [
  object({
    orderType: literal("market").transform(() => 1),
  }).merge(sharedTradeFormSchema),

  object({
    orderType: literal("limit").transform(() => 0),
    limitPrice: coerce.number().positive(),
  }).merge(sharedTradeFormSchema),
]);

export default tradeFormSchema;
