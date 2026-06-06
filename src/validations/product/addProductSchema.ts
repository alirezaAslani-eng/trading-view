import { object, string, coerce } from "zod";

const addProductSchema = object({
  productCode: string(" "),
  name: string(" "),
  categoryId: string(" "),
});

export default addProductSchema;
