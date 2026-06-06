import { Box, BoxProps, Typography, TypographyProps } from "@mui/material";
import { ComponentProps } from "react";
import BouncCircleLoader from "./BounceCircleLoader";
import { ReplaceSxWithSxOnlyObject } from "@/packages/mui/theme/types";

function TableFallback(props: ReplaceSxWithSxOnlyObject<BoxProps>) {
  return (
    <Box
      {...props}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "200px",
        ...props.sx,
      }}
    />
  );
}

function TableFallbackLoader(props: ComponentProps<typeof BouncCircleLoader>) {
  return <BouncCircleLoader {...props} />;
}
function TableFallbackData(props: ReplaceSxWithSxOnlyObject<TypographyProps>) {
  return (
    <Typography
      {...props}
      variant="body2"
      sx={{ color: "text.disabled", ...props.sx }}
    >
      {props.children ?? "داده ای وجود ندارد"}
    </Typography>
  );
}

export { TableFallback, TableFallbackLoader, TableFallbackData };
