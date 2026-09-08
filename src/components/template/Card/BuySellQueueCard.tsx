"use client";
import { Typography, Stack } from "@mui/material";
import CirclePulse from "@/components/ui/Decorative/CirclePulse";
import PanelPaper from "@/components/ui/Paper/PanelPaper";
import {
  Price,
  PriceAmount,
  PriceUnit,
} from "@/components/ui/Typography/Price";
import { useQuery } from "@tanstack/react-query";
import transformTosellQueuePrice from "@/utils/features/wallet/transformTosellQueuePrice";
import { formatFaPrice } from "@/utils";
import { extractIRTAsset } from "@/utils/features/wallet/walletProtofolioTransformers";
import { PRICE_UNITS } from "@/constant/features/priceConfig";
import { WEIGHT_UNITS } from "@/constant/features/product/weightUnits";
import getTotalAmountInQueue from "@/utils/features/wallet/getTotalAmountInQueue";
import { walletPortfolioConfig } from "@/packages/react-query";
import { useTradeMode } from "@/context/feature/trade/TradeMode";
import { ComponentProps } from "react";
import { ReplaceSxWithSxOnlyObject } from "@/packages/mui/theme/types";

const priceUnitDisplay = PRICE_UNITS.IRT.displayName;
function BuySellQueueCard(
  props: ReplaceSxWithSxOnlyObject<ComponentProps<typeof PanelPaper>>,
) {
  const { isDemo } = useTradeMode();
  const walletQuery = useQuery(walletPortfolioConfig(isDemo));

  const totalPriceInSellQueue = transformTosellQueuePrice(walletQuery.data);
  const totalAmountInSellQueue = getTotalAmountInQueue(walletQuery.data);
  const totalInBuyQueue = extractIRTAsset(walletQuery.data)?.lockedBalance ?? 0;

  return (
    <PanelPaper
      {...props}
      sx={{
        p: "48px 34px",
        width: "100%",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        ...props.sx,
      }}
    >
      <QueueStatItem title="نقدینگی در صف خرید:" amount={totalInBuyQueue} />

      <QueueStatItem
        title="حجم کالای در صف فروش:"
        amount={totalAmountInSellQueue}
        unit={WEIGHT_UNITS.KG.lable}
      />
      <QueueStatItem
        title="ارزش تقریبی کالای در صف فروش:"
        amount={totalPriceInSellQueue}
        unit={priceUnitDisplay}
      />

      <CirclePulse
        first
        sx={{ width: "400px", transform: "translate(20%,50%)" }}
      >
        <CirclePulse sx={{ width: "300px" }}>
          <CirclePulse sx={{ width: "200px" }} />
        </CirclePulse>
      </CirclePulse>
    </PanelPaper>
  );
}

export default BuySellQueueCard;

function QueueStatItem({ title = "", amount = 0, unit = priceUnitDisplay }) {
  return (
    <Stack spacing={1}>
      <Typography variant="button3" sx={{ color: "text.placeHolder" }}>
        {title}
      </Typography>

      <Price>
        <PriceAmount variant="caption1">{formatFaPrice(amount)}</PriceAmount>
        <PriceUnit variant="caption2">{unit}</PriceUnit>
      </Price>
    </Stack>
  );
}
