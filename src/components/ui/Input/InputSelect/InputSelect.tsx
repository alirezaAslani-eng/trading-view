"use client";
import { ComponentProps } from "react";
import SelectDisplay from "@/components/ui/DropdownButton/SelectDisplay";
import { renderValueOnDisplay } from "@/utils/app/selectInput";
import {
  InputSelectController,
  useInputSelectController,
} from "@/context/app/InputSelectController";
import { Typography } from "@mui/material";
import { lineClamp } from "@/packages/mui/theme/helpers";
import { InputSelectProps } from "@/components/ui/types";

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

function InputSelect({
  onChange,
  value,
  ...inputSelectProps
}: InputSelectProps) {
  return (
    <InputSelectController onChange={onChange} value={value}>
      <InputSelect_ {...inputSelectProps}>
        {inputSelectProps.children}
      </InputSelect_>
    </InputSelectController>
  );
}
export default InputSelect;
