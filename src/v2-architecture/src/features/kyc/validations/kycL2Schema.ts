import { type Infer, object, string } from "zod";

export const kycL2Schema = object({
  postalCode: string().length(10),
});

//#region // * ------------ Types ------------
export type KycL2Schema = Infer<typeof kycL2Schema>;
//#endregion // * ------------ Types ------------
