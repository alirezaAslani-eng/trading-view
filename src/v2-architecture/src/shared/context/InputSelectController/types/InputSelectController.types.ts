import {
  UseControlledStateConfig,
  UseMuiMenuStateReturn,
} from "@/hooks/app/types";

interface InputSelectControllerProvidedValue<
  TValue extends string | number  = string,
> extends UseMuiMenuStateReturn<HTMLElement> {
  selectedValue: TValue | undefined;
  updateValue: (value: TValue) => void;
}
interface InputSelectControllerProps<
  TValue,
> extends UseControlledStateConfig<TValue> {}

export type { InputSelectControllerProvidedValue, InputSelectControllerProps };
