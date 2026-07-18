"use client";
import { alertSize, alertTheme } from "@/packages/mui/theme/variants";
import { Alert as MuiAlerts, styled } from "@mui/material";
import { WarningIcon } from "@/components/ui/Icon";
import {
  AlertSizeProps,
  AlertThemeProps,
} from "@/packages/mui/theme/variants/types";
import { ComponentProps } from "react";

interface StyledAlertProps {
  size: AlertSizeProps["size"];
  color: AlertThemeProps["color"];
  variant: AlertThemeProps["variant"];
}

const StyledAlert = styled(MuiAlerts, {
  shouldForwardProp: (prop) => {
    return prop !== "size";
  },
})<StyledAlertProps>(({ theme, color, variant, size }) => {
  const alert_theme = alertTheme({ color, theme, variant });
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

function Alert(props: ComponentProps<typeof StyledAlert>) {
  const icon = <WarningIcon />;
  return <StyledAlert {...props} icon={props?.icon ?? icon} />;
}

export default Alert;
