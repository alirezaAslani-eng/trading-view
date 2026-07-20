"use client";
import { legacyColors } from "@/v2-architecture/src/design-system";
import { Button, styled } from "@mui/material";

const ButtonTableAction = styled(Button)(({ theme }) => {
  return {
    backgroundColor: "transparent",
    borderRadius: "8px",
    height: "28px",
    padding: "0px 14px",
    border: "1px solid",
    borderColor: legacyColors["#363636"],
    "&.Mui-disabled": {
      opacity: 0.5,
      color: theme.palette.text.onPrimary,
    },
    color: theme.palette.text.onPrimary,
    fontSize: theme.typography.button4.fontSize,
    fontFamily: theme.typography.button4.fontFamily,
  };
});

export default ButtonTableAction;
