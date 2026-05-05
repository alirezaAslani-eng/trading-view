"use client";
import { identifySxProp } from "@/packages/mui/theme/helpers";
import { styled, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";

const AuthFeatureList = styled(Box, {
  shouldForwardProp: (prop) => {
    return prop !== "color";
  },
})(({ theme, color }) => {
  const authFeatureList_theme = authFeatureListTheme({ color, theme });
  return {
    borderRadius: "16px",
    padding: "18px",
    border: " solid",
    width: "100%",
    ...authFeatureList_theme?.rootTheme,
  };
});

/**
 * @param {import("@mui/material").TypographyProps} props
 */
function AuthFeatureTitle(props) {
  return (
    <Typography
      variant="button1"
      {...props}
      sx={(tm) => ({
        color: "text.heading",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        ...identifySxProp(tm, props.sx),
      })}
    />
  );
}

/**
 * @param {import("@mui/material").TypographyProps} props
 */
const AuthFeatureItems = styled(Stack)({
  gap: "10px",
  marginTop: "24px",
});

export { AuthFeatureItems, AuthFeatureList, AuthFeatureTitle };

/**
 * @return {{rootTheme:object}} props
 */
const authFeatureListTheme = ({ theme, color }) => {
  const styles = {
    primary: {
      contained: {
        rootTheme: {
          borderColor: theme.palette.text.primary2,
          backgroundColor: theme.palette.background.inputModal,
        },
      },
    },
    disabled: {
      contained: {
        rootTheme: {
          borderColor: theme.palette.border.default,
          backgroundColor: theme.palette.background.inputModal,
        },
      },
    },
  };

  return styles?.[color]?.["contained"] || styles.primary.contained;
};
