"use client";
import { Box, styled, Typography } from "@mui/material";

// * Container
const Page = styled(Box)({ padding: "0px 28px", minHeight: "100svh" });

// * Container -> Header
/**
 * @param {import("@mui/material").BoxProps<"header">} props
 */
const _Header = (props) => <Box component={"header"} {...props} />;
const Header = styled(_Header)({
  paddingTop: "48px",
});

// * Container -> Main
/**
 * @param {import("@mui/material").BoxProps<"main">} props
 */
const _Main = (props) => <Box component={"main"} {...props} />;
const Main = styled(_Main)({
  padding:"42px 0px"
});

// * Container -> Main -> Section
/**
 * @param {import("@mui/material").BoxProps<"section">} props
 */
const _Section = (props) => <Box component={"section"} {...props} />;
const Section = styled(_Section)({
  marginTop: "50px",
  ":first-of-type": {
    marginTop: "0px",
  },
});

// * Container -> Main -> Section -> SectionContent
const SectionContent = styled(Box)({
  display: "flex",
  gap: "24px",
});

// * Container -> Main -> Section -> SectionContent ->  SectionHeading
const SectionHeading = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "12px",
});

// * Container -> Main -> Section -> SectionContent -> SectionHeading -> Title
const SectionTitle = styled(Typography)(({ theme }) => {
  const { typography, palette } = theme;
  return {
    fontSize: typography.h6.fontSize,
    fontFamily: typography.h6.fontFamily,
    lineHeight: typography.h6.lineHeight,
    color: palette.text.heading,
  };
});

export {
  Page,
  Header,
  Main,
  Section,
  SectionContent,
  SectionHeading,
  SectionTitle,
};
