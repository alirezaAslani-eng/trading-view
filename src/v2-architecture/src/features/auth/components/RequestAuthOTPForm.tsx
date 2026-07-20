"use client";

import { useId } from "react";
import { useAuthFlow } from "../context";
import { requestAuthOTPSchema, RequestAuthOTPSchemaType } from "../validations";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import { authContent } from "@/v2-architecture/src/content/auth";
import { InputPhoneNumber } from "@/v2-architecture/src/shared/ui";
import {
  AuthFormLayout,
  AuthFormLayoutContainer,
  AuthFormLayoutField,
  AuthFormLayoutHeading,
  AuthFormLayoutLable,
  AuthFormLayoutSubmit,
} from "./AuthFormLayout";

function RequestAuthOTPForm() {
  const authFlow = useAuthFlow()!;
  const phoneLabelID = useId();

  const form = useForm({
    resolver: zodResolver(requestAuthOTPSchema),
    defaultValues: {
      identifier: authFlow.identifier,
    },
  });

  const onSubmitHandler: SubmitHandler<RequestAuthOTPSchemaType> = async (
    fields
  ) => {
    authFlow.submitIdentifier(fields.identifier);
  };

  return (
    <AuthFormLayout>
      <AuthFormLayoutHeading
        title="به آیرونکس خوش آمدید"
        subTitle="جهت عضویت و ورود به پلتفرم، شماره تماس خود را وارد کنید"
      />
      <AuthFormLayoutContainer>
        <Box component={"form"} onSubmit={form.handleSubmit(onSubmitHandler)}>
          <AuthFormLayoutField>
            <AuthFormLayoutLable htmlFor={phoneLabelID}>
              {authContent.requestOtpContent.phoneInputLable}
            </AuthFormLayoutLable>
            <InputPhoneNumber
              id={phoneLabelID}
              {...form.register("identifier")}
            />
          </AuthFormLayoutField>

          <AuthFormLayoutSubmit disabled={form.formState.isSubmitting}>
            {authContent.requestOtpContent.submitText}
          </AuthFormLayoutSubmit>
        </Box>
      </AuthFormLayoutContainer>
    </AuthFormLayout>
  );
}

export default RequestAuthOTPForm;
