"use client";

import Button from "@/components/ui/Button/Button";
import { AddIcon, DashedLine, FlashIcon, StockIcon } from "@/components/ui/Icon";
import InputText from "@/components/ui/Input/InputText";
import {
  InputSelect,
  InputSelectItem,
  InputSelectMenu,
} from "@/components/ui/Input/InputSelect";
import {
  TransactionFormLayout,
  TransactionFormLayoutFieldContainer,
  TransactionFormLayoutLabel,
} from "@/components/ui/Layout/TransactionFormLayout";
import {
  Price,
  PriceAmount,
  PriceUnit,
} from "@/components/ui/Typography/Price";
import { InputTrade } from "@/components/template/Trade/InputTrade";
import { Percent, PercentButtons } from "@/components/template/Trade/PercentButtons";
import { fastTradeAssets, fastTradeCommodities } from "@/components/template/FastTrade/fastTradeAssets";
import FastTradeStockChartModal from "@/components/template/Modal/FastTradeStockChartModal";
import fastTradeFormSchema from "@/validations/trade/fastTradeFormSchema";
import {
  FastTradeFormSchemaInputType,
  FastTradeFormSchemaOutputType,
} from "@/validations/types/fastTrade.types";
import { formatFaPrice } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  Controller,
  SubmitHandler,
  useForm,
} from "react-hook-form";

const AVAILABLE_BALANCE = 23561;
const AVAILABLE_ASSET_BALANCE_KG = 23.561;

const fastTradeInputSx = {
  backgroundColor: "#191A1E",
};

type FastTradeFormProps = {
  orderSide: "buy" | "sell";
  selectedAssetId: string;
  onSelectAsset: (assetId: string) => void;
};

