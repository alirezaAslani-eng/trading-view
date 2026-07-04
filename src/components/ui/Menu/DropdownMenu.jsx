"use client";

import { Menu } from "@mui/material";

function DropdownMenu(props) {
  return (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      slotProps={{
        paper: {
          sx: {
            mt: 1,
            minWidth: 180,
            borderRadius: 3,
            border: "1px solid",
            boxShadow: 3,
             backgroundColor: "background.surfaceLevel4",
          },
        },
      }}
      {...props}
    />
  );
}

export default DropdownMenu;