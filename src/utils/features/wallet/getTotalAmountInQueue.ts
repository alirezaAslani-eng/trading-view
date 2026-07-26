import { WalletPortfolioResponse } from "@/api/types";

function getTotalAmountInQueue(
  data: WalletPortfolioResponse | undefined
): number {
  if (!!!data) return 0;

  let totalAmountInQueue = data.assets.reduce<number>((acc, next) => {
    return acc + next.lockedBalance;
  }, 0);
  console.log({ totalAmountInQueue });

  return totalAmountInQueue;
}

export default getTotalAmountInQueue;
