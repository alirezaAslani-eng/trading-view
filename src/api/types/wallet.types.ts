interface WalletAsset {
  assetSymbol: string;
  availableBalance: number;
  lockedBalance: number;
  livePrice: number;
  totalValueInIrt: number;
  lockedDetails: {
    totalLocked: number;
    lockedInOrders: number;
    lockedForDebt: number;
    lockedByAdmin: number;
  };
}

interface WalletPortfolioResponse {
  totalPortfolioValueIrt: number;
  totalProfitLoss24hIrt: number;
  totalProfitLoss24hPercentage: number;
  availableCash: number;
  marginCredit: number;
  buyingPower: number;
  assets: WalletAsset[];
}
export type { WalletPortfolioResponse, WalletAsset };
