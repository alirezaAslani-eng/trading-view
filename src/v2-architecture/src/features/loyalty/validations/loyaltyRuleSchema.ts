// --- loyaltyRuleSchema.ts ---
import { type infer as Infer, number, object, string } from "zod";

export const loyaltyRuleSchema = object({
  tierName: string(),
  minVolumeKg: number("مقدار نامعتبر است"),
  feeRate: number("مقدار نامعتبر است").transform((v) => v / 100),
});

export type LoyaltyRuleSchema = Infer<typeof loyaltyRuleSchema>;
