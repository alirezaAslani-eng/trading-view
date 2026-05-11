import SignupForm from "@/components/template/Form/SignupForm";
import AuthFormLayout from "@/components/template/Layout/AuthFormLayout/AuthFormLayout";
import AuthFormLayoutContainer from "@/components/template/Layout/AuthFormLayout/AuthFormLayoutContainer";
import AuthFormLayoutHeading from "@/components/template/Layout/AuthFormLayout/AuthFormLayoutHeading";
import AuthFormLayoutToggleButoon from "@/components/template/Layout/AuthFormLayout/AuthFormLayoutToggleButoon";
import React from "react";

function page() {
  return (
    <AuthFormLayout>
      <AuthFormLayoutHeading
        title="به آیرونکس خوش آمدید"
        subTitle="جهت عضویت و ورود به پلتفرم، شماره تماس خود را وارد کنید"
      />
      <AuthFormLayoutContainer>
        <AuthFormLayoutToggleButoon activeButton="signup" />
        <SignupForm />
      </AuthFormLayoutContainer>
    </AuthFormLayout>
  );
}

export default page;
