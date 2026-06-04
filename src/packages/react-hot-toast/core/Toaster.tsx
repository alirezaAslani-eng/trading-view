"use client";
import { useTheme } from "@mui/material";
import { Toaster as Toaster_ } from "react-hot-toast";

function Toaster() {
  const { palette, typography } = useTheme();
  return (
    <Toaster_
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        duration: 2000,
        style: {
          backgroundColor: palette.background.inputModal,
          color: palette.text.disabled,
          fontFamily: typography.body2.fontFamily,
          fontSize: typography.body2.fontSize,
        },
      }}
    />
  );
}

export default Toaster;
