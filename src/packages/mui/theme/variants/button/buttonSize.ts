import { ButtonSizeProps, ButtonSizeReturn } from "../types";

function buttonSize({ size, theme }: ButtonSizeProps) {
  const { typography } = theme;
  const sizes = {
    small: {
      rootSize: {
        height: "36px",
        minWidth: "36px",
        borderRadius: "8px",
        padding: "0px 12px",
        fontSize: typography.button4.fontSize,
        fontFamily: typography.button4.fontFamily,
        lineHeight: typography.button4?.lineHeight,
        gap: "2px",
      },
    } satisfies ButtonSizeReturn,
    medium: {
      rootSize: {
        height: "45px",
        minWidth: "45px",
        borderRadius: "10px",
        padding: "0px 16px",
        fontSize: typography.button2.fontSize,
        fontFamily: typography.button2.fontFamily,
        gap: "4px",
      },
    } satisfies ButtonSizeReturn,
    large: {
      rootSize: {
        height: "56px",
        minWidth: "56px",
        borderRadius: "28px",
        padding: "0px 20px",
        fontSize: typography.button2.fontSize,
        fontFamily: typography.button2.fontFamily,
        lineHeight: typography.button2?.lineHeight,
        gap: "6px",
      },
    } satisfies ButtonSizeReturn,
  };

  return sizes?.[size] || sizes.medium;
}

export default buttonSize;
