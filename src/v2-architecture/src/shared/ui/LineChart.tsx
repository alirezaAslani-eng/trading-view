"use client";
import { defaultTooltipProps } from "@/packages/mui";
import { useTheme } from "@mui/material";
import { LineChart as LineChart_, LineChartProps } from "@mui/x-charts";

/**
 * Abstracted LineChart component from `@mui/x-charts`
 */
export function LineChart({ slotProps, ...props }: LineChartProps) {
  const { alpha, palette } = useTheme();

  return (
    <LineChart_
      {...props}
      slotProps={{
        ...slotProps,
        tooltip: {
          ...defaultTooltipProps(),
          ...slotProps?.tooltip,
        },
      }}
      series={props.series.map((item) => ({
        color: alpha(palette.background.primary!, 0.4),
        area: true,
        ...item,
      }))}
    />
  );
}
