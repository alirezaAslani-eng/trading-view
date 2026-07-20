"use client";
import { DownIcon } from "@/shared/ui/Icon";
import { Box, Stack, Typography } from "@mui/material";

interface TableSortTogglerProps {
  fieldPath: string;
  text: string;
}

function TableSortToggler({ fieldPath, text }: TableSortTogglerProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      <Typography variant="inherit">{text}</Typography>
      <Stack>
        <DownIcon
          sx={{
            color: "inherit",
            transform: "rotate(180deg)",
            width: "12px",
            height: "12px",
          }}
        />
        <DownIcon
          sx={{
            color: "inherit",
            width: "12px",
            height: "12px",
          }}
        />
      </Stack>
    </Box>
  );
}

export default TableSortToggler;
