import { dayjs } from "@/packages/dayjs";

interface DateItem {
  readonly label: string;
  readonly value: string;
}

export const DAYS: DateItem[] = Array.from({ length: 31 }, (_, i) => ({
  label: String(i + 1),
  value: String(i + 1),
}));

export const MONTHS: DateItem[] = [
  { label: "فروردین", value: "0" },
  { label: "اردیبهشت", value: "1" },
  { label: "خرداد", value: "2" },
  { label: "تیر", value: "3" },
  { label: "مرداد", value: "4" },
  { label: "شهریور", value: "5" },
  { label: "مهر", value: "6" },
  { label: "آبان", value: "7" },
  { label: "آذر", value: "8" },
  { label: "دی", value: "9" },
  { label: "بهمن", value: "10" },
  { label: "اسفند", value: "11" },
];

export const YEARS: DateItem[] = Array.from({ length: 100 }, (_, i) => {
  const year = dayjs().calendar("jalali").year() - i;
  return {
    label: String(year),
    value: String(year),
  };
});

export const JALALI_FORMAT = "YYYY/MM/DD";
