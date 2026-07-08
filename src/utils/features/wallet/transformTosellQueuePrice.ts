import { WalletPortfolioResponse } from "@/api/types";
import { IRT_ASSET_SYMBOL } from "@/constant/features/wallet/asset";

const calculatePriceInQueue = (livePrice: number, lockPrice: number) => {
  return livePrice * lockPrice;
};
function transformTosellQueuePrice(
  data: WalletPortfolioResponse | undefined,
): number {
  if (!!!data) return 0;

  let totalSellQueue = 0;

  data.assets.forEach((asset) => {
    if (asset.assetSymbol === IRT_ASSET_SYMBOL) return;

    totalSellQueue = calculatePriceInQueue(
      asset.livePrice,
      asset.lockedBalance,
    );
  });

  return totalSellQueue;
}

export default transformTosellQueuePrice;
