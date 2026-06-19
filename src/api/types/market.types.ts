type MarketTicker = {
  symbol: string;
  name: string;
  lastPrice: number;
  high24h: number;
  low24h: number;
  change24h: number;
  change7d: number;
  change30d: number;
  volume24h: number;
};

type MarketTickersResponse = MarketTicker[];

export type { MarketTicker, MarketTickersResponse };
