import { queryOptions } from "@tanstack/react-query";
import { demoSetting, tradeContracts } from "../api";
import { demoSettingKey, tradeContractsKey } from "./keys";

export const demoSettingConfig = () => {
  return queryOptions({
    queryKey: demoSettingKey,
    queryFn: ({ signal }) => {
      return demoSetting({ signal });
    },
  });
};

export const tradeContractsConfig = () => {
  return queryOptions({
    // ! OMTIMISE : tradeContractsKey must be invalidated only for settlement=1 trade mode
    queryKey: tradeContractsKey,
    refetchOnMount: true,
    queryFn: ({ signal }) => {
      return tradeContracts({ signal });
    },
  });
};
