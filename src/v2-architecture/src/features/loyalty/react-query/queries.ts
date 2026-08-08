import { queryOptions } from "@tanstack/react-query";
import { loyaltyProgressKey } from "./keys";
import { loyaltyProgress } from "../api";

export const loyaltyProgressConfig = () =>
  queryOptions({
    queryKey: loyaltyProgressKey,
    queryFn: ({ signal }) => {
      return loyaltyProgress({ signal });
    },
  });
