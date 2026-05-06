import { defaultCheckboxVariants } from "@/packages/mui/theme/variants";
/**
 * @returns {{rootSize?:object}}
 */
function checkboxSize(size = defaultCheckboxVariants.size) {
  const sizes = {
    medium: {
      rootSize: {
        width: "28px",
        height: "28px",
        borderRadius: "8px",
        padding: "0px",
      },
    },
    small: {
      rootSize: {
        width: "24px",
        height: "24px",
        borderRadius: "8px",
        padding: "0px",
      },
    },
  };

  return sizes?.[size] || sizes.medium;
}

export default checkboxSize;
