import { UseControlledStateConfig } from "@/hooks/app/types";
import { PWC } from "@/types/utils";

type TabValue = string | number;

interface TabsProviderProps<TValue extends TabValue> extends PWC<
  UseControlledStateConfig<TValue>
> {}

interface TabsContextValue<TValue extends TabValue> {
  currentTabValue: TValue | undefined;
  updateTabValue: (value: TValue) => void;
}

export type { TabsContextValue, TabsProviderProps, TabValue };
