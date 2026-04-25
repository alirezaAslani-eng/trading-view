"use client";
import { Box, Menu } from "@mui/material";
import { useState } from "react";

/**
 * @param {Omit<import("@mui/material").MenuProps,"anchorEl" | "open" | "onClose"> & {trigger:(open:boolean)=>import("react").ReactElement}} props
 */
function DropdownSelfState({ trigger, ...props }) {
  const [anchoreElement, setAnchoreElement] = useState(null);

  const openMenu = (e) => setAnchoreElement(e.currentTarget);
  const closeMenu = () => setAnchoreElement(null);

  return (
    <>
      {/* //  * ---- trigger component ---- */}
      <Box onClick={openMenu}>{trigger(Boolean(anchoreElement))}</Box>

      {/* // * ----- menu ----- */}
      <Menu
        {...props}
        anchorEl={anchoreElement}
        open={Boolean(anchoreElement)}
        onClose={closeMenu}
      >
        {props.children}
      </Menu>
    </>
  );
}

export default DropdownSelfState;
