import VerifyAuthForm from "@/components/template/Form/VerifyAuthForm";
import AuthFormLayout from "@/components/template/Layout/AuthFormLayout/AuthFormLayout";
import AuthFormLayoutHeading from "@/components/template/Layout/AuthFormLayout/AuthFormLayoutHeading";
import AuthFormLayoutToggleButoon from "@/components/template/Layout/AuthFormLayout/AuthFormLayoutToggleButoon";
import { Stack } from "@mui/material";
import React from "react";

function page() {
  return (
    <Stack
      sx={{ height: "100svh", justifyContent: "center", alignItems: "center" }}
    >
      <AuthFormLayout>
        <AuthFormLayoutHeading
          title="کد تایید"
          subTitle="جهت تایید شماره موبایل، کد ارسال شده را وارد کنید"
        />
        <AuthFormLayoutToggleButoon activeButton="signin" />
        <VerifyAuthForm />
      </AuthFormLayout>
    </Stack>
  );
}

export default page;
