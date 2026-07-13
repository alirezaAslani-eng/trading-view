import { number, object, string, coerce } from "zod";

const withdrawSchema = object({
  amount: number(" ").min(1, " "),
  bankAccountId: coerce.number(" "),
});

export default withdrawSchema;
