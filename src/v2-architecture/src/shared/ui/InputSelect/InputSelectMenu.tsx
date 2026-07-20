"use client";
import SelectMenu from "@/shared/ui/Menu/SelectMenu";
import { useInputSelectController } from "@/shared/context/InputSelectController";
import { identifySxProp } from "@/design-system/helpers";
import { MenuProps } from "@mui/material";
interface InputSelectMenuProps extends Omit<
  MenuProps,
  "anchorEl" | "open" | "onClose"
> {}
function InputSelectMenu(props: InputSelectMenuProps) {
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
