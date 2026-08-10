import useSymbolParams from "@/hooks/features/trading/useSymbolParams";
import {
  marketTickerInfoConfig,
  walletPortfolioConfig,
} from "@/packages/react-query";
import { calculateTotalTradePrice } from "@/utils";
import { extractIRTAsset } from "@/utils/features/wallet/walletProtofolioTransformers";
import { loyaltyProgressConfig } from "@/v2-architecture/src/features/loyalty/react-query";
import { getTradePrecent } from "@/v2-architecture/src/features/trading";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useWatch } from "react-hook-form";
import { useTradeForm } from "./TradeFormContext";

const useLimitedTotalPrice = () => {
  const form = useTradeForm();

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
  const form = useTradeForm();

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
  //#region // * ------------ Wallet Info ------------
  const [symbol] = useSymbolParams();
  const walletQuery = useQuery(walletPortfolioConfig());

  const { assets } = walletQuery.data ?? {};

  const wallet = extractIRTAsset(walletQuery.data); // ! server state

  const asset = useMemo(() => {
    return assets?.find((asset) => {
      return asset.assetSymbol === symbol;
    });
  }, [symbol, assets]); // ! server state

  const assetBalance = asset?.availableBalance ?? 0;
  const walletBlance = wallet?.availableBalance ?? 0;
  //#endregion // * ------------ Wallet Info ------------

  //#region // * ------------ Summary State ------------
  const form = useTradeForm();

  const orderType = useWatch({ control: form.control, name: "orderType" });
  const orderSide = useWatch({ control: form.control, name: "orderSide" });

  const limitedTotalPrice = useLimitedTotalPrice();
  const marketTotalPrice = useMarketTotalPrice(); // ! server state

  const totalPrice =
    orderType === "limit" ? limitedTotalPrice : marketTotalPrice;

  const { calculate } = useCalculateFee();
  const fee_price = calculate(totalPrice); // ! server state

  //#region // * ------------ Final Price ------------
  const final_price =
    orderSide === "buy" ? totalPrice + fee_price : totalPrice - fee_price;
  //#endregion // * ------------ Final Price ------------

  //#region // * ------------ 10 Precent of Price ------------
  const price_10_precent = (trade_precent.number * final_price) / 100;
  const price_90_precent = (100 - trade_precent.number * final_price) / 100;
  //#endregion // * ------------ 10 Precent of Price ------------

  //#region // * ------------ 10 Precent of Amount For (Sell)------------
  const amount_10_precent = (trade_precent.number * assetBalance) / 100;
  const amount_90_precent = (100 - trade_precent.number * assetBalance) / 100;
  //#endregion // * ------------ 10 Precent of Amount For (Sell) ------------
  //#endregion // * ------------ Summary State ------------

  return {
    fee_price,
    final_price,
    price_10_precent,
    price_90_precent,
    walletBlance,
    assetBalance,
    symbol,
  };
};

export { useLimitedTotalPrice, useMarketTotalPrice };
