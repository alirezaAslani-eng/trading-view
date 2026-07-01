"use client";

import { cloneElement, useState } from "react";
import DropdownMenu from "./DropdownMenu";

function Dropdown({ trigger, children, ...props }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {cloneElement(trigger(open), {
        onClick: handleOpen,
      })}

      <DropdownMenu
        {...props}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        {children}
      </DropdownMenu>
    </>
  );
}

export default Dropdown;