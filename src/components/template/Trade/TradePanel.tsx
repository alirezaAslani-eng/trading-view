"use client";

import PanelPaper from "@/components/ui/Paper/PanelPaper";
import Tabs from "@/components/ui/Tabs/Tabs";
import { TabsProvider } from "@/context/app/TabsContext";
import { Box, Stack, Tab, ToggleButton } from "@mui/material";
import { InputTrade } from "./InputTrade";
import { Percent, PercentButtons } from "./PercentButtons";
import AmountDisplay from "./AmountDisplay";
import { formatFaPrice } from "@/utils";
import Button from "@/components/ui/Button/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import tradeFormSchema from "@/validations/trade/tradeFormSchema";
import ToggleButtonGroup from "@/components/ui/ButtonGroup/ToggleButtonGroup";
import tradeTogglebuttonSell_sx from "@/packages/mui/theme/shared-style/features/trading/tradeTogglebuttonSell_sx";
import { Activity } from "react";
import {
  Control,
  SubmitHandler,
  useController,
  useForm,
  useWatch,
} from "react-hook-form";
import {
  TradeFormSchemaInputType,
  TradeFormSchemaOutputType,
} from "@/validations/types/trade.types";

type OrderTypes = TradeFormSchemaInputType["orderType"];
type OrderSide = TradeFormSchemaInputType["orderSide"];

function TradePanel() {
  // * ------- Form Configuration -------
  const form = useForm({
    resolver: zodResolver(tradeFormSchema),
    defaultValues: {
      orderSide: "buy",
      orderType: "limit",
    },
  });

  //  * ------- Order type state ---------
  const isMarketType = form.watch("orderType") === "market";
  const isLimitedType = form.watch("orderType") === "limit";

  //  * ------- Submit handler ---------
  const onSubmit: SubmitHandler<TradeFormSchemaOutputType> = (fields) => {
    console.log(fields); // fields.side: 0 | 1, orderType: 0 | 1, weight: number, price: number
  };

  return (
    <PanelPaper sx={{ p: "20px 12px", height: "100%" }}>
      <Box component={"form"} onSubmit={form.handleSubmit(onSubmit)}>
        <Stack sx={{ width: "100%" }}>
          {/* //* Trade side selection (Buy / Sell) */}
          <TradeSideSelector control={form.control} />

          <Box sx={{ mt: "calc(32px - 14px)" }}>
            {/* //* ---------- Order type selector ---------- */}
            <OrderTypeSelector control={form.control} />

            {/* // * ---------- Limited Price Tab ---------- */}
            <Activity mode={isLimitedType ? "visible" : "hidden"}>
              <Box sx={{ mt: "32px" }}>
                <LimitedPriceInput control={form.control} />
              </Box>
              <Box sx={{ mt: "14px" }}>
                <AmountPriceInput control={form.control} />
              </Box>
            </Activity>

            {/* // * ---------- Market Price Tab ---------- */}
            <Activity mode={isMarketType ? "visible" : "hidden"}>
              <Box sx={{ mt: "32px" }}>
                <AmountDisplay label="قیمت بازار" value="500000" />
              </Box>
              <Box sx={{ mt: "14px" }}>
                <AmountPriceInput control={form.control} />
              </Box>
            </Activity>

            {/* //* ----- Quick percentage selector -----*/}
            <PercentButtons sx={{ mt: "8px" }}>
              <Percent precent="25%" />
              <Percent precent="50%" />
              <Percent precent="75%" />
              <Percent precent="100%" />
            </PercentButtons>

            {/* //* ----- Calculated order total ----- */}
            <AmountDisplay
              label="کل (تومان)"
              sx={{ mt: "24px" }}
              value={formatFaPrice(200000)}
            />

            {/* //* Submit order */}
            <SubmitOrderButton control={form.control} />
          </Box>
        </Stack>
      </Box>
    </PanelPaper>
  );
}

export default TradePanel;

// * ============= Internal components ===============
interface FormSubscriber {
  control: Control<
    TradeFormSchemaInputType,
    unknown,
    TradeFormSchemaOutputType
  >;
}

function TradeSideSelector({ control }: FormSubscriber) {
  const { field } = useController({ control, name: "orderSide" });
  return (
    <ToggleButtonGroup
      onChange={field.onChange}
      value={field.value}
      size="large"
    >
      <ToggleButton value={"buy" satisfies OrderSide}>{"خرید"}</ToggleButton>
      <ToggleButton
        value={"sell" satisfies OrderSide}
        sx={tradeTogglebuttonSell_sx}
      >
        {"فروش"}
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

function OrderTypeSelector({ control }: FormSubscriber) {
  const { field } = useController({ control, name: "orderType" });
  return (
    <TabsProvider onChange={field.onChange} value={field.value}>
      <Tabs size="small">
        <Tab label="تعیین قیمت" value={"limit" satisfies OrderTypes} />
        <Tab label="فوری" value={"market" satisfies OrderTypes} />
      </Tabs>
    </TabsProvider>
  );
}

function LimitedPriceInput({ control }: FormSubscriber) {
  const { field } = useController({ control, name: "price" }); // <-- تغییر به price

  return (
    <InputTrade
      label="قیمت (تومان)"
      onValueChange={field.onChange}
      value={field.value as number}
    />
  );
}

function AmountPriceInput({ control }: FormSubscriber) {
  const { field } = useController({ control, name: "weight" }); // <-- تغییر به weight

  return (
    <InputTrade
      suffix=" kg"
      label="مقدار (کیلو گرم)"
      onValueChange={field.onChange}
      value={field.value as number}
    />
  );
}

function SubmitOrderButton({ control }: FormSubscriber) {
  const orderSide = useWatch({
    name: "orderSide",
    control,
  });
  const isBuy = orderSide === "buy";
  return (
    <Button
      fullWidth
      color={isBuy ? "success" : "error"}
      variant="contained"
      sx={{ mt: "74px" }}
      type="submit"
    >
      {isBuy ? "خرید" : "فروش"}
    </Button>
  );
}
