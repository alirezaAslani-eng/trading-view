import type { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import type { SwitchProps } from "@mui/material";

export function toCheckboxFieldProps<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
>(field: ControllerRenderProps<TFieldValues, TName>): SwitchProps {
  return {
    name: field.name,
    checked: Boolean(field.value),
    onChange: (_, checked) => field.onChange(checked),
    onBlur: field.onBlur,
    slotProps: {
      input: { ref: field.ref },
    },
  };
}
