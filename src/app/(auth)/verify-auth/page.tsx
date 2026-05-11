import VerifyAuthForm from "@/components/template/Form/VerifyAuthForm";
import AuthFormLayout from "@/components/template/Layout/AuthFormLayout/AuthFormLayout";
import AuthFormLayoutContainer from "@/components/template/Layout/AuthFormLayout/AuthFormLayoutContainer";
import AuthFormLayoutHeading from "@/components/template/Layout/AuthFormLayout/AuthFormLayoutHeading";
import AuthFormLayoutToggleButoon from "@/components/template/Layout/AuthFormLayout/AuthFormLayoutToggleButoon";

function page() {
  return (
    <AuthFormLayout>
      <AuthFormLayoutHeading
        title="کد تایید"
        subTitle="جهت تایید شماره موبایل، کد ارسال شده را وارد کنید"
      />
      <AuthFormLayoutContainer>
        <AuthFormLayoutToggleButoon activeButton="signin" />
        <VerifyAuthForm />
      </AuthFormLayoutContainer>
    </AuthFormLayout>
  );
}

export default page;
