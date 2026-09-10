"use client";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { symbolsWithDefault } from "@/api/trading/symbols";
import { useCallback, useEffect } from "react";
import NextLink from "@/components/ui/Link/NextLink";
import { ROUTES } from "@/constant/app/routes";
import { MarketTickerInfoResponse } from "@/api/types";
import useFilter from "@/hooks/app/useFilter";
import { ProductTrendFilters } from "@/v2-architecture/src/features/product/types";
import { productTrendConfig } from "@/v2-architecture/src/features/product/react-query/queries";
import { DashedLine } from "@/components/ui/Icon";
import { formatFaPrice, getTrendColor } from "@/utils";
import Button from "@/components/ui/Button/Button";
import { useQuery } from "@tanstack/react-query";
import { marketTickerInfoConfig, symbolsConfig } from "@/packages/react-query";
import {
  InputSelect,
  InputSelectItem,
  InputSelectMenu,
} from "@/components/ui/Input/InputSelect";
import {
  PagePaper,
  PagePaperHeading,
  PagePaperTitle,
} from "@/components/ui/Layout/PaperLayout";
import {
  LineChart,
  ResponsiveComponent,
} from "@/v2-architecture/src/shared/ui";

const DEFAULT_FILTERS: ProductTrendFilters = {
  days: null,
  symbol: null,
} as const;

function ProductTrendChart() {
  //#region // * ------------ Filters ------------
  const { filters, setFilter } = useFilter({ initialState: DEFAULT_FILTERS });
  const symbolHandler = useCallback((symbol: string) => {
    setFilter("symbol", symbol);
  }, []);
  //#endregion // * ------------ Filters ------------

  //#region // * ------------ Data-ProductTrend ------------
  const productTrendQuery = useQuery(productTrendConfig(filters));
  const { dates = [], prices = [] } = productTrendQuery.data ?? {};
  //#endregion // * ------------ Data-ProductTrend ------------

  //#region // * ------------ Data-Symbols ------------
  const symbolsQuery = useQuery({
    ...symbolsConfig(),
    select: symbolsWithDefault,
  });
  const { defSymbolName, symbols } = symbolsQuery.data || {};
  useEffect(() => {
    if (!defSymbolName) return;
    symbolHandler(defSymbolName);
  }, [defSymbolName]);
  //#endregion // * ------------ Data-Symbols ------------

  //#region // * ------------ Data-SymbolInfo ------------
  const symbolInfoQuery = useQuery(marketTickerInfoConfig(filters.symbol!));
  //#endregion // * ------------ Data-SymbolInfo ------------

  return (
    <PagePaper>
      <PagePaperHeading sx={{ mb: "24px" }}>
        <PagePaperTitle>
          {"تحلیل خلاصه‌ای از وضعیت قیمت محصولات"}
        </PagePaperTitle>
      </PagePaperHeading>

      <Stack
        direction={"row"}
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <InputSelect
          variant="outlined"
          placeholder="نماد"
          size="small"
          sx={{ width: "186px" }}
          value={filters.symbol ?? ""}
          onChange={symbolHandler}
        >
          <InputSelectMenu>
            {symbols?.map((symbol) => {
              return (
                <InputSelectItem value={symbol.name}>
                  {symbol.description}
                </InputSelectItem>
              );
            })}
          </InputSelectMenu>
        </InputSelect>

        {/* <ToggleTabGroup value={"1"}>
          <ToggleButton value={"5"}>{"ماهانه"}</ToggleButton>
          <Divider flexItem />
          <ToggleButton value={"4"}>{"سه ماهه"}</ToggleButton>
          <Divider flexItem />
          <ToggleButton value={"3"}>{"شش ماهه"}</ToggleButton>
          <Divider flexItem />
          <ToggleButton value={"2"}>{"سالانه"}</ToggleButton>
        </ToggleTabGroup> */}
      </Stack>

      <Stack direction={{ xs: "column", sm: "row" }} sx={{ mt: "20px" }}>
        <SymbolInfoSection
          data={symbolInfoQuery.data}
          isLoading={symbolInfoQuery.isPending}
        />
        <Divider
          flexItem
          orientation="vertical"
          sx={{
            borderColor: "border.default",
            mx: "24px",
            display: { xs: "none", sm: "block" },
          }}
        />

        {/* // * Chart section */}
        <ResponsiveComponent
          sm={
            <LineChart
              sx={{ display: { xs: "none", sm: "block" } }}
              height={210}
              series={[{ data: prices }]}
              xAxis={[
                {
                  scaleType: "point",
                  data: dates,
                  tickLabelStyle: {
                    fontSize: 12,
                    transform: "rotate(-45deg)",
                  },
                },
              ]}
            />
          }
        />
      </Stack>
    </PagePaper>
  );
}

export default ProductTrendChart;

//#region // * ------------ Internal Components --------
function SymbolInfoSection({
  data,
  isLoading,
}: {
  isLoading: boolean;
  data: MarketTickerInfoResponse | undefined;
}) {
  const {
    high24h = 0,
    low24h = 0,
    change24h = 0,
    lastPrice = 0,
    symbol,
  } = data ?? {};
  return (
    <Stack
      spacing={{ xs: 6, sm: 12 }}
      sx={{ width: { xs: "100%", sm: "268px" } }}
    >
      <Stack sx={{ gap: 3.2 }}>
        <InfoRow label="آخرین قیمت" value={formatFaPrice(lastPrice)} />
        <InfoRow
          label="تغییرات 24 ساعت گذشته"
          value={
            <Typography
              variant="inherit"
              sx={{ color: getTrendColor(change24h) }}
            >
              {formatFaPrice(change24h)}
            </Typography>
          }
        />
        <InfoRow label="کمترین قیمت" value={formatFaPrice(low24h)} />
        <InfoRow label="بیشترین قیمت" value={formatFaPrice(high24h)} />
      </Stack>
      {!isLoading && (
        <NextLink href={ROUTES.TRADE.BY_SYMBOL(symbol!)}>
          <Button variant="outlined" size="small" fullWidth>
            {"معامله"}
          </Button>
        </NextLink>
      )}
    </Stack>
  );
}
//#endregion // * ------------ Internal Components --------

//#region // * -------- Components that might be generic in the future ---------
type InfoRowProps = {
  label: React.ReactNode;
  value: React.ReactNode;
};

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <Box
      sx={({ typography }) => ({
        display: "flex",
        alignItems: "center",
        width: "100%",
        gap: 1.5,
        ...typography.body3,
        color: "text.secondary",
      })}
    >
      <Typography variant="inherit">{label}</Typography>

      <DashedLine sx={{ color: "border.default" }} />

      {typeof value === "string" || typeof value === "number" ? (
        <Typography variant="inherit">{value}</Typography>
      ) : (
        value
      )}
    </Box>
  );
}
//#endregion // * -------- Components that might be generic in the future ---------
