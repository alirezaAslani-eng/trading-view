import { type infer as Infer, object, string } from "zod";

export const createCompanyScheam = object({
  companyNationalId: string(),
});

export type CreateCompanySchema = Infer<typeof createCompanyScheam>;
