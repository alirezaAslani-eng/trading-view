import { type infer as Infer, object, string } from "zod";
import { phoneNumberValidation } from "../shared";

export const addCompanyMemberSchema = object({
  memberPhone: phoneNumberValidation(),
  companyId: string(),
});

export type AddCompanyMemberSchema = Infer<typeof addCompanyMemberSchema>;
