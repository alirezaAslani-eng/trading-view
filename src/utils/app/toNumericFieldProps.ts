import { ControllerRenderProps } from "react-hook-form";
import { NumericFormatProps } from "react-number-format";

export function toNumericFormatProps(field: ControllerRenderProps<any>) {
  const { onChange, ...rest } = field;
  return {
    ...rest,
    value: field.value,
    onValueChange: ({ floatValue }) => field.onChange(floatValue),
  } satisfies NumericFormatProps;
}
