import { object, string } from "zod";
import isValidNationalCodeFormat from "@/utils/features/identification/isValidNationalCodeFormat";

const inValidDateError = "تاریخ معتبر نیست";
const invalidNationalError = "کد ملی نا معتبر";

const kvcL1Schema = object({
  nationalId: string(invalidNationalError)
    .length(10, invalidNationalError)
    .regex(/^\d+$/, invalidNationalError)
    .refine((v) => isValidNationalCodeFormat(v), {
      message: invalidNationalError,
    }),

  birthDateShamsi: string(inValidDateError)
    .regex(/^\d{4}\/\d{2}\/\d{2}$/, inValidDateError)
    .refine(
      (val) => {
        const [y, m, d] = val.split("/").map(Number);
        return m >= 1 && m <= 12 && d >= 1 && d <= 31;
      },
      { message: inValidDateError },
    ),
});

export default kvcL1Schema;
