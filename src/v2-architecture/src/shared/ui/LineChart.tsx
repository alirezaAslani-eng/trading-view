"use client";
import { defaultTooltipProps } from "@/packages/mui";
import { useTheme } from "@mui/material";
import { LineChartProps } from "@mui/x-charts";
import { LineChart as LineChart_ } from "@mui/x-charts";

/**
 * Abstracetd LineChart component from `@mui/x-charts`
 */
export function LineChart(props: LineChartProps) {
  const { alpha, palette } = useTheme();
  return (
    <LineChart_
      {...props}
      slotProps={{
        ...props.slotProps,
        tooltip: defaultTooltipProps(props.slotProps?.tooltip),
      }}
      series={props.series.map((item) => {
        return {
          color: alpha(palette.background.primary!, 0.4),
          area: true,
          ...item,
        };
      })}
    />
  );
}
