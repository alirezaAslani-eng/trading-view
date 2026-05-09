"use client";

import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material";
import { theme } from "@/packages/mui/theme";
import { PWC } from "@/types/utils";
import { ThemeProviderProps } from "@/context/app/ThemeProvider/types";

function ThemeProvider({ children, overrideTheme }: PWC<ThemeProviderProps>) {
  const createdTheme = createTheme(overrideTheme ?? theme);
  return <MuiThemeProvider theme={createdTheme}>{children}</MuiThemeProvider>;
}

export { ThemeProvider };
