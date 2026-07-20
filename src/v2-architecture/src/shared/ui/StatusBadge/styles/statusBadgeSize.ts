import { StatusBadgeSizeProps, StatusBadgeSizeReturn } from "./types";

function statusBadgeSize({
  size,
  theme,
}: StatusBadgeSizeProps): StatusBadgeSizeReturn {
  const { typography } = theme;
  const sizes = {
    medium: {
      rootSize: {
        minWidth: "84px",
        minHeight: "28px",
        padding: "6px 12px",
        borderRadius: "16px",
        gap: "6px",
        fontSize: typography.caption1.fontSize,
        fontFamily: typography.caption1.fontFamily,
        lineHeight: typography.caption1.lineHeight,
      },
      iconSize: {
        width: "6px",
        height: "6px",
      },
    } satisfies StatusBadgeSizeReturn,
  };
  return sizes?.[size] || sizes.medium;
}

export default statusBadgeSize;
