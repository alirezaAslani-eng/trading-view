import { queryOptions } from "@tanstack/react-query";
import { portfolioTrendtDynamicKey, portfolioTrendtKey } from "./keys";
import { portfolioTrend } from "../api";

export const portfolioTrendConfig = (isdemo: boolean) =>
  queryOptions({
    queryKey: portfolioTrendtDynamicKey(isdemo),
    queryFn: ({ signal }) => {
      return portfolioTrend({ signal, queryParams: { isdemo } });
    },
  });
