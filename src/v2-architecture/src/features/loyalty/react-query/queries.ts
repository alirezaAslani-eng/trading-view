import { queryOptions } from "@tanstack/react-query";
import { loyaltyProgressKey, loyaltyRulesKey } from "./keys";
import { loyaltyProgress, loyaltyRules } from "../api";

export const loyaltyProgressConfig = () =>
  queryOptions({
    queryKey: loyaltyProgressKey,
    queryFn: ({ signal }) => {
      return loyaltyProgress({ signal });
    },
  });

export const loyaltyRulesConfig = () =>
  queryOptions({
    queryKey: loyaltyRulesKey,
    queryFn: ({ signal }) => {
      return loyaltyRules({ signal });
    },
  });
