import {
  AccordionSizeProps,
  AccordionThemeProps,
} from "@/packages/mui/theme/variants/types";
import type { AccordionProps as MuiAccordionProps } from "@mui/material";

// * --------------Accordion.tsx--------------
interface AccordionProps extends Omit<
  MuiAccordionProps,
  "variant" | "color" | "size"
> {
  size?: AccordionSizeProps["size"];
  color?: AccordionThemeProps["color"];
  variant?: AccordionThemeProps["variant"];
  accordionBorder?: boolean;
}
// * --------------Accordion.tsx--------------

export type { AccordionProps };
