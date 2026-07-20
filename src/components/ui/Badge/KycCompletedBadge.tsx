"use client";
import CircleBox from "../Box/CircleBox";
import {
  alpha,
  Box,
  BoxProps,
  Typography,
  TypographyProps,
} from "@mui/material";
import { legacyColors } from "@/packages/mui/theme/shades";
import { CheckedIcon } from "../Icon";
import { identifySxProp } from "@/packages/mui/theme/helpers";
import { ComponentProps } from "react";
import { ReplaceSxWithSxOnlyObject } from "@/packages/mui/theme/types";

interface KycCompletedBadgeProps extends ReplaceSxWithSxOnlyObject<BoxProps> {
  active?: boolean;
}
function KycCompletedBadge({ active, ...boxProps }: KycCompletedBadgeProps) {
  return (
    <Box
      {...boxProps}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "4px",
        color: active ? "text.onPrimary" : "text.linkTertiary",
        ...boxProps.sx,
      }}
    >
      <CircleBox
        sx={(tm) => ({
          p: "4px",
          width: "32px",
          backgroundColor: alpha(
            tm.palette.text.primary2!,
            active ? 0.12 : 0.06
          ),
        })}
      >
        <CircleBox
          sx={{
            width: "24px",
            backgroundColor: active
              ? "background.primary"
              : alpha(legacyColors["#002247"], 0.44),

            outline: "1.5px solid",
            outlineOffset: "-2px",
            outlineColor: active ? "text.primary2" : legacyColors["#004FA3"],
          }}
        >
          <CheckedIcon
            sx={{
              width: "10px",
              height: "10px",
              color: active ? "text.onPrimary" : legacyColors["#004FA3"],
            }}
          />
        </CircleBox>
      </CircleBox>
      {boxProps.children}
    </Box>
  );
}
function KycCompletedBadgeText(props: TypographyProps) {
  <Typography
    variant="body2"
    {...props}
    sx={(tm) => ({ color: "inherit", ...identifySxProp(tm, props.sx) })}
  >
    {props.children}
  </Typography>;
}
export { KycCompletedBadge, KycCompletedBadgeText };
