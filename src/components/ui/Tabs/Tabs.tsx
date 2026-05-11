"use client";
import { styled } from "@mui/material";
import MuiTabs from "@mui/material/Tabs";
import { StyledTabsProps, TabsProps } from "@/components/ui/types";
import { useTabsContext } from "@/context/app/TabsContext";
import {
  defaultTabsVariants,
  tabsSize,
  tabsTheme,
} from "@/packages/mui/theme/variants";

const StyledTabs = styled(MuiTabs, {
  shouldForwardProp(prop) {
    return prop !== "appearance" && prop !== "size" && prop !== "color";
  },
})<StyledTabsProps>(({
  theme,
  size = defaultTabsVariants.size,
  color = defaultTabsVariants.color,
  appearance = defaultTabsVariants.appearance,
}) => {
  const tabs_size = tabsSize({ theme, size });
  const tabs_theme = tabsTheme({ theme, appearance, color });

  return {
    borderTop: "0px transparent",
    borderRight: "0px transparent",
    borderLeft: "0px transparent",    
    ...tabs_theme.rootTheme,
    ...tabs_size.rootSize,
    "& .MuiTab-root": {
      minWidth: "fit-content",
      ...tabs_theme.tabTheme,
      ...tabs_size.tabSize,
      ":first-of-type": {
        marginRight: "0px",
      },
      ":last-of-type": {
        marginLeft: "0px",
      },
    },
    "& .MuiTab-root.Mui-selected": {
      ...tabs_theme.tabSelectedTheme,
    },
    "& .MuiTabs-indicator": {
      ...tabs_theme.indicatorTheme,
    },
  };
});

function Tabs(props: TabsProps) {
  const { currentTabValue, updateTabValue } = useTabsContext();
  return (
    <StyledTabs
      {...props}
      value={currentTabValue}
      onChange={(_, v) => updateTabValue(v)}
    />
  );
}

export default Tabs;
