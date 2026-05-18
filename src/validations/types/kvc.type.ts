import { Infer } from "zod";
import type kvcL1Schema from "../kvc/kvcL1Schema";

// * -----start---- kvcL1Schema.ts ------------
type KvcL1SchemaType = Infer<typeof kvcL1Schema>;
// * -----end---- kvcL1Schema.ts ------------

export type { KvcL1SchemaType };
