"use client";
import { widgetOptions } from "@/constant/features/trading/chartConfig";
import useSymbolParams from "@/hooks/features/trading/useSymbolParams";
import { TradingViewChart, WidgetOptions } from "@/packages/tradingview";
import { useMemo } from "react";

function TradeChart() {
  const [symbol, setSymbolParam] = useSymbolParams();

  const widgetConfig = useMemo(
    () =>
      ({
        ...widgetOptions,
        theme: "Dark",
        symbol: symbol!,
      }) satisfies Omit<WidgetOptions, "container">,
    [symbol],
  );
  return (
    <TradingViewChart
      widgetOptions={widgetConfig}
      onSymbolChange={(symbolName) => {
        setSymbolParam(symbolName);
      }}
    />
  );
}

export default TradeChart;
