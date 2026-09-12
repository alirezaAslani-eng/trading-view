"use client";
import { defaultTooltipProps } from "@/packages/mui";
import {
  SparkLineChart as MuiSparkLineChart,
  SparkLineChartProps,
} from "@mui/x-charts";

function SparkLineChart({ slotProps, ...props }: SparkLineChartProps) {
  return (
    <MuiSparkLineChart
      showHighlight
      showTooltip
      curve="bumpX"
      area
      {...props}
      slotProps={{
        ...slotProps,
        tooltip: {
          ...defaultTooltipProps(),
          ...slotProps?.tooltip,
        },
      }}
    />
  );
}

export default SparkLineChart;
