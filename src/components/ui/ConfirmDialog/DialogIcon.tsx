"use client";


import { Box, BoxProps, styled } from "@mui/material";
const DialogIconStyled = styled(Box)(({ theme, color = "primary" }) => ({
    width: 48,
    height: 48,
    marginTop: "30px",
    borderRadius: "50%",
    display: "flex",

    alignItems: "center",

    justifyContent: "center",
}));


function DialogIcon(props: BoxProps) {
    return <DialogIconStyled  {...props} className="ConfirmDialog-icon" />

}
export default DialogIcon;