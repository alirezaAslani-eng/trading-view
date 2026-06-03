import { TypographyStyle } from "@mui/material/styles";

interface CustomTypographyVariants extends Record<
  | "body3"
  | "button1"
  | "button2"
  | "button3"
  | "button4"
  | "caption1"
  | "caption2"
  | "h7"
  | "button5",
  TypographyStyle
> {}

export type { CustomTypographyVariants };
