"use client";
import {
  defaultPaginationVariants,
  paginationSize,
  paginationTheme,
} from "@/packages/mui/theme/variants";
import { PaginationProps } from "@/components/ui/types";
import {
  Pagination as MuiPagination,
  PaginationItem,
  PaginationItemProps,
  styled,
  Theme,
} from "@mui/material";

const Pagination_ = styled(MuiPagination)<PaginationProps>(({
  theme,
  color = defaultPaginationVariants.color,
  variant = defaultPaginationVariants.variant,
  size = defaultPaginationVariants.size,
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
