"use client";
import { alpha, styled } from "@mui/material";

const InputText = styled("input")(({ theme }) => ({
  outline: "none",
  width: "100%",
  border: "1px solid",
  borderColor: "transparent",
  backgroundColor: theme.palette.background.inputModal,
  fontSize: theme.typography.body3.fontSize,
  fontFamily: theme.typography.body3.fontFamily,
  borderRadius: "10px",
  height: "42px",
  padding: "0px 12px",
  transition: "all ease 150ms",
  color: theme.palette.text.onPrimary,
  "::placeholder": {
    color: theme.palette.text.placeHolder,
    fontSize: theme.typography.body3.fontSize,
  },
  ":focus": {
    borderColor: theme.palette.border.primary,
    boxShadow: `0px 0px 0px 2px ${alpha(theme.palette.border.primary, 0.16)}`,
  },
}));

export default InputText;
