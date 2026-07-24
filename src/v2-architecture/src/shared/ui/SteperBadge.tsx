"use client";
import { CircleBox } from "./Box";
import { CheckedIcon } from "./Icon";
import {
  identifySxProp,
  legacyColors,
  ReplaceSxWithSxOnlyObject,
} from "@/v2-architecture/src/design-system";
import {
  alpha,
  Box,
  BoxProps,
  Typography,
  TypographyProps,
} from "@mui/material";

interface SteperBadgeProps extends ReplaceSxWithSxOnlyObject<BoxProps> {
  active?: boolean;
}

function SteperBadge({ active, ...boxProps }: SteperBadgeProps) {
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
            active ? 0.12 : 0.06,
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
function SteperBadgeText(props: TypographyProps) {
  <Typography
    variant="body2"
    {...props}
    sx={(tm) => ({ color: "inherit", ...identifySxProp(tm, props.sx) })}
  >
    {props.children}
  </Typography>;
}
export { SteperBadge, SteperBadgeText };
