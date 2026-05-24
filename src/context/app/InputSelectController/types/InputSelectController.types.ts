import {
  UseControlledStateConfig,
  UseMuiMenuStateReturn,
} from "@/hooks/app/types";

type SelectValue = number | string;
interface InputSelectControllerProvidedValue extends UseMuiMenuStateReturn<HTMLElement> {
  selectedValue: SelectValue | undefined;
  updateValue: (value: SelectValue) => void;
}
interface InputSelectControllerProps extends UseControlledStateConfig<SelectValue> {}

export type {
  InputSelectControllerProvidedValue,
  InputSelectControllerProps,
  SelectValue,
};
