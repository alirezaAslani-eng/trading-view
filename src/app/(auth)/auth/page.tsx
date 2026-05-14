import RequestAuthOTPForm from "@/components/template/Form/RequestAuthOTPForm";
import AuthFormLayout from "@/components/template/Layout/AuthFormLayout/AuthFormLayout";
import AuthFormLayoutContainer from "@/components/template/Layout/AuthFormLayout/AuthFormLayoutContainer";
import AuthFormLayoutHeading from "@/components/template/Layout/AuthFormLayout/AuthFormLayoutHeading";

function page() {
  return (
    <AuthFormLayout>
      <AuthFormLayoutHeading
        title="به آیرونکس خوش آمدید"
        subTitle="جهت عضویت و ورود به پلتفرم، شماره تماس خود را وارد کنید"
      />
      <AuthFormLayoutContainer>
        <RequestAuthOTPForm />
      </AuthFormLayoutContainer>
    </AuthFormLayout>
  );
}

export default page;
