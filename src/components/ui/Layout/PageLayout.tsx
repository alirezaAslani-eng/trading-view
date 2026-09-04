"use client";

import { Box, styled, Typography, type BoxProps } from "@mui/material";
import Alert from "../Alert/Alert";
import { useTradeMode } from "@/context/feature/trade/TradeMode";
import { ReplaceSxWithSxOnlyObject } from "@/packages/mui/theme/types";

// * Container
const Page = styled(Box)({
  minHeight: "100svh",
});

// * Container -> Header
const _Header = (props: BoxProps<"header">) => {
  return <Box component="header" {...props} />;
};

const Header = styled(_Header)(({ theme }) => {
  const { breakpoints } = theme;
  return {
    [breakpoints.up("xs")]: {
      paddingTop: "3px",
    },
    // Desktop : paddingTop: "48px",
    // Desktop : paddingBottom: "42px",
  };
});

// * Container -> Main
const _Main = ({ children, ...props }: BoxProps<"main">) => {
  const { isDemo } = useTradeMode();

  return (
    <Box component="main" {...props}>
      {/* // * TradeMode Warning section */}
      {isDemo && (
        <Alert
          color="warning"
          variant="standard"
          sx={{
            height: "40px",
            width: "100%",
            mb: "32px",
          }}
        >
          حالت آزمایشی — معاملات شما واقعی نیستند و سود یا زیانی ثبت نمی‌شود.
        </Alert>
      )}

      {/* // * Content */}
      {children}
    </Box>
  );
};

const Main = styled(_Main)({
  paddingBottom: "42px",
});

// * Container -> Main -> Section
const _Section = (props: BoxProps<"section">) => {
  return <Box component="section" {...props} />;
};

const Section = styled(_Section)(({ theme }) => {
  const { breakpoints } = theme;
  return {
    marginTop: "20px",

    ":first-of-type": {
      marginTop: "30px",
    },
    [breakpoints.up("sm")]: {
      marginTop: "50px",
      ":first-of-type": {
        marginTop: "0px",
      },
    },
  };
});

// * Container -> Main -> Section -> SectionContent
const SectionContent = styled(Box)({
  display: "flex",
  gap: "24px",
});

// * Container -> Main -> Section -> SectionContent -> SectionHeading
const SectionHeading = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "12px",
});

// * Container -> Main -> Section -> SectionContent -> SectionHeading -> Title
const SectionTitle = styled(Typography)(({ theme }) => ({
  ...theme.typography.body3,
color: theme.palette.text.heading,
  [theme.breakpoints.up("sm")]: {
    ...theme.typography.h6,
  },
}));

export {
  Page,
  Header,
  Main,
  Section,
  SectionContent,
  SectionHeading,
  SectionTitle,
};
