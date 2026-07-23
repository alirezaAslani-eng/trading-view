"use client";
import { memo, RefObject, useEffect, useRef } from "react";
import { widget } from "./charting_library/charting_library.esm";
import { SymbolChangeHandler, WidgetOptions } from "./types";
import type { IChartingLibraryWidget } from "./charting_library/charting_library";
import { useSymbolChangeEvent, useSymbolSync, useThemeSync } from "./hooks";
import { Box, Stack, Typography } from "@mui/material";
import NextImage from "@/components/ui/Image/NextImage";

// type WidgetOptions =
//   | ChartingLibraryWidgetOptions
//   | TradingTerminalWidgetOptions;

// type SymbolRegistryItem = SearchSymbolResultItem & {
//   pricescale: number;
// };

// type Bar = {
//   time: number;
//   open: number;
//   high: number;
//   low: number;
//   close: number;
//   volume: number;
// };

interface BaseChartProps {
  widgetOptions: Omit<WidgetOptions, "container">;
  widgetRef?: RefObject<IChartingLibraryWidget | null>;
}

const BaseChart = memo((props: BaseChartProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  console.log("rendered");
  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const widgetInstance = new widget({
      ...props.widgetOptions,
      container: containerRef.current,
    });

    if (!!props?.widgetRef) props.widgetRef.current = widgetInstance;

    return () => {
      widgetInstance.remove();
      if (!!props?.widgetRef) props.widgetRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
});

interface TradingViewChartProps {
  widgetOptions: Omit<WidgetOptions, "container">;
  onSymbolChange?: SymbolChangeHandler;
}

const WATERMARK_TEXT = "www.artafoolad.com";

function TradingViewChart(props: TradingViewChartProps) {
  const WidgetRef = useRef<IChartingLibraryWidget>(null);
  const widgetOptions = props.widgetOptions;

  // * ========= real-time options =========
  const symbolName = widgetOptions?.symbol!;
  const theme = widgetOptions?.theme ?? "Dark";
  const isDarkTheme = theme.toLowerCase() === "dark";

  // * =========== Track symbol changes ===========
  useSymbolSync(WidgetRef, symbolName);

  // * =========== Forward symbol changes to parent component ===========
  useSymbolChangeEvent(WidgetRef, props?.onSymbolChange);

  // * =========== Track theme changes ===========
  useThemeSync(WidgetRef, theme);

  return (
    <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
      <BaseChart widgetOptions={widgetOptions} widgetRef={WidgetRef} />
      <Stack
        aria-hidden="true"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 2,
          opacity: 0.3,
        }}
      >
        <NextImage
          src={"/images/arta-logo.png"}
          alt="Arta Logo"
          width={270}
          height={100}
          // sx={{ objectFit: "cover" }}
        />
        {/* <Typography
          variant="body2"
          sx={{ color: "text.onPrimary", whiteSpace: "nowrap" }}
        >
          {WATERMARK_TEXT}
        </Typography> */}
      </Stack>
    </Box>
  );
}

export { TradingViewChart, BaseChart };
