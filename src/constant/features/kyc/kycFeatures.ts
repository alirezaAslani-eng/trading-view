import { KycFeatures } from "../types/kyc.types";

const kycFeatures: KycFeatures = {
  Level1_Basic: [
    { feature: "امکان واریز نامحدود" },
    {
      feature: "واریز روزانه تا سقف 25 میلیون تومان و ماهانه 750 میلیون تومان",
    },
    {
      feature: "برداشت روزانه تا سقف 3 میلیون تومان و ماهانه 20 میلیون تومان",
    },
    { feature: "ثبت درخواست استعلام قیمت" },
  ],
  Level2_Advanced: [
    { feature: "ثبت درخواست استعلام قیمت" },
    {
      feature: "واریز روزانه تا سقف 50 میلیون تومان و ماهانه 900 میلیون تومان",
    },
    {
      feature: "برداشت روزانه تا سقف 10 میلیون تومان و ماهانه 100 میلیون تومان",
    },
    {
      feature: "مشاهده نقدینگی و حجم معاملات بازار",
    },
  ],
  // * Hasn't defined yet
  None: [],
  Level3_Business: [],
};

export default kycFeatures;
