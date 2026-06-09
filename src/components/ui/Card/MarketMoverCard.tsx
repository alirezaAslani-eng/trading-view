"use client";
import { Box, Typography, styled, alpha } from "@mui/material";
import { ArrowUpIcon } from "../Icon";
import { formatFaPrice } from "@/utils";
import {
  Price,
  PriceAmount,
  PriceUnit,
} from "@/components/ui/Typography/Price";

interface MarketMoverCardProps {
  color?: "loss" | "profit";
}

const MarketMoverCardPaper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "color",
})<MarketMoverCardProps>(({ theme, color = "profit" }) => {
  const { palette } = theme;

  const isProfit = color === "profit";

  const statusColor = isProfit ? palette.status.profit : palette.status.loss;

  const gradientColor = isProfit
    ? palette.background.buy!
    : palette.background.sell!;

  return {
    borderRadius: "16px",
    padding: "24px 16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: "40px",

    background: `
      linear-gradient(
        140deg,
        transparent 25%,
        ${alpha(gradientColor, 0.03)}
      ),
      ${alpha(palette.background.paper, 0.08)}
    `,

    "& .percentage-badge": {
      backgroundColor: alpha(gradientColor, 0.06),
      paddingRight: "10px",
      display: "flex",
      alignItems: "center",
      borderRadius: "999px",
    },

    "& .percentage-text": {
      color: statusColor,
    },

    "& .percentage-icon": {
      width: "24px",
      height: "24px",
      color: statusColor,
      transform: isProfit ? "none" : "rotate(180deg)",
    },
  };
});

interface MarketMoverCardHeaderProps {
  title: string;
  percentage: number | string;
}

const MarketMoverCardHeader = ({ title, percentage }: MarketMoverCardHeaderProps) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    <Typography variant="h7" sx={{ color: "text.onPrimary" }}>
      {title}
    </Typography>

    <Box className="percentage-badge">
      <Typography variant="body2" className="percentage-text">
        {percentage}%
      </Typography>
      <ArrowUpIcon className="percentage-icon" />
    </Box>
  </Box>
);

interface MarketMoverCardPriceProps {
  asset: string;
  price: number | string;
}

const MarketMoverCardPrice = ({ asset, price }: MarketMoverCardPriceProps) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    <Typography variant="body1" sx={{ color: "text.onPrimary" }}>
      {asset}
    </Typography>

    <Price sx={{ gap: "6px" }}>
      <PriceAmount variant="body1">{formatFaPrice(price)}</PriceAmount>
      <PriceUnit variant="body3" />
    </Price>
  </Box>
);

export { MarketMoverCardPaper, MarketMoverCardHeader, MarketMoverCardPrice };
