import useSymbolParams from "@/hooks/features/trading/useSymbolParams";
import { marketTickerInfoConfig } from "@/packages/react-query";
import { calculateTotalTradePrice } from "@/utils";
import { loyaltyProgressConfig } from "@/v2-architecture/src/features/loyalty/react-query";
import { getTradePrecent } from "@/v2-architecture/src/features/trading";
import {
  TradeFormSchemaInputType,
  TradeFormSchemaOutputType,
} from "@/validations/types";
import { useQuery } from "@tanstack/react-query";
import { useFormContext, useWatch } from "react-hook-form";

export const useTradeFormContext = useFormContext<
  TradeFormSchemaInputType,
  unknown,
  TradeFormSchemaOutputType
>;

const useLimitedTotalPrice = () => {
  const form = useTradeFormContext();

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
  const form = useTradeFormContext();

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

const trade_precent = getTradePrecent();
export const useFinalTradeSunmmary = () => {
  //#region // * ------------ Summary State ------------
  const form = useTradeFormContext();

  const orderType = useWatch({ control: form.control, name: "orderType" });
  const orderSide = useWatch({ control: form.control, name: "orderSide" });

  const limitedTotalPrice = useLimitedTotalPrice();
  const marketTotalPrice = useMarketTotalPrice(); // ! server state

  const totalPrice =
    orderType === "limit" ? limitedTotalPrice : marketTotalPrice;

  const { calculate } = useCalculateFee();
  const fee_price = calculate(totalPrice); // ! server state

  const final_price =
    orderSide === "buy" ? totalPrice + fee_price : totalPrice - fee_price;

  // * calculate after final
  const price_10_precent = (trade_precent.number * final_price) / 100;
  const price_90_precent = (100 - trade_precent.number * final_price) / 100;
  //#endregion // * ------------ Summary State ------------

  return {
    fee_price,
    final_price,
    price_10_precent,
    price_90_precent,
  };
};

export { useLimitedTotalPrice, useMarketTotalPrice };