function FastTradeForm({
  orderSide,
  selectedAssetId,
  onSelectAsset,
}: FastTradeFormProps) {
  const isBuy = orderSide === "buy";
  const [isChartOpen, setIsChartOpen] = useState(false);

  const form = useForm<
    FastTradeFormSchemaInputType,
    unknown,
    FastTradeFormSchemaOutputType
  >({
    resolver: zodResolver(fastTradeFormSchema),
    defaultValues: {
      orderSide,
      payAmount: "",
      tradePrice: "",
      receiveAmount: "",
      assetId: selectedAssetId,
    },
  });

  const selectedAsset =
    fastTradeAssets.find((asset) => asset.id === selectedAssetId) ??
    fastTradeAssets[0];

  useEffect(() => {
    form.reset({
      orderSide,
      payAmount: "",
      tradePrice: "",
      receiveAmount: "",
      assetId: selectedAssetId,
    });
  }, [orderSide, form]);

  useEffect(() => {
    form.setValue("assetId", selectedAssetId);
  }, [selectedAssetId, form]);

  const applyPercent = (percent: number) => {
    const balance = isBuy ? AVAILABLE_BALANCE : AVAILABLE_ASSET_BALANCE_KG;
    const amount = isBuy
      ? Math.floor(balance * (percent / 100))
      : Number((balance * (percent / 100)).toFixed(3));
    form.setValue("payAmount", String(amount));
  };

  const onSubmit: SubmitHandler<FastTradeFormSchemaOutputType> = () => {};

  return (
    <Box component="form" onSubmit={form.handleSubmit(onSubmit)}>
      <TransactionFormLayout>
        <TransactionFormLayoutFieldContainer>
          <Stack sx={{ width: "100%", gap: "12px" }}>
            <TransactionFormLayoutLabel
              sx={{ width: "100%", justifyContent: "flex-start" }}
            >
              {"می‌پردازم"}
            </TransactionFormLayoutLabel>
            {isBuy ? (
              <Controller
                control={form.control}
                name="payAmount"
                render={({ field }) => (
                  <InputText
                    placeholder="مقدار را وارد کنید"
                    value={String(field.value ?? "")}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    sx={{
                      width: "100%",
                      direction: "rtl",
                      textAlign: "right",
                      ...fastTradeInputSx,
                    }}
                  />
                )}
              />
            ) : (
              <Box sx={{ display: "flex", gap: "8px", flex: 1, minWidth: 0 }}>
                <Controller
                  control={form.control}
                  name="payAmount"
                  render={({ field }) => (
                    <InputText
                      placeholder="مقدار را وارد کنید"
                      value={String(field.value ?? "")}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      name={field.name}
                      sx={{
                        flex: 1,
                        minWidth: 0,
                        direction: "rtl",
                        textAlign: "right",
                        ...fastTradeInputSx,
                      }}
                    />
                  )}
                />
                <Controller
                  control={form.control}
                  name="assetId"
                  render={({ field }) => (
                    <InputSelect
                      variant="outlined"
                      value={field.value}
                      onChange={(value) => {
                        field.onChange(value);
                        onSelectAsset(value);
                      }}
                      sx={{ width: "100px", flexShrink: 0, ...fastTradeInputSx }}
                    >
                      <InputSelectMenu>
                        {fastTradeCommodities.map((commodity) => (
                          <InputSelectItem key={commodity.id} value={commodity.id}>
                            {commodity.name}
                          </InputSelectItem>
                        ))}
                      </InputSelectMenu>
                    </InputSelect>
                  )}
                />
              </Box>
            )}

            <PercentButtons>
              <Percent precent="۲۵٪" onClick={() => applyPercent(25)} />
              <Percent precent="۵۰٪" onClick={() => applyPercent(50)} />
              <Percent precent="۷۵٪" onClick={() => applyPercent(75)} />
              <Percent precent="۱۰۰٪" onClick={() => applyPercent(100)} />
            </PercentButtons>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <Typography
                variant="caption2"
                sx={{ color: "text.caption", fontSize: "14px", whiteSpace: "nowrap" }}
              >
                {"موجودی در دسترس"}
              </Typography>
              <DashedLine sx={{ flex: 1, color: "border.secondary" }} />
              <Box sx={{ display: "flex", alignItems: "center", gap: "8px", whiteSpace: "nowrap" }}>
                {isBuy ? (
                  <Price sx={{ gap: "4px" }}>
                    <PriceAmount variant="caption2" sx={{ fontSize: "14px" }}>
                      {formatFaPrice(AVAILABLE_BALANCE)}
                    </PriceAmount>
                    <PriceUnit variant="caption2" />
                  </Price>
                ) : (
                  <Typography variant="caption2" sx={{ color: "text.onPrimary", fontSize: "14px" }}>
                    {`${AVAILABLE_ASSET_BALANCE_KG.toLocaleString("fa-IR").replace(/[\/٫]/g, ",")} کیلوگرم`}
                  </Typography>
                )}
                {isBuy ? (
                  <Button
                    type="button"
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => form.setValue("payAmount", String(AVAILABLE_BALANCE))}
                    sx={{
                      minWidth: "28px",
                      width: "28px",
                      height: "28px",
                      p: 0,
                    }}
                  >
                    <AddIcon sx={{ fontSize: "16px" }} />
                  </Button>
                ) : null}
              </Box>
            </Box>
          </Stack>
        </TransactionFormLayoutFieldContainer>

        <TransactionFormLayoutFieldContainer sx={{ mt: "32px" }}>
          <Stack sx={{ width: "100%", gap: "12px" }}>
            <TransactionFormLayoutLabel
              sx={{ width: "100%", justifyContent: "flex-start" }}
            >
              {isBuy ? "قیمت خرید" : "قیمت فروش"}
            </TransactionFormLayoutLabel>
            <Controller
              control={form.control}
              name="tradePrice"
              render={({ field }) => (
                <InputTrade
                  placeholder={isBuy ? "قیمت ثبت خرید" : "قیمت ثبت فروش"}
                  value={String(field.value ?? "")}
                  onValueChange={field.onChange}
                  onBlur={field.onBlur}
                  sx={fastTradeInputSx}
                />
              )}
            />
          </Stack>
        </TransactionFormLayoutFieldContainer>

        <TransactionFormLayoutFieldContainer sx={{ mt: "32px" }}>
          <Stack sx={{ width: "100%", gap: "12px" }}>
            <TransactionFormLayoutLabel
              sx={{ width: "100%", justifyContent: "flex-start" }}
            >
              {"دریافت می‌کنم"}
            </TransactionFormLayoutLabel>
            {isBuy ? (
              <Box sx={{ display: "flex", gap: "8px", flex: 1, minWidth: 0 }}>
                <Controller
                  control={form.control}
                  name="receiveAmount"
                  render={({ field }) => (
                    <InputText
                      placeholder="مقدار را وارد کنید"
                      value={String(field.value ?? "")}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      name={field.name}
                      sx={{
                        flex: 1,
                        minWidth: 0,
                        direction: "rtl",
                        textAlign: "right",
                        ...fastTradeInputSx,
                      }}
                    />
                  )}
                />
                <Controller
                  control={form.control}
                  name="assetId"
                  render={({ field }) => (
                    <InputSelect
                      variant="outlined"
                      value={field.value}
                      onChange={(value) => {
                        field.onChange(value);
                        onSelectAsset(value);
                      }}
                      sx={{ width: "100px", flexShrink: 0, ...fastTradeInputSx }}
                    >
                      <InputSelectMenu>
                        {fastTradeCommodities.map((commodity) => (
                          <InputSelectItem key={commodity.id} value={commodity.id}>
                            {commodity.name}
                          </InputSelectItem>
                        ))}
                      </InputSelectMenu>
                    </InputSelect>
                  )}
                />
              </Box>
            ) : (
              <Controller
                control={form.control}
                name="receiveAmount"
                render={({ field }) => (
                  <InputText
                    placeholder="مقدار را وارد کنید"
                    value={String(field.value ?? "")}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    sx={{
                      width: "100%",
                      direction: "rtl",
                      textAlign: "right",
                      ...fastTradeInputSx,
                    }}
                  />
                )}
              />
            )}
          </Stack>
        </TransactionFormLayoutFieldContainer>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            mt: "56px",
            width: "100%",
          }}
        >
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color={isBuy ? "success" : "error"}
            size="large"
            startIcon={<FlashIcon />}
            disabled={form.formState.isSubmitting}
            sx={{ gap: "6px", borderRadius: "14px" }}
          >
            {isBuy ? "ثبت سفارش خرید" : "ثبت سفارش فروش"}
          </Button>
          <Button
            type="button"
            variant="outlined"
            color="primary"
            onClick={() => setIsChartOpen(true)}
            sx={{
              borderColor: "white",
              borderRadius: "14px",
              minWidth: "56px",
              width: "56px",
              height: "56px",
              p: 0,
              flexShrink: 0,
            }}
          >
            <StockIcon />
          </Button>
        </Box>

        <FastTradeStockChartModal
          open={isChartOpen}
          onClose={() => setIsChartOpen(false)}
          assetName={selectedAsset.name}
        />
      </TransactionFormLayout>
    </Box>
  );
}

export default FastTradeForm;
