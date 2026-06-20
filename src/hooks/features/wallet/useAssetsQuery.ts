import { walletPortfolioConfig } from "@/packages/react-query";
import { useQuery } from "@tanstack/react-query";

const walletPortfolioQueryConfig = walletPortfolioConfig();

function useAssetsQuery() {
  return useQuery({
    ...walletPortfolioQueryConfig,
    select(data) {
      const assets = data.assets.filter((asset) => {
        return asset.assetSymbol !== "IRT";
      });
      return assets;
    },
  });
}

export default useAssetsQuery;
