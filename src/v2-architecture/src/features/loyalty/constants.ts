import { UserTier } from "@/v2-architecture/src/entity/user";

export const USER_TIER_LOYALITY_LABEL = {
  Standard: "برنز",
  Trader: "نقره",
  Merchant: "طلا",
  SteelMill:""
} satisfies Record<UserTier, string>;
