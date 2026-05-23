import { useState } from "react";
import { dayjs, useDateOptions, UseDateReturn } from "@/packages/dayjs";
import type { Dayjs } from "dayjs";

function useDate(options: useDateOptions = { jalaliday: true }): UseDateReturn {
  const isJalali = options?.jalaliday;
  const calendar = isJalali ? "jalali" : "gregory";

  const [date, setDate] = useState<Dayjs>(
    options?.defaultState ?? dayjs().calendar(calendar),
  );

  const setDay = (day: number) => {
    setDate((prev) => {
      return prev.set("date", day);
    });
  };
  const setMonth = (month: number) => {
    setDate((prev) => {
      return prev.set("month", month);
    });
  };
  const setYear = (year: number) => {
    setDate((prev) => {
      return prev.set("year", year);
    });
  };

  return { date, setDay, setMonth, setYear };
}

export default useDate;
