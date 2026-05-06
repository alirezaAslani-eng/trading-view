import type { CSSProperties, Theme } from "@mui/material";
import { Colors, Sizes, Variants } from "./variant.types";

interface AccordionSizeProps {
  theme: Theme;
  size: Extract<Sizes, "medium" | "large">;
}
interface AccordionSizeReturn {
  expandIconSize: CSSProperties;
  contentIconSize: CSSProperties;
  summarySize: CSSProperties;
  contentSize: CSSProperties;
}

interface AccordionThemeProps {
  theme: Theme;
  color: Extract<Colors, "nuteral">;
  variant: Extract<Variants, "contained">;
}
interface AccordionThemeReturn {
  expandIconTheme: CSSProperties;
  contentTheme: CSSProperties;
  contentIconTheme: CSSProperties;
  contentIconExpandedTheme: CSSProperties;
  summaryTheme: CSSProperties;
}

export type {
  AccordionSizeProps,
  AccordionSizeReturn,
  AccordionThemeProps,
  AccordionThemeReturn,
};
