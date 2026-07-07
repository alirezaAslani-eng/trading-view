import useSymbolParams from "@/hooks/features/trading/useSymbolParams";
import { marketTickerInfoConfig } from "@/packages/react-query";
import { calculateTotalTradePrice } from "@/utils";
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

export { useLimitedTotalPrice, useMarketTotalPrice };
