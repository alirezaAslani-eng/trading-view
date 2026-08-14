import { object, enum as enum_, coerce, string, boolean } from "zod";

const tradeFormSchema = object({
  orderSide: enum_(["buy", "sell"]).transform((val) => (val === "buy" ? 0 : 1)),
  weight: coerce.number().positive(),
  marketPrice: coerce.number().positive().optional(),
  limitedPrice: coerce.number().positive().optional(),
  productCode: string(" "),
  orderType: enum_(["market", "limit"]).transform((val) =>
    val === "market" ? 1 : 0,
  ),
})
  .transform((data) => {
    const price = data.orderType === 1 ? data.marketPrice : data.limitedPrice;
    const { marketPrice, limitedPrice, ...transformed } = data;
    return { ...transformed, price: price ?? 0 };
  })
  .refine((data) => data.price !== undefined && data.price > 0, {
    path: ["price"],
  });

export default tradeFormSchema;
