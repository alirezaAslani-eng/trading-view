"use client";
import { identifySxProp } from "@/packages/mui/theme/helpers";
import { styled } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const StyledNextLink = styled(Link)({
  display: "block",
  textDecoration: "none",
  color: "inherit",
});

/**
 * @param {{activeSx:import("@mui/material").SxProps<import("@mui/material").Theme>} & React.ComponentProps<typeof StyledNextLink>} props
 */
function NextLink({ activeSx, ...props }) {
  const pathname = usePathname();

  return (
    <StyledNextLink
      {...props}
      sx={(tm) => ({
        ...identifySxProp(tm, props.sx),
        ...(pathname === props.href && identifySxProp(tm, activeSx)),
      })}
    >
      {props.children}
    </StyledNextLink>
  );
}

export default NextLink;
