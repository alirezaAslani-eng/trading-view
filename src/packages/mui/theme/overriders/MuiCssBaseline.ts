import { alpha, Components, Theme } from "@mui/material";
import { CSSProperties } from "react";

const MuiCssBaseline = {
  styleOverrides: ({ palette }) => {
    return {
      li: {
        listStyle: "none",
        padding: 0,
        margin: 0,
      },
      ul: {
        padding: 0,
        margin: 0,
      },
      input: {
        border: "none",
        backgroundColor: "transparent",
        outline: "none",
      },
      label: {
        cursor: "pointer",
      },
      button: {
        backgroundColor: "transparent",
        border: "none",
        padding: "0px",
        cursor: "pointer",
        userSelect: "none",
        whiteSpace: "nowrap",
      },
      //#region // * ------------ Chart Global Style ------------
      ".MuiChartsTooltip-paper": {
        backgroundColor: `${alpha(palette.background.surfaceSecondary ?? "", 0.3)} !important`,
        backdropFilter: "blur(12px) !important",
        color: `${palette.text.onPrimary} !important`,
        border: `1px solid ${alpha(palette.border.default, 0.3)} !important`,
        borderRadius: "8px !important",
      },
      ".MuiChartsTooltip-valueCell": {
        color: `${palette.text.onPrimary} !important`,
      },
      ".MuiChartsLegend-label": {
        color: palette.text.onPrimary,
      },

      ".MuiLineChart-area": {
        fill: alpha(palette.background.primary!, 0.2),
      } as CSSProperties,
      ".MuiLineChart-line": {
        stroke: palette.text.primary,
        strokeWidth: 2,
      },
      //#endregion // * ------------ Chart Global Style ------------
    };
  },
} satisfies Components<Theme>["MuiCssBaseline"];

export default MuiCssBaseline;
