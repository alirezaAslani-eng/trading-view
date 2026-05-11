import {
  TabsSizeProps,
  TabsThemeProps,
} from "@/packages/mui/theme/variants/types";
import type { TabsProps as MuiTabsProps } from "@mui/material";
interface StyledTabsProps extends Omit<MuiTabsProps, "color"> {
  color?: TabsThemeProps["color"];
  size?: TabsSizeProps["size"];
  appearance?: TabsThemeProps["appearance"];
}
interface TabsProps extends Omit<StyledTabsProps, "value" | "onChange"> {}

export type { StyledTabsProps, TabsProps };
