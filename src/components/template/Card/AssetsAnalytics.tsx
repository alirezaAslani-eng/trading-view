"use client";

import { PagePaper } from "@/components/ui/Layout/PaperLayout";
import {
  PieChartCenter,
  PieChartContainer,
  PieChart,
} from "@/components/ui/PieChart";
import {
  Price,
  PriceAmount,
  PriceUnit,
} from "@/components/ui/Typography/Price";
import { useTradeMode } from "@/context/feature/trade/TradeMode";
import { walletPortfolioConfig } from "@/packages/react-query";
import { formatFaPrice } from "@/utils";
import { addAssetColor } from "@/v2-architecture/src/features/portfolio";
import { Chip } from "@mui/material";
import { Stack } from "@mui/system";
import { PieChartProps } from "@mui/x-charts";
import { useQuery } from "@tanstack/react-query";

const pieChartSeries = {
  paddingAngle: 2,
  cornerRadius: 2,
  innerRadius: 70,
  outerRadius: 90,
};

const pieChartSize = {
  width: 200,
  height: 200,
};

function AssetsAnalytics() {
  const { isDemo } = useTradeMode();

  const portfolioQuery = useQuery(walletPortfolioConfig(isDemo));

  const { assets = [], totalPortfolioValueIrt = 0 } = portfolioQuery.data ?? {};

  const pieChartData = addAssetColor(assets).map((asset) => ({
    id: asset.assetSymbol,
    value: asset.totalValueInIrt,
    color: asset.color,
  }));

  const pieChartConfig = {
    series: [
      {
        data: pieChartData,
        ...pieChartSeries,
      },
    ],
    ...pieChartSize,
    slotProps: {
      tooltip: {
        trigger: "none",
      },
    },
  } satisfies PieChartProps;
  return (
    <PagePaper sx={{ bgcolor: "transparent", backdropFilter: "none" }}>
      <Stack spacing={2} sx={{ alignItems: "center" }}>
        {/* Asset List */}
        <Stack
          direction={"row"}
          sx={{ flexWrap: "wrap", gap: 2, justifyContent: "center" }}
        >
          {addAssetColor(assets).map((asset) => {
            return (
              <Chip
                key={asset.assetSymbol}
                label={asset.assetSymbol}
                variant="filled"
                size="small"
                sx={{ backgroundColor: asset.color, color: "text.onPrimary" }}
              />
            );
          })}
        </Stack>
        {/* Pie Chart */}
        <PieChartContainer>
          <PieChart {...pieChartConfig} />

          <PieChartCenter>
            <Price
              sx={{
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <PriceAmount variant="body3">
                {formatFaPrice(totalPortfolioValueIrt, { compact: true })}
              </PriceAmount>

              <PriceUnit variant="caption2" />
            </Price>
          </PieChartCenter>
        </PieChartContainer>
      </Stack>
    </PagePaper>
  );
}

export { AssetsAnalytics };
