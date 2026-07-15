"use client";

import { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { EyeIcon, EyeOffIcon } from "@/components/ui/Icon";

type SensitiveTextProps = {
  value?: string | null;
  fallback?: string;
  mask?: string;
};

export default function SensitiveText({
  value,
  fallback = "-",
  mask = "************",
}: SensitiveTextProps) {
  const [visible, setVisible] = useState(false);

  if (!value) {
    return <Typography variant="body2">{fallback}</Typography>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Typography variant="body2">{visible ? value : mask}</Typography>

      <IconButton size="small" onClick={() => setVisible((prev) => !prev)}>
        {visible ? (
          <EyeIcon fontSize="small" sx={{ color: "#ffff" }} />
        ) : (
          <EyeOffIcon fontSize="small" sx={{ color: "#ffff" }} />
        )}
      </IconButton>
    </Box>
  );
}
