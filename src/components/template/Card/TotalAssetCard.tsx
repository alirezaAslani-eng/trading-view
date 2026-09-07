"use client";
import { ReactNode } from "react";
import { walletPortfolioConfig } from "@/packages/react-query";
import { extractIRTAsset } from "@/utils/features/wallet/walletProtofolioTransformers";
import { Box, Grid, Skeleton, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { formatFaPrice, formatPrecent, getTrendColor } from "@/utils";
import PieChart from "@/components/ui/PieChart/PieChart";
import Button from "@/components/ui/Button/Button";
import { ReceiveIcon, SendIcon } from "@/components/ui/Icon";
import NextLink from "@/components/ui/Link/NextLink";
import { ROUTES } from "@/constant/app/routes";
import SparkLineChart from "@/components/ui/Chart/SparkLineChart";
import {
  PagePaper,
  PagePaperHeading,
  PagePaperTitle,
} from "@/components/ui/Layout/PaperLayout";
import {
  Price,
  PriceAmount,
  PriceUnit,
} from "@/components/ui/Typography/Price";
import { toProtfolioTrendChart } from "@/v2-architecture/src/features/portfolio/api";
import { portfolioTrendConfig } from "@/v2-architecture/src/features/portfolio/react-query";
import { useTradeMode } from "@/context/feature/trade/TradeMode";

export default function PortfolioOverviewSection() {
  const { isDemo } = useTradeMode();
  //#region // * ------------ Data : Portfolio Trend ------------
  const portfolioTrendQuery = useQuery({
    ...portfolioTrendConfig(isDemo),
    select: toProtfolioTrendChart,
  });
  const { prices: portfolioTrend = [] } = portfolioTrendQuery.data ?? {};
  //#endregion // * ------------ Data : Portfolio Trend ------------

  //#region // * ------------ Data : Wallet ------------
  const portfolioQuery = useQuery(walletPortfolioConfig(isDemo));
  const isSuccessQuery = portfolioQuery.isSuccess;
  const {
    totalPortfolioValueIrt = 0,
    totalProfitLoss24hIrt = 0,
    totalProfitLoss24hPercentage = 0,
    availableCash = 0,
    marginCredit = 0,
    assets = [],
  } = portfolioQuery.data ?? {};

  const assetsToPieChart = () => {
    return assets.map((asset) => ({
      value: asset.totalValueInIrt,
      label: asset.assetSymbol,
    }));
  };
  //#endregion // * ------------ Data : Wallet ------------

  return (
    <Stack sx={{ width: "100%", gap: 2 }}>
      <PagePaper>
        <Grid container spacing={{ xs: 6, sm: 4 }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <PortfolioStatItem
              loading={!isSuccessQuery}
              value={totalPortfolioValueIrt}
              title="ارزش کل دارایی"
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <PortfolioStatItem
              loading={!isSuccessQuery}
              title="کیف پول"
              value={availableCash}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <PortfolioStatItem
              loading={!isSuccessQuery}
              title="سود / ضرر 24 ساعته"
              value={
                <Price
                  sx={{ color: getTrendColor(totalProfitLoss24hPercentage) }}
                >
                  <PriceAmount>
                    {formatFaPrice(totalProfitLoss24hIrt)}
                  </PriceAmount>
                  <PriceUnit />
                  <PriceAmount>
                    ({formatPrecent(totalProfitLoss24hPercentage)})
                  </PriceAmount>
                </Price>
              }
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <PortfolioStatItem
              loading={!isSuccessQuery}
              title="اعتبار معاملاتی"
              value={marginCredit}
            />
          </Grid>
        </Grid>
        <Stack
          direction={"row"}
          sx={{
            display: { xs: "flex", sm: "none" },
            px: 2,
            gap: 4,
            mt: "38px",
          }}
        >
          <NextLink href={ROUTES.ASSETS.WITHDRAW} sx={{ flex: 1 }}>
            <Button variant="on-surface" fullWidth>
              <SendIcon sx={{ color: "inherit" }} />
              {"برداشت"}
            </Button>
          </NextLink>
          <NextLink href={ROUTES.ASSETS.DEPOSIT} sx={{ flex: 1 }}>
            <Button fullWidth variant="on-surface">
              <ReceiveIcon sx={{ color: "inherit" }} />
              {"واریز"}
            </Button>
          </NextLink>
        </Stack>
      </PagePaper>

      <Grid
        container
        spacing={2}
        sx={{ height: "300px", display: { xs: "none", sm: "flex" } }}
      >
        <Grid size={6}>
          <PagePaper sx={{ height: "100%" }}>
            <PagePaperHeading sx={{ mb: 4 }}>
              <PagePaperTitle>{"نمایی از داریی های شما"}</PagePaperTitle>
            </PagePaperHeading>

            <Stack
              direction={"row"}
              sx={{
                gap: 3,
                alignItems: "end",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              <Stack
                direction={"row"}
                sx={{ alignItems: "center", gap: 2, minWidth: "250px" }}
              >
                <NextLink href={ROUTES.ASSETS.WITHDRAW} sx={{ flex: 1 }}>
                  <Button variant="outlined" fullWidth>
                    <SendIcon sx={{ color: "inherit" }} />
                    {"برداشت"}
                  </Button>
                </NextLink>
                <NextLink href={ROUTES.ASSETS.DEPOSIT} sx={{ flex: 1 }}>
                  <Button fullWidth variant="outlined">
                    <ReceiveIcon sx={{ color: "inherit" }} />
                    {"واریز"}
                  </Button>
                </NextLink>
              </Stack>
              <Box sx={{ flexShrink: 0 }}>
                <PieChart
                  width={210}
                  height={210}
                  series={[
                    {
                      data: assetsToPieChart(),
                    },
                  ]}
                />
              </Box>
            </Stack>
          </PagePaper>
        </Grid>

        <Grid size={6}>
          <PagePaper sx={{ height: "100%" }}>
            <PagePaperHeading sx={{ mb: 4 }}>
              <PagePaperTitle>{"روند کل داریی در ۲۴ ساعت اخیر"}</PagePaperTitle>
            </PagePaperHeading>

            <SparkLineChart data={portfolioTrend} height={210} />
          </PagePaper>
        </Grid>
      </Grid>
    </Stack>
  );
}

type PortfolioStatItemProps = {
  title: string;
  value: ReactNode;
  loading?: boolean;
};

function PortfolioStatItem({
  title,
  loading = false,
  value,
}: PortfolioStatItemProps) {
  return (
    <Stack sx={{ gap: 0.5 }}>
      <Typography
        sx={{
          color: { xs: "text.tertiary", sm: "text.caption" },
          typography: { xs: "button5", sm: "button2" },
        }}
      >
        {title}
      </Typography>

      {loading ? (
        <Skeleton variant="text" height={27} width="70%" />
      ) : typeof value === "string" || typeof value === "number" ? (
        <Price>
          <PriceAmount sx={{ typography: { xs: "h7", sm: "" } }}>
            {formatFaPrice(value)}
          </PriceAmount>
          <PriceUnit />
        </Price>
      ) : (
        value
      )}
    </Stack>
  );
}
