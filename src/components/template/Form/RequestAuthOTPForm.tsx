"use client";
import InputPhoneNumber from "@/components/ui/Input/InputPhoneNumber";
import { useId } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import safeAsync from "@/utils/app/safeAsync";
import { zodResolver } from "@hookform/resolvers/zod";
import requestAuthOTPSchema from "@/validations/auth/requestAuthOTPSchema";
import { requestAuthOTPConfig } from "@/packages/react-query";
import { useRouter } from "next/navigation";
import clientEnv from "@/validations/env/clientEnv";
import useSessionStorage from "@/hooks/app/useSessionStorage";
import { identifierSessionKey } from "@/constant/features/auth/sessionStorageKeys";
import {
  FormLayout,
  FormLayoutField,
  FormLayoutLable,
  FormLayoutSubmit,
} from "@/components/ui/Layout/FormLayout";
import { RequestAuthOTPSchemaType } from "@/validations/types";
import { promiseAlert } from "@/packages/react-hot-toast";

const mutationConfig = requestAuthOTPConfig();

function RequestAuthOTPForm() {
  const phoneLabelID = useId();

  const { push } = useRouter();

  const form = useForm({
    resolver: zodResolver(requestAuthOTPSchema),
    defaultValues: { identifier: clientEnv?.NEXT_PUBLIC_USER_IDENTIFIER! },
  });

  const mutation = useMutation({
    ...mutationConfig,
    onSuccess: () => {
      sessionStorage.setItem(identifierSessionKey, form.watch("identifier"));
      push("/auth/verify");
    },
    meta: {
      disableSuccessAlert: true,
    },
  });

  const onSubmitHandler: SubmitHandler<RequestAuthOTPSchemaType> = async (
    fields,
  ) => {
    await promiseAlert(
      safeAsync(async () => await mutation.mutateAsync(fields)),
      { loading: "صبر کنید" },
    );
  };

  return (
    <FormLayout onSubmit={form.handleSubmit(onSubmitHandler)}>
      <FormLayoutField>
        <FormLayoutLable htmlFor={phoneLabelID}>
          {"شماره موبایل"}
        </FormLayoutLable>
        <InputPhoneNumber id={phoneLabelID} {...form.register("identifier")} />
      </FormLayoutField>
      <FormLayoutSubmit disabled={form.formState.isSubmitting}>
        {"تایید و دریافت کد"}
      </FormLayoutSubmit>
    </FormLayout>
  );
}

export default RequestAuthOTPForm;
