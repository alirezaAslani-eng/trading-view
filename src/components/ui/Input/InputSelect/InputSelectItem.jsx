"use client"
import SelectItem from "@/components/ui/MeniItem/SelectItem";
import { useInputSelectController } from "@/context/app/InputSelectController";
/**
 * @param {ComponentProps<typeof SelectItem> & {value:string}} props
 */
function InputSelectItem({ value, ...props }) {
  const { updateValue, closeMenu } = useInputSelectController();

  const updateHandler = () => {
    updateValue(value);
    closeMenu();
  };

  return (
    <SelectItem {...props} onClick={updateHandler}>
      {props.children}
    </SelectItem>
  );
}

export default InputSelectItem;
