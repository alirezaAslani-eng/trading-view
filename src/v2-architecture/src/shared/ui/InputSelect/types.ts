import { ReactNode } from "react";
import { SelectDisplayProps } from "../types";
// * -------start------- InputSelect.tsx --------------
interface InputSelectProps<
  TValue extends string | number = string,
> extends SelectDisplayProps {
  placeholder?: ReactNode;
  onChange?: (value: TValue) => void;
  value?: TValue;
}
// * -------end------- InputSelect.tsx --------------

export type { InputSelectProps };
