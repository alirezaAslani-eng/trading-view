import AmountDisplay from "../Trade/AmountDisplay";
import { calculateTotalTradePrice, formatFaPrice } from "@/utils";
import { useFormContext, useWatch } from "react-hook-form";
import { TradeFormSubscriber } from "./types";
import SyncMarketPrice from "./SyncMarketPrice";
import WeightInput from "./WeightInput";
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
import { PRICE_UNITS } from "@/constant/features/priceConfig";

function MarketPriceForm() {
  const form = useFormContext<
    TradeFormSchemaInputType,
    unknown,
    TradeFormSchemaOutputType
  >();

  return (
    <TradeFieldsLayout>
      <TradeFieldsLayoutPrice>
        <MarketPriceDisplay control={form.control} />
        <SyncMarketPrice />
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
        <MarketTotalPrice control={form.control} />
      </TradeFieldsLayoutTotalPrice>
    </TradeFieldsLayout>
  );
}

function MarketPriceDisplay({ control }: TradeFormSubscriber) {
  const marketPrice = useWatch({ control, name: "marketPrice" });
  return (
    <AmountDisplay
      label="قیمت بازار"
      value={marketPrice ? formatFaPrice(marketPrice) : "0"}
    />
  );
}
function MarketTotalPrice({ control }: TradeFormSubscriber) {
  const marketPrice = useWatch({ control, name: "marketPrice" });
  const weight = useWatch({ control, name: "weight" });
  const sum = calculateTotalTradePrice(Number(weight), Number(marketPrice));
  return (
    <AmountDisplay
      label={`مبلغ سر به سر (${PRICE_UNITS.IRT.displayName})`}
      value={sum ? formatFaPrice(sum) : "0"}
    />
  );
}

export default MarketPriceForm;