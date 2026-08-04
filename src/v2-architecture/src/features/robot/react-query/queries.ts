import { queryOptions } from "@tanstack/react-query";
import { botSetting } from "../api";
import { botSettingKey } from "./keys";

export const botSettingConfig = () =>
  queryOptions({
    queryKey: botSettingKey,
    queryFn: ({ signal }) => {
      return botSetting({ signal });
    },
  });
