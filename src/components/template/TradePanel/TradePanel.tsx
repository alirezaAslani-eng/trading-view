"use client";
import PanelPaper from "@/components/ui/Paper/PanelPaper";
import Tabs from "@/components/ui/Tabs/Tabs";
import { TabsProvider } from "@/context/app/TabsContext";
import {
  Box,
  BoxProps,
  Divider,
  Fade,
  FormControlLabel,
  Stack,
  Switch,
  Tab,
  ToggleButton,
  Typography,
  TypographyProps,
} from "@mui/material";
import Button from "@/components/ui/Button/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import tradeFormSchema from "@/validations/trade/tradeFormSchema";
import ToggleButtonGroup from "@/components/ui/ButtonGroup/ToggleButtonGroup";
import tradeTogglebuttonSell_sx from "@/packages/mui/theme/shared-style/features/trading/tradeTogglebuttonSell_sx";
import { useMutation } from "@tanstack/react-query";
import { placeOrderConfig } from "@/packages/react-query";
import safeAsync from "@/utils/app/safeAsync";
import { promiseAlert } from "@/packages/react-hot-toast";
import alertMessages from "@/constant/app/alertMessages";
import BouncCircleLoader from "@/components/ui/Fallback/BounceCircleLoader";
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
import useSymbolParams from "@/hooks/features/trading/useSymbolParams";
import useKycGuard from "@/hooks/features/kyc/useKycGuard";
import KYC_REQUIRED_LEVELS from "@/constant/features/kyc/kycAccess";
import { ReplaceSxWithSxOnlyObject } from "@/packages/mui/theme/types";
import { formatFaPrice } from "@/utils";
import { PRICE_UNITS } from "@/constant/features/priceConfig";
import { useFinalTradeSunmmary } from "./hooks";
import { getTradePrecent } from "@/v2-architecture/src/features/trading";
import { WEIGHT_UNITS } from "@/constant/features/product/weightUnits";
import { show } from "@ebay/nice-modal-react";
import { GenericConfirmDialog } from "@/packages/nice-modal-react";
import { useTradeForm } from "./TradeFormContext";

type OrderTypes = TradeFormSchemaInputType["orderType"];
type OrderSide = TradeFormSchemaInputType["orderSide"];

const placeOrderMutationConfig = placeOrderConfig({
  meta: {
    successMessage: "سفارش ثبت شد",
  },
});

const priceUnitLabel = PRICE_UNITS.IRT.displayName;
const weightUnitLabel = WEIGHT_UNITS.KG.lable;

const tradePrecent = getTradePrecent();
function TradePanel() {
  // * ------- Form Configuration -------
  const form = useTradeForm();

  //  * ------- Order type state ---------
  const isMarketType = form.watch("orderType") === "market";
  const isLimitedType = form.watch("orderType") === "limit";

  // * --------- From API ---------
  const placeOrderApi = useMutation(placeOrderMutationConfig);

  // * --------- KYC Guard ---------
  const { checkAccess } = useKycGuard();

  //  * ------- Submit handler ---------
  const onSubmit = async (fields: TradeFormSchemaOutputType) => {
    const hasAccess = checkAccess(KYC_REQUIRED_LEVELS.trade);
    if (!hasAccess) return;

    if (form.watch("settlementMode")) {
      const confirm = await show(GenericConfirmDialog, {
        color: "primary",
        title: "توجه به نحوه تسویه معامله",
        description:
          "شما در حال ثبت معامله با حالت تسویه ۱۰٪ هستید. در این حالت تنها ۱۰٪ مبلغ معامله در ابتدا پرداخت می‌شود و ۹۰٪ باقی‌مانده به‌عنوان بدهی شما ثبت خواهد شد. شما حداکثر ۳ روز فرصت دارید بدهی ایجادشده را تسویه کنید.",
      });
      if (!confirm) return;
    }
    await safeAsync(() => placeOrderApi.mutateAsync(fields));
  };

  return (
    <FormProvider {...form}>
      <PanelPaper sx={{ p: "20px 12px", height: "100%" }}>
        <Box component={"form"} onSubmit={form.handleSubmit(onSubmit)}>
          <Stack sx={{ width: "100%" }}>
            {/* //* Trade side selection (Buy / Sell) */}
            <TradeSideSelector control={form.control} />

            <Box sx={{ mt: "calc(32px - 14px)" }}>
              {/* //* ---------- Order type selector ---------- */}
              <OrderTypeSelector control={form.control} />
              <FormControlLabel
                sx={{ my: 4 }}
                control={
                  <Switch
                    {...form.register("settlementMode")}
                    defaultChecked={
                      form.formState.defaultValues?.settlementMode
                    }
                  />
                }
                label={
                  <Typography
                    component="span"
                    variant="caption"
                    sx={{ color: "text.secondary" }}
                  >
                    {form.watch("orderSide") === "sell"
                      ? `دریافت ${tradePrecent.number} درصد مبلغ`
                      : `پرداخت ${tradePrecent.number} درصد مبلغ`}
                  </Typography>
                }
              />
              {/* // * ---------- Limited Price Tab ---------- */}

              <Box hidden={!isLimitedType}>
                <LimitedPriceForm />
              </Box>
              {/* // * ---------- Market Price Tab ---------- */}
              <Box hidden={!isMarketType}>
                <MarketPriceForm />
              </Box>

              <TradeSummary />
              {/* //* Submit order */}
              <SubmitOrderButton control={form.control} />
            </Box>
          </Stack>
        </Box>
      </PanelPaper>
    </FormProvider>
  );
}

