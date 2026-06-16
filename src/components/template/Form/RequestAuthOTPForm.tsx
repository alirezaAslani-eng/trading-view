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
import { RequestAuthOTPSchemaType } from "@/validations/types";
import { promiseAlert } from "@/packages/react-hot-toast";
import alertMessages from "@/constant/app/alertMessages";
import { storeIdentifier } from "@/utils/features/auth/userIdentifierStoreHandlers";
import { authContent } from "@/content/auth";
import AuthFormLayoutField from "../Layout/AuthFormLayout/AuthFormLayoutField";
import AuthFormLayoutLable from "../Layout/AuthFormLayout/AuthFormLayoutLable";
import AuthFormLayoutSubmit from "../Layout/AuthFormLayout/AuthFormLayoutSubmit";
import { Box } from "@mui/material";

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
      storeIdentifier(form.watch("identifier"));
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
      { loading: alertMessages.loading },
    );
  };

  return (
    <Box component={"form"} onSubmit={form.handleSubmit(onSubmitHandler)}>
      <AuthFormLayoutField>
        <AuthFormLayoutLable htmlFor={phoneLabelID}>
          {authContent.requestOtpContent.phoneInputLable}
        </AuthFormLayoutLable>
        <InputPhoneNumber id={phoneLabelID} {...form.register("identifier")} />
      </AuthFormLayoutField>

      <AuthFormLayoutSubmit disabled={form.formState.isSubmitting}>
        {authContent.requestOtpContent.submitText}
      </AuthFormLayoutSubmit>
    </Box>
  );
}

export default RequestAuthOTPForm;
