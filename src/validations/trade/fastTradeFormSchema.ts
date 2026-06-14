import { coerce, enum as enum_, object, string } from "zod";

const fastTradeFormSchema = object({
  orderSide: enum_(["buy", "sell"]),
  payAmount: coerce.number().positive(),
  tradePrice: coerce.number().positive(),
  receiveAmount: coerce.number().positive(),
  assetId: string().min(1),
});

export default fastTradeFormSchema;
