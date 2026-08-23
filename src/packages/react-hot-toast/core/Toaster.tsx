"use client";
import { useTheme } from "@mui/material";
import { Toaster as Toaster_ } from "react-hot-toast";

function Toaster() {
  const { palette, typography } = useTheme();
  return (
    <Toaster_
    
      position="top-left"
      reverseOrder={false}
      toastOptions={{
        error: {
          duration: 6000,
        },
        success: {
          duration: 4000,
        },
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
