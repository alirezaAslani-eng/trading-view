"use client";
import { styled } from "@mui/material";

const BasicTextInput = styled("input")(({ theme }) => ({
  backgroundColor: "transparent",
  border: "none",
  outline: "none",
  fontSize: theme.typography.button2.fontSize,
  fontFamily: theme.typography.button2.fontFamily,
  width: "100%",
  color: theme.palette.text.inputText,
}));

export default BasicTextInput;
