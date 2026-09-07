import { ReplaceSxWithSxOnlyObject } from "@/packages/mui/theme/types";
import { Box, BoxProps, SxProps, Theme } from "@mui/material";

const sx = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
} satisfies SxProps<Theme>;

function PieChartCenter(props: ReplaceSxWithSxOnlyObject<BoxProps<"div">>) {
  return <Box {...props} sx={{ ...sx, ...props.sx }} />;
}
export default PieChartCenter;
