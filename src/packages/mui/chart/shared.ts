import { ChartsTooltipSlotProps } from "@mui/x-charts";

export const defaultTooltipProps = (
  props?: ChartsTooltipSlotProps["tooltip"],
) => {
  return {
    container: () => document.body,
    ...props,
  } satisfies ChartsTooltipSlotProps["tooltip"];
};

export const areaColor = "rgba(87, 168, 255, 0.2)";
