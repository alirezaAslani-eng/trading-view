"use client";
import { identifySxProp } from "@/packages/mui/theme/helpers";
import { styled } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ComponentProps } from "react";
import { NextLinkProps } from "../types";

const StyledNextLink = styled(Link)({
  display: "block",
  textDecoration: "none",
  color: "inherit",
});

function NextLink({
  activeSx,
  ...props
}: NextLinkProps & ComponentProps<typeof StyledNextLink>) {
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
