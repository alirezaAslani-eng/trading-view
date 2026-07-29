import { TradeModeStore } from "@/context/feature/trade/TradeMode/helpers";
import { createMutationOptions } from "@/v2-architecture/src/shared/lib/react-query";
import {
  createPassword,
  CreatePasswordVariables,
  signin,
  SigninVariables,
} from "../api";

export const createPasswordConfig = createMutationOptions({
  mutationFn: (vars: CreatePasswordVariables) => {
    return createPassword({ body: vars });
  },
});

export const signinConfig = createMutationOptions({
  onSuccess: () => TradeModeStore.clearStore(),
  mutationFn: (vars: SigninVariables) => {
    return signin({ body: vars });
  },
  meta: {
    disableSuccessAlert: true,
  },
});
