import { defaultTooltipProps } from "@/packages/mui";
import { styled } from "@mui/material";
import { PieChart as _PieChart } from "@mui/x-charts/PieChart";
import { ComponentProps, useMemo } from "react";

const DEFAULT_SERIES = {
  innerRadius: 60,
  outerRadius: 100,
  paddingAngle: 2,
  cornerRadius: 4,
};

const StyledPieChart = styled(_PieChart)({
  width: "fit-content",
});

function PieChart({
  slotProps,
  ...props
}: ComponentProps<typeof StyledPieChart>) {
  const series = props.series?.map((item) => {
    return { ...DEFAULT_SERIES, ...item };
  });

  return (
    <StyledPieChart
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
