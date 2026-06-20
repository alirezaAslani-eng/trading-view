"use client";
import { widgetOptions } from "@/constant/features/trading/chartConfig";
import { symbolKey } from "@/packages/nuqs";
import { parseAsUppercase } from "@/packages/nuqs/parsers";
import { TradingViewChart, WidgetOptions } from "@/packages/tradingview";
import { useQueryState } from "nuqs";
import { useMemo } from "react";

function TradeChart() {
  const [symbol, setSymbol] = useQueryState(symbolKey, parseAsUppercase);

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
        setSymbol(symbolName);
      }}
    />
  );
}

export default TradeChart;
