import RequestAuthOTPForm from "@/components/template/Form/RequestAuthOTPForm";
import AuthFormLayout from "@/components/template/Layout/AuthFormLayout/AuthFormLayout";
import AuthFormLayoutContainer from "@/components/template/Layout/AuthFormLayout/AuthFormLayoutContainer";
import AuthFormLayoutHeading from "@/components/template/Layout/AuthFormLayout/AuthFormLayoutHeading";
import {
  AuthPageLayout,
  AuthPageLayoutBrand,
  AuthPageLayoutFormContainer,
  AuthPageLayoutHelperLinks,
} from "@/components/ui/Layout/AuthPageLayout";

function page() {
  return (
    <AuthPageLayout>
      <AuthPageLayoutFormContainer>
        <AuthPageLayoutBrand />

        <AuthFormLayout>
          <AuthFormLayoutHeading
            title="به آیرونکس خوش آمدید"
            subTitle="جهت عضویت و ورود به پلتفرم، شماره تماس خود را وارد کنید"
          />
          <AuthFormLayoutContainer>
            <RequestAuthOTPForm />
          </AuthFormLayoutContainer>
        </AuthFormLayout>
      </AuthPageLayoutFormContainer>

      <AuthPageLayoutHelperLinks />
    </AuthPageLayout>
  );
}

export default page;
