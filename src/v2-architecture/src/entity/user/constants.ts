import { UserTier } from "./types";

export const USER_TIER = {
  standard: "Standard",
  trader: "Trader",
  merchant: "Merchant",
  steelMill: "SteelMill",
} satisfies Record<string, UserTier>;
