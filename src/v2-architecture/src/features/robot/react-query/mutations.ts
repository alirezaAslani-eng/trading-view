import { createMutationOptions } from "@/v2-architecture/src/shared/lib/react-query";
import { configureBot, ConfigureBotVariables } from "../api";
import { botSettingKey } from "./keys";

export const configureBotConfig = createMutationOptions({
  mutationFn: (vars: ConfigureBotVariables) => {
    return configureBot({ body: vars });
  },
  meta: {
    invalidates: [botSettingKey],
  },
});
