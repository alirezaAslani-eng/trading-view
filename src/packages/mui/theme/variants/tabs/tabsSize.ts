import { TabsSizeProps, TabsSizeReturn } from "../types";

function tabsSize({ size, theme }: TabsSizeProps): TabsSizeReturn {
  const { typography } = theme;
  const sizes = {
    medium: {
      rootSize: {
        borderWidth: "1px",
      },
      tabSize: {
        fontSize: typography.button2.fontSize,
        fontFamily: typography.button2.fontFamily,
        padding: "12px 0px",
        margin: "0px 28px",
      },
      indicatorSize: {
        height: "2px",
      },
    } satisfies TabsSizeReturn,
  };

  return sizes?.[size] || sizes.medium;
}

export default tabsSize;
