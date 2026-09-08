import { WalletAsset } from "@/api/types";

interface WalletAssetWithColor extends WalletAsset {
  color: string;
}

export const WALLET_ASSET_COLORS = [
  "#5B8DEF",
  "#7C6CF2",
  "#2FB8A6",
  "#D98A3A",
  "#D96C8A",
  "#6FAE7A",
  "#9B7AC7",
  "#4FA3C7",
  "#B28A5A",
  "#7B8794",
];

export function addAssetColor(assets: WalletAsset[]): WalletAssetWithColor[] {
  return assets.map((asset, index) => ({
    ...asset,
    color: WALLET_ASSET_COLORS[index % WALLET_ASSET_COLORS.length],
  }));
}
