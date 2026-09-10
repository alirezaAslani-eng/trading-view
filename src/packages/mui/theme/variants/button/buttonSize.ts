import { ButtonSizeProps, ButtonSizeReturn } from "../types";

function buttonSize({ size, theme }: ButtonSizeProps) {
  const { typography, breakpoints } = theme;

  const sizes = {
    small: {
      rootSize: {
        // Shared between breakpoints
        borderRadius: "8px",
        gap: "2px",

        // xs
        ...typography.button4,
        height: "32px",
        minWidth: "32px",
        padding: "0px 10px",

        [breakpoints.up("sm")]: {
          height: "36px",
          minWidth: "36px",
          padding: "0px 12px",
        },
      },
    } satisfies ButtonSizeReturn,

    medium: {
      rootSize: {
        // Shared between breakpoints
        ...typography.button2,
        borderRadius: "10px",
        gap: "4px",

        // Mobile
        height: "40px",
        minWidth: "40px",
        padding: "0px 14px",

        [breakpoints.up("sm")]: {
          height: "45px",
          minWidth: "45px",
          padding: "0px 16px",
        },
      },
    } satisfies ButtonSizeReturn,

    large: {
      rootSize: {
        // Shared between breakpoints
        ...typography.button2,

        // Mobile
        height: "48px",
        minWidth: "48px",
        borderRadius: "24px",
        padding: "0px 16px",
        gap: "4px",

        [breakpoints.up("sm")]: {
          height: "56px",
          minWidth: "56px",
          borderRadius: "28px",
          padding: "0px 20px",
          gap: "6px",
        },
      },
    } satisfies ButtonSizeReturn,
  };

  return sizes[size] || sizes.medium;
}

export default buttonSize;
