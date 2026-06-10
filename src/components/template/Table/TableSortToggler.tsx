"use client";
import { DownIcon } from "@/components/ui/Icon";
import { useSortFilter } from "@/context/app/SortFilter/SortFilterContext";
import { Box, Stack, Typography } from "@mui/material";

interface TableSortTogglerProps {
  fieldPath: string;
  text: string;
}

function TableSortToggler({ fieldPath, text }: TableSortTogglerProps) {
  const { toggleSort, getFieldState } = useSortFilter();
  const { isASC, isDESC, isSorted } = getFieldState(fieldPath);

  // * ---- Conditional styles ----
  const textColor = isSorted ? "text.onPrimary" : "inherit";
  return (
    <Box
      onClick={() => toggleSort(fieldPath)}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      <Typography variant="inherit" sx={{ color: textColor }}>
        {text}
      </Typography>
      <Stack>
        <DownIcon
          sx={{
            color: isDESC ? "text.onPrimary" : "inherit",
            transform: "rotate(180deg)",
            width: "12px",
            height: "12px",
          }}
        />
        <DownIcon
          sx={{
            color: isASC ? "text.onPrimary" : "inherit",
            width: "12px",
            height: "12px",
          }}
        />
      </Stack>
    </Box>
  );
}

export default TableSortToggler;
