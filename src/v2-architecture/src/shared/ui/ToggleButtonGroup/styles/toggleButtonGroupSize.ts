import {
  ToggleButtonGroupSizeProps,
  ToggleButtonGroupSizeReturn,
} from "./types";

function toggleButtonGroupSize({
  size,
  theme,
}: ToggleButtonGroupSizeProps): ToggleButtonGroupSizeReturn {
  const sizes = {
    large: {
      rootSize: {
        padding: "6px",
        gap: "6px",
        borderRadius: "24px",
      },
      toggleButtons: {
        height: "46px",
        padding: "0px 20px",
        borderRadius: "24px !important",
        fontSize: theme.typography.button2.fontSize,
        fontFamily: theme.typography.button2.fontFamily,
      },
    } satisfies ToggleButtonGroupSizeReturn,
    medium: {
      rootSize: {
        padding: "6px",
        gap: "6px",
        borderRadius: "10px",
      },
      toggleButtons: {
        height: "36px",
        padding: "0px 2px",
        borderRadius: "6px !important",
        fontSize: theme.typography.button4.fontSize,
        fontFamily: theme.typography.button4.fontFamily,
      },
    } satisfies ToggleButtonGroupSizeReturn,
  };

  return sizes?.[size] || sizes.medium;
}

export default toggleButtonGroupSize;
