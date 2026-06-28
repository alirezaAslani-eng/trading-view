import { ReplaceSxWithSxOnlyObject } from "@/packages/mui/theme/types";
import { Box, Typography, BoxProps, TypographyProps } from "@mui/material";
import { PRICE_UNITS } from "@/constant/features/priceConfig";

function Price(props: ReplaceSxWithSxOnlyObject<BoxProps>) {
  return (
    <Box
      {...props}
      sx={{
        display: "flex",
        alignItems: "center",
        color: "text.secondary",
        gap: "8px",
        ...props.sx,
      }}
    >
      {props.children}
    </Box>
  );
}

function PriceAmount(props: ReplaceSxWithSxOnlyObject<TypographyProps>) {
  return <Typography variant="h7" {...props} />;
}

/**
 * @param {import('@mui/material').TypographyProps} props
 */
function PriceUnit(props: ReplaceSxWithSxOnlyObject<TypographyProps>) {
  return (
    <Typography variant="button3" {...props}>
      {props.children ?? PRICE_UNITS.IRT.displayName}
    </Typography>
  );
}

export { Price, PriceAmount, PriceUnit };