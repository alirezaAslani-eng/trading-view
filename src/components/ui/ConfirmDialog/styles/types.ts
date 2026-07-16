import { Theme } from "@mui/material";
import { CSSProperties } from "react";

export type ConfirmDialogColor = "primary" | "success" | "error";

export interface ConfirmDialogThemeProps {
  theme: Theme;
  color: ConfirmDialogColor;
}

export interface ConfirmDialogThemeReturn {
  iconTheme: CSSProperties;
  acceptTheme: CSSProperties;
}
