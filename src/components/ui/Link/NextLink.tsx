"use client";
import { styled } from "@mui/material";
import Link from "next/link";
import { ComponentProps } from "react";
import useIsActiveLink from "@/hooks/app/useIsActiveLink";
import clsx from "clsx";
import { UseIsActiveLinkOptions } from "@/hooks/app/types";

const StyledNextLink = styled(Link)({
  display: "block",
  textDecoration: "none",
  color: "inherit",
});

interface NextLinkProps extends Omit<
  ComponentProps<typeof StyledNextLink>,
  "href"
> {}
function NextLink({ exact, ...props }: NextLinkProps & UseIsActiveLinkOptions) {
  const isActive = useIsActiveLink({ href: props.href, exact });

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
