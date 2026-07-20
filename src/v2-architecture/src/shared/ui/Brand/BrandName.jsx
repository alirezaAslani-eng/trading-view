"use client";
import { brandName } from "@/shared/constant/staticData";
import { identifySxProp } from "@/design-system/helpers";
import { Typography } from "@mui/material";
/**
 * @param {import('@mui/material').TypographyProps} props
 */
function BrandName(props) {
  const { children = brandName } = props;
  return (
    <Typography
      variant="h7"
      sx={(tm) => ({
        color: "text.onPrimary",
        letterSpacing: 4,
        textTransform: "uppercase",
        ...identifySxProp(tm, props.sx),
      })}
    >
      {children}
    </Typography>
  );
}

export default BrandName;
