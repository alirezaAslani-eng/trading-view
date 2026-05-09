"use client";
import { styled } from "@mui/material";
import { PagePaper } from "../Layout/PaperLayout";
import NextLink from "../Link/NextLink";

const PageSubNavigation = styled(PagePaper)({
  paddingBottom: "10px",
  width: "fit-content",
  minWidth: "288px",
});

const PageSubNavigationLink = styled(NextLink)(({ theme }) => {
  const { palette, typography } = theme;
  return {
    minHeight: "52px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    borderRadius: "14px",
    color: palette.text.secondary,
    fontSize: typography.body2.fontSize,
    fontFamily: typography.body2.fontFamily,
    lineHeight: typography.body2.lineHeight,
    ":first-of-type": { marginTop: "0px" },
    marginTop: "4px",
    padding: "0px 12px",
    "& .MuiSvgIcon-root": {
      color: palette.text.linkSecondary,
    },
    "&.Mui-active": {
      color: palette.text.onPrimary,
      fontSize: typography.button2.fontSize,
      fontFamily: typography.button2.fontFamily,
      lineHeight: typography.button2.lineHeight,
      backgroundColor: palette.background.surface,
      "& .MuiSvgIcon-root": {
        color: palette.text.primary2,
      },
    },
  };
});

export { PageSubNavigation, PageSubNavigationLink };
