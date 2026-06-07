import { Infer } from "zod";
import type tradeFormSchema from "../trade/tradeFormSchema";

// * --start-- tradeFormSchema.ts ----
export type TradeFormSchemaType = Infer<typeof tradeFormSchema>;
// * --end-- tradeFormSchema.ts ----
