"use client";
import { alertSize, alertTheme } from "@/packages/mui/theme/variants";
import { Alert as MuiAlerts, styled } from "@mui/material";
import { WarningIcon } from "@/components/ui/Icon";

const StyledAlert = styled(MuiAlerts, {
  shouldForwardProp: (prop) => {
    return prop !== "size";
  },
})(({ theme, color, variant, size }) => {
  const alert_theme = alertTheme({ color, theme, variant, size });
  const alert_size = alertSize({ theme, size });

  return {
    ...alert_theme?.rootTheme,
    ...alert_size?.rootSize,
    "& .MuiSvgIcon-root": {
      ...alert_size?.iconSize,
      ...alert_theme?.iconTheme,
    },
  };
});

/**
 * @param {import("react").ComponentProps<typeof StyledAlert>} props
 */
function Alert(props) {
  const icon = <WarningIcon />;
  return <StyledAlert {...props} icon={props?.icon ?? icon} />;
}

export default Alert;
