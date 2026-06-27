import { WalletAsset, WalletPortfolioResponse } from "@/api/types";

function extractIRTAsset(
  walletPortofolio: WalletPortfolioResponse | undefined,
): WalletAsset | null {
  const assets = walletPortofolio?.assets;
  if (!assets || !Array.isArray(assets)) return null;

  return (
    assets.find((asset) => asset.assetSymbol === "IRT") ?? {
      assetSymbol: "IRT",
      availableBalance: 0,
      livePrice: 0,
      lockedBalance: 0,
      totalValueInIrt: 0,
    }
  );
}

function extractNonIRTAssets(
  walletPortofolio: WalletPortfolioResponse | undefined,
): WalletAsset[] {
  const assets = walletPortofolio?.assets;
  if (!assets || !Array.isArray(assets)) return [];

  return assets.filter((asset) => asset.assetSymbol !== "IRT");
}

export { extractNonIRTAssets, extractIRTAsset };
