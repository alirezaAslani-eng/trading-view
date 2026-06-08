import type { input, output } from "zod";
import type tradeFormSchema from "../trade/tradeFormSchema";

// * --start-- tradeFormSchema.ts ----
export type TradeFormSchemaInputType = input<typeof tradeFormSchema>;
export type TradeFormSchemaOutputType = output<typeof tradeFormSchema>;
// * --end-- tradeFormSchema.ts ----
