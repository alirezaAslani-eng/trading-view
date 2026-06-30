interface WalletAsset {
  assetSymbol: string;
  availableBalance: number;
  lockedBalance: number;
  livePrice: number;
  totalValueInIrt: number;
}

interface WalletPortfolioResponse {
  totalPortfolioValueIrt:number;
  totalProfitLoss24hIrt:number;
  totalProfitLoss24hPercentage:number;
  assets: WalletAsset[];
}
export type { WalletPortfolioResponse, WalletAsset };
