"use client";
import Button from "@/components/ui/Button/Button";
import { ReceiveIcon, SendIcon } from "@/components/ui/Icon";
import { PagePaper } from "@/components/ui/Layout/PaperLayout";
import NextLink from "@/components/ui/Link/NextLink";
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
import {
  chartsAxisHighlightClasses,
  lineClasses,
  SparkLineChart,
  SparkLineChartProps,
} from "@mui/x-charts";

const queryConfig = walletPortfolioConfig();

function TotalAssetCard() {
  const portofolioQuery = useQuery(queryConfig);

  const isSuccessQuery = portofolioQuery.isSuccess;

  const irtAsset = extractIRTAsset(portofolioQuery.data);

  const { availableBalance } = irtAsset ?? {};
  const {
    totalPortfolioValueIrt = 0,
    totalProfitLoss24hIrt = 0,
    totalProfitLoss24hPercentage = 0,
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
          // px: "24px",
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
        <NpmSparkLine />
        <Box
          sx={{
            display: "flex",
            gap: "16px",
            alignSelf: "end",
            alignItems: "center",
            // flex: 1,
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
//#endregion // * ------------ Internal Components ------------



//#region // * ------------ SparkLineChart ------------
const chartData = [
  {
    downloads: 160181,
    weekId: "2024-33",
    start: "2024-08-12",
    end: "2024-08-18",
  },
  {
    downloads: 173595,
    weekId: "2024-34",
    start: "2024-08-19",
    end: "2024-08-25",
  },
  {
    downloads: 180751,
    weekId: "2024-35",
    start: "2024-08-26",
    end: "2024-09-01",
  },
  {
    downloads: 186853,
    weekId: "2024-36",
    start: "2024-09-02",
    end: "2024-09-08",
  },
  {
    downloads: 197919,
    weekId: "2024-37",
    start: "2024-09-09",
    end: "2024-09-15",
  },
  {
    downloads: 202767,
    weekId: "2024-38",
    start: "2024-09-16",
    end: "2024-09-22",
  },
  {
    downloads: 207921,
    weekId: "2024-39",
    start: "2024-09-23",
    end: "2024-09-29",
  },
  {
    downloads: 204966,
    weekId: "2024-40",
    start: "2024-09-30",
    end: "2024-10-06",
  },
  {
    downloads: 209437,
    weekId: "2024-41",
    start: "2024-10-07",
    end: "2024-10-13",
  },
  {
    downloads: 207660,
    weekId: "2024-42",
    start: "2024-10-14",
    end: "2024-10-20",
  },
  {
    downloads: 224221,
    weekId: "2024-43",
    start: "2024-10-21",
    end: "2024-10-27",
  },
  {
    downloads: 218456,
    weekId: "2024-44",
    start: "2024-10-28",
    end: "2024-11-03",
  },
  {
    downloads: 220470,
    weekId: "2024-45",
    start: "2024-11-04",
    end: "2024-11-10",
  },
  {
    downloads: 222240,
    weekId: "2024-46",
    start: "2024-11-11",
    end: "2024-11-17",
  },
  {
    downloads: 243266,
    weekId: "2024-47",
    start: "2024-11-18",
    end: "2024-11-24",
  },
  {
    downloads: 217809,
    weekId: "2024-48",
    start: "2024-11-25",
    end: "2024-12-01",
  },
  {
    downloads: 239869,
    weekId: "2024-49",
    start: "2024-12-02",
    end: "2024-12-08",
  },
  {
    downloads: 254907,
    weekId: "2024-50",
    start: "2024-12-09",
    end: "2024-12-15",
  },
  {
    downloads: 256494,
    weekId: "2024-51",
    start: "2024-12-16",
    end: "2024-12-22",
  },
  {
    downloads: 126407,
    weekId: "2024-52",
    start: "2024-12-23",
    end: "2024-12-29",
  },
  {
    downloads: 48203,
    weekId: "2024-1",
    start: "2024-12-30",
    end: "2024-12-31",
  },
  {
    downloads: 91666,
    weekId: "2025-1",
    start: "2025-01-01",
    end: "2025-01-05",
  },
  {
    downloads: 256972,
    weekId: "2025-2",
    start: "2025-01-06",
    end: "2025-01-12",
  },
  {
    downloads: 261140,
    weekId: "2025-3",
    start: "2025-01-13",
    end: "2025-01-19",
  },
  {
    downloads: 279179,
    weekId: "2025-4",
    start: "2025-01-20",
    end: "2025-01-26",
  },
  {
    downloads: 288048,
    weekId: "2025-5",
    start: "2025-01-27",
    end: "2025-02-02",
  },
  {
    downloads: 311378,
    weekId: "2025-6",
    start: "2025-02-03",
    end: "2025-02-09",
  },
  {
    downloads: 315621,
    weekId: "2025-7",
    start: "2025-02-10",
    end: "2025-02-16",
  },
  {
    downloads: 325811,
    weekId: "2025-8",
    start: "2025-02-17",
    end: "2025-02-23",
  },
  {
    downloads: 326075,
    weekId: "2025-9",
    start: "2025-02-24",
    end: "2025-03-02",
  },
  {
    downloads: 331595,
    weekId: "2025-10",
    start: "2025-03-03",
    end: "2025-03-09",
  },
  {
    downloads: 341198,
    weekId: "2025-11",
    start: "2025-03-10",
    end: "2025-03-16",
  },
  {
    downloads: 349635,
    weekId: "2025-12",
    start: "2025-03-17",
    end: "2025-03-23",
  },
  {
    downloads: 346696,
    weekId: "2025-13",
    start: "2025-03-24",
    end: "2025-03-30",
  },
  {
    downloads: 345318,
    weekId: "2025-14",
    start: "2025-03-31",
    end: "2025-04-06",
  },
  {
    downloads: 345071,
    weekId: "2025-15",
    start: "2025-04-07",
    end: "2025-04-13",
  },
  {
    downloads: 321835,
    weekId: "2025-16",
    start: "2025-04-14",
    end: "2025-04-20",
  },
  {
    downloads: 336936,
    weekId: "2025-17",
    start: "2025-04-21",
    end: "2025-04-27",
  },
  {
    downloads: 309774,
    weekId: "2025-18",
    start: "2025-04-28",
    end: "2025-05-04",
  },
  {
    downloads: 349943,
    weekId: "2025-19",
    start: "2025-05-05",
    end: "2025-05-11",
  },
  {
    downloads: 366535,
    weekId: "2025-20",
    start: "2025-05-12",
    end: "2025-05-18",
  },
  {
    downloads: 369336,
    weekId: "2025-21",
    start: "2025-05-19",
    end: "2025-05-25",
  },
  {
    downloads: 344681,
    weekId: "2025-22",
    start: "2025-05-26",
    end: "2025-06-01",
  },
  {
    downloads: 382330,
    weekId: "2025-23",
    start: "2025-06-02",
    end: "2025-06-08",
  },
  {
    downloads: 378375,
    weekId: "2025-24",
    start: "2025-06-09",
    end: "2025-06-15",
  },
  {
    downloads: 374374,
    weekId: "2025-25",
    start: "2025-06-16",
    end: "2025-06-22",
  },
  {
    downloads: 414344,
    weekId: "2025-26",
    start: "2025-06-23",
    end: "2025-06-29",
  },
  {
    downloads: 378090,
    weekId: "2025-27",
    start: "2025-06-30",
    end: "2025-07-06",
  },
  {
    downloads: 394121,
    weekId: "2025-28",
    start: "2025-07-07",
    end: "2025-07-13",
  },
  {
    downloads: 391424,
    weekId: "2025-29",
    start: "2025-07-14",
    end: "2025-07-20",
  },
  {
    downloads: 413641,
    weekId: "2025-30",
    start: "2025-07-21",
    end: "2025-07-27",
  },
  {
    downloads: 423709,
    weekId: "2025-31",
    start: "2025-07-28",
    end: "2025-08-03",
  },
];

const downloads = chartData.map((item) => item.downloads);
const weeks = chartData.map((item) => `${item.start} to ${item.end}`);

const settings: SparkLineChartProps = {
  data: downloads,
  xAxis: { id: "week-axis", data: weeks },
  yAxis: {
    domainLimit: (_, maxValue) => ({
      min: -maxValue / 6,
      max: maxValue,
    }),
  },
  baseline: "min",
  sx: {
    [`& .${lineClasses.area}`]: { opacity: 0.2 },
    [`& .${lineClasses.line}`]: { strokeWidth: 3 },
    [`& .${chartsAxisHighlightClasses.root}`]: {
      stroke: "rgb(137, 86, 255)",
      strokeDasharray: "none",
      strokeWidth: 2,
    },
  },
  slotProps: {
    lineHighlight: { r: 4 },
  },
  // axisHighlight: { x: "line" },
};

function NpmSparkLine() {
  return (
    <SparkLineChart
      height={100}
      width={500}
      area
      curve="natural"
      // color="rgb(137, 86, 255)"
      {...settings}
      // showHighlight
      // onHighlightedAxisChange={(axisItems) => {
      //   setWeekIndex(axisItems[0]?.dataIndex ?? null);
      // }}
      // highlightedAxis={
      //   weekIndex === null
      //     ? []
      //     : [{ axisId: "week-axis", dataIndex: weekIndex }]
      // }
    />
  );
}
//#endregion // * ------------ SparkLineChart ------------