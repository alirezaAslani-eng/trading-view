import type { CSSProperties, Theme } from "@mui/material";

type AccordionSizes = "medium" | "large";
type AccordionColors = "nuteral";
type AccordionVariants = "contained";

interface AccordionSizeProps {
  theme: Theme;
  size: AccordionSizes;
}
interface AccordionSizeReturn {
  expandIconSize: CSSProperties;
  contentIconSize: CSSProperties;
  summarySize: CSSProperties;
  contentSize: CSSProperties;
}

interface AccordionThemeProps {
  theme: Theme;
  color: AccordionColors;
  variant: AccordionVariants;
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
  AccordionSizes,
  AccordionColors,
  AccordionVariants,
};
