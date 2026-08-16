import { queryOptions } from "@tanstack/react-query";
import { botSetting, tradeRobots } from "../api";
import { botSettingDynamicKey, tradeRobotsKey } from "./keys";

export const botSettingConfig = (botId: string) =>
  queryOptions({
    queryKey: botSettingDynamicKey(botId),
    queryFn: ({ signal }) => {
      return botSetting({ signal, params: { botId } });
    },
  });

export const tradeRobotsConfig = () =>
  queryOptions({
    queryKey: tradeRobotsKey,
    queryFn: ({ signal }) => {
      return tradeRobots({ signal });
    },
  });
