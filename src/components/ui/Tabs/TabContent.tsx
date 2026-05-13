"use client"
import { useTabsContext } from "@/context/app/TabsContext";
import { TabValue } from "@/context/app/TabsContext/types";
import { Box, BoxProps } from "@mui/material";
import { Activity } from "react";

interface TabContentProps extends Omit<BoxProps, "value"> {
  value: TabValue;
}

function TabContent({ value, ...boxProps }: TabContentProps) {
  const { currentTabValue } = useTabsContext();
  const isVisibleContent = currentTabValue === value;

  return (
    <Activity mode={isVisibleContent ? "visible" : "hidden"}>
      <Box {...boxProps}>{boxProps.children}</Box>
    </Activity>
  );
}

export default TabContent;
