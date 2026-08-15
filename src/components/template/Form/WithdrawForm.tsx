"use client";
import {
  bankAccountsConfig,
  walletPortfolioConfig,
  withdrawConfig,
} from "@/packages/react-query";
import { Box } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import withdrawSchema from "@/validations/transaction/withdrawSchema";
import { ComponentProps } from "react";
import InputNumeric from "@/components/ui/Input/InputNumeric";
import {
  InputSelect,
  InputSelectItem,
  InputSelectMenu,
} from "@/components/ui/Input/InputSelect";
import {
  TransactionFormLayout,
  TransactionFormLayoutField,
  TransactionFormLayoutFieldAutoFiller,
  TransactionFormLayoutFieldContainer,
  TransactionFormLayoutLabel,
  TransactionFormLayoutSubmit,
} from "@/components/ui/Layout/TransactionFormLayout";
import {
  SelectInputLoader,
  SelectInputLoaderText,
} from "@/components/ui/Fallback/SelectInputLoader";
import { promiseAlert } from "@/packages/react-hot-toast";
import safeAsync from "@/utils/app/safeAsync";
import { WithdrawSchemaType } from "@/validations/types";
import alertMessages from "@/constant/app/alertMessages";
import { PRICE_UNITS } from "@/constant/features/priceConfig";
import { extractIRTAsset } from "@/utils/features/wallet/walletProtofolioTransformers";
import useKycGuard from "@/hooks/features/kyc/useKycGuard";
import KYC_REQUIRED_LEVELS from "@/constant/features/kyc/kycAccess";
import FallbackHandler from "@/components/ui/Fallback/FallbackHandler";
import BankSelectInputFallback from "@/components/ui/Feedback/BankSelectInputFallback";
import { useTradeMode } from "@/context/feature/trade/TradeMode";

const withdrawMutationConfig = withdrawConfig();
function WithdrawForm() {
  const withdrawMutate = useMutation(withdrawMutationConfig);
  const { isDemo } = useTradeMode();
  const walletQuery = useQuery(walletPortfolioConfig(isDemo));
  const { checkAccess } = useKycGuard();

  const form = useForm({
    resolver: zodResolver(withdrawSchema),
    defaultValues: {
      bankAccountId: "",
    },
  });

  const onSubmitHandler: SubmitHandler<WithdrawSchemaType> = async (fields) => {
    const hasAccess = checkAccess(KYC_REQUIRED_LEVELS.withdraw);
    if (!hasAccess) return;
    await promiseAlert(
      safeAsync(async () => {
        await withdrawMutate.mutateAsync(fields);
      }),
      { loading: alertMessages.loading },
    );
  };

  const selectAllWallet = () => {
    form.setValue(
      "amount",
      extractIRTAsset(walletQuery.data)?.availableBalance ?? 0,
    );
  };

  return (
    <Box component={"form"} onSubmit={form.handleSubmit(onSubmitHandler)}>
      <TransactionFormLayout>
        <TransactionFormLayoutField>
          <TransactionFormLayoutLabel>{"واریز به"}</TransactionFormLayoutLabel>
          <Controller
            control={form.control}
            name="bankAccountId"
            render={({ field, fieldState, formState }) => {
              return (
                <InputSelectBank
                  disabled={formState.isSubmitting}
                  error={!!fieldState.error?.message}
                  onChange={field.onChange}
                  value={field.value as number}
                />
              );
            }}
          />
        </TransactionFormLayoutField>

        <TransactionFormLayoutFieldContainer>
          {walletQuery.status !== "success" ? undefined : (
            <TransactionFormLayoutFieldAutoFiller
              onClick={selectAllWallet}
              type="button"
            >
              {"برداشت کل موجودی"}
            </TransactionFormLayoutFieldAutoFiller>
          )}
          <TransactionFormLayoutField>
            <TransactionFormLayoutLabel>
              {"مبلغ مورد نظر"}
            </TransactionFormLayoutLabel>
            <Controller
              control={form.control}
              name="amount"
              render={({ field, fieldState, formState }) => {
                return (
                  <InputNumeric
                    disabled={formState.isSubmitting}
                    sx={{ flex: 1 }}
                    scale="medium"
                    placeholder={`مبلغ مورد نظر را به ${PRICE_UNITS.IRT.displayName} وارد کنید`}
                    value={field.value}
                    error={!!fieldState.error?.message}
                    onValueChange={({ floatValue }) => {
                      field.onChange(floatValue);
                    }}
                  />
                );
              }}
            />
          </TransactionFormLayoutField>
        </TransactionFormLayoutFieldContainer>

        <TransactionFormLayoutSubmit
          type="submit"
          disabled={!form.formState.isValid}
        >
          {"برداشت"}
        </TransactionFormLayoutSubmit>
      </TransactionFormLayout>
    </Box>
  );
}

export default WithdrawForm;

const banksConfig = bankAccountsConfig();
function InputSelectBank(props: ComponentProps<typeof InputSelect>) {
  const query = useQuery(banksConfig);
  return (
    <>
      <InputSelect
        sx={{ flex: 1 }}
        size="medium"
        placeholder="لطفا شماره شبای خود را انتخاب کنید"
        {...props}
      >
        <InputSelectMenu>
          <FallbackHandler
            isLoading={query.isLoading}
            isError={query.isError}
            dataLength={query.data?.length}
            fallbacks={{
              noData: <BankSelectInputFallback />,
              loader: (
                <SelectInputLoader>
                  <SelectInputLoaderText />
                </SelectInputLoader>
              ),
            }}
          />
          {query.data?.map((bank) => {
            return (
              <InputSelectItem key={bank.id} value={bank.id}>
                {bank.cardNumber}
              </InputSelectItem>
            );
          })}
        </InputSelectMenu>
      </InputSelect>
    </>
  );
}
