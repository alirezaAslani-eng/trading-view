import { AuthForm } from "@/components/template/Form/AuthForm";
import { AuthFlowProvider } from "@/context/feature/auth/AuthFlow/AuthFlowContext";
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
        <AuthFlowProvider>
          <AuthForm />
        </AuthFlowProvider>
        <AuthPageLayoutHelperLinks />
      </AuthPageLayoutFormContainer>
    </>
  );
}

export default page;
