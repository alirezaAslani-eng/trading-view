"use client";
import InputPhoneNumber from "@/components/ui/Input/InputPhoneNumber";
import { useId } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import requestAuthOTPSchema from "@/validations/auth/requestAuthOTPSchema";
import { RequestAuthOTPSchemaType } from "@/validations/types";
import { authContent } from "@/content/auth";
import AuthFormLayoutField from "../Layout/AuthFormLayout/AuthFormLayoutField";
import AuthFormLayoutLable from "../Layout/AuthFormLayout/AuthFormLayoutLable";
import AuthFormLayoutSubmit from "../Layout/AuthFormLayout/AuthFormLayoutSubmit";
import { Box } from "@mui/material";
import { useAuthFlow } from "@/context/feature/auth/AuthFlow/AuthFlowContext";
import AuthFormLayout from "../Layout/AuthFormLayout/AuthFormLayout";
import AuthFormLayoutHeading from "../Layout/AuthFormLayout/AuthFormLayoutHeading";
import AuthFormLayoutContainer from "../Layout/AuthFormLayout/AuthFormLayoutContainer";

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
    fields,
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
