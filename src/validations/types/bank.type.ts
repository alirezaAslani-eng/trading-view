import { Infer } from "zod";
import type addCardSchema from "../bank/addCardSchema";
import type addShabaSchema from "../bank/addShabaSchema";

// * -----start---- addCardSchema.ts ------------
type AddCardSchemaType = Infer<typeof addCardSchema>;
// * -----end---- addCardSchema.ts ------------

// * -----start---- addShabaSchema.ts ------------
type AddShabaSchemaType = Infer<typeof addShabaSchema>;
// * -----end---- addShabaSchema.ts ------------

export type { AddCardSchemaType, AddShabaSchemaType };
