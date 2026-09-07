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
import { Stack } from "@mui/system";
import { PieChartProps } from "@mui/x-charts";
import { useQuery } from "@tanstack/react-query";

const pieChartSeries = {
  paddingAngle: 0,
  cornerRadius: 0,
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

  const pieChartData = assets.map((asset) => ({
    id: asset.assetSymbol,
    value: asset.totalValueInIrt,
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
      <Stack sx={{ alignItems: "center" }}>
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

        {/* Asset List */}
        <Stack></Stack>
      </Stack>
    </PagePaper>
  );
}

export { AssetsAnalytics };
