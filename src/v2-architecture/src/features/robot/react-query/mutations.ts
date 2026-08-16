import { createMutationOptions } from "@/v2-architecture/src/shared/lib/react-query";
import { botSettingKey, tradeRobotsKey } from "./keys";
import {
  configureBot,
  ConfigureBotParams,
  ConfigureBotVariables,
  CreateRobotVariables,
  createTradeRobot,
  toggleTradeBot,
  ToggleTradeBotParams,
  ToggleTradeBotVariables,
} from "../api";

export const configureBotConfig = createMutationOptions({
  mutationFn: (vars: ConfigureBotVariables & ConfigureBotParams) => {
    const { botId, ...body } = vars;
    return configureBot({ body, params: { botId } });
  },
  meta: {
    // ! OPTIMIZE Needed : do optimistic update instead of invalidating the cache
    invalidates: [botSettingKey, tradeRobotsKey],
  },
});

export const toggleTradeBotConfig = createMutationOptions({
  meta: {
    disableSuccessAlert: true,
    // ! OPTIMIZE Needed : do optimistic update instead of invalidating the cache
    invalidates: [botSettingKey, tradeRobotsKey],
  },
  mutationFn: (vars: ToggleTradeBotParams & ToggleTradeBotVariables) => {
    const { botId, ...body } = vars;
    return toggleTradeBot({ params: { botId }, body });
  },
});

export const createTradeRobotConfig = createMutationOptions({
  meta: {
    successMessage: "ربات با موفقیت ایجاد شد",
    // ! OPTIMIZE Needed : do optimistic update instead of invalidating the cache
    invalidates: [tradeRobotsKey],
  },
  mutationFn: (vars: CreateRobotVariables) => {
    return createTradeRobot({ body: vars });
  },
});
