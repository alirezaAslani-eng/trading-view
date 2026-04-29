"use client"
import SelectItem from "@/components/ui/MeniItem/SelectItem";
import { useInputSelectController } from "@/context/app/InputSelectController";
/**
 * @param {ComponentProps<typeof SelectItem> & {value:string}} props
 */
function InputSelectItem({ value, ...props }) {
  const { updateValue, closeMenu,selectedValue } = useInputSelectController();

  const updateHandler = () => {
    updateValue(value);
    closeMenu();
  };

  return (
    <SelectItem {...props} selected={value === selectedValue} onClick={updateHandler}>
      {props.children}
    </SelectItem>
  );
}

export default InputSelectItem;
