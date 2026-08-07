import { defaultTooltipProps } from "@/packages/mui";
import { PieChart as MuiPieChart, PieArc } from "@mui/x-charts/PieChart";
import type { PieChartProps } from "@mui/x-charts/PieChart";
import { useMemo } from "react";

const DEFAULT_SERIES = {
  innerRadius: 60,
  outerRadius: 100,
  paddingAngle: 2,
  cornerRadius: 4,
};
function PieChart({ slotProps, ...props }: PieChartProps) {
  const series = useMemo(
    () =>
      props?.series?.map((item) => {
        return {
          ...DEFAULT_SERIES,
          ...item,
        };
      }),
    [props?.series],
  );
  return (
    <MuiPieChart
      {...props}
      series={series}
      slotProps={{
        ...slotProps,
        tooltip: { ...defaultTooltipProps(), ...slotProps?.tooltip },
        pieArc: {
          stroke: "none",
          strokeWidth: 0,
          ...slotProps?.pieArc,
        },
      }}
    />
  );
}

export default PieChart;
