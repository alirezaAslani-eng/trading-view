"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { FormControl } from "@mui/material";
import safeAsync from "@/utils/app/safeAsync";
import InputNumeric from "@/components/ui/Input/InputNumeric";
import { toNumericFormatProps } from "@/utils/app/toNumericFieldProps";
import {
  marginTransferInSchema,
  MarginTransferInSchema,
} from "@/v2-architecture/src/features/portfolio/validations";
import { marginTransferInConfig } from "@/v2-architecture/src/features/portfolio/react-query";
import {
  FormLayout,
  FormLayoutField,
  FormLayoutLable,
  FormLayoutSubmit,
} from "@/components/ui/Layout/FormLayout";

const mutationConfig = marginTransferInConfig();
const formConfig = {
  resolver: zodResolver(marginTransferInSchema),
};

function MarginTransferForm() {
  const mutation = useMutation(mutationConfig);

  const form = useForm(formConfig);
  const { formState } = form;

  const onSubmit = (data: MarginTransferInSchema) => {
    return safeAsync(() => mutation.mutateAsync(data));
  };

  return (
    <FormControl disabled={formState.isSubmitting}>
      <FormLayout onSubmit={form.handleSubmit(onSubmit)}>
        <FormLayoutField>
          <FormLayoutLable>مبلغ اعتبار</FormLayoutLable>

          <Controller
            control={form.control}
            name="amount"
            render={({ field }) => (
              <InputNumeric
                {...toNumericFormatProps(field)}
                placeholder="مبلغ مورد نظر را وارد کنید"
                error={!!formState.errors.amount}
              />
            )}
          />
        </FormLayoutField>

        <FormLayoutSubmit>درخواست اعتبار</FormLayoutSubmit>
      </FormLayout>
    </FormControl>
  );
}

export default MarginTransferForm;
