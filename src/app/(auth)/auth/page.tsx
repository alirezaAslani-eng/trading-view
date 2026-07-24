import AuthFlowRenderer from "@/components/template/auth/AuthFlowRenderer";
import RequestAuthOTPForm from "@/components/template/Form/RequestAuthOTPForm";
import VerifyAuthOTPForm from "@/components/template/Form/VerifyAuthOTPForm";
import {
  AuthPageLayoutBrand,
  AuthPageLayoutFormContainer,
  AuthPageLayoutHelperLinks,
} from "@/components/ui/Layout/AuthPageLayout";

function page() {
  return (
    <>
      <AuthPageLayoutFormContainer>
        <AuthPageLayoutBrand />
        <AuthFlowRenderer
          enterInfoStep={<RequestAuthOTPForm />}
          verifyInfoStep={<VerifyAuthOTPForm />}
        />
        <AuthPageLayoutHelperLinks />
      </AuthPageLayoutFormContainer>
    </>
  );
}

export default page;
