import { PaginationSizeProps, PaginationSizeReturn } from "./types";

function paginationSize({
  size,
  theme,
}: PaginationSizeProps): PaginationSizeReturn {
  const { typography } = theme;

  const sizes = {
    medium: {
      pageButtonSize: {
        padding: "0px 9px",
        minHeight: "31px",
        borderRadius: "8px",
        fontSize: typography.button3.fontSize,
        fontFamily: typography.button3.fontFamily,
      },
      prevNextButtonSize: {
        fontSize: typography.button4.fontSize,
        fontFamily: typography.button4.fontFamily,
      },
    } satisfies PaginationSizeReturn,
  };

  return sizes?.[size] || sizes.medium;
}

export default paginationSize;
