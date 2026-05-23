import { dayjs } from "@/packages/dayjs/core";
function convertToGregorian(date: dayjs.ConfigType): dayjs.Dayjs {
  return dayjs(date, { jalali: true });
}

export default convertToGregorian;
