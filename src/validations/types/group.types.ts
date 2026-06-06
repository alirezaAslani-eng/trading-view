import { Infer } from "zod";
import type addGroupSchema from "../group/addGroupSchema";

// * --start-- addGroupSchema.ts ----
export type AddGroupSchemaType = Infer<typeof addGroupSchema>;
// * --end-- addGroupSchema.ts ----
