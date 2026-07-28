import AuthFlowRenderer from "@/components/template/auth/AuthFlowRenderer";
import RequestAuthOTPForm from "@/components/template/Form/RequestAuthOTPForm";
import VerifyAuthOTPForm from "@/components/template/Form/VerifyAuthOTPForm";
import {
  AuthPageLayout,
  AuthPageLayoutBrand,
  AuthPageLayoutFormContainer,
  AuthPageLayoutHelperLinks,
} from "@/components/ui/Layout/AuthPageLayout";
import { AuthFlowProvider } from "@/context/feature/auth/AuthFlow/AuthFlowContext";

function page() {
  return (
    <>
      <AuthPageLayoutFormContainer>
        <AuthFlowRenderer
          enterInfoStep={<RequestAuthOTPForm />}
          verifyInfoStep={<VerifyAuthOTPForm />}
        />

        {/* <AuthPageLayoutBrand /> */}
        {/* <AuthPageLayoutHelperLinks /> */}
      </AuthPageLayoutFormContainer>
    </>
  );
}

export default page;
