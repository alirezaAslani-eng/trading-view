import SigninForm from "@/components/template/Form/SigninForm";
import AuthFormLayout from "@/components/template/Layout/AuthFormLayout/AuthFormLayout";
import AuthFormLayoutHeading from "@/components/template/Layout/AuthFormLayout/AuthFormLayoutHeading";
import AuthFormLayoutToggleButoon from "@/components/template/Layout/AuthFormLayout/AuthFormLayoutToggleButoon";
import { Stack } from "@mui/material";
import React from "react";

function page() {
  return (
    <Stack
      sx={{ height: "100svh", alignItems: "center", justifyContent: "center" }}
    >
      <AuthFormLayout>
        <AuthFormLayoutHeading
          title="به آیرونکس خوش آمدید"
          subTitle="جهت عضویت و ورود به پلتفرم، شماره تماس خود را وارد کنید"
        />
        <AuthFormLayoutToggleButoon />

        <SigninForm />
      </AuthFormLayout>
    </Stack>
  );
}

export default page;
