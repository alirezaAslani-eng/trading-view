import { walletProtfolioKey } from "@/packages/react-query";
import { marginTransferIn, MarginTransferInVariables } from "../api";
import { createMutationOptions } from "@/v2-architecture/src/shared/lib/react-query";

export const marginTransferInConfig = createMutationOptions({
  meta: {
    successMessage: "انتقال به اعتبار معاملاتی با موفقیت انجام شد",
    invalidates: [walletProtfolioKey], // ! SignalR might update the wallet
  },
  mutationFn: (vars: MarginTransferInVariables) => {
    return marginTransferIn({ body: vars });
  },
});
