"use client";
import useCheckOverflow from "@/hooks/app/useCheckOverflow";
import { identifySxProp } from "@/packages/mui/theme/helpers";
import { nuteralScrollbar } from "@/packages/mui/theme/shared-style";
import { Box } from "@mui/system";
/**
 * @param {import("@mui/system").BoxProps & {overflowedSx:import("@mui/material").SxProps<import("@mui/material").Theme>}} props
 */
function ScrollContainer({ overflowedSx, ...props }) {
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
