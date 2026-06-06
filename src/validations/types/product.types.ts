import { Infer } from "zod";
import type addProductSchema from "../product/addProductSchema";

// * --start-- addProductSchema.ts ----
export type AddProductSchemaType = Infer<typeof addProductSchema>;
// * --end-- addProductSchema.ts ----
