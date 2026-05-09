import { defaultCheckboxVariants } from "@/packages/mui/theme/variants";
import {
  CheckboxSizeProps,
  CheckboxSizeReturn,
} from "@/packages/mui/theme/variants/types";

function checkboxSize({
  size = defaultCheckboxVariants.size,
}: CheckboxSizeProps): CheckboxSizeReturn {
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
