"use client";
import { cloneElement, ReactElement, useState } from "react";
import { Menu, MenuProps } from "@mui/material";
import useMuiMenuState from "@/hooks/app/useMuiMenuState";
import { ReplaceSxWithSxOnlyObject } from "@/packages/mui/theme/types";

interface DropdownProps extends ReplaceSxWithSxOnlyObject<
  Omit<MenuProps, "onClose" | "open">
> {
  trigger: (modalState: boolean) => HTMLButtonElement;
  fullWidth?: boolean;
}

function Dropdown({ trigger, fullWidth, ...props }: DropdownProps) {
  const { anchoreEl, anchoreWidth, closeMenu, openMenu, isOpenMenu } =
    useMuiMenuState();
  return (
    <>
      {
        //@ts-ignore
        cloneElement(trigger(isOpenMenu), {
          onClick: openMenu,
        })
      }

      <Menu
        {...props}
        sx={{
          ...(fullWidth && { width: anchoreWidth ?? undefined }),
          ...props.sx,
        }}
        open={isOpenMenu}
        anchorEl={anchoreEl}
        onClose={closeMenu}
      >
        {props.children}
      </Menu>
    </>
  );
}

export default Dropdown;
