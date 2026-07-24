import { queryOptions } from "@tanstack/react-query";
import { dashboardInfoKey } from "./keys";
import { dashboardInfo } from "../api";

export const dashboardInfoConfig = () => {
  return queryOptions({
    queryKey: dashboardInfoKey,
    queryFn: async () => {
      const res = await dashboardInfo();
      return res;
    },
  });
};
