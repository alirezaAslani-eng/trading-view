import { TabsSizeProps, TabsSizeReturn } from "../types";

function tabsSize({ size, theme }: TabsSizeProps): TabsSizeReturn {
  const { typography } = theme;
  const sizes = {
    medium: {
      rootSize: {
        borderBottom: "1px solid",
      },
      tabSize: {
        fontSize: typography.button2.fontSize,
        fontFamily: typography.button2.fontFamily,
        padding: "12px 0px",
        margin: "0px 15px",
      },
      indicatorSize: {
        height: "2px",
      },
    } satisfies TabsSizeReturn,
    small: {
      rootSize: {
        borderBottom: "1px solid",
      },
      tabSize: {
        fontSize: typography.button3.fontSize,
        fontFamily: typography.button3.fontFamily,
        padding: "12px 0px",
        margin: "0px 15px",
      },
      indicatorSize: {
        height: "2px",
      },
    } satisfies TabsSizeReturn,
  };

  return sizes?.[size] || sizes.medium;
}

export default tabsSize;
