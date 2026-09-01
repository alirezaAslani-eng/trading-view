import type {
  Breakpoint,
  Components,
  CSSProperties,
  SvgIconProps,
  Theme,
} from "@mui/material";

const svgIconSizes = {
  small: {
    width: "14px",
    height: "14px",
  },
  medium: {
    width: "18px",
    height: "18px",
  },
  large: {
    width: "20px",
    height: "20px",
  },
  "x-large": {
    width: "24px",
    height: "24px",
  },
} satisfies Omit<
  Record<
    Exclude<SvgIconProps["fontSize"], "inherit" | undefined>,
    CSSProperties
  >,
  "inherit"
>;

const MuiSvgIcon: Components<Theme>["MuiSvgIcon"] = {
  defaultProps: {
    fontSize: "large",
    color: "action",
  },

  styleOverrides: {
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fill: "none",
    },

    fontSizeSmall: svgIconSizes.small,
    fontSizeMedium: svgIconSizes.medium,
    fontSizeLarge: svgIconSizes.large,

    colorAction: ({ theme }) => ({
      color: theme.palette.text.onPrimary,
    }),
  },

  variants: [
    {
      props: { fontSize: "x-large" },
      style: svgIconSizes["x-large"],
    },
  ],
};
//#region // * ------------ Helpers ------------
function responsiveIconSize(
  breakpoints: Partial<
    Record<Breakpoint, Exclude<SvgIconProps["fontSize"], "inherit">>
  >,
) {
  const width = Object.fromEntries(
    Object.entries(breakpoints).map(([breakpoint, size]) => [
      breakpoint,
      svgIconSizes[size].width,
    ]),
  );

  const height = Object.fromEntries(
    Object.entries(breakpoints).map(([breakpoint, size]) => [
      breakpoint,
      svgIconSizes[size].height,
    ]),
  );

  return {
    width,
    height,
  };
}
//#endregion
export { MuiSvgIcon, responsiveIconSize };
