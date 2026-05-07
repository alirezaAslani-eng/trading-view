/**
 * @returns {{rootSize:object,toggleTabSize:object}}
 */

import { ToggleTabGroupSizeProps, ToggleTabGroupSizeReturns } from "../types";

const borderRadius = "8px !important";

function toggleTabGroupSize({
  size,
  theme,
}: ToggleTabGroupSizeProps): ToggleTabGroupSizeReturns {
  const sizes = {
    medium: {
      rootSize: {
        padding: "14px 22px",
        borderRadius,
        minHeight: "47px",
      },
      toggleTabSize: {
        borderRadius,
        fontSize: theme.typography.button2.fontSize,
        fontFamily: theme.typography.button2.fontFamily,
      },
      dividerSize: {
        marginRight: "12px",
        marginLeft: "12px",
        borderWidth: "1px",
      },
    } satisfies ToggleTabGroupSizeReturns,
    small: {
      rootSize: {
        padding: "10px 16px",
        borderRadius,
        minHeight: "37px",
      },
      toggleTabSize: {
        borderRadius,
        fontSize: theme.typography.button3.fontSize,
        fontFamily: theme.typography.button3.fontFamily,
      },
      dividerSize: {
        marginRight: "14px",
        marginLeft: "14px",
        borderWidth: "1px",
      },
    } satisfies ToggleTabGroupSizeReturns,
  };

  return sizes?.[size] || sizes.medium;
}

export default toggleTabGroupSize;
