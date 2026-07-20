import { Menu, styled } from "@mui/material";

const SelectMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: "transparent !important",
    marginTop: "6px",
    borderRadius: "10px",
  },
  "& .MuiList-root": {
    backgroundColor: theme.palette.background.inputModal,
    padding: "6px",
    gap: "4px",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
  },
}));

export default SelectMenu;
