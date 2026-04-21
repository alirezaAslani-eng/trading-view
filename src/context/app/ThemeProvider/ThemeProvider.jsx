"use client";

import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material";

/**
 * @param {{children:import('react').ReactNode,theme:import('@mui/material').ThemeOptions}} param0
 */
function ThemeProvider({ children, theme }) {
  const createdTheme = createTheme(theme);
  return <MuiThemeProvider theme={createdTheme}>{children}</MuiThemeProvider>;
}

export { ThemeProvider };
