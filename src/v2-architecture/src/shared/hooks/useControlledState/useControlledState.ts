import { useState } from "react";
import { UseControlledStateConfig, UseControlledStateReturn } from "./types";

function useControlledState<TValue = unknown>({
  value,
  onChange,
  defaultState,
}: UseControlledStateConfig<TValue> = {}): UseControlledStateReturn<TValue> {
  const isControlled = value !== undefined;

  const [interanlValue, setInternalValue] = useState(defaultState);

  const final_value = isControlled ? value : interanlValue;

  const setValue = (newValue: TValue) => {
    if (isControlled) {
      if (onChange) onChange(newValue);
      return;
    }
    setInternalValue(newValue);
  };

  return [final_value, setValue];
}

export default useControlledState;
