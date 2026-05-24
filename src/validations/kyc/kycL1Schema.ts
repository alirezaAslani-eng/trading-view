import { number, object, string } from "zod";
import isValidNationalCodeFormat from "@/utils/features/identification/isValidNationalCodeFormat";
import { dayjs } from "@/packages/dayjs";
const inValidDateError = "تاریخ معتبر نیست";
const invalidNationalError = "کد ملی نا معتبر";

const kvcL1Schema = object({
  nationalId: string(invalidNationalError)
    .length(10, invalidNationalError)
    .regex(/^\d+$/, invalidNationalError)
    .refine((v) => isValidNationalCodeFormat(v), {
      message: invalidNationalError,
    }),
  birthDay: string(inValidDateError)
    .regex(/^\d+$/, inValidDateError)
    .min(1, inValidDateError)
    .max(31, inValidDateError),
  birthMonth: string(inValidDateError)
    .regex(/^\d+$/, inValidDateError)
    .min(0, inValidDateError)
    .max(11, inValidDateError),
  birthYear: string(inValidDateError).regex(/^\d+$/, inValidDateError),
});

export default kvcL1Schema;
