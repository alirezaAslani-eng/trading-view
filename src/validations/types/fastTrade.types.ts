import type { input, output } from "zod";
import type fastTradeFormSchema from "../trade/fastTradeFormSchema";

export type FastTradeFormSchemaInputType = input<typeof fastTradeFormSchema>;
export type FastTradeFormSchemaOutputType = output<typeof fastTradeFormSchema>;
