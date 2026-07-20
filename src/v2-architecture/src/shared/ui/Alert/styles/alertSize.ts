import { AlertSizeProps, AlertSizeReturn } from "./types";

function alertSize({ theme, size }: AlertSizeProps): AlertSizeReturn {
  const sizes = {
    small: {
      rootSize: {
        minHeight: "30px",
        borderRadius: "8px",
        padding: "6.5px 8px",
        gap: "8px",
        fontSize: theme.typography.body3.fontSize,
        fontFamily: theme.typography.body3.fontFamily,
      },
      iconSize: {
        width: "18px",
        height: "18px",
      },
    } satisfies AlertSizeReturn,
  };

  return sizes?.[size] || sizes.small;
}

export default alertSize;
