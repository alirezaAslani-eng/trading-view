"use client";
import {
  TradeFieldsLayout,
  TradeFieldsLayoutAmount,
  TradeFieldsLayoutPrice,
  TradeFieldsLayoutTotalPrice,
} from "@/components/ui/Layout/TradeFieldsLayout";
import {
  TradeFormSchemaInputType,
  TradeFormSchemaOutputType,
} from "@/validations/types";
import { useController, useFormContext, useWatch } from "react-hook-form";
import WeightInput from "./WeightInput";
import { TradeFormSubscriber } from "./types";
import { InputTrade } from "../Trade/InputTrade";
import { calculateTotalTradePrice, formatFaPrice } from "@/utils";
import AmountDisplay from "../Trade/AmountDisplay";
import { PRICE_UNITS } from "@/constant/features/priceConfig";

function LimitedPriceForm() {
  const form = useFormContext<
    TradeFormSchemaInputType,
    unknown,
    TradeFormSchemaOutputType
  >();

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
        <LimitTotalPrice control={form.control} />
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

function LimitTotalPrice({ control }: TradeFormSubscriber) {
  const limitedPrice = useWatch({ control, name: "limitedPrice" });
  const weight = useWatch({ control, name: "weight" });
  const totalPrice = calculateTotalTradePrice(
    Number(weight),
    Number(limitedPrice),
  );
  return (
    <AmountDisplay
      label={`کل (${PRICE_UNITS.IRT.displayName})`}
      value={!!totalPrice ? formatFaPrice(totalPrice) : "0"}
    />
  );
}

export default LimitedPriceForm;
