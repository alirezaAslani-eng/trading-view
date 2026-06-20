interface WalletAsset {
  assetSymbol: string;
  availableBalance: number;
  lockedBalance: number;
  livePrice: number;
  totalValueInIrt: number;
}

interface WalletPortfolioResponse {
  totalPortfolioValueIrt: number;
  assets: WalletAsset[];
}
export type { WalletPortfolioResponse };
