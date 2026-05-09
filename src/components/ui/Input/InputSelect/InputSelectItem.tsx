"use client";
import SelectItem from "@/components/ui/MeniItem/SelectItem";
import { useInputSelectController } from "@/context/app/InputSelectController";
import { InputSelectItemProps } from "../../types";

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
