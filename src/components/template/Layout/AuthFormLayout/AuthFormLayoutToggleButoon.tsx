"use client";
import ToggleButtonGroup from "@/components/ui/ButtonGroup/ToggleButtonGroup";
import NextLink from "@/components/ui/Link/NextLink";
import { identifySxProp } from "@/packages/mui/theme/helpers";
import { Box, BoxProps, ToggleButton } from "@mui/material";

interface AuthFormLayoutToggleButoonProps extends Pick<BoxProps, "sx"> {
  activeButton: "signin" | "signup";
}


export default function AuthFormLayoutToggleButoon({
  sx,
  activeButton,
}: AuthFormLayoutToggleButoonProps) {
  return (
    <Box
      sx={(tm) => ({ px: "50px", width: "100%", ...identifySxProp(tm, sx) })}
    >
      <ToggleButtonGroup
        value={activeButton}
        size="large"
        color="primary"
        fullWidth
        sx={({ palette }) => ({
          border: "1.4px solid",
          borderColor: palette.border.default,
          borderRadius: "50px",
          padding: "4px",
          gap: "15px",
        })}
      >
        <NextLink href={"/signin"} sx={{ flex: 1 }}>
          <ToggleButton value="signin" fullWidth>
            {"ورود"}
          </ToggleButton>
        </NextLink>
        <NextLink href={"/signup"} sx={{ flex: 1 }}>
          <ToggleButton value="signup" fullWidth>
            {"ثبت نام"}
          </ToggleButton>
        </NextLink>
      </ToggleButtonGroup>
    </Box>
  );
}
