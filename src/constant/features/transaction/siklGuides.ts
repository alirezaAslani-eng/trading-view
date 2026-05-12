import { SiklGuideList } from "./types";

const siklGuides: SiklGuideList = [
  { id: crypto.randomUUID(), guid: "ثبت پیش از ۱۳ ظهر: ساعت ۱۳:۴۵ همان روز" },
  {
    id: crypto.randomUUID(),
    guid: "ساعت ۱۳:۴۵ روز کاری بعد",
  },
];
const siklGuidesForHoliday: SiklGuideList = [
  { id: crypto.randomUUID(), guid: "ثبت پیش از ۱۳ ظهر: ساعت ۱۳:۴۵ همان روز" },
  {
    id: crypto.randomUUID(),
    guid: "ثبت‌ پیش از ۱۸:۰۰ عصر: ساعت ۱۸:۴۵ همان روز",
  },
  {
    id: crypto.randomUUID(),
    guid: "ثبت پس از ساعت ۱۸:۰۰ عصر: ساعت ۱۳:۴۵ روز کاری بعد",
  },
];

export { siklGuides, siklGuidesForHoliday };
