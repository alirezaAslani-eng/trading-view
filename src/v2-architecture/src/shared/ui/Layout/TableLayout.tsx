"use client";
import { PanelPaper } from "@/shared/ui/Paper";
import { Box, styled, Typography } from "@mui/material";

const TableLayout = styled(PanelPaper)({
  display: "flex",
  flexDirection: "column",
  gap: "40px",
  padding: "20px 16px",
  width: "100%",
});

const TableLayoutHeading = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const TableLayoutTitle = styled(Typography)(({ theme }) => {
  return {
    fontSize: theme.typography.button1.fontSize,
    fontFamily: theme.typography.button1.fontFamily,
    color: theme.palette.text.heading,
  };
});
export { TableLayout, TableLayoutHeading, TableLayoutTitle };
