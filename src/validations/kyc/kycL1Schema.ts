import { type infer as Infer, object, string } from "zod";
import isValidNationalCodeFormat from "@/utils/features/identification/isValidNationalCodeFormat";

const inValidDateError = "تاریخ معتبر نیست";
const invalidNationalError = "کد ملی نا معتبر";

export const kycL1Schema = object({
  nationalId: string(invalidNationalError)
    .regex(/^\d+$/, invalidNationalError)
    .refine((v) => isValidNationalCodeFormat(v), invalidNationalError),
  birthYear: string(inValidDateError).regex(/^\d+$/, inValidDateError),
  birthDay: string(inValidDateError)
    .regex(/^\d+$/, inValidDateError)
    .min(1, inValidDateError)
    .max(31, inValidDateError),
  birthMonth: string(inValidDateError)
    .regex(/^\d+$/, inValidDateError)
    .min(0, inValidDateError)
    .max(11, inValidDateError)
    .transform((v) => {
      return String(Number(v) + 1);
    }),
});

export type KycL1Schema = Infer<typeof kycL1Schema>;
