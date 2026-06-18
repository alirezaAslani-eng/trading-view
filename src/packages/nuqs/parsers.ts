import { createParser } from "nuqs";

export const uppercaseParser = createParser({
  parse: (value) => {
    return value?.toUpperCase() ?? null;
  },
  serialize: (value) => {
    return value?.toUpperCase() ?? "";
  },
});
