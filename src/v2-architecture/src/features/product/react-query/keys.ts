import { ProductTrendFilters } from "../types";

//#region // * ------------ product-trend ------------
const productTrendKey = ["product-trend"];
export const productTrendDynamicKey = (filters: ProductTrendFilters) => [
  ...productTrendKey,
  filters,
];
//#endregion // * ------------ product-trend ------------
