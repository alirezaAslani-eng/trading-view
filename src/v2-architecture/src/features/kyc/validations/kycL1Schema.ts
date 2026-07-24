import type { Infer } from "zod";
import { object, string } from "zod";
const inValidDateError = "تاریخ معتبر نیست";
const invalidNationalError = "کد ملی نا معتبر";

export const kvcL1Schema = object({
  nationalId: string(invalidNationalError)
    .length(10, invalidNationalError)
    .regex(/^\d+$/, invalidNationalError),
  birthDay: string(inValidDateError)
    .regex(/^\d+$/, inValidDateError)
    .min(1, inValidDateError)
    .max(31, inValidDateError),
  birthMonth: string(inValidDateError)
    .regex(/^\d+$/, inValidDateError)
    .min(0, inValidDateError)
    .max(11, inValidDateError)
    .transform((v) => String(Number(v) + 1)),
  birthYear: string(inValidDateError).regex(/^\d+$/, inValidDateError),
});

//#region // * ------------ Types ------------
export type KycL1Schema = Infer<typeof kvcL1Schema>;
//#endregion // * ------------ Types ------------
