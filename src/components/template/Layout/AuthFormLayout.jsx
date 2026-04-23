"use client";
import NextLink from "@/components/ui/Link/NextLink";
import { identifySxProp } from "@/packages/mui/theme/helpers";
import { notDefinedColors } from "@/packages/mui/theme/shades";
import {
  alpha,
  Box,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { usePathname } from "next/navigation";

/**
 * @param {{children:import("react").ReactNode,sx:import("@mui/material").StackProps["sx"]}} param0
 * @returns
 */
function AuthFormLayout({ children, sx }) {
  return (
    <Stack
      sx={(tm) => ({
        alignItems: "center",
        borderRadius: "24px",
        bgcolor: alpha(notDefinedColors["#363636"], 0.18),
        width: "fit-content",
        p: "56px 18px 68px 18px ",
        minWidth: "503px",
        ...identifySxProp(tm, sx),
      })}
    >
      {children}
    </Stack>
  );
}

/**
 * @param {{sx:import("@mui/material").StackProps["sx"],title:string,subTitle:string}} p0
 */
AuthFormLayout.Heading = function ({ sx, subTitle, title }) {
  return (
    <Stack
      sx={(tm) => ({
        textAlign: "center",
        mb: "52px",
        color: tm.palette.text.onPrimary,
        gap: "8px",
        ...identifySxProp(tm, sx),
      })}
    >
      {/* // * ---- Title ---- */}
      <Typography variant="h5">{title}</Typography>
      {/* // * ------ subtitle ------ */}
      <Typography variant="body1">{subTitle}</Typography>
    </Stack>
  );
};

/**
 * @param {{sx:import("@mui/material").StackProps["sx"]}} p0
 */
AuthFormLayout.ToggleButton = function ({ sx }) {
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
};

export default AuthFormLayout;
