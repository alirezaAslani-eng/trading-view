"use client";
import { useController } from "react-hook-form";
import { InputTrade } from "../Trade/InputTrade";
import { TradeFormSubscriber } from "./types";

function WeightInput({ control }: TradeFormSubscriber) {
  const { field, formState } = useController({
    control,
    name: "weight",
  });

  return (
    <InputTrade
      suffix=" kg"
      label="مقدار (کیلو گرم)"
      onValueChange={field.onChange}
      value={field.value as string}
      disabled={formState.isSubmitting}
    />
  );
}

export default WeightInput;
