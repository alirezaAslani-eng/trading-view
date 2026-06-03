import { object, string } from "zod";
const inValidDateError = "تاریخ معتبر نیست";
const invalidIbanError = "شماره شبا باید 24 رقم باشد";

const addShabaSchema = object({
  Iban: string(invalidIbanError)
    .length(24, invalidIbanError)
    .regex(/^\d{24}$/, invalidIbanError),
  birthDateShamsi: string(inValidDateError)
});

export default addShabaSchema;
