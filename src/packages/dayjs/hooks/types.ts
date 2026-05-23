import type { Dayjs } from "dayjs";

interface UseDateReturn {
  date: Dayjs;
  setDay: (day: number) => void;
  setMonth: (month: number) => void;
  setYear: (year: number) => void;
}

interface useDateOptions {
  defaultState?: Dayjs;
  jalaliday?: boolean;
}

export type { UseDateReturn, useDateOptions };
