import { dayjs } from "@/packages/dayjs/core";
export function convertToGregorian(date: dayjs.ConfigType): dayjs.Dayjs {
  return dayjs(date, { jalali: true });
}

export function convertToJalali(date: dayjs.ConfigType): dayjs.Dayjs {
  return dayjs(date).calendar("jalali");
}
