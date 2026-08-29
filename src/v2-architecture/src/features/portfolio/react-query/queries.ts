import { queryOptions } from "@tanstack/react-query";
import { marginSettingsKey, portfolioTrendtDynamicKey } from "./keys";
import { marginSettings, portfolioTrend } from "../api";

export const portfolioTrendConfig = (isdemo: boolean) =>
  queryOptions({
    queryKey: portfolioTrendtDynamicKey(isdemo),
    queryFn: ({ signal }) => {
      return portfolioTrend({ signal, queryParams: { isdemo } });
    },
  });

export const marginSettingsConfig = () =>
  queryOptions({
    queryKey: marginSettingsKey,
    queryFn: ({ signal }) => {
      return marginSettings({ signal });
    },
  });
