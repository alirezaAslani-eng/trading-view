import { TradeModeStore } from "@/context/feature/trade/TradeMode/helpers";
import { createMutationOptions } from "@/v2-architecture/src/shared/lib/react-query";
import { signin, SigninVariables } from "../api";
import { queryClient } from "@/packages/react-query";

export const signinConfig = createMutationOptions({
  onSuccess: () => {
    TradeModeStore.clearStore();
    queryClient.resetQueries();
  },
  mutationFn: (vars: SigninVariables) => {
    return signin({ body: vars });
  },
  meta: {
    disableSuccessAlert: true,
  },
});
