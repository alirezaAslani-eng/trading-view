"use client";
import { paginationSize, paginationTheme } from "./styles";
import { PaginationProps } from "./types";
import {
  Pagination as MuiPagination,
  PaginationItem,
  styled,
  Theme,
} from "@mui/material";

const paginationDefaults = {
  size: "medium",
  color: "primary",
  variant: "contained",
} as const;

const Pagination_ = styled(MuiPagination)<PaginationProps>(({
  theme,
  color = paginationDefaults.color,
  variant = paginationDefaults.variant,
  size = paginationDefaults.size,
}: Omit<PaginationProps, "prev" | "next"> & { theme: Theme }) => {
  const pagination_theme = paginationTheme({ theme, variant, color });
  const pagination_size = paginationSize({ theme, size });

  return {
    // * Navigation Page button style
    "& .MuiPaginationItem-page": {
      ...pagination_theme.pageButtonTheme,
      ...pagination_size.pageButtonSize,
    },
    "& .MuiPaginationItem-page.Mui-selected": {
      ...pagination_theme.pageSelectedButtonTheme,
    },

    // * Navigation Page button hover style
    "& .MuiPaginationItem-page.Mui-selected:hover": {
      ...pagination_theme.pageHoverSelectedButtonTheme,
    },
    "& .MuiPaginationItem-page:hover": {
      ...pagination_theme.pageHoverButtonTheme,
    },

    // * PrevNext button style
    "& .MuiPaginationItem-previousNext": {
      ...pagination_theme.prevNextButtonTheme,
      ...pagination_size.prevNextButtonSize,
    },
    "& .MuiPaginationItem-previousNext.Mui-disabled": {
      ...pagination_theme.prevNextDisabledButtonTheme,
    },
  };
});

function Pagination({
  prev = "بعدی",
  next = "قبلی",
  ...props
}: PaginationProps) {
  return (
    //@ts-ignore
    <Pagination_
      {...props}
      renderItem={
        props.renderItem
          ? props.renderItem
          : (item) => {
              return (
                <PaginationItem
                  {...item}
                  slots={{ next: () => next, previous: () => prev }}
                />
              );
            }
      }
    />
  );
}

export default Pagination;
