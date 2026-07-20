"use client";
import { styled } from "@mui/material";
import { ComponentProps } from "react";
import Link from "next/link";
import clsx from "clsx";
import { useIsActiveLink } from "@/shared/hooks";
import { UseIsActiveLinkOptions } from "@/shared/hooks/types";

const StyledNextLink = styled(Link)({
  display: "block",
  textDecoration: "none",
  color: "inherit",
});

interface NextLinkProps extends Omit<
  ComponentProps<typeof StyledNextLink>,
  "href"
> {}
function NextLink({
  startWith,
  ...props
}: NextLinkProps & UseIsActiveLinkOptions) {
  const isActive = useIsActiveLink({ href: props.href, startWith });

  return (
    <StyledNextLink
      {...props}
      className={clsx({ "Mui-active": isActive }, props?.className)}
    >
      {props.children}
    </StyledNextLink>
  );
}

export default NextLink;
