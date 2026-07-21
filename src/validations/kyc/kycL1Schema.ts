import {  discriminatedUnion, literal, object, string } from "zod";
import isValidNationalCodeFormat from "@/utils/features/identification/isValidNationalCodeFormat";
const inValidDateError = "تاریخ معتبر نیست";
const invalidNationalError = "کد ملی نا معتبر";


const companySchema = object({
  isCompany: literal(true),
  nationalId: string(invalidNationalError).regex(/^\d+$/, invalidNationalError),
});

const personSchema = object({
  isCompany: literal(false),
  nationalId: string(invalidNationalError).regex(/^\d+$/, invalidNationalError),
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

const kvcL1Schema = discriminatedUnion("isCompany", [companySchema, personSchema]);

export default kvcL1Schema;