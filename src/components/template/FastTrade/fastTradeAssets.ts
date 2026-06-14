export type FastTradeAsset = {
  id: string;
  name: string;
  price: number;
  change24h: number;
};

export const fastTradeAssets: FastTradeAsset[] = [
  { id: "rebar", name: "میلگرد", price: 28750, change24h: 1.8 },
  { id: "billet", name: "شمش", price: 26500, change24h: 1.2 },
  { id: "sheet", name: "ورق", price: 35600, change24h: 0.9 },
  { id: "sponge-iron", name: "آهن اسفنجی", price: 24100, change24h: 2.1 },
  { id: "angle", name: "نبشی", price: 28900, change24h: -0.7 },
  { id: "channel", name: "ناودانی", price: 30100, change24h: 1.2 },
];

export const fastTradeCommodities = fastTradeAssets.map((asset) => ({
  id: asset.id,
  name: asset.name,
}));
