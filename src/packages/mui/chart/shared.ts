import { ChartsTooltipSlotProps } from "@mui/x-charts";

export const defaultTooltipProps = () => {
  return {
    container: () => document.body,
  } satisfies ChartsTooltipSlotProps["tooltip"];
};

export const areaColor = "rgba(87, 168, 255, 0.2)";
