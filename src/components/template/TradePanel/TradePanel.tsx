"use client";
import PanelPaper from "@/components/ui/Paper/PanelPaper";
import Tabs from "@/components/ui/Tabs/Tabs";
import { TabsProvider } from "@/context/app/TabsContext";
import {
  Box,
  BoxProps,
  Divider,
  Stack,
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
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  placeOrderConfig,
  walletPortfolioConfig,
} from "@/packages/react-query";
import safeAsync from "@/utils/app/safeAsync";
import { promiseAlert } from "@/packages/react-hot-toast";
import alertMessages from "@/constant/app/alertMessages";
import BouncCircleLoader from "@/components/ui/Fallback/BounceCircleLoader";
import {
  FormProvider,
  useController,
  useForm,
  useFormContext,
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
import { extractIRTAsset } from "@/utils/features/wallet/walletProtofolioTransformers";
import { useMemo } from "react";
import { PRICE_UNITS } from "@/constant/features/priceConfig";
import {
  useCalculateFee,
  useLimitedTotalPrice,
  useMarketTotalPrice,
} from "./hooks";
import { getTradeFee } from "@/constant/features/trading/fee";

type OrderTypes = TradeFormSchemaInputType["orderType"];
type OrderSide = TradeFormSchemaInputType["orderSide"];

const placeOrderMutationConfig = placeOrderConfig({
  meta: {
    successMessage: "سفارش ثبت شد",
  },
});

const priceUnitLabel = PRICE_UNITS.IRT.displayName;

function TradePanel() {
  // * -------- productCode/Symbol --------
  const [symbol] = useSymbolParams();

  // * --------- From API ---------
  const placeOrderApi = useMutation(placeOrderMutationConfig);

  // * --------- KYC Guard ---------
  const { checkAccess } = useKycGuard();

  // * ------- Form Configuration -------
  const form = useForm({
    resolver: zodResolver(tradeFormSchema),
    defaultValues: {
      orderSide: "buy",
      orderType: "market",
      productCode: symbol,
    },
  });

  //  * ------- Order type state ---------
  const isMarketType = form.watch("orderType") === "market";
  const isLimitedType = form.watch("orderType") === "limit";

  //  * ------- Submit handler ---------
  const onSubmit = async (fields: TradeFormSchemaOutputType) => {
    const hasAccess = checkAccess(KYC_REQUIRED_LEVELS.trade);
    if (!hasAccess) return;

    await promiseAlert(
      safeAsync(() => placeOrderApi.mutateAsync(fields)),
      { loading: alertMessages.loading },
    );
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
  const [symbol] = useSymbolParams();

  //#region // * ------------ Trade panel State ------------
  const form = useFormContext<TradeFormSchemaInputType>();

  const orderType = useWatch({ control: form.control, name: "orderType" });
  const orderSide = useWatch({ control: form.control, name: "orderSide" });

  const limitedTotalPrice = useLimitedTotalPrice();
  const marketTotalPrice = useMarketTotalPrice();

  const totalPrice =
    orderType === "limit" ? limitedTotalPrice : marketTotalPrice;

  const { calculate } = useCalculateFee();
  const fee_price = calculate(totalPrice);
  //#endregion // * ------------ Trade panel State ------------

  //#region // * ------------ Wallet Info ------------
  const walletQuery = useQuery(walletPortfolioConfig());

  const { assets } = walletQuery.data ?? {};

  const irtAsset = extractIRTAsset(walletQuery.data);

  const metalAsset = useMemo(() => {
    return assets?.find((asset) => {
      return asset.assetSymbol === symbol;
    });
  }, [symbol, assets]);
  //#endregion // * ------------ Wallet Info ------------

  return (
    <Stack spacing={2.5} sx={{ mt: "8px" }}>
      <Summary>
        <SummaryLable>{"کیف پول:"}</SummaryLable>
        <SummaryAmount>
          {`${formatFaPrice(irtAsset?.availableBalance ?? 0)} ${priceUnitLabel}`}
        </SummaryAmount>
      </Summary>

      <Summary>
        <SummaryLable>{`موجودی ${symbol}:`}</SummaryLable>
        <SummaryAmount sx={{ color: "text.secondary" }}>
          {formatFaPrice(metalAsset?.availableBalance ?? 0, {
            style: "unit",
            unit: "kilogram",
          })}
        </SummaryAmount>
      </Summary>
      <Divider sx={{ borderColor: "border.dark" }} />

      <Summary>
        <SummaryLable>{"کارمزد معامله:"}</SummaryLable>
        <SummaryAmount>{`${formatFaPrice(fee_price)} ${priceUnitLabel}`}</SummaryAmount>
      </Summary>
      <Summary>
        <SummaryLable>{"جمع کل:"}</SummaryLable>
        <SummaryAmount>{`${formatFaPrice(orderSide === "buy" ? totalPrice + fee_price : totalPrice - fee_price)} ${priceUnitLabel}`}</SummaryAmount>
      </Summary>
    </Stack>
  );
}

function Summary(props: ReplaceSxWithSxOnlyObject<BoxProps>) {
  return (
    <Box
      {...props}
      sx={({ typography }) => ({
        display: "flex",
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
