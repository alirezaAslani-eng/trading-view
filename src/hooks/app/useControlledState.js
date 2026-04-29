import warn from "@/utils/app/warn";
import { useState } from "react";

/**
 *
 * @returns {[value:any,setValue:(value:any)=>void]}
 */
function useControlledState({ value, onChange }) {
  const isControlled = value !== undefined;

  warn(onChange !== undefined && value === undefined, {
    warnText: "to track changes by onChange, the prop value is needed too",
  });

  const [interanlValue, setInternalValue] = useState(value);

  const final_value = isControlled ? value : interanlValue;

  const setValue = (newValue) => {
    if (isControlled) {
      if (onChange) onChange(newValue);
      return;
    }
    setInternalValue(newValue);
  };

  return [final_value, setValue];
}

export default useControlledState;
