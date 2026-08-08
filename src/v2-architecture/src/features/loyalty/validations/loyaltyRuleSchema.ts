// --- loyaltyRuleSchema.ts ---
import { UserTier } from "@/v2-architecture/src/entity/user";
import { type infer as Infer, number, object, string } from "zod";

export const loyaltyRuleSchema = object({
  tierName: string<UserTier>(),
  minVolumeKg: number("مقدار نامعتبر است"),
  feeRate: number("مقدار نامعتبر است").transform((v) => v / 100),
});

export type LoyaltyRuleSchema = Infer<typeof loyaltyRuleSchema>;
