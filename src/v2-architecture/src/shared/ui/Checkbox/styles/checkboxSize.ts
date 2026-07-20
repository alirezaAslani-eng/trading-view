import { CheckboxSizeProps, CheckboxSizeReturn } from "./types";

function checkboxSize({ size }: CheckboxSizeProps): CheckboxSizeReturn {
  const sizes = {
    medium: {
      rootSize: {
        width: "28px",
        height: "28px",
        borderRadius: "8px",
        padding: "0px",
      },
    } satisfies CheckboxSizeReturn,
    small: {
      rootSize: {
        width: "24px",
        height: "24px",
        borderRadius: "8px",
        padding: "0px",
      },
    } satisfies CheckboxSizeReturn,
  };

  return sizes?.[size] || sizes.medium;
}

export default checkboxSize;
