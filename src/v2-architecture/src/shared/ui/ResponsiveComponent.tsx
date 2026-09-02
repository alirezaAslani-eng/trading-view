"use client";

import { ReactNode } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Breakpoint } from "@mui/system";

type ResponsiveComponentProps = Partial<Record<Breakpoint, ReactNode>>;

export function ResponsiveComponent(props: ResponsiveComponentProps) {
  const theme = useTheme();

  const matches: Record<Breakpoint, boolean> = {
    "xs-mobile": useMediaQuery(theme.breakpoints.up("xs-mobile")),
    xs: useMediaQuery(theme.breakpoints.up("xs")),
    sm: useMediaQuery(theme.breakpoints.up("sm")),
    md: useMediaQuery(theme.breakpoints.up("md")),
    lg: useMediaQuery(theme.breakpoints.up("lg")),
    xl: useMediaQuery(theme.breakpoints.up("xl")),
  };

  const breakpoints: Breakpoint[] = ["xl", "lg", "md", "sm", "xs", "xs-mobile"];

  for (const breakpoint of breakpoints) {
    if (matches[breakpoint] && props[breakpoint] !== undefined) {
      return props[breakpoint];
    }
  }

  return null;
}

