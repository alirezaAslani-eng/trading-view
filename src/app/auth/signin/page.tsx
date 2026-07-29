import { SigninFlowProvider } from "@/components/template/auth/SigninContext";
import { SigninForm } from "@/components/template/auth/SignupForm";
import { AuthPageLayoutFormContainer } from "@/components/ui/Layout/AuthPageLayout";

function page() {
  return (
    <AuthPageLayoutFormContainer>
      <SigninFlowProvider>
        <SigninForm />
      </SigninFlowProvider>
    </AuthPageLayoutFormContainer>
  );
}

export default page;
