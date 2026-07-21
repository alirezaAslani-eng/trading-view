"use client";
import SelectDisplay from "@/components/ui/DropdownButton/SelectDisplay";
import { renderValueOnDisplay } from "@/utils/app/selectInput";
import {
  InputSelectController,
  useInputSelectController,
} from "@/context/app/InputSelectController";
import { Typography, useFormControl } from "@mui/material";
import { lineClamp } from "@/packages/mui/theme/helpers";
import { InputSelectProps } from "@/components/ui/types";

function InputSelect_({
  children,
  placeholder,
  ...selectDisplayProps
}: Omit<InputSelectProps, "onChange" | "value">) {
  const { selectedValue, isOpenMenu, openMenu } = useInputSelectController();
  const formState = useFormControl();
  const disabled = selectDisplayProps?.disabled || formState?.disabled;

  const displayedItem = renderValueOnDisplay({ children, selectedValue });

  const isPlaceholder = !!!selectedValue;

  return (
    <>
      <SelectDisplay
        {...selectDisplayProps}
        disabled={disabled}
        onClick={disabled ? undefined : openMenu}
        isSelected={!isPlaceholder}
        focused={isOpenMenu}
      >
        <Typography
          sx={{
            fontFamily: "inherit",
            fontSize: "inherit",
            color: "inherit",
            ...lineClamp(1),
          }}
        >
          {isPlaceholder ? placeholder : displayedItem}
        </Typography>
      </SelectDisplay>
      {/* // * ---- select menu ---- */}
      {children}
    </>
  );
}

function InputSelect<TValue extends string | number>({
  onChange,
  value,
  ...inputSelectProps
}: InputSelectProps<TValue>) {
  // TODO delete some props : name, onBlur, onFocus and others that come from react-hook-form Controller or implement their logic
  return (
    <InputSelectController onChange={onChange} value={value}>
      <InputSelect_ {...inputSelectProps}>
        {inputSelectProps.children}
      </InputSelect_>
    </InputSelectController>
  );
}
export default InputSelect;
