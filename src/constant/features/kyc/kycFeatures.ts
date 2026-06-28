import { KycFeatures } from "../types/kyc.types";
import { PRICE_UNITS } from "@/constant/features/priceConfig";

const kycFeatures = {
  Level1_Basic: [
    { feature: "امکان واریز نامحدود" },
    {
      feature: `واریز روزانه تا سقف 25 میلیون ${PRICE_UNITS.IRT.displayName} و ماهانه 750 میلیون ${PRICE_UNITS.IRT.displayName}`,
    },
    {
      feature: `برداشت روزانه تا سقف 3 میلیون ${PRICE_UNITS.IRT.displayName} و ماهانه 20 میلیون ${PRICE_UNITS.IRT.displayName}`,
    },
    { feature: "ثبت درخواست استعلام قیمت" },
  ],
  Level2_Advanced: [
    { feature: "ثبت درخواست استعلام قیمت" },
    {
      feature: `واریز روزانه تا سقف 50 میلیون ${PRICE_UNITS.IRT.displayName} و ماهانه 900 میلیون ${PRICE_UNITS.IRT.displayName}`,
    },
    {
      feature: `برداشت روزانه تا سقف 10 میلیون ${PRICE_UNITS.IRT.displayName} و ماهانه 100 میلیون ${PRICE_UNITS.IRT.displayName}`,
    },
    {
      feature: "مشاهده نقدینگی و حجم معاملات بازار",
    },
  ],
} satisfies KycFeatures;

export default kycFeatures;
