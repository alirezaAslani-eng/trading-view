import {
  type infer as Infer,
  array,
  boolean,
  input,
  number,
  object,
  output,
  string,
} from "zod";

const pressureRuleSchema = object({
  minPressurePercent: number(),
  maxPressurePercent: number(),
  baseAdjustment: number(),
  gapAcceleration: number(),
});

export const configureBotSchema = object({
  symbol: string(),
  isActive: boolean(),
  manualBasePrice: number(),
  orderWeight: number(),
  stepPriceGap: number(),
  ladderLevels: number(),
  fixedStepWeight: number(),
  priceRoundingStep: number(),
  targetAssetRatio: number(),
  pressureRules: array(pressureRuleSchema),
  inventoryImpactFactor: number(),
  whaleDefenseThreshold: number(),
  whaleCooldownMinutes: number(),
  spreadPercentage: number(),
  spoofingProtectionRange: number(),
});

export type ConfigureBotSchema = Infer<typeof configureBotSchema>;
export type ConfigureBotSchemaInput = input<typeof configureBotSchema>;
export type ConfigureBotSchemaOutput = output<typeof configureBotSchema>;
