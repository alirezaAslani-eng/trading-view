"use client";
import InputPhoneNumber from "@/components/ui/Input/InputPhoneNumber";
import { useId } from "react";
import { useForm } from "react-hook-form";
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
  });

  return (
    <FormLayout
      onSubmit={form.handleSubmit(
        async (fields) => await safeAsync(() => mutation.mutateAsync(fields)),
      )}
    >
      <FormLayoutField>
        <FormLayoutLable htmlFor={phoneLabelID}>
          {"شماره موبایل"}
        </FormLayoutLable>
        <InputPhoneNumber id={phoneLabelID} {...form.register("identifier")} />
      </FormLayoutField>
      <FormLayoutSubmit>{"تایید و دریافت کد"}</FormLayoutSubmit>
    </FormLayout>
  );
}

export default RequestAuthOTPForm;
