import SignupForm from "@/components/template/Form/SignupForm";
import AuthFormLayout from "@/components/template/Layout/AuthFormLayout/AuthFormLayout";
import AuthFormLayoutHeading from "@/components/template/Layout/AuthFormLayout/AuthFormLayoutHeading";
import AuthFormLayoutToggleButoon from "@/components/template/Layout/AuthFormLayout/AuthFormLayoutToggleButoon";
import { Box } from "@mui/material";
import React from "react";

function page() {
  return (
    <Box
      sx={{
        height: "100svh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AuthFormLayout>
        <AuthFormLayoutHeading
          title="به آیرونکس خوش آمدید"
          subTitle="جهت عضویت و ورود به پلتفرم، شماره تماس خود را وارد کنید"
        />
        <AuthFormLayoutToggleButoon activeButton="signup" />
        <SignupForm />
      </AuthFormLayout>
    </Box>
  );
}

export default page;
