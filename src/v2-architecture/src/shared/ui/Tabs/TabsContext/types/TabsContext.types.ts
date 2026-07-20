import { UseControlledStateConfig } from "@/v2-architecture/src/shared/hooks";
import { PropsWithChildren } from "react";

type TabValue = string | number;

interface TabsProviderProps<TValue extends TabValue>
  extends PropsWithChildren<UseControlledStateConfig<TValue>> {}

interface TabsContextValue<TValue extends TabValue> {
  currentTabValue: TValue | undefined;
  updateTabValue: (value: TValue) => void;
}

export type { TabsContextValue, TabsProviderProps, TabValue };
