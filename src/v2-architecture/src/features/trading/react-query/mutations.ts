import { createMutationOptions } from "@/v2-architecture/src/shared/lib/react-query";
import { setDemoSetting, SetDemoSettingVariables } from "../api";
import { demoSettingKey } from "./keys";

export const setDemoConfig = createMutationOptions({
  mutationFn: (vars: SetDemoSettingVariables) => {
    return setDemoSetting({ body: vars });
  },
  meta: {
    invalidates: [demoSettingKey],
  },
});
