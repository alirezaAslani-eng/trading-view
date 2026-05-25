import { object, string } from "zod";

const kycL2Schema = object({
  postalCode: string().length(10),
});

export default kycL2Schema;
