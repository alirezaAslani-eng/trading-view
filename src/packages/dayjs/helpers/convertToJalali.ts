import { dayjs } from "@/packages/dayjs/core";

function convertToJalali(date: dayjs.ConfigType): dayjs.Dayjs {
  return dayjs(date).calendar("jalali");
}

export default convertToJalali;
