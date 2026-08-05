import { queryOptions } from "@tanstack/react-query";
import { ProductTrendFilters } from "../types";
import { productTrendDynamicKey } from "./keys";
import { productTrend } from "../api";
import { toProductTrendChart } from "../api";

export const productTrendConfig = (filters: ProductTrendFilters) => {
  const { symbol } = filters;
  return queryOptions({
    enabled: !!symbol,
    select(data) {
      return toProductTrendChart(data);
    },
    queryKey: productTrendDynamicKey(filters),
    queryFn: () => {
      return productTrend({ params: { symbol: symbol! } });
    },
  });
};
