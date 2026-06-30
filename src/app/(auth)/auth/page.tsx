import AuthFlowRenderer from "@/components/template/auth/AuthFlowRenderer";
import RequestAuthOTPForm from "@/components/template/Form/RequestAuthOTPForm";
import VerifyAuthOTPForm from "@/components/template/Form/VerifyAuthOTPForm";
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
        <AuthFlowRenderer
          enterInfoStep={<RequestAuthOTPForm />}
          verifyInfoStep={<VerifyAuthOTPForm />}
        />
      </AuthPageLayoutFormContainer>
      <AuthPageLayoutHelperLinks />
    </AuthPageLayout>
  );
}

export default page;
