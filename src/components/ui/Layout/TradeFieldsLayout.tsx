import type { ReplaceSxWithSxOnlyObject } from "@/packages/mui/theme/types";
import { Box, BoxProps, Stack, StackProps } from "@mui/material";

function TradeFieldsLayout(props: StackProps) {
  return <Stack {...props} />;
}

function TradeFieldsLayoutPrice(props: ReplaceSxWithSxOnlyObject<BoxProps>) {
  return <Box sx={{ mt: "32px", ...props.sx }} {...props} />;
}

function TradeFieldsLayoutAmount(props: ReplaceSxWithSxOnlyObject<BoxProps>) {
  return <Box sx={{ mt: "14px", ...props.sx }} {...props} />;
}

function TradeFieldsLayoutPrecentage(
  props: ReplaceSxWithSxOnlyObject<BoxProps>,
) {
  return <Box sx={{ mt: "8px", ...props.sx }} {...props} />;
}

function TradeFieldsLayoutTotalPrice(
  props: ReplaceSxWithSxOnlyObject<BoxProps>,
) {
  return <Box sx={{ mt: "14px", ...props.sx }} {...props} />;
}

export {
  TradeFieldsLayout,
  TradeFieldsLayoutPrice,
  TradeFieldsLayoutAmount,
  TradeFieldsLayoutPrecentage,
  TradeFieldsLayoutTotalPrice,
};
