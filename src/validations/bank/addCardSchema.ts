import { object, string } from "zod";
const inValidDateError = "تاریخ معتبر نیست";
const invalidCardNumberError = "شماره کارت نامعتبر است";

const addCardSchema = object({
  cardNumber: string(invalidCardNumberError)
    .length(16, invalidCardNumberError)
    .regex(/^\d+$/, invalidCardNumberError),
  birthDateShamsi: string(inValidDateError)
});

export default addCardSchema;
