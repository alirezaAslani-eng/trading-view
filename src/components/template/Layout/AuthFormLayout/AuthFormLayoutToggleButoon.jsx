"use client";
import NextLink from "@/components/ui/Link/NextLink";
import { identifySxProp } from "@/packages/mui/theme/helpers";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { usePathname } from "next/navigation";

/**
 * @param {{sx:import("@mui/material").StackProps["sx"]}} p0
 */
export default function AuthFormLayoutToggleButoon({ sx }) {
  const pathname = usePathname();
  return (
    <Box
      sx={(tm) => ({ px: "50px", width: "100%", ...identifySxProp(tm, sx) })}
    >
      <ToggleButtonGroup
        value={pathname}
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
          <ToggleButton value="/signin" size="large" color="primary" fullWidth>
            {"ورود"}
          </ToggleButton>
        </NextLink>
        <NextLink href={"/signup"} sx={{ flex: 1 }}>
          <ToggleButton value="/signup" size="large" color="primary" fullWidth>
            {"ثبت نام"}
          </ToggleButton>
        </NextLink>
      </ToggleButtonGroup>
    </Box>
  );
}
