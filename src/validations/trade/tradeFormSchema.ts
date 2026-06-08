import { object, enum as enum_, coerce } from "zod";


const tradeFormSchema = object({
  orderSide: enum_(["buy", "sell"]).transform((val) => (val === "buy" ? 0 : 1)),
  weight: coerce.number().positive(),
  price: coerce.number().positive(),
  orderType: enum_(["market", "limit"]).transform((val) =>
    val === "market" ? 1 : 0,
  ),
});

export default tradeFormSchema;
