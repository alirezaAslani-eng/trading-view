import { WalletAsset } from "@/api/types";
import { walletPortfolioConfig } from "@/packages/react-query";
import { useQuery } from "@tanstack/react-query";

const walletPortfolioQueryConfig = walletPortfolioConfig();

function useIRTAssetQuery() {
  return useQuery({
    ...walletPortfolioQueryConfig,
    select(data): WalletAsset {
      const IRTAssetInfo = data.assets.find((asset) => {
        asset.assetSymbol === "IRT";
      });
      if (!IRTAssetInfo)
        return {
          assetSymbol: "IRT",
          availableBalance: 0,
          livePrice: 0,
          lockedBalance: 0,
          totalValueInIrt: 0,
        };
      return IRTAssetInfo;
    },
  });
}

export default useIRTAssetQuery;
