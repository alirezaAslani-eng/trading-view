"use client";
import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { updateAvatarConfig } from "../react-query";
import { Box, SxProps, Theme, Typography } from "@mui/material";
import { ScanFaceIcon } from "@/components/ui/Icon";

const typography_sx: SxProps<Theme> = {
  color: "text.primary2",
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

function AvatarUploader() {
  const mutation = useMutation(updateAvatarConfig());
  const inputRef = useRef<HTMLInputElement>(null);

  const handleTriggerClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    mutation.mutate({ file });
    event.target.value = "";
  };

  return (
    <Box component={"button"} onClick={handleTriggerClick}>
      <Typography variant="body3" sx={typography_sx}>
        {"اپلود عکس پروفایل"}
        <ScanFaceIcon fontSize="medium" sx={{ color: "inherit" }} />
      </Typography>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleFileChange}
      />
    </Box>
  );
}

export default AvatarUploader;
