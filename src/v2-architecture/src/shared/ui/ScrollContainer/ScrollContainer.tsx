"use client";
import useCheckOverflow from "@/shared/hooks/useCheckOverflow";
import { identifySxProp } from "@/lib/mui/theme/helpers";
import { nuteralScrollbar } from "@/lib/mui/theme/shared-style";
import { Theme } from "@mui/material";
import { Box, BoxProps, SxProps } from "@mui/material";

interface ScrollContainerProps extends BoxProps {
  overflowedSx?: SxProps<Theme>;
}
function ScrollContainer({ overflowedSx, ...props }: ScrollContainerProps) {
  const { isOverflowing, scrollContainerRef } = useCheckOverflow();
  return (
    <Box
      {...props}
      ref={scrollContainerRef}
      sx={(tm) => {
        return {
          overflow: "auto",
          transition: "all ease 150ms",
          ...nuteralScrollbar(tm),
          ...identifySxProp(tm, props?.sx),
          ...(isOverflowing && identifySxProp(tm, overflowedSx)),
        };
      }}
    />
  );
}

export default ScrollContainer;
