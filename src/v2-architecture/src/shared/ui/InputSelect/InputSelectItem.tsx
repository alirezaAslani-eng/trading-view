"use client";
import SelectItem from "@/shared/ui/MeniItem/SelectItem";
import { useInputSelectController } from "@/shared/context/InputSelectController";
import { BoxProps } from "@mui/material";

interface InputSelectItemProps extends BoxProps {
  value: string | number;
}
function InputSelectItem({ value, ...props }: InputSelectItemProps) {
  const { updateValue, closeMenu, selectedValue } = useInputSelectController();

  const updateHandler = () => {
    updateValue(value);
    closeMenu();
  };

  return (
    <SelectItem
      {...props}
      selected={value === selectedValue}
      onClick={updateHandler}
    >
      {props.children}
    </SelectItem>
  );
}

export default InputSelectItem;
