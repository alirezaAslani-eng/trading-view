import { type infer as Infer, number, object } from "zod";

export const marginTransferInSchema = object({
  amount: number("مبلغ نامعتبر است").positive("مبلغ باید بیشتر از صفر باشد"),
});

export type MarginTransferInSchema = Infer<typeof marginTransferInSchema>;
