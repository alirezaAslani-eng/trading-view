"use client";
import React from "react";
import { TabsContextValue, TabsProviderProps, TabValue } from "./types";
import { useControlledState } from "@/v2-architecture/src/shared/hooks";

const TabContext = React.createContext({} as any);
function TabsProvider<TValue extends TabValue = TabValue>({
  onChange,
  defaultState,
  value,
  children,
}: TabsProviderProps<TValue>) {
  const [currentTabValue, updateTabValue] = useControlledState<TValue>({
    onChange,
    value,
    defaultState,
  });

  return (
    <TabContext
      value={
        { currentTabValue, updateTabValue } satisfies TabsContextValue<TValue>
      }
    >
      {children}
    </TabContext>
  );
}

const useTabsContext = <
  TValue extends TabValue = TabValue
>(): TabsContextValue<TValue> => React.useContext(TabContext);

export { useTabsContext, TabsProvider };
