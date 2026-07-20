import { queryOptions } from "@tanstack/react-query";
import { demoSetting } from "../api";
import { demoSettingKey } from "./keys";

export const demoSettingConfig = () => {
  return queryOptions({
    queryKey: demoSettingKey,
    queryFn: ({ signal }) => {
      return demoSetting({ signal });
    },
  });
};
