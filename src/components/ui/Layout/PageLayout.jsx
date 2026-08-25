"use client";
import { Box, styled, Typography } from "@mui/material";
import Alert from "../Alert/Alert";
import { useTradeMode } from "@/context/feature/trade/TradeMode";

// * Container
const Page = styled(Box)({ minHeight: "100svh" });

// * Container -> Header
/**
 * @param {import("@mui/material").BoxProps<"header">} props
 */
const _Header = (props) => {
  return <Box component={"header"} {...props} />;
};

const Header = styled(_Header)({
  paddingTop: "48px",
  paddingBottom: "42px",
});

// * Container -> Main
/**
 * @param {import("@mui/material").BoxProps<"main">} props
 */
const _Main = (props) => {
  const { isDemo } = useTradeMode();
  return (
    <Box component={"main"} {...props}>
      {/* // * TradeMode Warning section  */}
      {isDemo && (
        <Alert
          color="warning"
          variant="standard"
          sx={{ height: "40px", width: "100%", mb: "32px" }}
        >
          {
            "حالت آزمایشی — معاملات شما واقعی نیستند و سود یا زیانی ثبت نمی‌شود."
          }
        </Alert>
      )}
      {/* // * TradeMode Warning section  */}
      {props.children}
    </Box>
  );
};
const Main = styled(_Main)({
  paddingBottom: "42px",
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
