"use client";
import PanelPaper from "@/components/ui/Paper/PanelPaper";
import Tabs from "@/components/ui/Tabs/Tabs";
import { TabsProvider } from "@/context/app/TabsContext";
import { Box, Stack, Tab, ToggleButton } from "@mui/material";
import Button from "@/components/ui/Button/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import tradeFormSchema from "@/validations/trade/tradeFormSchema";
import ToggleButtonGroup from "@/components/ui/ButtonGroup/ToggleButtonGroup";
import tradeTogglebuttonSell_sx from "@/packages/mui/theme/shared-style/features/trading/tradeTogglebuttonSell_sx";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { placeOrderConfig } from "@/packages/react-query";
import safeAsync from "@/utils/app/safeAsync";
import { promiseAlert } from "@/packages/react-hot-toast";
import alertMessages from "@/constant/app/alertMessages";
import BouncCircleLoader from "@/components/ui/Fallback/BounceCircleLoader";
import { useQueryState } from "nuqs";
import { symbolKey } from "@/packages/nuqs";
import {
  FormProvider,
  useController,
  useForm,
  useFormState,
  useWatch,
} from "react-hook-form";
import {
  TradeFormSchemaInputType,
  TradeFormSchemaOutputType,
} from "@/validations/types/trade.types";
import LimitedPriceForm from "./LimitedPriceForm";
import MarketPriceForm from "./MarketPriceForm";
import { TradeFormSubscriber } from "./types";
import { parseAsUppercase } from "@/packages/nuqs/parsers";

type OrderTypes = TradeFormSchemaInputType["orderType"];
type OrderSide = TradeFormSchemaInputType["orderSide"];

const placeOrderMutationConfig = placeOrderConfig();

function TradePanel() {
  // * -------- productCode/Symbol --------
  const [symbol] = useQueryState(symbolKey, parseAsUppercase);

  // * --------- From API ---------
  const placeOrderApi = useMutation({
    ...placeOrderMutationConfig,
    meta: {
      successMessage: "سفارش ثبت شد",
    },
  });

  // * ------- Form Configuration -------
  const form = useForm({
    resolver: zodResolver(tradeFormSchema),
    defaultValues: {
      orderSide: "buy",
      orderType: "market",
      productCode: symbol ?? "",
    },
  });

  // * --------- Track productCode value ---------
  useEffect(() => {
    if (!symbol) return;
    form.setValue("productCode", symbol);
  }, [symbol]);

  //  * ------- Order type state ---------
  const isMarketType = form.watch("orderType") === "market";
  const isLimitedType = form.watch("orderType") === "limit";

  //  * ------- Submit handler ---------
  const onSubmit = async (fields: TradeFormSchemaOutputType) => {
    await promiseAlert(
      safeAsync(() => placeOrderApi.mutateAsync(fields)),
      { loading: alertMessages.loading },
    );
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

            <FormProvider {...form}>
              {/* // * ---------- Limited Price Tab ---------- */}
              <Box hidden={!isLimitedType}>
                <LimitedPriceForm />
              </Box>
              {/* // * ---------- Market Price Tab ---------- */}
              <Box hidden={!isMarketType}>
                <MarketPriceForm />
              </Box>
            </FormProvider>

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

function TradeSideSelector({ control }: TradeFormSubscriber) {
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

function OrderTypeSelector({ control }: TradeFormSubscriber) {
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

function SubmitOrderButton({ control }: TradeFormSubscriber) {
  const formState = useFormState({ control });
  const orderSide = useWatch({
    name: "orderSide",
    control,
  });
  const isBuy = orderSide === "buy";
  const isLoading = formState.isSubmitting;
  return (
    <Button
      fullWidth
      color={isBuy ? "success" : "error"}
      variant="contained"
      sx={{ mt: "74px" }}
      type="submit"
      disabled={isLoading}
    >
      {isLoading ? (
        <BouncCircleLoader bounceSx={{ width: "5px" }} />
      ) : (
        <>{isBuy ? "خرید" : "فروش"}</>
      )}
    </Button>
  );
}
