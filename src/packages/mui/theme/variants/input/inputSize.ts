import { InputSizeProps, InputSizeReturn } from "../types";

function inputSize({ theme, size }: InputSizeProps): InputSizeReturn {
  const { typography, breakpoints } = theme;

  const sizes = {
    large: {
      rootSize: {
        // Shared between breakpoints
        ...typography.body2,
        borderRadius: "16px",

        // Mobile
        height: "48px",
        padding: "0px 12px",

        [breakpoints.up("sm")]: {
          height: "54px",
          padding: "0px 14px",
        },
      },

      placeholderSize: {
        // Shared between breakpoints
        ...typography.body2,
      },
    } satisfies InputSizeReturn,

    // * ------- medium size -------
    medium: {
      rootSize: {
        // Shared between breakpoints
        ...typography.body3,
        borderRadius: "10px",

        // Mobile
        height: "40px",
        padding: "0px 10px",

        [breakpoints.up("sm")]: {
          height: "42px",
          padding: "0px 12px",
        },
      },

      placeholderSize: {
        // Shared between breakpoints
        ...typography.body3,
      },
    } satisfies InputSizeReturn,

    // * ------- small size -------
    small: {
      rootSize: {
        // Shared between breakpoints
        ...typography.button4,
        borderRadius: "10px",

        // Mobile
        height: "36px",
        padding: "0px 8px",

        [breakpoints.up("sm")]: {
          height: "38px",
          padding: "0px 10px",
        },
      },

      placeholderSize: {
        // Shared between breakpoints
        ...typography.button4,
      },
    } satisfies InputSizeReturn,
  };

  return sizes[size] || sizes.medium;
}

export default inputSize;
