"use client";
import InputText from "@/components/ui/Input/InputText";
import { kycLevel2Config } from "@/packages/react-query";
import kycL2Schema from "@/validations/kyc/kycL2Schema";
import { KycL2SchemaType } from "@/validations/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import safeAsync from "@/utils/app/safeAsync";
import {
  FormLayout,
  FormLayoutField,
  FormLayoutLable,
  FormLayoutSubmit,
} from "@/components/ui/Layout/FormLayout";

const mutationConfig = kycLevel2Config();
function KycL2Form() {
  const mutation = useMutation(mutationConfig);

  const form = useForm({ resolver: zodResolver(kycL2Schema) });

  const submitHandler: SubmitHandler<KycL2SchemaType> = async (fields) => {
    await safeAsync(async () => {
      await mutation.mutateAsync(fields);
    });
  };

  return (
    <FormLayout onSubmit={form.handleSubmit(submitHandler)}>
      <FormLayoutField>
        <FormLayoutLable>{"کد پستی"}</FormLayoutLable>
        <InputText
          placeholder="کد پستی را وارد کنید"
          error={!!form.formState.errors?.postalCode}
          {...form.register("postalCode")}
        />
      </FormLayoutField>

      <FormLayoutSubmit disabled={form.formState.isSubmitting}>
        {"ثبت اطلاعات"}
      </FormLayoutSubmit>
    </FormLayout>
  );
}

export default KycL2Form;
