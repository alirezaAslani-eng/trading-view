import { useFormContext, useWatch } from "react-hook-form";
import { getTradeFee } from "@/constant/features/trading/fee";

import { useLimitedTotalPrice, useMarketTotalPrice } from "./hooks";
import { TradeFormSchemaInputType } from "@/validations/types";
import { Typography } from "@mui/material";
import {
  Price,
  PriceAmount,
  PriceUnit,
} from "@/components/ui/Typography/Price";
import { formatFaPrice } from "@/utils";

function FeeDisplay() {
  const form = useFormContext<TradeFormSchemaInputType>();
  const orderType = useWatch({ control: form.control, name: "orderType" });

  const limitedTotalPrice = useLimitedTotalPrice();
  const marketTotalPrice = useMarketTotalPrice();

  const fee = getTradeFee(
    orderType === "limit" ? limitedTotalPrice : marketTotalPrice,
  );
  const isDisplayed = fee > 0;
  return (
    <>
      {isDisplayed && (
        <Price sx={{ color: "text.caption", mt: "10px" }}>
          <Typography variant="body3">{"کارمزد : "}</Typography>
          <PriceAmount variant="body3">{formatFaPrice(fee)}</PriceAmount>
          <PriceUnit variant="body4" />
        </Price>
      )}
    </>
  );
}

export default FeeDisplay;
