"use client";
import { Typography } from "@mui/material";

import { InputSelectProps } from "./types";
import SelectDisplay from "./SelectDisplay";
import { renderValueOnDisplay } from "./helpers";

function InputSelect_({
  children,
  placeholder,
  ...selectDisplayProps
}: Omit<InputSelectProps, "onChange" | "value">) {
  const { selectedValue, isOpenMenu, openMenu } = useInputSelectController();

  const displayedItem = renderValueOnDisplay({ children, selectedValue });

  const isPlaceholder = !!!selectedValue;

  return (
    <>
      <SelectDisplay
        {...selectDisplayProps}
        isSelected={!isPlaceholder}
        focused={isOpenMenu}
        onClick={selectDisplayProps.disabled ? undefined : openMenu}
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
