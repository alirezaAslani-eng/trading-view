import { ReplaceSxWithSxOnlyObject } from "@/packages/mui/theme/types";
import { Box, BoxProps } from "@mui/material";

function BulletItem(props: ReplaceSxWithSxOnlyObject<BoxProps>) {
  return (
    <Box
      {...props}
      sx={{
        display: "flex",
        gap: "6px",
        alignItems:"start",
        ...props.sx,
      }}
    />
  );
}

export default BulletItem;
