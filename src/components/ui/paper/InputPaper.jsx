"use client";
import { notDefinedColors } from "@/packages/mui/theme/shades";
import { Box, styled } from "@mui/material";

const InputPaper = styled(Box)(({ theme }) => ({
  border: "1px solid",
  borderColor: notDefinedColors["#3A3A3A"],
  backgroundColor: notDefinedColors["#282828"],
  display: "flex",
  alignItems: "center",
  borderRadius: "16px",
}));

export default InputPaper;