function TradeSummary() {
  const form = useTradeForm();
  const {
    fee_price,
    final_price,
    price_10_precent,
    assetBalance,
    walletBlance,
    symbol,
  } = useFinalTradeSunmmary();

  const isSell = form.watch("orderSide") === "sell";
  const settlementMode = form.watch("settlementMode");
  return (
    <Stack spacing={2.5} sx={{ mt: "8px" }}>
      <Summary>
        <SummaryLable>{"قدرت خرید:"}</SummaryLable>
        <SummaryAmount>
          {`${formatFaPrice(walletBlance)} ${priceUnitLabel}`}
        </SummaryAmount>
      </Summary>

      <Summary>
        <SummaryLable>{`موجودی ${symbol}:`}</SummaryLable>
        <SummaryAmount sx={{ color: "text.secondary" }}>
          {`${formatFaPrice(assetBalance)} ${weightUnitLabel}`}
        </SummaryAmount>
      </Summary>
      <Divider sx={{ borderColor: "border.dark" }} />

      <Summary>
        <SummaryLable>{"کارمزد:"}</SummaryLable>
        <SummaryAmount>{`${formatFaPrice(fee_price)} ${priceUnitLabel}`}</SummaryAmount>
      </Summary>
      <Summary>
        <SummaryLable>
          {isSell ? "مبلق کل فروش:" : "مبلغ کل خرید:"}
        </SummaryLable>
        <SummaryAmount>{`${formatFaPrice(final_price)} ${priceUnitLabel}`}</SummaryAmount>
      </Summary>
      <Fade in={settlementMode}>
        <Summary>
          <SummaryLable>
            {isSell ? "10 درصد مبلغ فروش" : "10 درصد مبلغ خرید:"}
          </SummaryLable>
          <SummaryAmount>{`${formatFaPrice(price_10_precent)} ${priceUnitLabel}`}</SummaryAmount>
        </Summary>
      </Fade>
    </Stack>
  );
}

function Summary(props: ReplaceSxWithSxOnlyObject<BoxProps>) {
  return (
    <Box
      {...props}
      sx={({ typography }) => ({
        ...(!props.hidden && { display: "flex" }),
        justifyContent: "space-between",
        alignItems: "center",
        ...typography.caption2,
        ...props.sx,
      })}
    />
  );
}

function SummaryLable(props: ReplaceSxWithSxOnlyObject<TypographyProps>) {
  return (
    <Typography
      variant="inherit"
      {...props}
      sx={{ color: "text.linkSecondary", ...props.sx }}
    />
  );
}
function SummaryAmount(props: ReplaceSxWithSxOnlyObject<TypographyProps>) {
  return (
    <Typography
      variant="inherit"
      {...props}
      sx={{ color: "text.placeHolder", ...props.sx }}
    />
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
      type="submit"
      sx={{ mt: "24px" }}
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
