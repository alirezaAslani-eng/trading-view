"use client";
import { styled } from "@mui/material";
import Link from "next/link";
import  { ComponentProps } from "react";
import useIsActiveLink from "@/hooks/app/useIsActiveLink";
import clsx from "clsx";

const StyledNextLink = styled(Link)({
  display: "block",
  textDecoration: "none",
  color: "inherit",
});

function NextLink({ ...props }: ComponentProps<typeof StyledNextLink>) {
  const isActive = useIsActiveLink(props.href);

  return (
    <StyledNextLink {...props} className={clsx({ "Mui-active": isActive })}>
      {props.children}
    </StyledNextLink>
  );
}

export default NextLink;
