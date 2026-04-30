"use client";
import { notDefinedColors } from "@/packages/mui/theme/shades";
import styled from "@emotion/styled";
import { Button } from "@mui/material";

const ButtonTableAction = styled(Button)(({ theme }) => {
  return {
    backgroundColor: "transparent",
    borderRadius: "8px",
    height: "28px",
    padding: "0px 14px",
    border: "1px solid",
    borderColor: notDefinedColors["#363636"],
    color: theme.palette.text.onPrimary,
    fontSize: theme.typography.button4.fontSize,
    fontFamily: theme.typography.button4.fontFamily,
  };
});

export default ButtonTableAction;
