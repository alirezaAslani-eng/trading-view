import useSymbolParams from "@/hooks/features/trading/useSymbolParams";
import { marketTickerInfoConfig } from "@/packages/react-query";
import { calculateTotalTradePrice } from "@/utils";
import { loyaltyProgressConfig } from "@/v2-architecture/src/features/loyalty/react-query";
import { TradeFormSchemaInputType } from "@/validations/types";
import { useQuery } from "@tanstack/react-query";
import { useFormContext, useWatch } from "react-hook-form";

const useLimitedTotalPrice = () => {
  const form = useFormContext<TradeFormSchemaInputType>();

  const limitedPrice = useWatch({
    control: form.control,
    name: "limitedPrice",
  }) as number;

  const weight = useWatch({
    control: form.control,
    name: "weight",
  }) as number;

  return calculateTotalTradePrice(weight || 0, limitedPrice || 0);
};

const useMarketTotalPrice = () => {
  const form = useFormContext<TradeFormSchemaInputType>();

  const weight = useWatch({
    control: form.control,
    name: "weight",
  }) as number;

  const [symbol] = useSymbolParams();
  const tickerInfo = useQuery(marketTickerInfoConfig(symbol));

  return calculateTotalTradePrice(weight || 0, tickerInfo.data?.lastPrice || 0);
};

const calculateFee = (amount: number, fee: number) => {
  return Math.floor((amount * fee) / 100);
};
export const useCalculateFee = () => {
  const loyaltyProgressQuery = useQuery(loyaltyProgressConfig());
  const { currentFeeRate = 0 } = loyaltyProgressQuery.data ?? {};

  return {
    calculate: (amount: number) => calculateFee(amount, currentFeeRate),
    pending: loyaltyProgressQuery.isPending,
    currentFee: currentFeeRate,
  };
};

export { useLimitedTotalPrice, useMarketTotalPrice };
