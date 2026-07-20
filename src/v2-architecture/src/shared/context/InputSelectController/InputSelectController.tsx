import useControlledState from "@/hooks/app/useControlledState";
import useMuiMenuState from "@/hooks/app/useMuiMenuState";
import { createContext, useContext } from "react";
import {
  InputSelectControllerProps,
  InputSelectControllerProvidedValue,
} from "./types";
import { PWC } from "@/types/utils";

const InputSelectControllerContext = createContext(
  {} as InputSelectControllerProvidedValue<any>,
);

function InputSelectController<TValue extends string | number = string>({
  children,
  onChange,
  value,
}: PWC<InputSelectControllerProps<TValue>>) {
  // * ----- Menu dropdown state -----
  const { anchoreEl, anchoreWidth, isOpenMenu, closeMenu, openMenu } =
    useMuiMenuState<HTMLElement>();

  // * ----- Selected value state -----
  const [selectedValue, updateValue] = useControlledState<TValue>({
    value,
    onChange,
  });

  return (
    <InputSelectControllerContext
      value={{
        anchoreEl,
        anchoreWidth,
        closeMenu,
        isOpenMenu,
        openMenu,
        selectedValue,
        updateValue,
      }}
    >
      {children}
    </InputSelectControllerContext>
  );
}

const useInputSelectController = () => useContext(InputSelectControllerContext);
export { InputSelectController, useInputSelectController };
