import { KycLevel } from "@/types";

interface KycFeature {
  feature: string;
}
interface KycFeatures extends Partial<Record<KycLevel, KycFeature[]>> {}

export type { KycFeature, KycFeatures };
