
interface WalletAsset {
  assetSymbol: string;
  availableBalance: number;
  lockedBalance: number;
  livePrice: number;
  totalValueInIrt: number;
}

interface WalletBalanceResponse {
  totalPortfolioValueIrt: number;
  assets: WalletAsset[];
}
export type { WalletBalanceResponse };
