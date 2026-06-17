import { object, string, number, boolean, coerce } from "zod";

const addProductSchema = object({
  productName: string(" "),
  productCode: string(" "),
  name: string(" "),
  unitOfMeasure: string(" "),
  productStatusId: boolean(" "),
  initialPrice: number(" "),
  maxTradingSupply: number(" "),
  categoryId: string(" ")
    .regex(/^\d+$/)
    .transform((v) => Number(v)),
});
export default addProductSchema;
