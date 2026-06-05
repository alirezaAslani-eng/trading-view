import { number, object, string } from "zod";

const withdrawSchema = object({
  amount: number(" ").min(1, " "),
  bankAccountId: string(" "),
});

export default withdrawSchema;
