"use client";
import { Box, IconButton, styled } from "@mui/material";
import { CloseIcon } from "../Icon";
import { ConfirmDialogColor, confirmDialogTheme } from "./styles";
import { ComponentProps, CSSProperties, ReactNode } from "react";
import { ModalLayout } from "../Layout/ModalLayout";

const Root = styled(ModalLayout, {
  shouldForwardProp: (prop) => prop !== "color",
})<{ color?: ConfirmDialogColor }>(({ theme, color = "success" }) => {
  const dialog_theme = confirmDialogTheme({ theme, color });
  return {
    position: "relative",
    width: "490px",
    padding: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    backgroundColor: theme.palette.background.surface,
    borderRadius: 16,

    "& .ConfirmDialog-icon": {
      ...dialog_theme.iconTheme,
      borderRadius: "16px",
      svg: {
        color: dialog_theme.iconTheme?.color,
      },
    },

    "& .ConfirmDialog-action > button": {
      ...dialog_theme.acceptTheme,
      borderRadius: "28px",
      height: "56px",
    },
    "& .ConfirmDialog-action > button:first-of-type": {
      ...dialog_theme.acceptTheme,
    },
    "& .ConfirmDialog-action > button:last-of-type": {
      backgroundColor: "transparent",
      color: theme.palette.text.onPrimary,
    } as CSSProperties,
  };
});

export interface ConfirmDialogProps extends ComponentProps<typeof Root> {
  children: React.ReactNode;
  onClose?: () => void;
}
export type ConfirmDialogPromiseProps = {
  title?: string;
  description?: string;
  color?: ConfirmDialogProps["color"];
  acceptText?: string;
  rejectText?: string;
  icon?: ReactNode;
};

export default function ConfirmDialog({
  children,
  onClose,
  ...props
}: ConfirmDialogProps) {
  return (
    <Root {...props}>
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 8,
          left: 8,
          color: "text.caption",
        }}
      >
        <CloseIcon fontSize="large" />
      </IconButton>

      {children}
    </Root>
  );
}
