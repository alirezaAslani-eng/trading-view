"use client";
import { depositConfig } from "@/packages/react-query";
import { Box } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import InputNumeric from "@/components/ui/Input/InputNumeric";
import { promiseAlert } from "@/packages/react-hot-toast";
import safeAsync from "@/utils/app/safeAsync";
import {
  TransactionFormLayout,
  TransactionFormLayoutField,
  TransactionFormLayoutFieldContainer,
  TransactionFormLayoutLabel,
  TransactionFormLayoutSubmit,
} from "@/components/ui/Layout/TransactionFormLayout";
import alertMessages from "@/constant/app/alertMessages";
import { PRICE_UNITS } from "@/constant/features/priceConfig";
import KYC_REQUIRED_LEVELS from "@/constant/features/kyc/kycAccess";
import useKycGuard from "@/hooks/features/kyc/useKycGuard";

const withdrawMutationConfig = depositConfig();
function DepositForm() {
  const depositMutate = useMutation(withdrawMutationConfig);
  const { checkAccess } = useKycGuard();

  const form = useForm();

  const onSubmitHandler = async (fields: any) => {
    const hasAccess = checkAccess(KYC_REQUIRED_LEVELS.deposit);
    if (!hasAccess) return;
    await promiseAlert(
      safeAsync(async () => {
        await depositMutate.mutateAsync({
          referenceId: "Direct-Pay-01",
          amount: fields.amount,
        });
      }),
      { loading: alertMessages.loading },
    );
  };

  return (
    <Box component={"form"} onSubmit={form.handleSubmit(onSubmitHandler)}>
      <TransactionFormLayout>
        <TransactionFormLayoutFieldContainer>
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
          disabled={form.formState.isSubmitting}
        >
          {"ثبت واریز"}
        </TransactionFormLayoutSubmit>
      </TransactionFormLayout>
    </Box>
  );
}

export default DepositForm;
