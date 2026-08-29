"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Box, Typography } from "@mui/material";

import InputNumeric from "@/components/ui/Input/InputNumeric";
import { toNumericFormatProps } from "@/utils/app/toNumericFieldProps";
import safeAsync from "@/utils/app/safeAsync";

import {
  marginTransferInSchema,
  MarginTransferInSchema,
} from "@/v2-architecture/src/features/portfolio/validations";
import {
  marginSettingsConfig,
  marginTransferInConfig,
} from "@/v2-architecture/src/features/portfolio/react-query";

import {
  TransactionFormLayout,
  TransactionFormLayoutField,
  TransactionFormLayoutFieldAutoFiller,
  TransactionFormLayoutFieldContainer,
  TransactionFormLayoutLabel,
  TransactionFormLayoutSubmit,
} from "@/components/ui/Layout/TransactionFormLayout";
import { formatFaPrice } from "@/utils";
import {
  Price,
  PriceAmount,
  PriceUnit,
} from "@/components/ui/Typography/Price";
import { walletPortfolioConfig } from "@/packages/react-query";
import { useTradeMode } from "@/context/feature/trade/TradeMode";
import Alert from "@/components/ui/Alert/Alert";

const formConfig = {
  resolver: zodResolver(marginTransferInSchema),
};

function MarginTransferForm() {
  //#region // ! DRY
  const { isDemo } = useTradeMode();
  //#endregion
  const form = useForm(formConfig);

  //#region
  const walletQuery = useQuery(walletPortfolioConfig(isDemo));
  const selectAllBalance = () => {
    form.setValue("amount", walletQuery.data?.availableCash ?? 0);
  };
  //#endregion

  const marginTransferInMutate = useMutation(
    marginTransferInConfig({
      onSuccess: () => form.reset(),
    }),
  );
  //#region
  const marginSetting = useQuery(marginSettingsConfig());
  const marginCredit =
    (marginSetting.data?.leverageRatio ?? 0) * form.watch("amount");
  //#endregion

  const onSubmitHandler = (data: MarginTransferInSchema) => {
    return safeAsync(() => marginTransferInMutate.mutateAsync(data));
  };

  return (
    <Box component="form" onSubmit={form.handleSubmit(onSubmitHandler)}>
      <TransactionFormLayout>
        <TransactionFormLayoutFieldContainer>
          <TransactionFormLayoutFieldAutoFiller onClick={selectAllBalance}>
            {"کل موجودی"}
          </TransactionFormLayoutFieldAutoFiller>
          <TransactionFormLayoutField>
            <TransactionFormLayoutLabel>
              {"مبلغ وثیقه"}
            </TransactionFormLayoutLabel>

            <Controller
              control={form.control}
              name="amount"
              render={({ field, fieldState, formState }) => (
                <InputNumeric
                  {...toNumericFormatProps(field)}
                  disabled={formState.isSubmitting}
                  scale="medium"
                  placeholder="مبلغی که می‌خواهید از کیف پول منتقل شود"
                  error={!!fieldState.error?.message}
                />
              )}
            />
          </TransactionFormLayoutField>
        </TransactionFormLayoutFieldContainer>
        <Alert sx={{ mt: 4 }}>
          {
            "مقدار وثیقه از کیف پول شما کثر خواهد شد و مقدار محاصبه شده به اعتبار شما اظافه میشود"
          }
        </Alert>
        {marginCredit > 0 && (
          <Box sx={{ mt: 2 }}>
            <Price>
              <PriceAmount>{formatFaPrice(marginCredit)}</PriceAmount>
              <PriceUnit />-
              <Typography variant="body1">{"دریافت میکنید"}</Typography>
            </Price>
          </Box>
        )}
        <TransactionFormLayoutSubmit
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          {"درخواست اعتبار"}
        </TransactionFormLayoutSubmit>
      </TransactionFormLayout>
    </Box>
  );
}

export default MarginTransferForm;
