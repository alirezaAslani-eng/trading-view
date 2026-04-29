import useControlledState from "@/hooks/app/useControlledState";
import useMuiMenuState from "@/hooks/app/useMuiMenuState";
import { createContext, useContext } from "react";

const InputSelectControllerContext = createContext({
  anchoreEl: null,
  anchoreWidth: null,
  isOpenMenu: false,
  selectedValue: undefined,
  closeMenu: () => {},
  openMenu: () => {},
  updateValue: () => {},
});

/**
 * @param {{value:string,onChange:(value:string)=>void,children:import("react").ReactElement}} props
 */
function InputSelectController({ children, onChange, value }) {
  // * ----- Menu dropdown state -----
  const { anchoreEl, anchoreWidth, isOpenMenu, closeMenu, openMenu } =
    useMuiMenuState();

  // * ----- Selected value state -----
  const [selectedValue, updateValue] = useControlledState({ value, onChange });

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
