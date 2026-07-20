import useUpdateEffect from "@/hooks/app/useUpdateEffect";
import { RefObject, useEffect, useEffectEvent } from "react";
import { ChangedSymbolInfo, SymbolChangeHandler } from "./types";
import checkWidget from "./utils";
import {
  IChartingLibraryWidget,
  ThemeName,
} from "./charting_library/charting_library";

function useSymbolSync(
  widgetRef: RefObject<IChartingLibraryWidget | null>,
  symbol: string,
) {
  useUpdateEffect(() => {
    const widget = checkWidget(widgetRef.current);
    if (!widget) return;

    widget.onChartReady(() => {
      const chart = widget.activeChart();
      widget.setSymbol(symbol, chart.resolution(), () => {});
    });
  }, [symbol]);
}

function useThemeSync(
  widgetRef: RefObject<IChartingLibraryWidget | null>,
  theme: ThemeName,
) {
  useUpdateEffect(() => {
    const widget = checkWidget(widgetRef.current);
    if (!widget) return;

    widget.onChartReady(() => {
      widget.changeTheme(theme);
    });
  }, [theme]);
}

function useSymbolChangeEvent(
  widgetRef: RefObject<IChartingLibraryWidget | null>,
  onSymbolChange: SymbolChangeHandler | undefined,
) {
  const handler = useEffectEvent(onSymbolChange ?? (() => {}));

  useEffect(() => {
    const widget = checkWidget(widgetRef.current);
    if (!widget) return;

    widget.onChartReady(() => {
      const chart = widget.activeChart();

      const cb = (info: ChangedSymbolInfo) => {
        handler(info.name, info);
      };

      chart.onSymbolChanged().subscribe(
        null,
        //@ts-ignore
        cb,
      );

      return () => {
        chart.onSymbolChanged().unsubscribe(
          null,
          //@ts-ignore
          cb,
        );
      };
    });
  }, []);
}

export { useSymbolChangeEvent, useThemeSync, useSymbolSync };
