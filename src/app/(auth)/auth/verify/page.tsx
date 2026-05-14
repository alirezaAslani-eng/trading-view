import VerifyAuthOTPForm from "@/components/template/Form/VerifyAuthOTPForm";
import AuthFormLayout from "@/components/template/Layout/AuthFormLayout/AuthFormLayout";
import AuthFormLayoutContainer from "@/components/template/Layout/AuthFormLayout/AuthFormLayoutContainer";
import AuthFormLayoutHeading from "@/components/template/Layout/AuthFormLayout/AuthFormLayoutHeading";

function page() {
  return (
    <AuthFormLayout>
      <AuthFormLayoutHeading
        title="کد تایید"
        subTitle="جهت تایید شماره موبایل، کد ارسال شده را وارد کنید"
      />
      <AuthFormLayoutContainer>
        <VerifyAuthOTPForm />
      </AuthFormLayoutContainer>
    </AuthFormLayout>
  );
}

export default page;
