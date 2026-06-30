"use client";

import { Box, Menu, MenuProps } from "@mui/material";
import { MouseEvent, ReactElement, useState } from "react";

type DropdownSelfStateProps = Omit<
  MenuProps,
  "anchorEl" | "open" | "onClose"
> & {
  trigger: (open: boolean) => ReactElement;
};

function DropdownSelfState({
  trigger,
  children,
  ...props
}: DropdownSelfStateProps) {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);

  const openMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorElement(null);
  };

  return (
    <>
      {/* Trigger */}
      <Box onClick={openMenu}>
        {trigger(Boolean(anchorElement))}
      </Box>

      {/* Menu */}
      <Menu
        {...props}
        anchorEl={anchorElement}
        open={Boolean(anchorElement)}
        onClose={closeMenu}
      >
        {children}
      </Menu>
    </>
  );
}

export default DropdownSelfState;