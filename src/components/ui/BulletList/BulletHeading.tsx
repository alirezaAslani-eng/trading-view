import type { ReplaceSxWithSxOnlyObject } from "@/packages/mui/theme/types";
import { Box, BoxProps } from "@mui/material";

function BulletHeading(boxProps: ReplaceSxWithSxOnlyObject<BoxProps>) {
  return (
    <Box
      {...boxProps}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        ...boxProps.sx,
      }}
    />
  );
}

export default BulletHeading;
