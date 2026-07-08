"use client";
import PanelPaper from "@/components/ui/Paper/PanelPaper";
import { formatFaPrice, formatPrecent, getTrendColor } from "@/utils";
import { ReplaceSxWithSxOnlyObject } from "@/packages/mui/theme/types";
import InputSelectSymbol from "../Input/InputSelectSymbol";
import { useQuery } from "@tanstack/react-query";
import { marketTickerInfoConfig } from "@/packages/react-query";
import useInvokeTickerInfo from "@/hooks/features/market/useInvokeTickerInfo";
import useSymbolParams from "@/hooks/features/trading/useSymbolParams";
import {
  Price,
  PriceAmount,
  PriceUnit,
} from "@/components/ui/Typography/Price";
import {
  Box,
  Skeleton,
  Stack,
  StackProps,
  SxProps,
  Theme,
  Typography,
  TypographyProps,
} from "@mui/material";
import { WEIGHT_UNITS } from "@/constant/features/product/weightUnits";
const price_sx = { color: "text.onPrimary" };
const oveview_card_title_sx = { color: "text.caption" };
const inputSelect_sx: SxProps<Theme> = ({ typography }) => ({
  fontSize: typography.button1.fontSize,
  width: "188px",
  height: "51px",
  "&.Mui-placeholder": {
    fontSize: typography.button1.fontSize,
  },
  "& .MuiSvgIcon-root": {
    width: "18px",
    height: "18px",
  },
});

function PriceOverview() {
  const [symbol] = useSymbolParams();
  useInvokeTickerInfo(symbol);
  return (
    <PanelPaper
      sx={{
        p: "16px",
        display: "flex",
        alignItems: "center",
        width: "100%",
        gap: "88px",
      }}
    >
      <ProductCodeSelector />
      <PriceOverViewSection />
    </PanelPaper>
  );
}

function PriceOverviewCard(stackProps: StackProps) {
  return (
    <Stack
      spacing={2}
      {...stackProps}
      sx={{ flex: 1, minWidth: "0px", ...stackProps.sx }}
    />
  );
}

function PriceOverviewCardTitle(
  props: ReplaceSxWithSxOnlyObject<TypographyProps>,
) {
  return (
    <Typography
      {...props}
      variant="caption1"
      sx={{ color: "text.onPrimary", ...props.sx }}
    />
  );
}

function ProductCodeSelector() {
  const [symbol, setSymbolParam] = useSymbolParams();

  return (
    <InputSelectSymbol
      sx={inputSelect_sx}
      //@ts-ignore
      onChange={setSymbolParam}
      value={symbol ?? ""}
    />
  );
}
export default PriceOverview;

const skleton_sx: SxProps<Theme> = {
  width: "100px",
};
function PriceOverViewSection() {
  const [symbol] = useSymbolParams();
  const tickerInfoQuery = useQuery(marketTickerInfoConfig(symbol ?? ""));
  const isLoading = tickerInfoQuery.isLoading;

  const {
    change24h = 0,
    lastPrice = 0,
    volume24h = 0,
    low24h = 0,
  } = tickerInfoQuery.data ?? {};

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flex: 1,
        minWidth: "0px",
        gap: "40px",
      }}
    >
      <PriceOverviewCard>
        <PriceOverviewCardTitle>{"آخرین قیمت"}</PriceOverviewCardTitle>
        {isLoading && <Skeleton animation="wave" sx={skleton_sx} />}
        {!isLoading && (
          <Price>
            <PriceAmount>{formatFaPrice(lastPrice)}</PriceAmount>
            <PriceUnit variant="caption1" />
          </Price>
        )}
      </PriceOverviewCard>

      <PriceOverviewCard>
        <PriceOverviewCardTitle sx={oveview_card_title_sx}>
          {"درصد تغییرات"}
        </PriceOverviewCardTitle>
        {isLoading && <Skeleton sx={skleton_sx} />}
        {!isLoading && (
          <Typography sx={{ color: getTrendColor(change24h) }}>
            {formatPrecent(change24h)}
          </Typography>
        )}
      </PriceOverviewCard>

      <PriceOverviewCard>
        <PriceOverviewCardTitle sx={oveview_card_title_sx}>
          {"کم ترین قیمت 24h"}
        </PriceOverviewCardTitle>
        {isLoading && <Skeleton sx={skleton_sx} />}
        {!isLoading && (
          <Price sx={price_sx}>
            <PriceAmount>{formatFaPrice(low24h)}</PriceAmount>
            <PriceUnit variant="caption1" />
          </Price>
        )}
      </PriceOverviewCard>
      <PriceOverviewCard>
        <PriceOverviewCardTitle sx={oveview_card_title_sx}>
          {"بیشترین قیمت 24h"}
        </PriceOverviewCardTitle>
        {isLoading && <Skeleton sx={skleton_sx} />}
        {!isLoading && (
          <Price sx={price_sx}>
            <PriceAmount>{formatFaPrice(low24h)}</PriceAmount>
            <PriceUnit variant="caption1" />
          </Price>
        )}
      </PriceOverviewCard>
      <PriceOverviewCard>
        <PriceOverviewCardTitle sx={oveview_card_title_sx}>
          {"حجم معامله"}
        </PriceOverviewCardTitle>
        {isLoading && <Skeleton sx={skleton_sx} />}
        {!isLoading && (
          <Price sx={price_sx}>
            <PriceAmount>{formatFaPrice(volume24h)}</PriceAmount>
            <PriceUnit variant="caption1">{WEIGHT_UNITS.KG.lable}</PriceUnit>
          </Price>
        )}
      </PriceOverviewCard>
    </Box>
  );
}
