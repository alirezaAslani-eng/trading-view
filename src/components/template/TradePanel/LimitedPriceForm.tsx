"use client";
import {
  TradeFieldsLayout,
  TradeFieldsLayoutAmount,
  TradeFieldsLayoutPrice,
  TradeFieldsLayoutTotalPrice,
} from "@/components/ui/Layout/TradeFieldsLayout";
import { useController } from "react-hook-form";
import WeightInput from "./WeightInput";
import { TradeFormSubscriber } from "./types";
import { InputTrade } from "../Trade/InputTrade";
import { formatFaPrice } from "@/utils";
import AmountDisplay from "../Trade/AmountDisplay";
import { PRICE_UNITS } from "@/constant/features/priceConfig";
import { useLimitedTotalPrice } from "./hooks";
import { useTradeForm } from "./TradeFormContext";

function LimitedPriceForm() {
  const form = useTradeForm();

  return (
    <TradeFieldsLayout>
      <TradeFieldsLayoutPrice>
        <LimitedPriceInput control={form.control} />
      </TradeFieldsLayoutPrice>
      <TradeFieldsLayoutAmount>
        <WeightInput control={form.control} />
      </TradeFieldsLayoutAmount>
      {/* // TODO develop the logic of precentage section */}
      {/* <TradeFieldsLayoutPrecentage>
        <PercentButtons sx={{ mt: "8px" }}>
          <Percent precent="25%" />
          <Percent precent="50%" />
          <Percent precent="75%" />
          <Percent precent="100%" />
        </PercentButtons>
      </TradeFieldsLayoutPrecentage> */}
      <TradeFieldsLayoutTotalPrice>
        <LimitTotalPrice />
      </TradeFieldsLayoutTotalPrice>
    </TradeFieldsLayout>
  );
}

function LimitedPriceInput({ control }: TradeFormSubscriber) {
  const { field, formState } = useController({
    control,
    name: "limitedPrice",
  });

  return (
    <InputTrade
      inputStep={100000}
      label={`قیمت (${PRICE_UNITS.IRT.displayName})`}
      onValueChange={field.onChange}
      value={field.value as string}
      disabled={formState.isSubmitting}
    />
  );
}

function LimitTotalPrice() {
  const totalPrice = useLimitedTotalPrice();
  return (
    <AmountDisplay
      label={`مبلغ سر به سر (${PRICE_UNITS.IRT.displayName})`}
      value={formatFaPrice(totalPrice)}
    />
  );
}

export default LimitedPriceForm;
