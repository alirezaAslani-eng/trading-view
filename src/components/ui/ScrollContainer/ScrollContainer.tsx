"use client";
import useCheckOverflow from "@/hooks/app/useCheckOverflow";
import { identifySxProp } from "@/packages/mui/theme/helpers";
import { nuteralScrollbar } from "@/packages/mui/theme/shared-style";
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
          scrollbarGutter: "stable",
          ...nuteralScrollbar(tm),
          ...identifySxProp(tm, props?.sx),
          ...(isOverflowing && identifySxProp(tm, overflowedSx)),
        };
      }}
    />
  );
}

export default ScrollContainer;
