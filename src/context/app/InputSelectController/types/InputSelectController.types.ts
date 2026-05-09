import {
  UseControlledStateConfig,
  UseMuiMenuStateReturn,
} from "@/hooks/app/types";

interface InputSelectControllerProvidedValue extends UseMuiMenuStateReturn<HTMLElement> {
  selectedValue: string | undefined;
  updateValue: (value: string) => void;
}
interface InputSelectControllerProps extends UseControlledStateConfig {}

export type { InputSelectControllerProvidedValue, InputSelectControllerProps };
