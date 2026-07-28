"use client";
import { WalletAsset } from "@/api/types";
import Button from "@/components/ui/Button/Button";
import { ReceiveIcon, SendIcon } from "@/components/ui/Icon";
import { PagePaper } from "@/components/ui/Layout/PaperLayout";
import NextLink from "@/components/ui/Link/NextLink";
import PieChart from "@/components/ui/PieChart/PieChart";
import {
  Price,
  PriceAmount,
  PriceUnit,
} from "@/components/ui/Typography/Price";
import { ROUTES } from "@/constant/app/routes";
import { walletPortfolioConfig } from "@/packages/react-query";
import { formatFaPrice, formatPrecent, getTrendColor } from "@/utils";
import { extractIRTAsset } from "@/utils/features/wallet/walletProtofolioTransformers";
import { Box, Divider, Skeleton, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

const queryConfig = walletPortfolioConfig();

const CHART_SIZE = 220;

function TotalAssetCard() {
  const portofolioQuery = useQuery(queryConfig);

  const isSuccessQuery = portofolioQuery.isSuccess;

  const irtAsset = extractIRTAsset(portofolioQuery.data);

  const { availableBalance } = irtAsset ?? {};
  const {
    totalPortfolioValueIrt = 0,
    totalProfitLoss24hIrt = 0,
    totalProfitLoss24hPercentage = 0,
    assets,
  } = portofolioQuery.data ?? {};

  return (
    <PagePaper
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "62px",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <PortfolioStatItem loading={!isSuccessQuery} title="ارزش کل دارایی">
            <Price>
              <PriceAmount>{formatFaPrice(totalPortfolioValueIrt)}</PriceAmount>
              <PriceUnit />
            </Price>
          </PortfolioStatItem>

          <Divider
            orientation="vertical"
            flexItem
            sx={{ backgroundColor: "border.default", mx: "32px" }}
          />

          <PortfolioStatItem
            loading={!isSuccessQuery}
            title={"موجودی نقد آزاد"}
          >
            <Price>
              <PriceAmount>{formatFaPrice(availableBalance)}</PriceAmount>
              <PriceUnit />
            </Price>
          </PortfolioStatItem>

          <Divider
            orientation="vertical"
            flexItem
            sx={{ backgroundColor: "border.default", mx: "32px" }}
          />

          <PortfolioStatItem
            loading={!isSuccessQuery}
            title={"سود/ضرر 24 ساعته"}
          >
            <Price sx={{ color: getTrendColor(totalProfitLoss24hPercentage) }}>
              <PriceAmount>{formatFaPrice(totalProfitLoss24hIrt)}</PriceAmount>
              <PriceUnit />
              <Typography variant="button2">
                {formatPrecent(totalProfitLoss24hPercentage)}
              </Typography>
            </Price>
          </PortfolioStatItem>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: "61px",
          alignItems: "center",
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <AssetsDonutChart loading={!isSuccessQuery} assets={assets} />

        <Box
          sx={{
            display: "flex",
            gap: "16px",
            alignSelf: "end",
            alignItems: "center",
          }}
        >
          <NextLink
            href={ROUTES.ASSETS.DEPOSIT}
            sx={{ flex: 1, width: "120px" }}
          >
            <Button
              color="primary"
              variant="contained"
              fullWidth
              sx={{ gap: "2px", px: "4px" }}
            >
              <ReceiveIcon />
              {"واریز"}
            </Button>
          </NextLink>
          <NextLink href={ROUTES.ASSETS.WITHDRAW} sx={{ flex: 1 }}>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              sx={{ gap: "2px", px: "4px" }}
            >
              <SendIcon />
              {"برداشت"}
            </Button>
          </NextLink>
        </Box>
      </Box>
    </PagePaper>
  );
}

export default TotalAssetCard;

//#region // * ------------ Internal Components ------------
type PortfolioStatItemProps = {
  title: string;
  loading: boolean;
};

function PortfolioStatItem({
  title,
  loading,
  children,
}: PropsWithChildren<PortfolioStatItemProps>) {
  return (
    <Stack sx={{ gap: "4px" }}>
      <Typography variant="button2" sx={{ color: "text.caption" }}>
        {title}
      </Typography>

      {loading ? <Skeleton variant="text" height={27} /> : children}
    </Stack>
  );
}

type AssetsDonutChartProps = {
  loading: boolean;
  assets?: WalletAsset[];
};

function AssetsDonutChart({ loading, assets }: AssetsDonutChartProps) {
  if (!!!assets?.length) return null;
  // <CircleBox sx={{ width: CHART_SIZE , bgcolor:"background.inputModal"}}>
  //   <Typography variant="caption" sx={{ color: "text.secondary" }}>
  //     {"داده ای برای نمایش در چارت وجود ندارد"}
  //   </Typography>
  // </CircleBox>

  if (loading) {
    return (
      <Skeleton variant="circular" width={CHART_SIZE} height={CHART_SIZE} />
    );
  }

  const chartData = (assets ?? []).map((asset) => {
    return {
      id: asset.assetSymbol,
      value: asset.totalValueInIrt,
      label: asset.assetSymbol,
    };
  });

  return (
    <Box
      sx={{
        width: CHART_SIZE,
        height: CHART_SIZE,
        flexShrink: 0,
      }}
    >
      <PieChart
        series={[{ data: chartData }]}
        width={CHART_SIZE}
        height={CHART_SIZE}
      />
    </Box>
  );
}
//#endregion // * ------------ Internal Components ------------
