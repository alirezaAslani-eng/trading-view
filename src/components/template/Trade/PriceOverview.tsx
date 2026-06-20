"use client";
import PanelPaper from "@/components/ui/Paper/PanelPaper";
import { formatFaPrice } from "@/utils";
import { ReplaceSxWithSxOnlyObject } from "@/packages/mui/theme/types";
import InputSelectSymbol from "../Input/InputSelectSymbol";
import { parseAsString, useQueryState } from "nuqs";
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
import { symbolKey } from "@/packages/nuqs";
import { parseAsUppercase } from "@/packages/nuqs/parsers";
import { useQuery } from "@tanstack/react-query";
import { marketTickerInfoConfig } from "@/packages/react-query";
const price_sx = { color: "text.onPrimary" };
const oveview_card_title_sx = { color: "text.caption" };

function PriceOverview() {
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
  const [symbol, setSymbol] = useQueryState(symbolKey, parseAsUppercase);

  return (
    <InputSelectSymbol
      //@ts-ignore
      onChange={setSymbol}
      value={symbol ?? ""}
    />
  );
}
export default PriceOverview;

const skleton_sx: SxProps<Theme> = {
  width: "100px",
};
function PriceOverViewSection() {
  const [symbol] = useQueryState(symbolKey, parseAsUppercase);
  const tickerInfoQuery = useQuery(marketTickerInfoConfig(symbol ?? ""));
  const isLoading = tickerInfoQuery.isLoading;
  // tickerInfoQuery.data.
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
            <PriceAmount>
              {formatFaPrice(tickerInfoQuery.data?.lastPrice ?? "")}
            </PriceAmount>
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
          <Typography variant="button2" sx={{ color: "text.profit" }}>
            {`% ${tickerInfoQuery.data?.change24h}`}
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
            <PriceAmount>
              {formatFaPrice(tickerInfoQuery.data?.low24h ?? "")}
            </PriceAmount>
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
            <PriceAmount>
              {formatFaPrice(tickerInfoQuery.data?.high24h ?? "")}
            </PriceAmount>
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
            <PriceAmount>
              {formatFaPrice(tickerInfoQuery.data?.volume24h ?? "")}
            </PriceAmount>
            <PriceUnit variant="caption1" />
          </Price>
        )}
      </PriceOverviewCard>
    </Box>
  );
}
