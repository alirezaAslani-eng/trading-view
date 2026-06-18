"use client";
import PanelPaper from "@/components/ui/Paper/PanelPaper";
import { formatFaPrice } from "@/utils";
import { ReplaceSxWithSxOnlyObject } from "@/packages/mui/theme/types";
import InputSelectProduct from "../Input/InputSelectProduct";
import { parseAsString, useQueryState } from "nuqs";
import {
  Price,
  PriceAmount,
  PriceUnit,
} from "@/components/ui/Typography/Price";
import {
  Box,
  Stack,
  StackProps,
  Typography,
  TypographyProps,
} from "@mui/material";
import { symbolKey } from "@/packages/nuqs";
import { uppercaseParser } from "@/packages/nuqs/parsers";
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
          <Price>
            <PriceAmount sx={{ color: "text.profit" }}>
              {formatFaPrice(28000)}
            </PriceAmount>
            <PriceUnit variant="caption1" />
          </Price>
        </PriceOverviewCard>

        <PriceOverviewCard>
          <PriceOverviewCardTitle sx={oveview_card_title_sx}>
            {"درصد تغییرات"}
          </PriceOverviewCardTitle>
          <Typography variant="button2" sx={{ color: "text.profit" }}>
            {"+ 0.11%"}
          </Typography>
        </PriceOverviewCard>

        <PriceOverviewCard>
          <PriceOverviewCardTitle sx={oveview_card_title_sx}>
            {"آخرین قیمت"}
          </PriceOverviewCardTitle>
          <Price sx={price_sx}>
            <PriceAmount>{formatFaPrice(28000)}</PriceAmount>
            <PriceUnit variant="caption1" />
          </Price>
        </PriceOverviewCard>
        <PriceOverviewCard>
          <PriceOverviewCardTitle sx={oveview_card_title_sx}>
            {"بیشترین قیمت"}
          </PriceOverviewCardTitle>
          <Price sx={price_sx}>
            <PriceAmount>{formatFaPrice(28000)}</PriceAmount>
            <PriceUnit variant="caption1" />
          </Price>
        </PriceOverviewCard>
        <PriceOverviewCard>
          <PriceOverviewCardTitle sx={oveview_card_title_sx}>
            {"قیمت مبنا"}
          </PriceOverviewCardTitle>
          <Price sx={price_sx}>
            <PriceAmount>{formatFaPrice(28000)}</PriceAmount>
            <PriceUnit variant="caption1" />
          </Price>
        </PriceOverviewCard>
      </Box>
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
  const [symbol, setSymbol] = useQueryState(symbolKey, uppercaseParser);

  return (
    <InputSelectProduct
      //@ts-ignore
      onChange={setSymbol}
      value={symbol ?? ""}
    />
  );
}
export default PriceOverview;
