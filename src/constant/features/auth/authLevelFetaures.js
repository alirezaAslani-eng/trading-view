const authLevel1Fetaures = [
  { id: crypto.randomUUID(), feature: "امکان واریز نامحدود" },
  {
    id: crypto.randomUUID(),
    feature: "واریز روزانه تا سقف 25 میلیون تومان و ماهانه 750 میلیون تومان",
  },
  {
    id: crypto.randomUUID(),
    feature: "برداشت روزانه تا سقف 3 میلیون تومان و ماهانه 20 میلیون تومان",
  },
  { id: crypto.randomUUID(), feature: "ثبت درخواست استعلام قیمت" },
];
const authLevel2Fetaures = [
  { id: crypto.randomUUID(), feature: "ثبت درخواست استعلام قیمت" },
  {
    id: crypto.randomUUID(),
    feature: "واریز روزانه تا سقف 50 میلیون تومان و ماهانه 900 میلیون تومان",
  },
  {
    id: crypto.randomUUID(),
    feature: "برداشت روزانه تا سقف 10 میلیون تومان و ماهانه 100 میلیون تومان",
  },
  {
    id: crypto.randomUUID(),
    feature: "مشاهده نقدینگی و حجم معاملات بازار",
  },
];

export { authLevel1Fetaures, authLevel2Fetaures };
