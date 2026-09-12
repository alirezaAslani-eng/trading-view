"use client";
import { ArrowUpIcon } from "@/components/ui/Icon";
import { formatFaPrice, formatPrecent, getTrendColor } from "@/utils";
import {
  Box,
  Typography,
  styled,
  alpha,
  SxProps,
  Theme,
  CSSObject,
  Stack,
} from "@mui/material";
import {
  Price,
  PriceAmount,
  PriceUnit,
} from "@/components/ui/Typography/Price";

// #region Styled Components
interface MarketTrendCardRootProps {
  color?: "loss" | "profit";
}

const MarketTrendCardRoot = styled(Box, {
  shouldForwardProp: (prop) => prop !== "color",
})<MarketTrendCardRootProps>(({ theme, color = "profit" }) => {
  const { palette, breakpoints } = theme;

  const isProfit = color === "profit";
  const statusColor = isProfit ? palette.status.profit : palette.status.loss;
  const gradientColor = isProfit
    ? palette.background.buy!
    : palette.background.sell!;

  return {
    padding: "12px 10px",
    borderRadius: "16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: "20px",
    position: "relative",

    background: `
      linear-gradient(
        140deg,
        transparent 25%,
        ${alpha(gradientColor, 0.03)}
      ),
      ${alpha(palette.background.paper, 0.2)}
    `,

    //#region // * ------------ percentage-badge ------------
    "& .percentage-badge": {
      display: "none",
      width: "38px",
      height: "38px",
      backgroundColor: alpha(gradientColor, 0.06),
      color: statusColor,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "16px",
      position: "absolute",
      top: 0,
      left: 0,
    },
    //#endregion

    "& .percentage-badge svg": {
      transform: isProfit ? "none" : "rotate(180deg)",
    },

    [breakpoints.up("xss-mobile")]: {
      "& .percentage-badge": {
        display: "flex",
      },
    },
    [breakpoints.up("sm")]: {
      padding: "24px 16px",
      gap: "40px",
      "& .percentage-badge": {
        display: "flex",
        width: "fit-content",
        height: "fit-content",
        position: "static",
        inset: 0,
        backgroundColor: alpha(gradientColor, 0.06),
        alignItems: "center",
        borderRadius: "999px",
        padding: "2px 10px",
      } as CSSObject,
    },
  };
});
// #endregion

// #region Types
interface MarketTrendCardProps {
  title: string;
  percentage: number;
  asset: string;
  price: number | string;
  color?: "loss" | "profit";
  sx?: SxProps<Theme>;
}
// #endregion

// #region Component
export const MarketTrendCard = ({
  title,
  percentage,
  asset,
  price,
  color = "profit",
  sx,
}: MarketTrendCardProps) => {
  return (
    <MarketTrendCardRoot color={color} sx={sx}>
      {/* Header Section */}

      <Stack
        direction="row"
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Stack spacing={1.5}>
          <Typography
            sx={{
              color: "text.onPrimary",
              typography: {
                xs: "button5",
                sm: "h7",
              },
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="button4"
            sx={{
              color: getTrendColor(percentage),
              display: { xs: "block", sm: "none" },
            }}
          >
            {formatPrecent(percentage)}
          </Typography>
        </Stack>

        <Box className="percentage-badge">
          <Typography
            variant="body2"
            sx={{ color: "inherit", display: { xs: "none", sm: "block" } }}
          >
            {formatPrecent(percentage)}
          </Typography>

          <ArrowUpIcon color="inherit" sx={{ color: "inherit" }} />
        </Box>
      </Stack>

      {/* Price Section */}
      <Stack
        direction={{ xs: "column", "xss-mobile": "row" }}
        spacing={1}
        sx={{
          alignItems: { xs: "start", "xss-mobile": "center" },
          justifyContent: { xs: "start", "xss-mobile": "space-between" },
        }}
      >
        <Typography
          variant="body1"
          sx={{
            color: "text.onPrimary",
            typography: {
              xs: "caption2",
              "xss-mobile": "button4",
              sm: "body1",
            },
          }}
        >
          {asset}
        </Typography>

        <Price sx={{ gap: "6px" }}>
          <PriceAmount sx={{ typography: { xs: "caption1", sm: "body1" } }}>
            {formatFaPrice(price, { compact: true })}
          </PriceAmount>

          <PriceUnit sx={{ typography: { xs: "caption1", sm: "body3" } }} />
        </Price>
      </Stack>
    </MarketTrendCardRoot>
  );
};

// #endregion
