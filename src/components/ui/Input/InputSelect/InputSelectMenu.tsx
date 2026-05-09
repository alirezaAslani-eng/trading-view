"use client";
import SelectMenu from "@/components/ui/Menu/SelectMenu";
import { useInputSelectController } from "@/context/app/InputSelectController";
import { identifySxProp } from "@/packages/mui/theme/helpers";
import { InputSelectMenuProps } from "../../types";

function InputSelectMenu(props:InputSelectMenuProps) {
  const { anchoreEl, isOpenMenu, closeMenu, anchoreWidth } =
    useInputSelectController();

  return (
    <SelectMenu
      {...props}
      anchorEl={anchoreEl}
      open={isOpenMenu}
      onClose={closeMenu}
      sx={(tm) => {
        const sx_overrider = identifySxProp(tm, props.sx);
        return {
          ...sx_overrider,
          "& .MuiPaper-root": {
            width: anchoreWidth,
            //@ts-ignore
            ...sx_overrider?.["& .MuiPaper-root"],
          },
        };
      }}
    >
      {props.children}
    </SelectMenu>
  );
}

export default InputSelectMenu;
