"use client";

import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material";
import { theme } from "@/packages/mui/theme";
/**
 * @param {{children:import('react').ReactNode,overrideTheme:import('@mui/material').ThemeOptions}} param0
 */
function ThemeProvider({ children, overrideTheme }) {
  const createdTheme = createTheme(overrideTheme ?? theme);
  return <MuiThemeProvider theme={createdTheme}>{children}</MuiThemeProvider>;
}

export { ThemeProvider };
