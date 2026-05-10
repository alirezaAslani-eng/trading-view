import {
  PaginationSizeProps,
  PaginationSizeReturn,
} from "@/packages/mui/theme/variants/types";

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
        lineHeight: typography.button3.lineHeight,
      },
      prevNextButtonSize: {
        fontSize: typography.button4.fontSize,
        fontFamily: typography.button4.fontFamily,
        lineHeight: typography.button4.lineHeight,
      },
    } satisfies PaginationSizeReturn,
  };

  return sizes?.[size] || sizes.medium;
}

export default paginationSize;
