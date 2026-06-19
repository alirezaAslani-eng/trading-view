import { createParser } from "nuqs";

export const parseAsUppercase = createParser({
  parse: (value) => {
    return value?.toUpperCase() ?? null;
  },
  serialize: (value) => {
    return value?.toUpperCase() ?? "";
  },
});
