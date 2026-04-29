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

/**
 * @param {ComponentProps<typeof SelectDisplay> & {placeholder:import("react").ReactNode,children:import("react").ReactElement}} selectDisplayProps
 */
function InputSelect_({ children, placeholder, ...selectDisplayProps }) {
  const { selectedValue, isOpenMenu, openMenu } = useInputSelectController();

  const displayedItem = renderValueOnDisplay({ children, selectedValue });

  const isPlaceholder = selectedValue === undefined;

  return (
    <>
      <SelectDisplay
        {...selectDisplayProps}
        isSelected={!isPlaceholder}
        focused={isOpenMenu}
        onClick={openMenu}
      >
        <Typography
          sx={{
            fontFamily: "inherit",
            fontSize: "inherit",
            color: "inherit",
            ...lineClamp(1),
          }}
        >
          {isPlaceholder ?  placeholder  : displayedItem}
        </Typography>
      </SelectDisplay>
      {/* // * ---- select menu ---- */}
      {children}
    </>
  );
}

/**
 * @param {ComponentProps<typeof InputSelect_> & ComponentProps<typeof InputSelectController>  } props
 */
function InputSelect({ onChange, value, ...props }) {
  return (
    <InputSelectController onChange={onChange} value={value}>
      <InputSelect_ {...props}>{props.children}</InputSelect_>{" "}
    </InputSelectController>
  );
}
export default InputSelect;
