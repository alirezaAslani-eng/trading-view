import type { PaginationProps as MuiPaginationProps } from "@mui/material";
import {
  PaginationSizeProps,
  PaginationThemeProps,
} from "@/packages/mui/theme/variants/types";
import { ReactNode } from "react";

// * ----start---- Pagination.tsx -----------
interface PaginationProps extends Omit<
  MuiPaginationProps,
  "color" | "variant" | "size"
> {
  color?: PaginationThemeProps["color"];
  variant?: PaginationThemeProps["variant"];
  size?: PaginationSizeProps["size"];
  prev?:ReactNode
  next?:ReactNode
}
// * ----end---- Pagination.tsx -----------

export type { PaginationProps };
