"use client";
import { defaultTooltipProps } from "@/packages/mui";
import {
  SparkLineChart as MuiSparkLineChart,
  SparkLineChartProps,
} from "@mui/x-charts";

function SparkLineChart(props: SparkLineChartProps) {
  return (
    <MuiSparkLineChart
      showHighlight
      showTooltip
      curve="bumpX"
      area
      {...props}
      slotProps={{
        ...props?.slotProps,
        tooltip: defaultTooltipProps(props.slotProps?.tooltip),
      }}
    />
  );
}

export default SparkLineChart;
