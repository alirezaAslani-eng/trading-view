import warn from "@/utils/app/warn";
import { useState } from "react";
import { UseControlledStateConfig, UseControlledStateReturn } from "./types";

function useControlledState<TValue = unknown>({
  value,
  onChange,
  defaultState,
}: UseControlledStateConfig<TValue>): UseControlledStateReturn<TValue> {
  const isControlled = value !== undefined;

  warn(onChange !== undefined && value === undefined, {
    warnText: "to track changes by onChange, the prop value is needed too",
  });

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
