"use client";
import { AddIcon } from "@/components/ui/Icon";
import {
  bankAccountsConfig,
  walletBalanceConfig,
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

const walletQueryConfig = walletBalanceConfig();
const withdrawMutationConfig = withdrawConfig();
function WithdrawForm() {
  const withdrawMutate = useMutation(withdrawMutationConfig);
  const walletQuery = useQuery(walletQueryConfig);

  const form = useForm({
    resolver: zodResolver(withdrawSchema),
    defaultValues: {
      bankAccountId: "",
    },
  });

  const onSubmitHandler: SubmitHandler<WithdrawSchemaType> = async (fields) => {
    await promiseAlert(
      safeAsync(async () => {
        await withdrawMutate.mutateAsync(fields);
      }),
      { loading: alertMessages.loading },
    );
  };

  const selectAllWallet = () => {
    form.setValue("amount", walletQuery.data!.totalPortfolioValueIrt);
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
                  value={field.value}
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
                    placeholder="مبلغ مورد نظر را به تومان وارد کنید"
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
          disabled={form.formState.isSubmitting}
        >
          <AddIcon sx={{ color: "inherit" }} />
          {"افزودن شبای جدید"}
        </TransactionFormLayoutSubmit>
      </TransactionFormLayout>
    </Box>
  );
}

export default WithdrawForm;

const banksConfig = bankAccountsConfig();
function InputSelectBank(props: ComponentProps<typeof InputSelect>) {
  const query = useQuery(banksConfig);
  const isLoading = query.status !== "success";
  return (
    <InputSelect
      sx={{ flex: 1 }}
      size="medium"
      placeholder="لطفا شماره شبای خود را انتخاب کنید"
      {...props}
    >
      <InputSelectMenu>
        {isLoading ? (
          <SelectInputLoader>
            <SelectInputLoaderText />
          </SelectInputLoader>
        ) : (
          query.data.map((bank) => {
            return (
              <InputSelectItem value={bank.id}>
                {bank.cardNumber}
              </InputSelectItem>
            );
          })
        )}
      </InputSelectMenu>
    </InputSelect>
  );
}
