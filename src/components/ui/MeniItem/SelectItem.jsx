import { Box, styled } from "@mui/material";

const SelectItem = styled(Box)(({ theme }) => ({
  height: "30px",
  width: "100%",
  padding: "0px 6px",
  borderRadius: "4px",
  color: theme.palette.text.placeHolder,
  fontSize: theme.typography.body3.fontSize,
  fontFamily: theme.typography.body3.fontFamily,
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  ":hover": {
    backgroundColor: `${theme.palette.background.surfaceTertiary}`,
    color: `${theme.palette.text.onPrimary} `,
  },
}));

export default SelectItem;
