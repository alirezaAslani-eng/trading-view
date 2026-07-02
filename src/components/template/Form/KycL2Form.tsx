"use client";
import InputText from "@/components/ui/Input/InputText";
import { kycLevel2Config } from "@/packages/react-query";
import kycL2Schema from "@/validations/kyc/kycL2Schema";
import { KycL2SchemaType } from "@/validations/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import safeAsync from "@/utils/app/safeAsync";
import { useDispatch } from "@/packages/redux";
import { exitKycFlow } from "@/redux/features/kyc";
import {
  FormLayout,
  FormLayoutField,
  FormLayoutLable,
  FormLayoutSubmit,
} from "@/components/ui/Layout/FormLayout";

function KycL2Form() {
  const dispatch = useDispatch();
  const mutation = useMutation(
    kycLevel2Config({
      onSuccess: () => dispatch(exitKycFlow()),
    }),
  );

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
