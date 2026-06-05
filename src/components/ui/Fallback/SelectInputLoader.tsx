import { Box, BoxProps, Typography, TypographyProps } from "@mui/material";
import BouncCircleLoader from "./BounceCircleLoader";
import { ReplaceSxWithSxOnlyObject } from "@/packages/mui/theme/types";

function SelectInputLoader(props: ReplaceSxWithSxOnlyObject<BoxProps>) {
  return (
    <Box
      {...props}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        py: "8px",
        ...props.sx,
      }}
    >
      {props.children}
      <BouncCircleLoader bounceSx={{ width: "5px" }} />
    </Box>
  );
}

function SelectInputLoaderText(
  props: ReplaceSxWithSxOnlyObject<TypographyProps>,
) {
  return (
    <Typography
      component={"span"}
      variant="body3"
      {...props}
      sx={{ color: "text.secondary", ...props.sx }}
    >
      {props.children ?? "درحال بارگیری"}
    </Typography>
  );
}

export { SelectInputLoader, SelectInputLoaderText };
