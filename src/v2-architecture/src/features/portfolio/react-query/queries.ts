import { queryOptions } from "@tanstack/react-query";
import { portfolioTrendtKey } from "./keys";
import { portfolioTrend } from "../api";

export const portfolioTrendConfig = () =>
  queryOptions({
    queryKey: portfolioTrendtKey,
    queryFn: ({ signal }) => {
      return portfolioTrend({ signal });
    },
  });
