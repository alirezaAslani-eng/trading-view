import { object, string } from "zod";

const addGroupSchema = object({
  name: string(" "),
});

export default addGroupSchema;
