import { createMutationOptions } from "@/v2-architecture/src/shared/lib/react-query";
import {
  setDemoSetting,
  SetDemoSettingVariables,
  settleTradeContract,
  SettleTradeContractParams,
} from "../api";
import { demoSettingKey } from "./keys";
import { walletProtfolioKey } from "@/packages/react-query";

export const setDemoConfig = createMutationOptions({
  mutationFn: (vars: SetDemoSettingVariables) => {
    return setDemoSetting({ body: vars });
  },
  meta: {
    invalidates: [demoSettingKey],
  },
});
export const settleTradeContractConfig = createMutationOptions({
  meta: { invalidates: [walletProtfolioKey] },
  mutationFn: (vars: SettleTradeContractParams) => {
    return settleTradeContract({ params: vars });
  },
});
